"use client"
import { cn, parseTranscript } from "@/lib/utils"
import { useState } from "react"
import EmptyState from "./EmptyState"
import { infos } from "@/constants"
import type { VideoInfoProps } from "@/types" // Declare the VideoInfoProps type

const VideoInfo = ({ transcript, createdAt, description, videoId, videoUrl, title }: VideoInfoProps) => {
  const [info, setInfo] = useState("transcript")
  const parsedTranscript = parseTranscript(transcript || "")

  const renderTranscript = () => (
    <ul className="flex flex-col gap-4">
      {parsedTranscript.length > 0 ? (
        parsedTranscript.map((item, index) => (
          <li key={index} className="flex gap-3">
            <h2 className="text-sm font-bold text-indigo-600">[{item.time}]</h2>
            <p className="text-sm font-medium text-slate-600">{item.text}</p>
          </li>
        ))
      ) : (
        <EmptyState
          icon="/assets/icons/copy.svg"
          title="No transcript available"
          description="This video doesn't include any transcribed content!"
        />
      )}
    </ul>
  )

  const metaDatas = [
    {
      label: "Video title",
      value: `${title} - ${new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`,
    },
    {
      label: "Video description",
      value: description,
    },
    {
      label: "Video id",
      value: videoId,
    },
    {
      label: "Video url",
      value: videoUrl,
    },
  ]

  const renderMetadata = () => (
    <div className="flex flex-col gap-6">
      {metaDatas.map(({ label, value }, index) => (
        <article key={index} className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-slate-500">{label}</h2>
          <p
            className={cn("text-lg font-semibold text-slate-800", {
              "text-indigo-600 truncate": label === "Video url",
            })}
          >
            {value}
          </p>
        </article>
      ))}
    </div>
  )

  return (
    <section className="flex flex-col gap-6 lg:max-w-[350px] xl:max-w-[410px] w-full">
      <nav className="flex gap-6 items-center border-b border-slate-200">
        {infos.map((item) => (
          <button
            key={item}
            className={cn("capitalize text-sm font-semibold pb-4 hover:text-indigo-600 transition-all duration-300", {
              "text-indigo-600 border-b-2 border-indigo-600": info === item,
              "text-slate-500": info !== item,
            })}
            onClick={() => setInfo(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      {info === "transcript" ? renderTranscript() : renderMetadata()}
    </section>
  )
}

export default VideoInfo
