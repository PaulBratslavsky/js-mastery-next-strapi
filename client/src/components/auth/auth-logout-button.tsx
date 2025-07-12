"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function AuthLogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Call the logout API route
      await fetch("/api/logout")
      // Refresh the page to reflect the logged out state
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <button onClick={handleLogout} className="flex items-center gap-2" aria-label="Log out">
      <LogOut className="w-6 h-6" />
    </button>
  )
}