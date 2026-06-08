"use client"

import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3 } from "lucide-react"

export function SkillGapPanel() {
  const { skillGaps } = useAppStore()

  const maxJobs = Math.max(...skillGaps.map((g) => g.additionalJobs), 1)

  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-medium">Skill Gaps</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          These skills would unlock more high-paying jobs
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        {skillGaps.map((gap) => (
          <div key={gap.skill} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {gap.skill}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">+{gap.additionalJobs} jobs</span>
                <span className="text-success font-medium">{gap.avgRateIncrease}</span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted-foreground/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(gap.additionalJobs / maxJobs) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}