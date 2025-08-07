'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FootballTheme from './themes/FootballTheme'
import RocketTheme from './themes/RocketTheme'

interface ThemeSelectorProps {
  currentAmount: number
  goal: number
  onThemeChange?: (theme: string) => void
}

export default function ThemeSelector({ 
  currentAmount, 
  goal, 
  onThemeChange 
}: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState('football')
  
  const themes = [
    { id: 'football', name: '🏈 Drive to 500K', icon: '🏈', description: 'Football field progression' },
    { id: 'rocket', name: '🚀 Rocket to the Moon', icon: '🚀', description: 'Fuel gauge and boosters' },
    { id: 'sailboat', name: '⛵ Sail to Success', icon: '⛵', description: 'Regatta race with wind gusts' },
    { id: 'balloon', name: '🎈 Rise Above', icon: '🎈', description: 'Hot air balloon altitude' },
    { id: 'skyscraper', name: '🏙️ Empire State Build', icon: '🏙️', description: 'Skyscraper construction' },
    { id: 'factory', name: '⚙️ Machine of Momentum', icon: '⚙️', description: 'Steampunk factory' },
  ]

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme)
    onThemeChange?.(theme)
  }

  const progress = (currentAmount / goal) * 100

  const renderTheme = () => {
    switch (selectedTheme) {
      case 'football':
        return (
          <FootballTheme 
            progress={progress}
            goal={goal}
            currentAmount={currentAmount}
            className="w-full"
          />
        )
      case 'rocket':
        return (
          <RocketTheme 
            progress={progress}
            goal={goal}
            currentAmount={currentAmount}
            className="w-full"
          />
        )
      default:
        return (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-4">{themes.find(t => t.id === selectedTheme)?.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {themes.find(t => t.id === selectedTheme)?.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {themes.find(t => t.id === selectedTheme)?.description}
              </p>
              <div className="text-2xl font-bold text-battle-fire">
                ${currentAmount.toLocaleString()} / ${goal.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Theme Selector */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contest Themes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {themes.map((theme) => (
            <motion.button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedTheme === theme.id
                  ? 'border-battle-gold bg-gradient-to-r from-yellow-50 to-orange-50'
                  : 'border-gray-200 bg-white hover:border-battle-gold'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">{theme.icon}</div>
              <div className="text-sm font-semibold text-gray-900">{theme.name}</div>
              <div className="text-xs text-gray-600">{theme.description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Theme Display */}
      <motion.div
        key={selectedTheme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {renderTheme()}
      </motion.div>
    </div>
  )
} 