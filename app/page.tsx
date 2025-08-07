'use client'

import { useEffect, useState } from 'react'
import { useBattleGroundsStore } from '@/store'
import { motion } from 'framer-motion'
import { Trophy, Users, Target, Zap, Tv, Settings, Play } from 'lucide-react'
import Link from 'next/link'
import ThemeSelector from '@/components/ThemeSelector'
import TestPanel from '@/components/TestPanel'

// Mock data for demo
const mockAgents = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@fallon.com', office: 'Main Office', rating: 4.8, level: 'Senior Agent', isActive: true, createdAt: '2024-01-01' },
  { id: '2', name: 'Mike Chen', email: 'mike@fallon.com', office: 'Downtown', rating: 4.6, level: 'Agent', isActive: true, createdAt: '2024-01-01' },
  { id: '3', name: 'Lisa Rodriguez', email: 'lisa@fallon.com', office: 'West Branch', rating: 4.9, level: 'Senior Agent', isActive: true, createdAt: '2024-01-01' },
  { id: '4', name: 'David Kim', email: 'david@fallon.com', office: 'Main Office', rating: 4.7, level: 'Agent', isActive: true, createdAt: '2024-01-01' },
]

const mockContests = [
  {
    id: '1',
    name: 'Q1 2024 Sales Blitz',
    description: 'Drive to 500K - Football field theme',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    goal: 500000,
    theme: 'football' as const,
    isActive: true,
    participants: ['1', '2', '3', '4'],
    prizes: [
      { id: '1', name: 'Champion Trophy', description: 'Top performer', threshold: 500000, type: 'final' as const, isUnlocked: false },
      { id: '2', name: '25K Club Badge', description: 'Reach $25K milestone', threshold: 25000, type: 'milestone' as const, isUnlocked: false },
    ],
    createdAt: '2024-01-01'
  }
]

const mockDeals = [
  { id: '1', agentId: '1', contestId: '1', premium: 15000, linesOfBusiness: ['Auto', 'Home'], notes: 'Bundle deal', date: '2024-01-15', status: 'approved', createdAt: '2024-01-15' },
  { id: '2', agentId: '2', contestId: '1', premium: 12000, linesOfBusiness: ['Auto'], notes: 'New customer', date: '2024-01-16', status: 'approved', createdAt: '2024-01-16' },
  { id: '3', agentId: '3', contestId: '1', premium: 18000, linesOfBusiness: ['Auto', 'Home', 'Life'], notes: 'Multi-line', date: '2024-01-17', status: 'approved', createdAt: '2024-01-17' },
]

export default function HomePage() {
  const [isTestPanelOpen, setIsTestPanelOpen] = useState(false)
  
  const { 
    setAgents, 
    setContests, 
    setDeals, 
    setCurrentContest,
    contests,
    currentContest 
  } = useBattleGroundsStore()

  useEffect(() => {
    // Load mock data
    setAgents(mockAgents)
    setContests(mockContests)
    setDeals(mockDeals)
    setCurrentContest(mockContests[0])
  }, [setAgents, setContests, setDeals, setCurrentContest])

  const navigationItems = [
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy, color: 'text-battle-gold' },
    { name: 'Battles', href: '/battles', icon: Users, color: 'text-battle-fire' },
    { name: 'Deal Submission', href: '/submit-deal', icon: Target, color: 'text-battle-success' },
    { name: 'TV Mode', href: '/tv', icon: Tv, color: 'text-blue-400' },
    { name: 'Admin Panel', href: '/admin', icon: Settings, color: 'text-gray-400' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-battle-gold to-battle-fire rounded-lg flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Fallon Insurance Agency</h1>
                <p className="text-sm text-gray-600">Battle Grounds</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Contest</p>
                <p className="font-semibold text-gray-900">
                  {currentContest?.name || 'No active contest'}
                </p>
              </div>
              <Zap className="w-6 h-6 text-battle-fire animate-pulse" />
              
              {/* Test Panel Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTestPanelOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Test Animations</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to the Battle Grounds! ⚔️
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The ultimate sales contest platform for Fallon Insurance Agency. 
            Track performance, compete in battles, and celebrate victories together.
          </p>
        </motion.div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <div className="battle-card hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gray-100 ${item.color}`}>
                        <item.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">Access {item.name.toLowerCase()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold text-gray-900">{mockAgents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Contests</p>
                <p className="text-2xl font-bold text-gray-900">{contests.filter(c => c.isActive).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Deals</p>
                <p className="text-2xl font-bold text-gray-900">{mockDeals.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Premium</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${mockDeals.reduce((sum, deal) => sum + deal.premium, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Theme Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <ThemeSelector 
            currentAmount={mockDeals.reduce((sum, deal) => sum + deal.premium, 0)}
            goal={500000}
          />
        </motion.div>
      </main>
      
      {/* Test Panel */}
      <TestPanel 
        isOpen={isTestPanelOpen}
        onClose={() => setIsTestPanelOpen(false)}
      />
    </div>
  )
} 