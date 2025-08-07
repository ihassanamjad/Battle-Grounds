'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ConfettiEffect from '../animations/ConfettiEffect'

interface FootballThemeProps {
  progress: number
  goal: number
  currentAmount: number
  className?: string
}

export default function FootballTheme({ 
  progress, 
  goal, 
  currentAmount,
  className = ''
}: FootballThemeProps) {
  const [yards, setYards] = useState(0)
  const [touchdowns, setTouchdowns] = useState(0)
  const [fieldGoals, setFieldGoals] = useState(0)

  useEffect(() => {
    // Calculate yards (every $5K = 1 yard)
    const calculatedYards = Math.floor((currentAmount / 5000) * 100)
    setYards(Math.min(calculatedYards, 100))
    
    // Calculate touchdowns (every $50K = 1 TD)
    const calculatedTouchdowns = Math.floor(currentAmount / 50000)
    setTouchdowns(calculatedTouchdowns)
    
    // Calculate field goals (every $25K = 1 FG)
    const calculatedFieldGoals = Math.floor(currentAmount / 25000)
    setFieldGoals(calculatedFieldGoals)
  }, [currentAmount])

  const getFieldPosition = () => {
    return Math.min((yards / 100) * 100, 100)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Football Field */}
      <div className="relative bg-green-800 rounded-lg p-4 border-4 border-white">
        {/* Field Lines */}
        <div className="absolute inset-0 flex justify-between items-center px-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-0.5 h-full bg-white opacity-50"></div>
          ))}
        </div>
        
        {/* Yard Numbers */}
        <div className="absolute top-2 left-2 text-white text-xs font-bold">0</div>
        <div className="absolute top-2 right-2 text-white text-xs font-bold">100</div>
        
        {/* Football Position */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-brown-600 rounded-full border-2 border-white"
          initial={{ left: '0%' }}
          animate={{ left: `${getFieldPosition()}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">🏈</span>
        </motion.div>
        
        {/* Goal Line */}
        <div className="absolute top-0 right-0 w-1 h-full bg-yellow-400 border-2 border-yellow-300"></div>
      </div>
      
      {/* Stats Display */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-green-100 rounded-lg p-3"
        >
          <div className="text-2xl font-bold text-green-800">{yards}</div>
          <div className="text-sm text-green-600">Yards</div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-100 rounded-lg p-3"
        >
          <div className="text-2xl font-bold text-blue-800">{touchdowns}</div>
          <div className="text-sm text-blue-600">Touchdowns</div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-100 rounded-lg p-3"
        >
          <div className="text-2xl font-bold text-yellow-800">{fieldGoals}</div>
          <div className="text-sm text-yellow-600">Field Goals</div>
        </motion.div>
      </div>
      
      {/* Touchdown Celebration */}
      <ConfettiEffect 
        trigger={touchdowns > 0 && yards >= 100} 
        type="victory"
      />
      
      {/* Progress Text */}
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold text-gray-900">
          ${currentAmount.toLocaleString()} / ${goal.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">
          {Math.round(progress)}% Complete
        </div>
      </div>
    </div>
  )
} 