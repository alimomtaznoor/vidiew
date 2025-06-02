"use client"

import { cn, createIframeLink } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { incrementVideoViews, getVideoProcessingStatus } from "@/lib/actions/video"
import { initialVideoState } from "@/constants"
import type { VideoPlayerProps } from "@/types" // Declare the VideoPlayerProps variable

const VideoPlayer = ({ videoId, className }: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [state, setState] = useState(initialVideoState)

  useEffect(() => {
    const checkProcessingStatus = async () => {
      const status = await getVideoProcessingStatus(videoId)
      setState((prev) => ({
        ...prev,
        isProcessing: !status.isProcessed,
      }))

      return status.isProcessed
    }

    checkProcessingStatus()

    const intervalId = setInterval(async () => {
      const isProcessed = await checkProcessingStatus()
      if (isProcessed) {
        clearInterval(intervalId)
      }
    }, 3000)
    return () => {
      clearInterval(intervalId)
    }
  }, [videoId])

  useEffect(() => {
    if (state.isLoaded && !state.hasIncrementedView && !state.isProcessing) {
      const incrementView = async () => {
        try {
          await incrementVideoViews(videoId)
          setState((prev) => ({ ...prev, hasIncrementedView: true }))
        } catch (error) {
          console.error("Failed to increment view count:", error)
        }
      }

      incrementView()
    }
  }, [videoId, state.isLoaded, state.hasIncrementedView, state.isProcessing])

  return (
    <div
      className={cn(
        "relative aspect-video w-full rounded-xl bg-slate-900 flex-none overflow-hidden shadow-lg",
        className,
      )}
    >
      {state.isProcessing ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 rounded-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-semibold">Processing video...</p>
          </div>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src={createIframeLink(videoId)}
          loading="lazy"
          title="Video player"
          style={{ border: 0, zIndex: 50 }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-xl"
          onLoad={() => setState((prev) => ({ ...prev, isLoaded: true }))}
        />
      )}
    </div>
  )
}

export default VideoPlayer
