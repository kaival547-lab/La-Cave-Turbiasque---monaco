import type React from "react"
import type { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import FloatingBookingButton from "@/components/floating-booking-button"
import { Providers } from "./providers"

import {
  Dancing_Script as V0_Font_Dancing_Script,
  Geist_Mono as V0_Font_Geist_Mono,
  Arvo as V0_Font_Arvo,
} from "next/font/google"

// Initialize fonts
const _dancingScript = V0_Font_Dancing_Script({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _geistMono = V0_Font_Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
const _arvo = V0_Font_Arvo({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "La Cave Turbiasque - Premium Italian-French Bistro",
  description:
    "Experience authentic Italian-French cuisine at La Cave Turbiasque. Fine dining, exceptional wines, and memorable moments.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: ["/icon.svg"],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#5C3D2E",
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="opacity-100 leading-7" lang="en">
      <body className={`font-serif antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingBookingButton />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
