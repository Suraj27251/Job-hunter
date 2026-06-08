"use client"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlatformBadge } from "@/components/platform-badge"
import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/types"
import { Inbox, Send, PhoneCall, Award, XCircle, Archive, Plus } from "lucide-react"

const columns: { status: ApplicationStatus; label: string; color: string; icon: typeof Inbox }[] = [
  { status: "saved", label: "Saved", color: "border-t-blue-500", icon: Inbox },
  { status: "applied", label: "Applied", color: "border-t-yellow-500", icon: Send },
  { status: "interview", label: "Interview", color: "border-t-purple-500", icon: PhoneCall },
  { status: "offer", label: "Offer", color: "border-t-success", icon: Award },
  { status: "rejected", label: "Rejected", color: "border-t-destructive", icon: XCircle },
  { status: "withdrawn", label: "Withdrawn", color: "border-t-muted-foreground", icon: Archive },
]

export default function TrackerPage() {
  const { applications, sidebarOpen, jobMatches } = useAppStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className={cn("pt-4 px-4 pb-8 transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-16")}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Application Tracker</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Drag & drop to update status. Follow up with reminders.
          </p>
        </div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Inbox className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium mb-1">No applications yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start by saving jobs from your feed and tracking them here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto">
            {columns.map((col) => {
              const items = applications.filter((a) => a.status === col.status)
              const Icon = col.icon
              return (
                <div key={col.status} className="flex flex-col min-w-[220px]">
                  <div className={cn("flex items-center justify-between px-3 py-2 border-t-2 bg-card rounded-t-lg", col.color)}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{col.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
                  </div>
                  <div className="flex-1 bg-muted/30 border-x border-b rounded-b-lg p-2 space-y-2 min-h-[200px]">
                    {items.length === 0 ? (
                      <div className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">Drop jobs here</p>
                      </div>
                    ) : (
                      items.map((app) => (
                        <Card key={app.id} className="cursor-grab active:cursor-grabbing">
                          <CardContent className="p-3 space-y-1.5">
                            <p className="text-xs font-medium line-clamp-2">{app.job.title}</p>
                            <div className="flex items-center justify-between">
                              <PlatformBadge platform={app.job.platform} />
                              {app.appliedAt && (
                                <span className="text-[10px] text-muted-foreground">
                                  {new Date(app.appliedAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            {app.notes && (
                              <p className="text-[10px] text-muted-foreground line-clamp-1 italic">{app.notes}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}