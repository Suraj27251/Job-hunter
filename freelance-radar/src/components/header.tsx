"use client"

import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Moon, Sun, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const { toggleSidebar, toggleTheme, theme, notifications, sidebarOpen, setFilters, filters } = useAppStore()
  const unreadCount = useAppStore((s) => s.getUnreadCount())

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4",
      sidebarOpen ? "lg:ml-64" : "lg:ml-16"
    )}>
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs, skills, platforms..."
            className="pl-9"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ searchQuery: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}