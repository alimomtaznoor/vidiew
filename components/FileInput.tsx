"use client"

import Image from "next/image"
import { Upload, X } from "lucide-react"
import type { FileInputProps } from "./FileInputProps" // Declare the FileInputProps variable

const FileInput = ({ id, label, accept, file, previewUrl, inputRef, onChange, onReset, type }: FileInputProps) => (
  <section className="flex flex-col gap-2">
    <label htmlFor={id} className="text-slate-600 text-base font-medium">
      {label}
    </label>
    <input type="file" id={id} accept={accept} hidden ref={inputRef} onChange={onChange} />

    {!previewUrl ? (
      <figure
        onClick={() => inputRef.current?.click()}
        className="border border-slate-200 rounded-xl text-slate-500 py-1.5 px-3.5 flex flex-col justify-center items-center w-full h-40 gap-2.5 cursor-pointer hover:border-indigo-300 transition-colors"
      >
        <Upload className="h-8 w-8 text-indigo-500" />
        <p className="text-slate-700 text-base font-medium">Click to upload your {id}</p>
      </figure>
    ) : (
      <div className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-200">
        {type === "video" ? (
          <video src={previewUrl} controls className="w-full h-full object-contain" />
        ) : (
          <Image src={previewUrl || "/placeholder.svg"} alt={`Selected ${id}`} fill className="object-contain" />
        )}
        <button
          type="button"
          onClick={onReset}
          className="absolute top-2 right-2 bg-slate-800/70 text-white p-2 rounded-full opacity-90 hover:opacity-100 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="absolute bottom-0 left-0 right-0 bg-slate-800 text-white px-3 py-1 text-sm truncate">
          {file?.name}
        </p>
      </div>
    )}
  </section>
)

export default FileInput
