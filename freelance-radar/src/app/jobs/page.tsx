"use client"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { JobCard } from "@/components/job-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Search, SlidersHorizontal, RotateCcw, Filter } from "lucide-react"
import type { Platform } from "@/types"
import { useState } from "react"

const platformOptions = [
  { value: "", label: "All Platforms" },
  { value: "upwork", label: "Upwork" },
  { value: "weworkremotely", label: "We Work Remotely" },
  { value: "wellfound", label: "Wellfound" },
  { value: "remoteok", label: "Remote OK" },
  { value: "arcdev", label: "Arc.dev" },
  { value: "contra", label: "Contra" },
  { value: "gunio", label: "Gun.io" },
  { value: "toptal", label: "Toptal" },
]

export default function JobsPage() {
  const { jobMatches, sidebarOpen, filters, setFilters, resetFilters } = useAppStore()
  const filteredJobs = useAppStore((s) => s.getFilteredJobs())
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className={cn("pt-4 px-4 pb-8 transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-16")}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Job Feed</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse all matched jobs from {jobMatches.length > 0 ? [...new Set(jobMatches.map(j => j.job.platform))].length : 0} platforms
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title or skill..."
              className="pl-9"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ searchQuery: e.target.value })}
            />
          </div>
          <Select
            options={platformOptions}
            value={filters.platforms[0] || ""}
            onChange={(e) => setFilters({ platforms: e.target.value ? [e.target.value as Platform] : [] })}
            className="w-full sm:w-40"
          />
          <Button variant="outline" size="icon" onClick={() => setShowAdvanced(!showAdvanced)}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={resetFilters}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{filteredJobs.length} jobs found</span>
            <Select
              options={[
                { value: "score", label: "Sort by Match Score" },
                { value: "date", label: "Sort by Date" },
                { value: "rate", label: "Sort by Rate" },
              ]}
              className="w-44"
            />
          </div>

          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No jobs match your search criteria.</p>
                <Button variant="link" onClick={resetFilters}>Clear all filters</Button>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((match) => <JobCard key={match.id} match={match} />)
          )}
        </div>
      </main>
    </div>
  )
}