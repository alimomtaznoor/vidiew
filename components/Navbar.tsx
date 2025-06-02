"use client"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { Video, LogOut } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import ImageWithFallback from "./ImageWithFallback"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <header className="relative z-10 px-4 lg:px-6 h-20 flex items-center border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <nav className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Video className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Vidiew
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <button onClick={() => router.push(`/profile/${session?.user.id}`)} className="flex items-center gap-2">
              <ImageWithFallback
                src={session?.user.image ?? ""}
                alt="User"
                width={36}
                height={36}
                className="rounded-full aspect-square border-2 border-indigo-100"
              />
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                return await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      redirect("/sign-in")
                    },
                  },
                })
              }}
              className="text-slate-600 hover:text-indigo-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
