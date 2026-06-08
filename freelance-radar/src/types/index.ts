// ===== User & Profile Types =====

export type PlanTier = "free" | "pro" | "agency"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: PlanTier
  createdAt: Date
}

export type RateType = "hourly" | "monthly"
export type Availability = "immediately" | "2weeks" | "1month" | "negotiable"
export type JobTypePreference = "hourly" | "fixed-price" | "part-time" | "full-time"
export type ExperienceLevel = "junior" | "mid" | "senior" | "lead"

export interface UserProfile {
  userId: string
  skills: string[]
  experienceYears: number
  minRate: number
  rateType: RateType
  availability: Availability
  preferredPlatforms: string[]
  preferredJobTypes: JobTypePreference[]
  resumeUrl?: string
  bio?: string
}

export interface Resume {
  id: string
  userId: string
  filename: string
  parsedSkills: string[]
  parsedExperience: Experience[]
  parsedEducation: Education[]
  rawText: string
  versionName: string
  isActive: boolean
  createdAt: Date
}

export interface Experience {
  title: string
  company: string
  startDate: string
  endDate?: string
  description: string
  skills: string[]
}

export interface Education {
  degree: string
  institution: string
  field: string
  startDate: string
  endDate?: string
}

// ===== Job Types =====

export type Platform =
  | "upwork"
  | "weworkremotely"
  | "wellfound"
  | "remoteok"
  | "fiverr"
  | "contra"
  | "gunio"
  | "arcdev"
  | "yunojuno"
  | "braintrust"
  | "toptal"

export type ContractType = "hourly" | "fixed" | "full-time"

export interface Job {
  id: string
  platform: Platform
  externalId: string
  title: string
  description: string
  requiredSkills: string[]
  budgetMin?: number
  budgetMax?: number
  rateType?: RateType
  experienceLevel: ExperienceLevel
  postedAt: Date
  expiresAt?: Date
  locationType: "remote" | "onsite" | "hybrid"
  timezoneRequirements?: string[]
  sourceUrl: string
  isArchived: boolean
}

// ===== Match Types =====

export interface MatchBreakdown {
  skillOverlap: number
  experienceLevel: number
  rateCompatibility: number
  jobTypePreference: number
  platformPreference: number
  timezoneCompatibility: number
}

export interface JobMatch {
  id: string
  userId: string
  jobId: string
  job: Job
  matchScore: number
  skillOverlap: string[]
  missingSkills: string[]
  matchBreakdown: MatchBreakdown
  createdAt: Date
}

// ===== Application / Tracker Types =====

export type ApplicationStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn"

export interface Application {
  id: string
  userId: string
  jobId: string
  job: Job
  status: ApplicationStatus
  appliedAt?: Date
  proposedRate?: number
  notes?: string
  lastFollowUpAt?: Date
  nextFollowUpAt?: Date
  contactName?: string
  contactEmail?: string
  createdAt: Date
}

// ===== Proposal Types =====

export type TonePreference = "professional" | "conversational" | "technical"
export type ProposalLength = "short" | "medium" | "detailed"

export interface Proposal {
  id: string
  userId: string
  jobId: string
  applicationId?: string
  content: string
  tone: TonePreference
  wordCount: number
  generatedAt: Date
  isEdited: boolean
  version: number
}

// ===== Notification Types =====

export type NotificationType =
  | "new_match"
  | "follow_up"
  | "weekly_digest"
  | "system_alert"
  | "scraper_status"

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: Date
  metadata?: Record<string, string>
}

// ===== Filter & UI Types =====

export interface JobFilters {
  platforms: Platform[]
  scoreMin: number
  scoreMax: number
  rateMin?: number
  rateMax?: number
  jobTypes: JobTypePreference[]
  postedWithinDays?: number
  requiredSkills: string[]
  searchQuery?: string
}

export interface DashboardStats {
  totalNewJobsToday: number
  jobsAppliedThisWeek: number
  averageMatchScore: number
  topPlatform: Platform
}

export interface SkillGap {
  skill: string
  additionalJobs: number
  avgRateIncrease: string
}

// ===== Subscription =====

export interface SubscriptionPlan {
  tier: PlanTier
  name: string
  price: number
  features: string[]
  maxPlatforms: number
  maxMatchesPerDay: number
  maxProposalsPerMonth: number
  maxResumeVersions: number
  hasKanbanBoard: boolean
  hasSlackIntegration: boolean
  maxTeamMembers: number
  hasFullAnalytics: boolean
  hasExport: boolean
}