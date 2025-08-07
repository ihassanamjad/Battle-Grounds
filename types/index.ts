export interface Agent {
  id: string
  name: string
  email: string
  office: string
  profilePicture?: string
  rating: number
  level: string
  isActive: boolean
  createdAt: string
}

export interface Contest {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  goal: number
  theme: ContestTheme
  isActive: boolean
  participants: string[] // agent IDs
  prizes: Prize[]
  createdAt: string
}

export interface Deal {
  id: string
  agentId: string
  contestId: string
  premium: number
  linesOfBusiness: string[]
  notes?: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export interface Battle {
  id: string
  contestId: string
  agent1Id: string
  agent2Id: string
  startDate: string
  endDate: string
  agent1Score: number
  agent2Score: number
  status: 'active' | 'completed'
  winnerId?: string
  createdAt: string
}

export interface Prize {
  id: string
  name: string
  description: string
  threshold: number
  type: 'milestone' | 'final'
  isUnlocked: boolean
}

export type ContestTheme = 
  | 'football'
  | 'rocket'
  | 'sailboat'
  | 'balloon'
  | 'jet'
  | 'skyscraper'
  | 'factory'
  | 'map'
  | 'mountain'
  | 'rollercoaster'
  | 'dragon'
  | 'music'

export interface LeaderboardEntry {
  agent: Agent
  totalPremium: number
  dealCount: number
  goalPercentage: number
  rank: number
  badges: Badge[]
}

export interface Badge {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

export interface Milestone {
  id: string
  name: string
  threshold: number
  isReached: boolean
  reachedAt?: string
}

export interface TVDisplay {
  id: string
  name: string
  type: 'leaderboard' | 'battle' | 'countdown' | 'feed'
  duration: number
  isActive: boolean
}

export interface Notification {
  id: string
  type: 'deal' | 'milestone' | 'battle' | 'winner'
  title: string
  message: string
  agentId?: string
  contestId?: string
  isRead: boolean
  createdAt: string
} 