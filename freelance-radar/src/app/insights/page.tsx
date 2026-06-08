"use client"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BarChart3, TrendingUp, Lightbulb, Target, ArrowUpRight, BookOpen } from "lucide-react"

export default function InsightsPage() {
  const { sidebarOpen, skillGaps, stats } = useAppStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className={cn("pt-4 px-4 pb-8 transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-16")}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Career Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered insights to optimize your freelance career
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Insights */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Report */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Weekly Career Report</CardTitle>
                </div>
                <CardDescription>Your personalized insights for this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <TrendingUp className="h-4 w-4" />
                      Hottest Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {["React", "TypeScript", "Next.js", "AWS", "Python"].map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-success/5 border border-success/10 p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Target className="h-4 w-4" />
                      Best Platform This Week
                    </div>
                    <p className="text-lg font-bold text-success mt-1">Arc.dev</p>
                    <p className="text-xs text-muted-foreground">85% of React jobs matching your profile</p>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Lightbulb className="h-4 w-4 text-warning" />
                    Profile Tip
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Freelancers with <strong>Docker</strong> in their profile earn <strong className="text-success">32% more</strong> in your niche. 
                    Consider adding it to unlock 47 more jobs.
                  </p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Optimal Posting Time
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Most jobs in your category are posted <strong>Monday–Wednesday</strong>. 
                    Check the feed early in the week for the best opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skill Gap Analysis */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Skill Gap Analysis</CardTitle>
                </div>
                <CardDescription>Skills that would boost your earning potential</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillGaps.map((gap) => (
                    <div key={gap.skill} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium text-sm">{gap.skill}</p>
                        <p className="text-xs text-muted-foreground">Unlocks {gap.additionalJobs} more jobs</p>
                      </div>
                      <Badge variant="success" className="text-xs">{gap.avgRateIncrease}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Platform Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { platform: "Arc.dev", jobs: 42, match: 78 },
                  { platform: "Upwork", jobs: 38, match: 65 },
                  { platform: "Toptal", jobs: 28, match: 72 },
                  { platform: "Remote OK", jobs: 25, match: 55 },
                  { platform: "Wellfound", jobs: 18, match: 60 },
                ].map((p) => (
                  <div key={p.platform} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{p.platform}</span>
                      <span className="text-muted-foreground">{p.jobs} jobs · {p.match}% match</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted-foreground/10 overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${p.match}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Budget Trends</CardTitle>
                <CardDescription className="text-xs">Rate trends in your niche</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4">
                  <p className="text-3xl font-bold text-success">+12%</p>
                  <p className="text-xs text-muted-foreground mt-1">Average rate increase this month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}