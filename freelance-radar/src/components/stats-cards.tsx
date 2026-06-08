"use client"

import { useAppStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, TrendingUp, Target, Building2 } from "lucide-react"
import { PlatformBadge } from "@/components/platform-badge"

export function StatsCards() {
  const { stats } = useAppStore()

  const cards = [
    {
      label: "New Jobs Today",
      value: stats.totalNewJobsToday,
      icon: Briefcase,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Applied This Week",
      value: stats.jobsAppliedThisWeek,
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Avg Match Score",
      value: `${stats.averageMatchScore}%`,
      icon: Target,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Top Platform",
      value: null as null,
      platform: stats.topPlatform,
      icon: Building2,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              {card.value !== null ? (
                <p className="text-xl font-bold">{card.value}</p>
              ) : card.platform ? (
                <div className="mt-1">
                  <PlatformBadge platform={card.platform} />
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}