"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useScreenRecording } from "@/lib/hooks/useScreenRecording"
import { Button } from "@/components/ui/button"
import { Video, X, Upload } from "lucide-react"

const RecordScreen = () => {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const {
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording()

  const closeModal = () => {
    resetRecording()
    setIsOpen(false)
  }

  const handleStart = async () => {
    await startRecording()
  }

  const recordAgain = async () => {
    resetRecording()
    await startRecording()
    if (recordedVideoUrl && videoRef.current) videoRef.current.src = recordedVideoUrl
  }

  const goToUpload = () => {
    if (!recordedBlob) return
    const url = URL.createObjectURL(recordedBlob)
    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0, // Store the duration with the video data
      }),
    )
    router.push("/upload")
    closeModal()
  }

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white border-0 h-10 font-semibold shadow-md"
      >
        <Video className="w-4 h-4 mr-2" />
        <span className="truncate">Record a video</span>
      </Button>

      {isOpen && (
        <section className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl p-6 shadow-2xl w-full max-w-lg z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Screen Recording</h3>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>

            <div className="w-full rounded-xl overflow-hidden bg-slate-100 min-h-[240px] flex items-center justify-center">
              {isRecording ? (
                <div className="text-center space-y-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mx-auto"></div>
                  <span className="text-slate-700 text-base font-medium">Recording in progress...</span>
                </div>
              ) : recordedVideoUrl ? (
                <video ref={videoRef} src={recordedVideoUrl} controls className="w-full h-full object-contain" />
              ) : (
                <p className="text-base font-medium text-slate-500 p-8 text-center">
                  Click record to start capturing your screen
                </p>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              {!isRecording && !recordedVideoUrl && (
                <Button onClick={handleStart} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
                  <Video className="w-4 h-4 mr-2" />
                  Record
                </Button>
              )}
              {isRecording && (
                <Button onClick={stopRecording} variant="destructive" className="px-6">
                  <span className="w-2 h-2 bg-white rounded-sm mr-2"></span>
                  Stop Recording
                </Button>
              )}
              {recordedVideoUrl && (
                <>
                  <Button onClick={recordAgain} variant="outline" className="px-6">
                    Record Again
                  </Button>
                  <Button onClick={goToUpload} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
                    <Upload className="w-4 h-4 mr-2" />
                    Continue to Upload
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default RecordScreen
