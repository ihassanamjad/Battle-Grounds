import { create } from 'zustand'
import { Agent, Contest, Deal, Battle, LeaderboardEntry, Notification } from '@/types'

interface BattleGroundsState {
  // Data
  agents: Agent[]
  contests: Contest[]
  deals: Deal[]
  battles: Battle[]
  notifications: Notification[]
  
  // UI State
  currentContest: Contest | null
  isLoading: boolean
  tvMode: boolean
  
  // Actions
  setAgents: (agents: Agent[]) => void
  setContests: (contests: Contest[]) => void
  setDeals: (deals: Deal[]) => void
  setBattles: (battles: Battle[]) => void
  setNotifications: (notifications: Notification[]) => void
  setCurrentContest: (contest: Contest | null) => void
  setLoading: (loading: boolean) => void
  setTVMode: (tvMode: boolean) => void
  
  // Computed
  getLeaderboard: (contestId: string) => LeaderboardEntry[]
  getAgentDeals: (agentId: string, contestId: string) => Deal[]
  getActiveBattles: (contestId: string) => Battle[]
  getUnreadNotifications: () => Notification[]
  
  // Actions
  addDeal: (deal: Deal) => void
  updateDeal: (dealId: string, updates: Partial<Deal>) => void
  addNotification: (notification: Notification) => void
  markNotificationRead: (notificationId: string) => void
}

export const useBattleGroundsStore = create<BattleGroundsState>((set, get) => ({
  // Initial state
  agents: [],
  contests: [],
  deals: [],
  battles: [],
  notifications: [],
  currentContest: null,
  isLoading: false,
  tvMode: false,
  
  // Setters
  setAgents: (agents) => set({ agents }),
  setContests: (contests) => set({ contests }),
  setDeals: (deals) => set({ deals }),
  setBattles: (battles) => set({ battles }),
  setNotifications: (notifications) => set({ notifications }),
  setCurrentContest: (currentContest) => set({ currentContest }),
  setLoading: (isLoading) => set({ isLoading }),
  setTVMode: (tvMode) => set({ tvMode }),
  
  // Computed getters
  getLeaderboard: (contestId) => {
    const { agents, deals, contests } = get()
    const contest = contests.find(c => c.id === contestId)
    if (!contest) return []
    
    const contestDeals = deals.filter(d => d.contestId === contestId && d.status === 'approved')
    
    return agents
      .filter(agent => contest.participants.includes(agent.id))
      .map(agent => {
        const agentDeals = contestDeals.filter(d => d.agentId === agent.id)
        const totalPremium = agentDeals.reduce((sum, deal) => sum + deal.premium, 0)
        const goalPercentage = (totalPremium / contest.goal) * 100
        
        // Calculate badges
        const badges = []
        if (totalPremium >= 25000) badges.push({ id: '25k', name: '25K Club', icon: '🏆', color: 'gold', description: 'Reached $25K in premium' })
        if (totalPremium >= 30000) badges.push({ id: '30k', name: '30K Qualifier', icon: '💪', color: 'green', description: 'Reached $30K in premium' })
        if (goalPercentage >= 100) badges.push({ id: 'goal', name: 'Goal Achiever', icon: '🎯', color: 'blue', description: 'Achieved contest goal' })
        
        return {
          agent,
          totalPremium,
          dealCount: agentDeals.length,
          goalPercentage,
          rank: 0, // Will be calculated after sorting
          badges
        }
      })
      .sort((a, b) => b.totalPremium - a.totalPremium)
      .map((entry, index) => ({ ...entry, rank: index + 1 }))
  },
  
  getAgentDeals: (agentId, contestId) => {
    const { deals } = get()
    return deals.filter(d => d.agentId === agentId && d.contestId === contestId)
  },
  
  getActiveBattles: (contestId) => {
    const { battles } = get()
    return battles.filter(b => b.contestId === contestId && b.status === 'active')
  },
  
  getUnreadNotifications: () => {
    const { notifications } = get()
    return notifications.filter(n => !n.isRead)
  },
  
  // Actions
  addDeal: (deal) => set(state => ({ 
    deals: [...state.deals, deal],
    notifications: [...state.notifications, {
      id: `notification-${Date.now()}`,
      type: 'deal',
      title: 'New Deal Submitted',
      message: `$${deal.premium.toLocaleString()} deal submitted by ${state.agents.find(a => a.id === deal.agentId)?.name}`,
      agentId: deal.agentId,
      contestId: deal.contestId,
      isRead: false,
      createdAt: new Date().toISOString()
    }]
  })),
  
  updateDeal: (dealId, updates) => set(state => ({
    deals: state.deals.map(deal => 
      deal.id === dealId ? { ...deal, ...updates } : deal
    )
  })),
  
  addNotification: (notification) => set(state => ({
    notifications: [...state.notifications, notification]
  })),
  
  markNotificationRead: (notificationId) => set(state => ({
    notifications: state.notifications.map(notification =>
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    )
  }))
})) 