'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Zap, Trophy, Target, Users, Settings, X } from 'lucide-react'
import ConfettiEffect from './animations/ConfettiEffect'
import { toast } from 'react-hot-toast'

interface TestPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function TestPanel({ isOpen, onClose }: TestPanelProps) {
  const [confettiTrigger, setConfettiTrigger] = useState(false)
  const [confettiType, setConfettiType] = useState<'default' | 'milestone' | 'victory' | 'battle-win' | 'firework' | 'sparkle'>('default')
  const [testDealAmount, setTestDealAmount] = useState(15000)
  const [testProgress, setTestProgress] = useState(65)

  const triggerConfetti = (type: 'default' | 'milestone' | 'victory' | 'battle-win' | 'firework' | 'sparkle') => {
    setConfettiType(type)
    setConfettiTrigger(true)
    setTimeout(() => setConfettiTrigger(false), 100)
  }

  const testDealSubmission = () => {
    toast.success(`Test deal submitted! $${testDealAmount.toLocaleString()} premium`)
    if (testDealAmount >= 10000) {
      triggerConfetti('milestone')
    }
  }

  const testMilestone = () => {
    toast.success('🎉 25K Club milestone reached!')
    triggerConfetti('victory')
  }

  const testBattleWin = () => {
    toast.success('⚔️ Battle won!')
    triggerConfetti('battle-win')
  }

  const testProgressAnimation = () => {
    setTestProgress(prev => prev >= 100 ? 0 : prev + 10)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Animation Test Panel</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Confetti Tests */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-battle-fire" />
              Confetti Tests
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => triggerConfetti('default')}
                className="p-3 bg-blue-500 text-white rounded-lg font-medium"
              >
                Default Confetti
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => triggerConfetti('milestone')}
                className="p-3 bg-green-500 text-white rounded-lg font-medium"
              >
                Milestone Confetti
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => triggerConfetti('victory')}
                className="p-3 bg-yellow-500 text-white rounded-lg font-medium"
              >
                Victory Confetti
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => triggerConfetti('battle-win')}
                className="p-3 bg-red-500 text-white rounded-lg font-medium"
              >
                Battle Win Confetti
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => triggerConfetti('firework')}
                className="p-3 bg-purple-500 text-white rounded-lg font-medium"
              >
                Firework Effect
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => triggerConfetti('sparkle')}
                className="p-3 bg-pink-500 text-white rounded-lg font-medium"
              >
                Sparkle Effect
              </motion.button>
            </div>
          </div>

          {/* Deal Submission Test */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Target className="w-5 h-5 mr-2 text-battle-success" />
              Deal Submission Test
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Amount
                </label>
                <input
                  type="number"
                  value={testDealAmount}
                  onChange={(e) => setTestDealAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-battle-success focus:border-transparent"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={testDealSubmission}
                className="w-full p-3 bg-battle-success text-white rounded-lg font-medium"
              >
                Submit Test Deal
              </motion.button>
              
              <div className="text-xs text-gray-600">
                Deals over $10K will trigger special confetti
              </div>
            </div>
          </div>

          {/* Milestone Tests */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-battle-gold" />
              Milestone Tests
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={testMilestone}
                className="p-3 bg-battle-gold text-white rounded-lg font-medium"
              >
                25K Club Badge
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={testBattleWin}
                className="p-3 bg-battle-fire text-white rounded-lg font-medium"
              >
                Battle Win
              </motion.button>
            </div>
          </div>

          {/* Progress Bar Test */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-600" />
              Progress Bar Test
            </h3>
            
            <div className="space-y-3">
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-battle-success to-battle-fire"
                  initial={{ width: 0 }}
                  animate={{ width: `${testProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{testProgress}% Complete</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={testProgressAnimation}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  +10%
                </motion.button>
              </div>
            </div>
          </div>

          {/* Animation Showcase */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Play className="w-5 h-5 mr-2 text-purple-600" />
              Animation Showcase
            </h3>
            
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-center cursor-pointer"
              >
                Hover Me (Scale + Rotate)
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-center"
              >
                Auto Animation
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                  borderColor: "#FFD700"
                }}
                className="p-4 border-2 border-gray-300 rounded-lg text-center cursor-pointer transition-all duration-300"
              >
                Hover for Glow Effect
              </motion.div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Testing Instructions:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Click confetti buttons to test different effects</li>
              <li>• Submit test deals to see toast notifications</li>
              <li>• Try different deal amounts to trigger special confetti</li>
              <li>• Use progress bar test to see smooth animations</li>
              <li>• Hover over showcase elements to see interactions</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Confetti Effect */}
      <ConfettiEffect 
        trigger={confettiTrigger}
        type={confettiType}
      />
    </>
  )
} 