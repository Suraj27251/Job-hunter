"use client"

import { cn, timeAgo, getMatchColor } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { PlatformBadge } from "@/components/platform-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark, ExternalLink, FileText, Send, ChevronDown, ChevronUp } from "lucide-react"
import type { JobMatch } from "@/types"
import { useState } from "react"

interface JobCardProps {
  match: JobMatch
}

export function JobCard({ match }: JobCardProps) {
  const { job, matchScore, missingSkills, skillOverlap, matchBreakdown } = match
  const { addApplication } = useAppStore()
  const [expanded, setExpanded] = useState(false)
  const scoreColor = getMatchColor(matchScore)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {/* Main Row */}
        <div className="flex items-start gap-4 p-4">
          {/* Score Circle */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <div className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold border-2",
              scoreColor === "high" && "border-success text-success",
              scoreColor === "medium" && "border-warning text-warning",
              scoreColor === "low" && "border-destructive text-destructive/70",
            )}>
              {matchScore}%
            </div>
            <span className="text-[10px] text-muted-foreground">Match</span>
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-1">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <PlatformBadge platform={job.platform} />
                  <span className="text-xs text-muted-foreground">
                    ${job.budgetMin}–${job.budgetMax}/hr
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground capitalize">{job.experienceLevel}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{timeAgo(job.postedAt)}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {job.requiredSkills.slice(0, 5).map((skill) => {
                const isMatch = skillOverlap.includes(skill)
                return (
                  <Badge
                    key={skill}
                    variant={isMatch ? "success" : "outline"}
                    className="text-[10px] px-1.5 py-0"
                  >
                    {skill}
                    {isMatch && " ✓"}
                  </Badge>
                )
              })}
              {job.requiredSkills.length > 5 && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  +{job.requiredSkills.length - 5}
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex flex-col gap-1.5">
            <Button size="sm" variant="default" className="h-8 text-xs gap-1">
              <Send className="h-3 w-3" /> Apply
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
              <FileText className="h-3 w-3" /> Proposal
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Expand/Collapse Match Details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 border-t py-1.5 text-xs text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          {expanded ? (
            <>Hide match breakdown <ChevronUp className="h-3 w-3" /></>
          ) : (
            <>Show match breakdown <ChevronDown className="h-3 w-3" /></>
          )}
        </button>

        {/* Expanded Match Details */}
        {expanded && (
          <div className="border-t px-4 py-3 space-y-3 bg-muted/30">
            {/* Score Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Match Score Breakdown</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Skill Overlap", value: matchBreakdown.skillOverlap, max: 40 },
                  { label: "Experience Level", value: matchBreakdown.experienceLevel, max: 20 },
                  { label: "Rate Compatibility", value: matchBreakdown.rateCompatibility, max: 15 },
                  { label: "Job Type", value: matchBreakdown.jobTypePreference, max: 10 },
                  { label: "Platform", value: matchBreakdown.platformPreference, max: 5 },
                  { label: "Timezone", value: matchBreakdown.timezoneCompatibility, max: 10 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}/{item.max}</span>
                      </div>
                      <div className="mt-0.5 h-1.5 w-full rounded-full bg-muted-foreground/20 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            item.value / item.max >= 0.7 ? "bg-success" : item.value / item.max >= 0.4 ? "bg-warning" : "bg-destructive"
                          )}
                          style={{ width: `${(item.value / item.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            {missingSkills.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-destructive mb-1.5">
                  Missing skills that could improve your match:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {missingSkills.map((skill) => (
                    <Badge key={skill} variant="destructive" className="text-[10px] px-1.5 py-0">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* AI Explanation */}
            <div className="rounded-md bg-primary/5 border border-primary/10 p-2.5">
              <p className="text-xs text-muted-foreground italic">
                {matchScore >= 80
                  ? `Strong match! Your ${skillOverlap.slice(0, 2).join(" and ")} skills align well with this role.`
                  : matchScore >= 50
                  ? `Decent match. Your ${skillOverlap[0] || "skills"} are relevant, but ${missingSkills[0] || "experience level"} could be improved.`
                  : `This role may require skills you haven't added yet. Consider updating your profile with ${missingSkills[0] || "relevant experience"}.`
                }
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs gap-1">
                <ExternalLink className="h-3 w-3" /> View Original
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="text-xs gap-1"
                onClick={() => addApplication(job.id, "saved")}
              >
                <Bookmark className="h-3 w-3" /> Save Job
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}