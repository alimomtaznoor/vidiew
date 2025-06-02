"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"
import ImageWithFallback from "./ImageWithFallback"
import DropdownList from "./DropdownList"
import { updateURLParams } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Link from "next/link"

interface SharedHeaderProps {
  subHeader: string
  title: string
  userImg?: string
}

const SharedHeader = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get("filter") || "Most Recent")

  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "")
    setSelectedFilter(searchParams.get("filter") || "Most Recent")
  }, [searchParams])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery !== searchParams.get("query")) {
        const url = updateURLParams(searchParams, { query: searchQuery || null }, pathname)
        router.push(url)
      }
    }, 500)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, searchParams, pathname, router])

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
    const url = updateURLParams(searchParams, { filter: filter || null }, pathname)
    router.push(url)
  }

  const renderFilterTrigger = () => (
    <div className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg gap-3 hover:border-indigo-300 transition-colors">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">{selectedFilter}</span>
      </div>
    </div>
  )

  return (
    <header className="flex flex-col gap-9">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex gap-4 items-center">
          {userImg && (
            <ImageWithFallback
              src={userImg || "/placeholder.svg"}
              alt="user"
              width={66}
              height={66}
              className="rounded-full border-4 border-indigo-100"
            />
          )}
          <div>
            <p className="text-sm text-slate-500 font-medium">{subHeader}</p>
            <h1 className="text-3xl font-bold text-slate-900 capitalize">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/upload">
            <Button
              variant="outline"
              className="border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              <span>Upload a video</span>
            </Button>
          </Link>
          <DropdownList />
        </div>
      </section>
      <section className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
        <div className="relative max-w-[500px] w-full">
          <input
            type="text"
            placeholder="Search for videos, tags, folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-slate-200 py-2.5 pl-10 pr-5 text-slate-800 text-sm font-medium placeholder:text-slate-400 w-full rounded-lg focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
        <DropdownList
          options={["Most Recent", "Oldest", "Alphabetical"]}
          selectedOption={selectedFilter}
          onOptionSelect={handleFilterChange}
          triggerElement={renderFilterTrigger()}
        />
      </section>
    </header>
  )
}

export default SharedHeader
