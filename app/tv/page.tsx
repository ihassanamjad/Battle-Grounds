'use client'

import { useEffect, useState } from 'react'
import { useBattleGroundsStore } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'
import { Tv, Trophy, Users, Target, Zap, Clock, Flame } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function TVModePage() {
  const { 
    currentContest, 
    agents, 
    deals, 
    getLeaderboard,
    setTVMode 
  } = useBattleGroundsStore()
  
  const [currentView, setCurrentView] = useState<'leaderboard' | 'battles' | 'countdown' | 'feed'>('leaderboard')
  const [leaderboard, setLeaderboard] = useState<any[]>([])

  useEffect(() => {
    setTVMode(true)
    return () => setTVMode(false)
  }, [setTVMode])

  useEffect(() => {
    if (currentContest) {
      const entries = getLeaderboard(currentContest.id)
      setLeaderboard(entries)
    }
  }, [currentContest, deals, getLeaderboard])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView(prev => {
        const views: Array<'leaderboard' | 'battles' | 'countdown' | 'feed'> = ['leaderboard', 'battles', 'countdown', 'feed']
        const currentIndex = views.indexOf(prev)
        const nextIndex = (currentIndex + 1) % views.length
        return views[nextIndex]
      })
    }, 10000) // Rotate every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const getTimeRemaining = () => {
    if (!currentContest) return { days: 0, hours: 0, minutes: 0 }
    
    const now = new Date()
    const endDate = new Date(currentContest.endDate)
    const diff = endDate.getTime() - now.getTime()
    
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return { days, hours, minutes }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 }
    })
  }

  const renderLeaderboardView = () => (
    <div className="h-full flex flex-col">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block"
        >
          <Trophy className="w-16 h-16 text-battle-gold mx-auto mb-4" />
        </motion.div>
        <h1 className="text-6xl font-bold text-white mb-2">LEADERBOARD</h1>
        <p className="text-2xl text-blue-200">{currentContest?.name}</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaderboard.slice(0, 6).map((entry, index) => (
          <motion.div
            key={entry.agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`battle-card p-6 text-center ${
              index === 0 ? 'battle-card-gold' : 
              index === 1 ? 'battle-card-silver' : 
              index === 2 ? 'battle-card-bronze' : ''
            }`}
          >
            <div className="text-4xl mb-4">
              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
            </div>
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-battle-gold to-battle-fire rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {entry.agent.name.charAt(0)}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{entry.agent.name}</h3>
            <p className="text-lg text-gray-600 mb-4">{entry.agent.office}</p>
            <div className="text-3xl font-bold text-battle-fire mb-2">
              ${entry.totalPremium.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {entry.dealCount} deals • {entry.goalPercentage.toFixed(1)}% of goal
            </div>
            {entry.badges.length > 0 && (
              <div className="flex justify-center space-x-2 mt-3">
                {entry.badges.map((badge: any) => (
                  <span key={badge.id} className="text-2xl" title={badge.name}>
                    {badge.icon}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderBattlesView = () => (
    <div className="h-full flex flex-col">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block"
        >
          <Flame className="w-16 h-16 text-battle-fire mx-auto mb-4" />
        </motion.div>
        <h1 className="text-6xl font-bold text-white mb-2">BATTLE ARENA</h1>
        <p className="text-2xl text-blue-200">Head-to-Head Showdowns</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mock battle displays */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="battle-card p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Sarah vs Mike</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-battle-gold to-battle-fire rounded-full flex items-center justify-center text-white font-bold text-3xl">
                S
              </div>
              <h4 className="text-xl font-bold text-gray-900">Sarah Johnson</h4>
              <div className="text-2xl font-bold text-battle-fire mt-2">$45,000</div>
            </div>
            <div>
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-battle-gold to-battle-fire rounded-full flex items-center justify-center text-white font-bold text-3xl">
                M
              </div>
              <h4 className="text-xl font-bold text-gray-900">Mike Chen</h4>
              <div className="text-2xl font-bold text-battle-fire mt-2">$38,000</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: '54%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="battle-card p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Lisa vs David</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-battle-gold to-battle-fire rounded-full flex items-center justify-center text-white font-bold text-3xl">
                L
              </div>
              <h4 className="text-xl font-bold text-gray-900">Lisa Rodriguez</h4>
              <div className="text-2xl font-bold text-battle-fire mt-2">$52,000</div>
            </div>
            <div>
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-battle-gold to-battle-fire rounded-full flex items-center justify-center text-white font-bold text-3xl">
                D
              </div>
              <h4 className="text-xl font-bold text-gray-900">David Kim</h4>
              <div className="text-2xl font-bold text-battle-fire mt-2">$41,000</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: '56%' }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderCountdownView = () => {
    const timeRemaining = getTimeRemaining()
    
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <Clock className="w-20 h-20 text-battle-gold mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-white mb-4">TIME REMAINING</h1>
          <p className="text-3xl text-blue-200 mb-8">{currentContest?.name}</p>
          
          <div className="grid grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-battle-gold">{timeRemaining.days}</div>
              <div className="text-xl text-blue-200">DAYS</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-battle-gold">{timeRemaining.hours}</div>
              <div className="text-xl text-blue-200">HOURS</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-battle-gold">{timeRemaining.minutes}</div>
              <div className="text-xl text-blue-200">MINUTES</div>
            </motion.div>
          </div>
          
          <div className="mt-12">
            <div className="text-3xl font-bold text-white mb-4">Contest Progress</div>
            <div className="w-96 h-8 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-battle-success to-battle-fire"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${Math.min(
                    (leaderboard.reduce((sum, entry) => sum + entry.totalPremium, 0) / (currentContest?.goal || 1)) * 100, 
                    100
                  )}%` 
                }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="text-xl text-blue-200 mt-2">
              ${leaderboard.reduce((sum, entry) => sum + entry.totalPremium, 0).toLocaleString()} / ${currentContest?.goal.toLocaleString()}
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const renderFeedView = () => (
    <div className="h-full flex flex-col">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block"
        >
          <Zap className="w-16 h-16 text-battle-fire mx-auto mb-4" />
        </motion.div>
        <h1 className="text-6xl font-bold text-white mb-2">LIVE FEED</h1>
        <p className="text-2xl text-blue-200">Recent Activity</p>
      </div>

      <div className="flex-1 space-y-4">
        {deals.slice(-5).reverse().map((deal, index) => {
          const agent = agents.find(a => a.id === deal.agentId)
          return (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="battle-card p-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-battle-gold to-battle-fire rounded-full flex items-center justify-center text-white font-bold">
                  {agent?.name.charAt(0) || 'A'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">{agent?.name}</span>
                    <span className="text-2xl">🔥</span>
                    <span className="text-xl font-bold text-battle-fire">
                      ${deal.premium.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {deal.linesOfBusiness.join(', ')} • {new Date(deal.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-3xl">
                  {deal.premium >= 10000 ? '💪' : deal.premium >= 5000 ? '🎯' : '👍'}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen tv-mode">
      <div className="h-screen p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            {currentView === 'leaderboard' && renderLeaderboardView()}
            {currentView === 'battles' && renderBattlesView()}
            {currentView === 'countdown' && renderCountdownView()}
            {currentView === 'feed' && renderFeedView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
} 