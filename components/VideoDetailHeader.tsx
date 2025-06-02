"use client"
import { daysAgo } from "@/lib/utils"
import { deleteVideo, updateVideoVisibility } from "@/lib/actions/video"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { visibilities } from "@/constants"
import DropdownList from "./DropdownList"
import ImageWithFallback from "./ImageWithFallback"
import { Button } from "@/components/ui/button"
import { Eye, LinkIcon, Check, Trash2 } from "lucide-react"
import type { VideoDetailHeaderProps, Visibility } from "@/types" // Import VideoDetailHeaderProps and Visibility

const VideoDetailHeader = ({
  title,
  createdAt,
  userImg,
  username,
  videoId,
  ownerId,
  visibility,
  thumbnailUrl,
}: VideoDetailHeaderProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [visibilityState, setVisibilityState] = useState<Visibility>(visibility as Visibility)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const userId = session?.user.id
  const isOwner = userId === ownerId

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteVideo(videoId, thumbnailUrl)
      router.push("/")
    } catch (error) {
      console.error("Error deleting video:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleVisibilityChange = async (option: string) => {
    if (option !== visibilityState) {
      setIsUpdating(true)
      try {
        await updateVideoVisibility(videoId, option as Visibility)
        setVisibilityState(option as Visibility)
      } catch (error) {
        console.error("Error updating visibility:", error)
      } finally {
        setIsUpdating(false)
      }
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video/${videoId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const TriggerVisibility = (
    <div className="flex items-center gap-2 justify-between border border-slate-200 rounded-lg py-2.5 px-4 hover:border-indigo-300 transition-colors">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-slate-500" />
        <p className="text-sm font-medium text-slate-700 capitalize">{visibilityState}</p>
      </div>
    </div>
  )

  return (
    <header className="flex justify-between gap-5 flex-col md:flex-row">
      <div className="flex flex-col gap-2.5">
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <div className="gap-1 flex items-center">
          <button
            onClick={() => router.push(`/profile/${ownerId}`)}
            className="flex items-center gap-2 text-slate-500 text-sm font-medium hover:text-indigo-600 transition-colors"
          >
            <ImageWithFallback
              src={userImg ?? ""}
              alt="User"
              width={24}
              height={24}
              className="rounded-full border border-indigo-100"
            />
            <h2>{username ?? "Guest"}</h2>
          </button>
          <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
            <span className="mt-1">・</span>
            <p>{daysAgo(createdAt)}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="ghost" size="sm" onClick={copyLink} className="text-slate-600 hover:text-indigo-600">
          {copied ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
        </Button>
        {isOwner && (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="border-slate-200 text-red-500 hover:text-red-600 hover:border-red-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete video"}
            </Button>
            {isUpdating ? (
              <div className="border border-slate-200 rounded-lg py-2.5 px-4">
                <p className="text-sm font-medium text-slate-700">Updating...</p>
              </div>
            ) : (
              <DropdownList
                options={visibilities}
                selectedOption={visibilityState}
                onOptionSelect={handleVisibilityChange}
                triggerElement={TriggerVisibility}
              />
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default VideoDetailHeader
