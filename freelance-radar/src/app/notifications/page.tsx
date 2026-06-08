"use client"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn, timeAgo } from "@/lib/utils"
import { Bell, CheckCheck, Settings } from "lucide-react"

export default function NotificationsPage() {
  const { sidebarOpen, notifications, markNotificationRead } = useAppStore()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className={cn("pt-4 px-4 pb-8 transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-16")}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "No unread notifications"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <CheckCheck className="h-4 w-4" /> Mark all read
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium mb-1">No notifications</h3>
                <p className="text-sm text-muted-foreground">You are all caught up!</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notif) => (
              <Card
                key={notif.id}
                className={cn(
                  "cursor-pointer hover:bg-muted/50 transition-colors",
                  !notif.read && "border-l-2 border-l-primary"
                )}
                onClick={() => markNotificationRead(notif.id)}
              >
                <CardContent className="flex items-start gap-3 p-4">
                  <div className={cn(
                    "mt-1 h-2 w-2 rounded-full shrink-0",
                    notif.read ? "bg-muted-foreground/20" : "bg-primary"
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-sm", !notif.read && "font-medium")}>{notif.title}</p>
                      <span className="text-xs text-muted-foreground shrink-0">{timeAgo(notif.createdAt)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                    <Badge variant="secondary" className="text-[10px] mt-1">{notif.type.replace("_", " ")}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}