"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, LinkIcon, Check } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

const VideoCard = ({
  id,
  title,
  thumbnail,
  userImg,
  username,
  createdAt,
  views,
  visibility,
  duration,
}: VideoCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Link
      href={`/video/${id}`}
      className="flex flex-col rounded-xl w-full max-w-sm border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 bg-white overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-48">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt="thumbnail"
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {/* Duration badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-slate-900/80 font-medium text-white text-xs px-2.5 py-1 rounded-full">
            {Math.ceil(duration / 60)} min
          </div>
        )}
        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 shadow-md hover:shadow-lg transition duration-200 bg-white/90 hover:bg-white rounded-full size-8 flex items-center justify-center"
        >
          {copied ? (
            <Check className="h-4 w-4 text-indigo-600" />
          ) : (
            <LinkIcon className="h-4 w-4 text-slate-600" />
          )}
        </button>
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-3 px-4 pt-4 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageWithFallback
              src={userImg || "/placeholder.svg"}
              width={34}
              height={34}
              alt="avatar"
              className="rounded-full border-2 border-indigo-100"
            />
            <div className="flex flex-col">
              <h3 className="text-xs font-semibold text-slate-900">
                {username}
              </h3>
              <p className="text-xs text-slate-500 capitalize">{visibility}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div>
        </div>

        <h2 className="text-sm sm:text-base text-slate-800 font-semibold line-clamp-2">
          {title} –{" "}
          {createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h2>
      </div>
    </Link>
  );
};

export default VideoCard;
