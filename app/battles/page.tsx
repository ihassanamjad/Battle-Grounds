'use client'

import { useEffect, useState } from 'react'
import { useBattleGroundsStore } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'
import { Sword, Trophy, Users, Target, Zap, Flame, Play } from 'lucide-react'
import confetti from 'canvas-confetti'
import { toast } from 'react-hot-toast'

// Mock battles data
const mockBattles = [
  {
    id: '1',
    contestId: '1',
    agent1Id: '1',
    agent2Id: '2',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    agent1Score: 45000,
    agent2Score: 38000,
    status: 'active' as const,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    contestId: '1',
    agent1Id: '3',
    agent2Id: '4',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    agent1Score: 52000,
    agent2Score: 41000,
    status: 'active' as const,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    contestId: '1',
    agent1Id: '1',
    agent2Id: '3',
    startDate: '2024-01-01',
    endDate: '2024-01-15',
    agent1Score: 35000,
    agent2Score: 32000,
    status: 'completed' as const,
    winnerId: '1',
    createdAt: '2024-01-01'
  }
]

export default function BattlesPage() {
  const { 
    agents, 
    currentContest, 
    getAgentDeals,
    setBattles: setStoreBattles 
  } = useBattleGroundsStore()
  
  const [battles, setLocalBattles] = useState(mockBattles)
  const [selectedBattle, setSelectedBattle] = useState<any>(null)

  useEffect(() => {
    setStoreBattles(mockBattles)
    setLocalBattles(mockBattles)
  }, [setStoreBattles])

  const getAgentById = (id: string) => {
    return agents.find(agent => agent.id === id)
  }

  const getBattleProgress = (battle: any) => {
    const agent1 = getAgentById(battle.agent1Id)
    const agent2 = getAgentById(battle.agent2Id)
    
    if (!agent1 || !agent2) return null
    
    const total = battle.agent1Score + battle.agent2Score
    const agent1Percentage = total > 0 ? (battle.agent1Score / total) * 100 : 50
    const agent2Percentage = 100 - agent1Percentage
    
    return {
      agent1: { ...agent1, score: battle.agent1Score, percentage: agent1Percentage },
      agent2: { ...agent2, score: battle.agent2Score, percentage: agent2Percentage },
      total
    }
  }

  const triggerBattleConfetti = (winner: any) => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF4500', '#10B981']
    })
  }

  const getBattleTagline = (battle: any) => {
    const progress = getBattleProgress(battle)
    if (!progress) return ''
    
    const diff = Math.abs(progress.agent1.score - progress.agent2.score)
    const percentage = (diff / progress.total) * 100
    
    if (percentage < 10) return "It's a close battle! 🔥"
    if (percentage < 25) return "One agent is pulling ahead! 💪"
    return "This is getting intense! ⚔️"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                      <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-battle-fire to-battle-gold rounded-lg flex items-center justify-center">
                  <Sword className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Battle Arena</h1>
                  <p className="text-gray-600">
                    {currentContest?.name || 'No active contest'}
                  </p>
                </div>
              </div>
              
              {/* Test Buttons */}
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    toast.success('⚔️ Battle victory!')
                    triggerBattleConfetti({})
                  }}
                  className="flex items-center space-x-1 px-3 py-2 bg-battle-fire text-white rounded-lg text-sm font-medium"
                >
                  <Play className="w-4 h-4" />
                  <span>Test Battle Win</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    toast.success('🔥 Close battle!')
                    triggerBattleConfetti({})
                  }}
                  className="flex items-center space-x-1 px-3 py-2 bg-battle-gold text-white rounded-lg text-sm font-medium"
                >
                  <Play className="w-4 h-4" />
                  <span>Test Close Battle</span>
                </motion.button>
              </div>
            </div>
        </div>
      </div>

      {/* Battles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {battles.map((battle, index) => {
              const progress = getBattleProgress(battle)
              if (!progress) return null
              
              return (
                <motion.div
                  key={battle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.2 }}
                  className="battle-card hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedBattle(battle)}
                >
                  <div className="p-6">
                    {/* Battle Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <Flame className="w-6 h-6 text-battle-fire" />
                        <h3 className="text-xl font-bold text-gray-900">Battle #{battle.id}</h3>
                      </div>
                                             <div className={`text-sm px-2 py-1 rounded-full ${
                         battle.status === 'active' 
                           ? 'bg-green-100 text-green-800' 
                           : 'bg-blue-100 text-blue-800'
                       }`}>
                         {battle.status === 'active' ? 'Active' : 'Completed'}
                       </div>
                    </div>

                    {/* Agents */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* Agent 1 */}
                      <motion.div
                        className={`text-center p-4 rounded-lg border-2 transition-all duration-300 ${
                          progress.agent1.score > progress.agent2.score
                            ? 'border-battle-gold bg-gradient-to-br from-yellow-50 to-orange-50'
                            : 'border-gray-200 bg-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-battle-gold to-battle-fire rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {progress.agent1.name.charAt(0)}
                        </div>
                        <h4 className="font-semibold text-gray-900">{progress.agent1.name}</h4>
                        <p className="text-sm text-gray-600">{progress.agent1.office}</p>
                        <div className="text-2xl font-bold text-gray-900 mt-2">
                          ${progress.agent1.score.toLocaleString()}
                        </div>
                        {progress.agent1.score > progress.agent2.score && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-2"
                          >
                            <Trophy className="w-6 h-6 text-battle-gold mx-auto" />
                          </motion.div>
                        )}
                      </motion.div>

                      {/* VS */}
                      <div className="flex items-center justify-center">
                        <div className="text-4xl font-bold text-battle-fire">VS</div>
                      </div>

                      {/* Agent 2 */}
                      <motion.div
                        className={`text-center p-4 rounded-lg border-2 transition-all duration-300 ${
                          progress.agent2.score > progress.agent1.score
                            ? 'border-battle-gold bg-gradient-to-br from-yellow-50 to-orange-50'
                            : 'border-gray-200 bg-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-battle-gold to-battle-fire rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {progress.agent2.name.charAt(0)}
                        </div>
                        <h4 className="font-semibold text-gray-900">{progress.agent2.name}</h4>
                        <p className="text-sm text-gray-600">{progress.agent2.office}</p>
                        <div className="text-2xl font-bold text-gray-900 mt-2">
                          ${progress.agent2.score.toLocaleString()}
                        </div>
                        {progress.agent2.score > progress.agent1.score && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-2"
                          >
                            <Trophy className="w-6 h-6 text-battle-gold mx-auto" />
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{progress.agent1.name}</span>
                        <span>{progress.agent2.name}</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-battle-gold to-battle-fire"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.agent1.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-white opacity-50" />
                      </div>
                    </div>

                    {/* Battle Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${progress.total.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Premium</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-battle-fire">
                          ${Math.abs(progress.agent1.score - progress.agent2.score).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Difference</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-battle-success">
                          {Math.max(progress.agent1.percentage, progress.agent2.percentage).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">Lead</div>
                      </div>
                    </div>

                    {/* Battle Tagline */}
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600 italic">
                        {getBattleTagline(battle)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Battle Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Battle Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-battle-fire">
                {battles.length}
              </div>
              <div className="text-sm text-gray-600">Active Battles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-battle-success">
                {battles.filter(b => b.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-battle-gold">
                ${battles.reduce((sum, b) => sum + b.agent1Score + b.agent2Score, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Premium</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Battle Modal */}
      {selectedBattle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedBattle(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Battle Details</h2>
              <button
                onClick={() => setSelectedBattle(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {/* Battle details would go here */}
            <p className="text-gray-600">
              Detailed battle information and statistics would be displayed here.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 