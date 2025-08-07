'use client'

import { useEffect, useState } from 'react'
import { useBattleGroundsStore } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Medal, TrendingUp, Target, ArrowUp, ArrowDown, Play } from 'lucide-react'
import ProgressBar from '@/components/animations/ProgressBar'
import BadgeDisplay from '@/components/animations/BadgeDisplay'
import ConfettiEffect from '@/components/animations/ConfettiEffect'
import { toast } from 'react-hot-toast'

export default function LeaderboardPage() {
  const { 
    currentContest, 
    agents, 
    deals, 
    getLeaderboard,
    addDeal 
  } = useBattleGroundsStore()
  
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [sortBy, setSortBy] = useState<'premium' | 'deals' | 'goal'>('premium')

  useEffect(() => {
    if (currentContest) {
      const entries = getLeaderboard(currentContest.id)
      setLeaderboard(entries)
    }
  }, [currentContest, deals, getLeaderboard])

  const handleSort = (criteria: 'premium' | 'deals' | 'goal') => {
    setSortBy(criteria)
    const sorted = [...leaderboard].sort((a, b) => {
      switch (criteria) {
        case 'premium':
          return b.totalPremium - a.totalPremium
        case 'deals':
          return b.dealCount - a.dealCount
        case 'goal':
          return b.goalPercentage - a.goalPercentage
        default:
          return 0
      }
    })
    setLeaderboard(sorted)
  }

  const [confettiTrigger, setConfettiTrigger] = useState(false)

  const triggerConfetti = () => {
    setConfettiTrigger(true)
    setTimeout(() => setConfettiTrigger(false), 100)
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-battle-gold" />
      case 2:
        return <Medal className="w-6 h-6 text-battle-silver" />
      case 3:
        return <Medal className="w-6 h-6 text-battle-bronze" />
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>
    }
  }

  const getPaceColor = (percentage: number) => {
    if (percentage >= 100) return 'text-battle-success'
    if (percentage >= 75) return 'text-battle-warning'
    return 'text-battle-danger'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
              <p className="text-gray-600">
                {currentContest?.name || 'No active contest'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Test Buttons */}
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    toast.success('🎉 25K Club milestone reached!')
                    triggerConfetti()
                  }}
                  className="flex items-center space-x-1 px-3 py-2 bg-battle-gold text-white rounded-lg text-sm font-medium"
                >
                  <Play className="w-4 h-4" />
                  <span>Test 25K Badge</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    toast.success('💪 30K Qualifier achieved!')
                    triggerConfetti()
                  }}
                  className="flex items-center space-x-1 px-3 py-2 bg-battle-success text-white rounded-lg text-sm font-medium"
                >
                  <Play className="w-4 h-4" />
                  <span>Test 30K Badge</span>
                </motion.button>
              </div>
              
              {/* Sort Controls */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSort('premium')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    sortBy === 'premium' 
                      ? 'bg-battle-gold text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Premium
                </button>
                <button
                  onClick={() => handleSort('deals')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    sortBy === 'deals' 
                      ? 'bg-battle-gold text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Deals
                </button>
                <button
                  onClick={() => handleSort('goal')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    sortBy === 'goal' 
                      ? 'bg-battle-gold text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Goal %
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Premium
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deals
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Goal Progress
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {leaderboard.map((entry, index) => (
                    <motion.tr
                      key={entry.agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`hover:bg-gray-50 transition-colors ${
                        entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRankIcon(entry.rank)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-battle-gold to-battle-fire flex items-center justify-center text-white font-bold">
                              {entry.agent.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {entry.agent.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {entry.agent.office} • {entry.agent.level}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ${entry.totalPremium.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.dealCount} deals
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {entry.dealCount}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1">
                            <ProgressBar 
                              progress={Math.min(entry.goalPercentage, 100)}
                              theme="default"
                              showPercentage={false}
                              animated={true}
                            />
                          </div>
                          <span className={`text-sm font-medium ${getPaceColor(entry.goalPercentage)}`}>
                            {entry.goalPercentage.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <BadgeDisplay 
                          badges={entry.badges}
                          animated={true}
                          className="justify-start"
                        />
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contest Progress */}
        {currentContest && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contest Progress</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <ProgressBar 
                  progress={Math.min(
                    (leaderboard.reduce((sum, entry) => sum + entry.totalPremium, 0) / currentContest.goal) * 100, 
                    100
                  )}
                  theme="default"
                  showPercentage={false}
                  animated={true}
                />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${leaderboard.reduce((sum, entry) => sum + entry.totalPremium, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  of ${currentContest.goal.toLocaleString()} goal
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Confetti Effect */}
        <ConfettiEffect 
          trigger={confettiTrigger}
          type="milestone"
        />
      </div>
    </div>
  )
} 