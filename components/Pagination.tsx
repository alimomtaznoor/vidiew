"use client"
import { cn, generatePagination, updateURLParams } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

type PaginationProps = {
  currentPage?: number
  totalPages?: number
  queryString?: string
  filterString?: string
}

const Pagination = ({ currentPage = 1, totalPages = 10, queryString = "", filterString = "" }: PaginationProps) => {
  const pages = generatePagination(currentPage, totalPages)
  const router = useRouter()
  const searchParams = useSearchParams()

  const createPageUrl = (pageNumber: number) => {
    return updateURLParams(
      searchParams,
      {
        page: pageNumber.toString(),
        query: queryString?.trim() || null,
        filter: filterString || null,
      },
      "/",
    )
  }

  const navigateToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return
    router.push(createPageUrl(pageNumber))
  }

  return (
    <section className="flex justify-between items-center py-5 gap-5 border-t border-slate-200">
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium transition-colors",
          {
            "opacity-50 cursor-not-allowed": currentPage === 1,
            "hover:bg-slate-50": currentPage !== 1,
          },
        )}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="text-slate-400 px-2">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => navigateToPage(page as number)}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                {
                  "bg-indigo-600 text-white": currentPage === page,
                  "text-slate-600 hover:bg-indigo-50": currentPage !== page,
                },
              )}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium transition-colors",
          {
            "opacity-50 cursor-not-allowed": currentPage === totalPages,
            "hover:bg-slate-50": currentPage !== totalPages,
          },
        )}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </section>
  )
}

export default Pagination
