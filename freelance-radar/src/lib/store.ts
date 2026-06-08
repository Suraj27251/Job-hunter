import { create } from "zustand"
import type {
  User,
  UserProfile,
  JobMatch,
  Application,
  Notification,
  JobFilters,
  DashboardStats,
  SkillGap,
  Platform,
  JobTypePreference,
  TonePreference,
  ProposalLength,
  ApplicationStatus,
} from "@/types"

// ===== Mock Data =====

const mockPlatforms: Platform[] = [
  "upwork", "weworkremotely", "wellfound", "remoteok",
  "contra", "gunio", "arcdev", "toptal",
]

const mockSkills = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "Docker", "Kubernetes", "AWS", "GraphQL", "PostgreSQL",
  "MongoDB", "Redis", "TailwindCSS", "Figma", "UI/UX",
  "REST APIs", "CI/CD", "Git", "Agile", "Terraform",
]

const mockUser: User = {
  id: "user-1",
  email: "alex@example.com",
  name: "Alex Chen",
  avatar: "https://avatars.githubusercontent.com/u/1234567",
  plan: "pro",
  createdAt: new Date("2026-01-15"),
}

const mockProfile: UserProfile = {
  userId: "user-1",
  skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "GraphQL", "Docker", "AWS"],
  experienceYears: 6,
  minRate: 80,
  rateType: "hourly",
  availability: "2weeks",
  preferredPlatforms: ["upwork", "toptal", "arcdev"],
  preferredJobTypes: ["hourly", "full-time"],
  bio: "Full-stack developer with 6+ years building scalable web applications.",
}

function generateMockJobs(): JobMatch[] {
  const jobs: JobMatch[] = []
  const titles = [
    "Senior React Developer for E-commerce Platform",
    "Full-Stack Engineer (Next.js + Node.js)",
    "Blockchain Developer - DeFi Protocol",
    "UX/UI Designer for SaaS Product",
    "DevOps Engineer - AWS Infrastructure",
    "React Native Developer - Health App",
    "Python Backend Developer - Data Pipeline",
    "Frontend Lead - Design System",
    "AI/ML Engineer - NLP Project",
    "Technical Writer - Developer Documentation",
  ]
  const descriptions = [
    "Looking for an experienced React developer to build and maintain a large-scale e-commerce platform. You'll work with a distributed team to deliver features, optimize performance, and ensure accessibility.",
    "Join our team building the next generation of developer tools. You'll work across the full stack, from React frontends to Node.js microservices, deployed on Kubernetes.",
    "Build and audit smart contracts for our DeFi lending protocol. Experience with Solidity, Web3.js, and Ethereum ecosystem required.",
    "Design beautiful, intuitive interfaces for our B2B SaaS platform. You'll own the design system and collaborate closely with product and engineering.",
    "Manage and optimize our AWS infrastructure serving 10M+ users. Automate deployments, improve monitoring, and drive reliability improvements.",
  ]

  for (let i = 0; i < 30; i++) {
    const title = titles[i % titles.length]
    const platform = mockPlatforms[i % mockPlatforms.length]
    const score = Math.min(98, Math.max(15, 40 + Math.floor(Math.random() * 55)))
    const postedAt = new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
    const numSkills = 2 + Math.floor(Math.random() * 5)
    const skills = [...mockSkills].sort(() => Math.random() - 0.5).slice(0, numSkills)
    const userSkills = mockProfile.skills
    const skillOverlap = skills.filter(s => userSkills.includes(s))
    const missingSkills = skills.filter(s => !userSkills.includes(s))

    const job = {
      id: `job-${i + 1}`,
      platform,
      externalId: `ext-${i + 1}`,
      title,
      description: descriptions[i % descriptions.length],
      requiredSkills: skills,
      budgetMin: 50 + Math.floor(Math.random() * 100),
      budgetMax: 100 + Math.floor(Math.random() * 150),
      rateType: "hourly" as const,
      experienceLevel: (["junior", "mid", "senior", "lead"] as const)[Math.floor(Math.random() * 4)],
      postedAt,
      expiresAt: new Date(postedAt.getTime() + 30 * 24 * 60 * 60 * 1000),
      locationType: "remote" as const,
      sourceUrl: `https://example.com/jobs/${i + 1}`,
      isArchived: false,
    }

    jobs.push({
      id: `match-${i + 1}`,
      userId: "user-1",
      jobId: job.id,
      job,
      matchScore: score,
      skillOverlap,
      missingSkills,
      matchBreakdown: {
        skillOverlap: Math.round((skillOverlap.length / Math.max(skills.length, 1)) * 40),
        experienceLevel: score >= 50 ? 15 + Math.floor(Math.random() * 5) : 5 + Math.floor(Math.random() * 10),
        rateCompatibility: score >= 60 ? 12 + Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * 9),
        jobTypePreference: score >= 55 ? 8 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 6),
        platformPreference: score >= 50 ? 4 + Math.floor(Math.random() * 1) : 1 + Math.floor(Math.random() * 3),
        timezoneCompatibility: score >= 50 ? 8 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 6),
      },
      createdAt: new Date(),
    })
  }

  return jobs.sort((a, b) => b.matchScore - a.matchScore)
}

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    type: "new_match",
    title: "High match: Senior React Developer",
    message: "A new job matching 92% of your profile has been posted on Toptal.",
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "notif-2",
    userId: "user-1",
    type: "follow_up",
    title: "Follow-up reminder: Full-Stack Engineer",
    message: "It's been 5 days since you applied. Consider following up!",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "notif-3",
    userId: "user-1",
    type: "system_alert",
    title: "Scraper alert: Upwork",
    message: "Upwork scraper encountered rate limiting. Recovery in progress.",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "notif-4",
    userId: "user-1",
    type: "weekly_digest",
    title: "Weekly digest: 45 new jobs this week",
    message: "You had 12 high-match jobs this week. Your top platform was Arc.dev.",
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
]

