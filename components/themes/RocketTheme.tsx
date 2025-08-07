'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ConfettiEffect from '../animations/ConfettiEffect'

interface RocketThemeProps {
  progress: number
  goal: number
  currentAmount: number
  className?: string
}

export default function RocketTheme({ 
  progress, 
  goal, 
  currentAmount,
  className = ''
}: RocketThemeProps) {
  const [fuelLevel, setFuelLevel] = useState(0)
  const [stage, setStage] = useState(1)
  const [altitude, setAltitude] = useState(0)

  useEffect(() => {
    // Calculate fuel level (every $1K = 1% fuel)
    const calculatedFuel = Math.min((currentAmount / 1000), 100)
    setFuelLevel(calculatedFuel)
    
    // Calculate altitude (every $10K = 10% altitude)
    const calculatedAltitude = Math.min((currentAmount / 10000) * 10, 100)
    setAltitude(calculatedAltitude)
    
    // Calculate stage (every $100K = new stage)
    const calculatedStage = Math.floor(currentAmount / 100000) + 1
    setStage(Math.min(calculatedStage, 3))
  }, [currentAmount])

  const getRocketPosition = () => {
    return Math.min((altitude / 100) * 100, 100)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Rocket Launch Pad */}
      <div className="relative bg-gray-900 rounded-lg p-6 border-2 border-gray-700">
        {/* Stars Background */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        {/* Rocket */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          initial={{ y: 0 }}
          animate={{ y: -getRocketPosition() * 2 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="text-4xl">🚀</div>
          
          {/* Rocket Trail */}
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-orange-500 to-transparent"
            animate={{ 
              height: [20, 40, 20],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity
            }}
          />
        </motion.div>
        
        {/* Launch Pad */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-700 rounded-t-lg"></div>
      </div>
      
      {/* Fuel Gauge */}
      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-700 mb-2">Fuel Level</div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-red-500"
            initial={{ width: 0 }}
            animate={{ width: `${fuelLevel}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1">{Math.round(fuelLevel)}% Fuel</div>
      </div>
      
      {/* Stats Display */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-blue-100 rounded-lg p-3"
        >
          <div className="text-2xl font-bold text-blue-800">{Math.round(altitude)}%</div>
          <div className="text-sm text-blue-600">Altitude</div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-purple-100 rounded-lg p-3"
        >
          <div className="text-2xl font-bold text-purple-800">Stage {stage}</div>
          <div className="text-sm text-purple-600">Rocket Stage</div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-100 rounded-lg p-3"
        >
          <div className="text-2xl font-bold text-orange-800">{Math.round(fuelLevel)}%</div>
          <div className="text-sm text-orange-600">Fuel</div>
        </motion.div>
      </div>
      
      {/* Stage Separation Celebration */}
      <ConfettiEffect 
        trigger={stage > 1 && fuelLevel >= 50} 
        type="milestone"
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