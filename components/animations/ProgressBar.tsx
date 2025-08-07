'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ProgressBarProps {
  progress: number
  theme?: 'default' | 'football' | 'rocket' | 'sailboat' | 'balloon' | 'skyscraper'
  showPercentage?: boolean
  animated?: boolean
  className?: string
}

export default function ProgressBar({ 
  progress, 
  theme = 'default',
  showPercentage = true,
  animated = true,
  className = ''
}: ProgressBarProps) {
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentProgress(progress)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setCurrentProgress(progress)
    }
  }, [progress, animated])

  const getThemeStyles = () => {
    const baseStyles = "h-4 rounded-full overflow-hidden relative"
    
    switch (theme) {
      case 'football':
        return `${baseStyles} bg-green-800 border-2 border-white`
      case 'rocket':
        return `${baseStyles} bg-gradient-to-r from-blue-900 to-purple-900`
      case 'sailboat':
        return `${baseStyles} bg-gradient-to-r from-blue-600 to-cyan-500`
      case 'balloon':
        return `${baseStyles} bg-gradient-to-r from-pink-400 to-purple-500`
      case 'skyscraper':
        return `${baseStyles} bg-gradient-to-r from-gray-700 to-gray-900`
      default:
        return `${baseStyles} bg-gray-200`
    }
  }

  const getProgressStyles = () => {
    switch (theme) {
      case 'football':
        return "bg-gradient-to-r from-green-500 to-green-600"
      case 'rocket':
        return "bg-gradient-to-r from-orange-400 to-red-500"
      case 'sailboat':
        return "bg-gradient-to-r from-blue-400 to-blue-600"
      case 'balloon':
        return "bg-gradient-to-r from-pink-300 to-purple-400"
      case 'skyscraper':
        return "bg-gradient-to-r from-yellow-400 to-orange-500"
      default:
        return "bg-gradient-to-r from-battle-success to-battle-fire"
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'football':
        return '🏈'
      case 'rocket':
        return '🚀'
      case 'sailboat':
        return '⛵'
      case 'balloon':
        return '🎈'
      case 'skyscraper':
        return '🏙️'
      default:
        return null
    }
  }

  return (
    <div className={`${getThemeStyles()} ${className}`}>
      <motion.div
        className={`h-full ${getProgressStyles()} transition-all duration-1000 ease-out`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(currentProgress, 100)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      {getThemeIcon() && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg">{getThemeIcon()}</span>
        </div>
      )}
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white drop-shadow-lg">
            {Math.round(currentProgress)}%
          </span>
        </div>
      )}
    </div>
  )
} 