"use client"

import { cn } from "@/lib/utils"
import type { Platform } from "@/types"

const platformConfig: Record<Platform, { label: string; color: string }> = {
  upwork: { label: "Upwork", color: "bg-green-500/15 text-green-600 dark:text-green-400" },
  weworkremotely: { label: "We Work Remotely", color: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  wellfound: { label: "Wellfound", color: "bg-purple-500/15 text-purple-600 dark:text-purple-400" },
  remoteok: { label: "Remote OK", color: "bg-orange-500/15 text-orange-600 dark:text-orange-400" },
  fiverr: { label: "Fiverr Pro", color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  contra: { label: "Contra", color: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400" },
  gunio: { label: "Gun.io", color: "bg-red-500/15 text-red-600 dark:text-red-400" },
  arcdev: { label: "Arc.dev", color: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400" },
  yunojuno: { label: "YunoJuno", color: "bg-pink-500/15 text-pink-600 dark:text-pink-400" },
  braintrust: { label: "Braintrust", color: "bg-teal-500/15 text-teal-600 dark:text-teal-400" },
  toptal: { label: "Toptal", color: "bg-slate-500/15 text-slate-600 dark:text-slate-400" },
}

interface PlatformBadgeProps {
  platform: Platform
  className?: string
}

export function PlatformBadge({ platform, className }: PlatformBadgeProps) {
  const config = platformConfig[platform]
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", config.color, className)}>
      {config.label}
    </span>
  )
}