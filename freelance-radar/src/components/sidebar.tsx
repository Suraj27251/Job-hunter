"use client"

import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Briefcase,
  KanbanSquare,
  FileText,
  Bell,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Job Feed", icon: Briefcase },
  { href: "/tracker", label: "Application Tracker", icon: KanbanSquare },
  { href: "/proposals", label: "Proposals", icon: FileText },
  { href: "/insights", label: "Insights", icon: BarChart3 },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-card transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className={cn("flex h-14 items-center border-b px-4", sidebarOpen ? "justify-between" : "justify-center")}>
        {sidebarOpen ? (
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>FreelanceRadar</span>
          </Link>
        ) : (
          <Sparkles className="h-5 w-5 text-primary" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 shrink-0"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                !sidebarOpen && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      {sidebarOpen && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Alex Chen</p>
              <p className="text-xs text-muted-foreground">Pro Plan</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}