'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Badge {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

interface BadgeDisplayProps {
  badges: Badge[]
  animated?: boolean
  className?: string
}

export default function BadgeDisplay({ 
  badges, 
  animated = true,
  className = ''
}: BadgeDisplayProps) {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'gold':
        return 'text-battle-gold'
      case 'silver':
        return 'text-battle-silver'
      case 'bronze':
        return 'text-battle-bronze'
      case 'green':
        return 'text-battle-success'
      case 'blue':
        return 'text-blue-500'
      case 'red':
        return 'text-battle-fire'
      default:
        return 'text-gray-600'
    }
  }

  const getBadgeGlow = (color: string) => {
    switch (color) {
      case 'gold':
        return 'shadow-battle-gold/50'
      case 'silver':
        return 'shadow-battle-silver/50'
      case 'bronze':
        return 'shadow-battle-bronze/50'
      case 'green':
        return 'shadow-battle-success/50'
      case 'blue':
        return 'shadow-blue-500/50'
      case 'red':
        return 'shadow-battle-fire/50'
      default:
        return 'shadow-gray-500/50'
    }
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={animated ? { scale: 0, rotate: -180 } : false}
          animate={animated ? { scale: 1, rotate: 0 } : false}
          transition={{ 
            delay: index * 0.1, 
            type: "spring", 
            stiffness: 200 
          }}
          whileHover={{ 
            scale: 1.2, 
            rotate: 5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setHoveredBadge(badge.id)}
          onHoverEnd={() => setHoveredBadge(null)}
          className={`
            relative cursor-pointer p-2 rounded-full 
            ${getBadgeColor(badge.color)} 
            ${hoveredBadge === badge.id ? getBadgeGlow(badge.color) : ''}
            transition-all duration-300
          `}
          title={badge.description}
        >
          <span className="text-2xl">{badge.icon}</span>
          
          {/* Hover tooltip */}
          {hoveredBadge === badge.id && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10"
            >
              {badge.name}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </motion.div>
          )}
          
          {/* Achievement sparkle effect */}
          {badge.id === '25k' && (
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-yellow-300 opacity-30"
            />
          )}
        </motion.div>
      ))}
    </div>
  )
} 