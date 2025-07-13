"use server";

import { db } from "@/drizzle/db";
import { videos, user } from "@/drizzle/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import {
  apiFetch,
  doesTitleMatch,
  getEnv,
  getOrderByClause,
  withErrorHandling,
} from "@/lib/utils";
import aj, { fixedWindow, request } from "../arcjet";
import { Mux } from "@mux/mux-node";

// Initialize Mux client
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

// Constants with full names
// Mux constants
const MUX_PLAYBACK_URL = "https://stream.mux.com";
const MUX_PLAYER_URL = "https://player.mux.com";

const validateWithArcjet = async (fingerPrint: string) => {
  const rateLimit = aj.withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 2,
      characteristics: ["fingerprint"],
    })
  );
  const req = await request();
  const decision = await rateLimit.protect(req, { fingerprint: fingerPrint });
  if (decision.isDenied()) {
    throw new Error("Rate Limit Exceeded");
  }
};

// Helper functions with descriptive names
const revalidatePaths = (paths: string[]) => {
  paths.forEach((path) => revalidatePath(path));
};

const getSessionUserId = async (): Promise<string> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthenticated");
  return session.user.id;
};

const buildVideoWithUserQuery = () =>
  db
    .select({
      video: videos,
      user: { id: user.id, name: user.name, image: user.image },
    })
    .from(videos)
    .leftJoin(user, eq(videos.userId, user.id));

// Server Actions
export const getVideoUploadUrl = withErrorHandling(async () => {
  await getSessionUserId();
  
  // Create a new asset
  const asset = await mux.video.assets.create({
    inputs: [{ url: 'https://muxed.s3.amazonaws.com/leds.mp4' }],
    playback_policy: ['public'],
    video_quality: 'basic',
  });

  return {
    uploadUrl: 'https://muxed.s3.amazonaws.com/leds.mp4', // This would be replaced with actual upload URL in production
    assetId: asset.id,
    playbackId: asset.playback_ids[0].id,
  };
});

// Thumbnail upload is handled by Mux during video processing
// No need for separate thumbnail upload URL
export const getThumbnailUploadUrl = withErrorHandling(
  async (videoId: string) => {
    throw new Error("Thumbnail upload is handled automatically by Mux during video processing");
  }
);

export const saveVideoDetails = withErrorHandling(
  async (videoDetails: VideoDetails) => {
    const userId = await getSessionUserId();
    await validateWithArcjet(userId);
    
    // Update video metadata in Mux
    await mux.video.assets.update(videoDetails.assetId, {
      title: videoDetails.title,
      description: videoDetails.description,
    });

    const now = new Date();
    await db.insert(videos).values({
      title: videoDetails.title,
      description: videoDetails.description,
      assetId: videoDetails.assetId,
      playbackId: videoDetails.playbackId,
      videoUrl: `https://stream.mux.com/${videoDetails.playbackId}.m3u8`,
      userId,
      visibility: videoDetails.visibility,
      createdAt: now,
      updatedAt: now,
    });

    revalidatePaths(["/"]);
    return { videoId: videoDetails.assetId };
  }
);

export const getAllVideos = withErrorHandling(
  async (
    searchQuery: string = "",
    sortFilter?: string,
    pageNumber: number = 1,
    pageSize: number = 8
  ) => {
    const session = await auth.api.getSession({ headers: await headers() });
    const currentUserId = session?.user.id;

    const canSeeTheVideos = or(
      eq(videos.visibility, "public"),
      eq(videos.userId, currentUserId!)
    );

    const whereCondition = searchQuery.trim()
      ? and(canSeeTheVideos, doesTitleMatch(videos, searchQuery))
      : canSeeTheVideos;

    // Count total for pagination
    const [{ totalCount }] = await db
      .select({ totalCount: sql<number>`count(*)` })
      .from(videos)
      .where(whereCondition);
    const totalVideos = Number(totalCount || 0);
    const totalPages = Math.ceil(totalVideos / pageSize);

    // Fetch paginated, sorted results
    const videoRecords = await buildVideoWithUserQuery()
      .where(whereCondition)
      .orderBy(
        sortFilter
          ? getOrderByClause(sortFilter)
          : sql`${videos.createdAt} DESC`
      )
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize);

    return {
      videos: videoRecords,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalVideos,
        pageSize,
      },
    };
  }
);

export const getVideoById = withErrorHandling(async (videoId: string) => {
  const [videoRecord] = await buildVideoWithUserQuery().where(
    eq(videos.id, videoId)
  );
  return videoRecord;
});

// Mux doesn't provide automatic transcription, but you can use third-party services
// or implement your own transcription service
export const getTranscript = withErrorHandling(async (videoId: string) => {
  throw new Error("Transcription is not directly supported by Mux. Consider implementing a custom transcription service.");
});

export const incrementVideoViews = withErrorHandling(
  async (videoId: string) => {
    await db
      .update(videos)
      .set({ views: sql`${videos.views} + 1`, updatedAt: new Date() })
      .where(eq(videos.id, videoId));

    revalidatePaths([`/video/${videoId}`]);
    return {};
  }
);

export const getAllVideosByUser = withErrorHandling(
  async (
    userIdParameter: string,
    searchQuery: string = "",
    sortFilter?: string
  ) => {
    const currentUserId = (
      await auth.api.getSession({ headers: await headers() })
    )?.user.id;
    const isOwner = userIdParameter === currentUserId;

    const [userInfo] = await db
      .select({
        id: user.id,
        name: user.name,
        image: user.image,
        email: user.email,
      })
      .from(user)
      .where(eq(user.id, userIdParameter));
    if (!userInfo) throw new Error("User not found");

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const conditions = [
      eq(videos.userId, userIdParameter),
      !isOwner && eq(videos.visibility, "public"),
      searchQuery.trim() && ilike(videos.title, `%${searchQuery}%`),
    ].filter(Boolean) as any[];

    const userVideos = await buildVideoWithUserQuery()
      .where(and(...conditions))
      .orderBy(
        sortFilter ? getOrderByClause(sortFilter) : desc(videos.createdAt)
      );

    return { user: userInfo, videos: userVideos, count: userVideos.length };
  }
);

export const updateVideoVisibility = withErrorHandling(
  async (videoId: string, visibility: Visibility) => {
    await validateWithArcjet(videoId);
    await db
      .update(videos)
      .set({ visibility, updatedAt: new Date() })
      .where(eq(videos.videoId, videoId));

    revalidatePaths(["/", `/video/${videoId}`]);
    return {};
  }
);

export const getVideoProcessingStatus = withErrorHandling(
  async (videoId: string) => {
    const [video] = await db
      .select({ assetId: videos.assetId })
      .from(videos)
      .where(eq(videos.id, videoId));

    if (!video?.assetId) {
      throw new Error("Video not found");
    }

    const asset = await mux.video.assets.retrieve(video.assetId);

    return {
      isProcessed: asset.status === "ready",
      encodingProgress: asset.progress || 0,
      status: asset.status,
    };
  }
);

export const deleteVideo = withErrorHandling(
  async (videoId: string) => {
    // Get asset ID from database
    const [video] = await db
      .select({ assetId: videos.assetId })
      .from(videos)
      .where(eq(videos.id, videoId));

    if (!video?.assetId) {
      throw new Error("Video not found");
    }

    // Delete from Mux
    await mux.video.assets.delete(video.assetId);

    // Delete from database
    await db.delete(videos).where(eq(videos.id, videoId));
    revalidatePaths(["/"]);
    return { success: true };
  }
);
