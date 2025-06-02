"use client"
import Image from "next/image"
import type React from "react"

import ImageWithFallback from "./ImageWithFallback"
import Link from "next/link"
import { useState } from "react"
import { Eye, LinkIcon, Check } from "lucide-react"
// import type { VideoCardProps } from "./VideoCardProps" // Declare the VideoCardProps variable

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
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <Link
      href={`/video/${id}`}
      className="flex flex-col rounded-xl w-full border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 aspect-[16/9] relative bg-white overflow-hidden group"
    >
      <Image
        src={thumbnail || "/placeholder.svg"}
        width={290}
        height={160}
        alt="thumbnail"
        className="w-full rounded-t-xl object-cover h-[190px] group-hover:scale-105 transition-transform duration-500"
      />
      <div className="flex flex-col gap-3 px-4 pt-4 pb-5 rounded-b-xl">
        <div className="flex gap-2 justify-between">
          <div className="flex items-center gap-2">
            <ImageWithFallback
              src={userImg || "/placeholder.svg"}
              width={34}
              height={34}
              alt="avatar"
              className="rounded-full aspect-square border-2 border-indigo-100"
            />
            <div className="flex flex-col gap-0.5">
              <h3 className="text-xs font-semibold text-slate-900">{username}</h3>
              <p className="text-xs text-slate-500 font-normal capitalize">{visibility}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-normal">{views}</span>
          </div>
        </div>

        <h2 className="text-base text-slate-800 font-semibold truncate">
          {title} -{" "}
          {createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h2>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 shadow-md hover:shadow-lg transition duration-200 bg-white/90 hover:bg-white rounded-full size-8 flex items-center justify-center"
      >
        {copied ? <Check className="h-4 w-4 text-indigo-600" /> : <LinkIcon className="h-4 w-4 text-slate-600" />}
      </button>
      {duration && (
        <div className="absolute top-40 right-2 bg-slate-900/80 font-medium text-white text-xs px-2.5 py-1 rounded-full">
          {Math.ceil(duration / 60)}min
        </div>
      )}
    </Link>
  )
}

export default VideoCard
