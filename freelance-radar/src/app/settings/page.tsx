"use client"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { User, Shield, Bell, CreditCard, Palette, Key, Trash2 } from "lucide-react"

const sections = [
  { label: "Profile", icon: User, active: true },
  { label: "Security", icon: Shield },
  { label: "Notifications", icon: Bell },
  { label: "Subscription", icon: CreditCard },
  { label: "Appearance", icon: Palette },
  { label: "API Keys", icon: Key },
]

export default function SettingsPage() {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className={cn("pt-4 px-4 pb-8 transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-16")}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Side nav */}
          <div className="w-full lg:w-48 space-y-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.label}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-left",
                    section.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              )
            })}
          </div>

          {/* Main Settings Area */}
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input defaultValue="Alex Chen" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue="alex@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Plan</label>
                    <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                      <span className="text-sm">Pro Plan</span>
                      <Badge variant="success" className="text-[10px]">Active</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Rate</label>
                    <Input defaultValue="$80/hr" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills & Expertise</CardTitle>
                <CardDescription>Manage your skills for better job matching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "GraphQL", "Docker", "AWS"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button className="ml-1 text-muted-foreground hover:text-foreground">×</button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add a skill..." className="max-w-xs" />
                  <Button variant="outline">Add</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Delete Account</p>
                    <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm" className="gap-1">
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}