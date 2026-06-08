import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FreelanceRadar - Find smarter, apply faster, win more",
  description: "AI-powered freelance job aggregation and matching platform. Aggregate jobs from 10+ platforms, get AI-matched scores, generate proposals, and track applications.",
  keywords: ["freelance", "remote jobs", "AI matching", "job aggregation", "freelance platform"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}