// ===== Store Interface =====

interface AppState {
  // User
  user: User | null
  profile: UserProfile | null
  isAuthenticated: boolean

  // Jobs & Matches
  jobMatches: JobMatch[]
  filters: JobFilters
  selectedJobId: string | null

  // Applications
  applications: Application[]

  // Notifications
  notifications: Notification[]

  // UI
  sidebarOpen: boolean
  theme: "light" | "dark"

  // Stats
  stats: DashboardStats
  skillGaps: SkillGap[]

  // Actions
  setUser: (user: User | null) => void
  setProfile: (profile: UserProfile | null) => void
  setFilters: (filters: Partial<JobFilters>) => void
  resetFilters: () => void
  selectJob: (jobId: string | null) => void
  addApplication: (jobId: string, status: ApplicationStatus) => void
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void
  markNotificationRead: (notifId: string) => void
  toggleSidebar: () => void
  toggleTheme: () => void
  getFilteredJobs: () => JobMatch[]
  getApplicationsByStatus: (status: ApplicationStatus) => Application[]
  getUnreadCount: () => number
}

const defaultFilters: JobFilters = {
  platforms: [],
  scoreMin: 0,
  scoreMax: 100,
  jobTypes: [],
  requiredSkills: [],
  searchQuery: "",
}

// ===== Store =====

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: mockUser,
  profile: mockProfile,
  isAuthenticated: true,

  jobMatches: generateMockJobs(),
  filters: defaultFilters,
  selectedJobId: null,

  applications: [],
  notifications: mockNotifications,

  sidebarOpen: true,
  theme: "light",

  stats: {
    totalNewJobsToday: 14,
    jobsAppliedThisWeek: 8,
    averageMatchScore: 67,
    topPlatform: "arcdev",
  },

  skillGaps: [
    { skill: "Docker", additionalJobs: 47, avgRateIncrease: "+32%" },
    { skill: "AWS", additionalJobs: 38, avgRateIncrease: "+28%" },
    { skill: "GraphQL", additionalJobs: 31, avgRateIncrease: "+25%" },
    { skill: "Python", additionalJobs: 29, avgRateIncrease: "+22%" },
    { skill: "Kubernetes", additionalJobs: 22, avgRateIncrease: "+35%" },
  ],

  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setProfile: (profile) => set({ profile }),

  setFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  selectJob: (jobId) => set({ selectedJobId: jobId }),

  addApplication: (jobId, status) => {
    const state = get()
    const match = state.jobMatches.find((m) => m.jobId === jobId)
    if (!match) return

    const app: Application = {
      id: `app-${Date.now()}`,
      userId: "user-1",
      jobId,
      job: match.job,
      status,
      appliedAt: status === "applied" ? new Date() : undefined,
      createdAt: new Date(),
    }
    set({ applications: [...state.applications, app] })
  },

  updateApplicationStatus: (appId, status) =>
    set((state) => ({
      applications: state.applications.map((a) =>
        a.id === appId ? { ...a, status } : a
      ),
    })),

  markNotificationRead: (notifId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      ),
    })),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light"
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme === "dark")
      }
      return { theme: newTheme }
    }),

  getFilteredJobs: () => {
    const state = get()
    const { platforms, scoreMin, scoreMax, jobTypes, searchQuery } = state.filters

    return state.jobMatches.filter((match) => {
      if (platforms.length > 0 && !platforms.includes(match.job.platform)) return false
      if (match.matchScore < scoreMin || match.matchScore > scoreMax) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const inTitle = match.job.title.toLowerCase().includes(q)
        const inSkills = match.job.requiredSkills.some((s) => s.toLowerCase().includes(q))
        if (!inTitle && !inSkills) return false
      }
      return true
    })
  },

  getApplicationsByStatus: (status) => {
    return get().applications.filter((a) => a.status === status)
  },

  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.read).length
  },
}))