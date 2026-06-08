"use client"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatsCards } from "@/components/stats-cards"
import { SkillGapPanel } from "@/components/skill-gap-panel"
import { JobCard } from "@/components/job-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { SlidersHorizontal, RotateCcw, Sparkles, ChevronRight } from "lucide-react"
import type { Platform } from "@/types"
import { useState } from "react"

const platformOptions: { value: string; label: string }[] = [
  { value: "upwork", label: "Upwork" },
  { value: "weworkremotely", label: "We Work Remotely" },
  { value: "wellfound", label: "Wellfound" },
  { value: "remoteok", label: "Remote OK" },
  { value: "arcdev", label: "Arc.dev" },
  { value: "contra", label: "Contra" },
  { value: "gunio", label: "Gun.io" },
  { value: "toptal", label: "Toptal" },
]

const scoreOptions = [
  { value: "0", label: "All Scores" },
  { value: "80", label: "80%+ (High match)" },
  { value: "50", label: "50%+ (Medium+)" },
  { value: "0", label: "All" },
]

export default function DashboardPage() {
  const { jobMatches, filters, setFilters, resetFilters, sidebarOpen, skillGaps, stats } = useAppStore()
  const filteredJobs = useAppStore((s) => s.getFilteredJobs())
  const [showFilters, setShowFilters] = useState(false)

  const highMatchCount = jobMatches.filter((j) => j.matchScore >= 80).length
  const newTodayCount = jobMatches.filter(
    (j) => new Date(j.job.postedAt).toDateString() === new Date().toDateString()
  ).length

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className={cn(
        "pt-4 px-4 pb-8 transition-all duration-300",
        sidebarOpen ? "lg:ml-64" : "lg:ml-16"
      )}>
        {/* Welcome + Quick Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Good evening, Alex. You have <span className="font-medium text-foreground">{highMatchCount} high-match jobs</span> waiting.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <Button size="sm" className="gap-2">
              <Sparkles className="h-4 w-4" />
              AI Insights
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Job Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Matched Jobs</h2>
              <span className="text-xs text-muted-foreground">
                {filteredJobs.length} of {jobMatches.length} jobs
              </span>
            </div>

            {/* Inline Filters */}
            {showFilters && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-[150px]">
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Platform</label>
                      <Select
                        options={[{ value: "", label: "All Platforms" }, ...platformOptions]}
                        value={filters.platforms[0] || ""}
                        onChange={(e) => setFilters({ platforms: e.target.value ? [e.target.value as Platform] : [] })}
                      />
                    </div>
                    <div className="flex-1 min-w-[120px]">
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Min Score</label>
                      <Select
                        options={[
                          { value: "0", label: "All" },
                          { value: "80", label: "80%+" },
                          { value: "50", label: "50%+" },
                        ]}
                        value={String(filters.scoreMin)}
                        onChange={(e) => setFilters({ scoreMin: Number(e.target.value) })}
                      />
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="mt-5">
                      <RotateCcw className="h-3 w-3 mr-1" /> Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Job List */}
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No jobs match your current filters.</p>
                  <Button variant="link" onClick={resetFilters}>Reset filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredJobs.slice(0, 10).map((match) => (
                  <JobCard key={match.id} match={match} />
                ))}
                {filteredJobs.length > 10 && (
                  <div className="text-center pt-2">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View {filteredJobs.length - 10} more jobs <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Skill Gaps */}
            <SkillGapPanel />

            {/* Recent Notifications */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <CardDescription className="text-xs">Your latest notifications</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-3">
                {useAppStore.getState().notifications.slice(0, 3).map((notif) => (
                  <div key={notif.id} className="flex gap-2 text-xs">
                    <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${notif.read ? 'bg-muted-foreground/30' : 'bg-primary'}`} />
                    <div>
                      <p className={notif.read ? "text-muted-foreground" : "font-medium"}>{notif.title}</p>
                      <p className="text-muted-foreground mt-0.5">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Platform Health */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
                <CardDescription className="text-xs">Scraper status</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-2">
                {[
                  { platform: "upwork" as const, status: "active", label: "Upwork" },
                  { platform: "weworkremotely" as const, status: "active", label: "We Work Remotely" },
                  { platform: "wellfound" as const, status: "active", label: "Wellfound" },
                  { platform: "remoteok" as const, status: "active", label: "Remote OK" },
                  { platform: "arcdev" as const, status: "degraded", label: "Arc.dev" },
                  { platform: "contra" as const, status: "active", label: "Contra" },
                ].map((p) => (
                  <div key={p.platform} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{p.label}</span>
                    <span className={cn(
                      "flex items-center gap-1",
                      p.status === "active" ? "text-success" : "text-warning"
                    )}>
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        p.status === "active" ? "bg-success" : "bg-warning"
                      )} />
                      {p.status === "active" ? "Live" : "Degraded"}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}