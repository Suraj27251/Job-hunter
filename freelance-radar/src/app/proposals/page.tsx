"use client"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FileText, Sparkles, Plus, History } from "lucide-react"

export default function ProposalsPage() {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className={cn("pt-4 px-4 pb-8 transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-16")}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">AI Proposals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Generate tailored cover letters and proposals with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Generate New Proposal</CardTitle>
              </div>
              <CardDescription>
                Select a job and instantly generate a tailored proposal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border-2 border-dashed p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Sparkles className="h-8 w-8 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium mb-1">Generate from a matched job</p>
                <p className="text-xs text-muted-foreground">
                  Pick a job from your feed and let AI write your proposal
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tone Preference</label>
                <div className="flex gap-2">
                  {["Professional", "Conversational", "Technical"].map((tone) => (
                    <Button key={tone} variant="outline" size="sm" className="flex-1">
                      {tone}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Length</label>
                <div className="flex gap-2">
                  {[["Short", "150 words"], ["Medium", "300 words"], ["Detailed", "500 words"]].map(([label, desc]) => (
                    <Button key={label} variant="outline" size="sm" className="flex-1 flex-col h-auto py-2">
                      <span>{label}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">{desc}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full gap-2">
                <Sparkles className="h-4 w-4" /> Generate Proposal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Proposal History</CardTitle>
              </div>
              <CardDescription>
                Your recently generated proposals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <FileText className="h-8 w-8 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No proposals generated yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Generate your first proposal to see it here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}