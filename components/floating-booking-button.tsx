"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingBookingButton() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/auth")) {
    return null
  }

  return (
    <Link href="/reservations" className="fixed bottom-8 right-8 z-50 group">
      <Button
        size="lg"
        className="shadow-2xl hover:shadow-3xl transition-all duration-300 px-6 py-6 bg-primary hover:bg-primary/90 text-white group-hover:scale-110 rounded-2xl"
      >
        <Calendar className="w-5 h-5 mr-2" />
        <span className="font-bold">Book a Table</span>
      </Button>
    </Link>
  )
}
