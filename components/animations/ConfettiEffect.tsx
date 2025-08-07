'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiEffectProps {
  trigger: boolean
  type?: 'default' | 'milestone' | 'victory' | 'battle-win' | 'firework' | 'sparkle'
  position?: { x: number; y: number }
}

export default function ConfettiEffect({ 
  trigger, 
  type = 'default',
  position = { x: 0.5, y: 0.6 }
}: ConfettiEffectProps) {
  useEffect(() => {
    if (!trigger) return

    const configs = {
      default: {
        particleCount: 80,
        spread: 60,
        origin: position,
        colors: ['#FFD700', '#FF4500', '#10B981', '#3B82F6', '#8B5CF6'],
        gravity: 0.8,
        ticks: 150,
        startVelocity: 25,
        decay: 0.9,
        shapes: ['circle']
      },
      milestone: {
        particleCount: 120,
        spread: 80,
        origin: position,
        colors: ['#FFD700', '#FFA500', '#FF6347', '#FF8C00', '#FFD700'],
        gravity: 0.6,
        ticks: 200,
        startVelocity: 35,
        decay: 0.85,
        shapes: ['star']
      },
      victory: {
        particleCount: 200,
        spread: 160,
        origin: position,
        colors: ['#FFD700', '#C0C0C0', '#CD7F32', '#FFD700', '#FFF8DC'],
        gravity: 0.5,
        ticks: 300,
        startVelocity: 40,
        decay: 0.8,
        shapes: ['star', 'circle']
      },
      'battle-win': {
        particleCount: 250,
        spread: 180,
        origin: position,
        colors: ['#FF4500', '#FF6347', '#FF8C00', '#FFD700', '#FF0000'],
        gravity: 0.7,
        ticks: 250,
        startVelocity: 45,
        decay: 0.75,
        shapes: ['star', 'circle', 'square']
      },
      firework: {
        particleCount: 300,
        spread: 360,
        origin: position,
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
        gravity: 0.3,
        ticks: 400,
        startVelocity: 60,
        decay: 0.6,
        shapes: ['star', 'circle']
      },
      sparkle: {
        particleCount: 150,
        spread: 90,
        origin: position,
        colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF1493', '#00FF7F'],
        gravity: 0.4,
        ticks: 250,
        startVelocity: 30,
        decay: 0.7,
        shapes: ['star']
      }
    }

    const config = configs[type]
    
    // Trigger confetti with enhanced effects
    confetti({
      ...config,
      scalar: type === 'victory' ? 1.2 : 1,
      drift: type === 'battle-win' ? 0.5 : 0,
      angle: type === 'milestone' ? 90 : 45,
    })

    // Add multiple bursts for more dramatic effects
    if (type === 'victory') {
      setTimeout(() => {
        confetti({
          ...config,
          origin: { x: position.x - 0.1, y: position.y },
          particleCount: 100,
        })
      }, 200)
      setTimeout(() => {
        confetti({
          ...config,
          origin: { x: position.x + 0.1, y: position.y },
          particleCount: 100,
        })
      }, 400)
    }

    if (type === 'battle-win') {
      // Create a firework-like effect
      setTimeout(() => {
        confetti({
          ...config,
          origin: { x: position.x - 0.2, y: position.y },
          particleCount: 80,
          colors: ['#FF4500', '#FF6347'],
        })
      }, 150)
      setTimeout(() => {
        confetti({
          ...config,
          origin: { x: position.x + 0.2, y: position.y },
          particleCount: 80,
          colors: ['#FF8C00', '#FFD700'],
        })
      }, 300)
    }

    if (type === 'firework') {
      // Create multiple firework bursts
      setTimeout(() => {
        confetti({
          ...config,
          origin: { x: position.x - 0.3, y: position.y },
          particleCount: 100,
          colors: ['#FF6B6B', '#4ECDC4'],
        })
      }, 100)
      setTimeout(() => {
        confetti({
          ...config,
          origin: { x: position.x + 0.3, y: position.y },
          particleCount: 100,
          colors: ['#45B7D1', '#96CEB4'],
        })
      }, 200)
      setTimeout(() => {
        confetti({
          ...config,
          origin: { x: position.x, y: position.y - 0.1 },
          particleCount: 100,
          colors: ['#FFEAA7', '#DDA0DD'],
        })
      }, 300)
    }

    if (type === 'sparkle') {
      // Create sparkle effect with multiple small bursts
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti({
            ...config,
            origin: { 
              x: position.x + (Math.random() - 0.5) * 0.4, 
              y: position.y + (Math.random() - 0.5) * 0.4 
            },
            particleCount: 30,
            spread: 45,
          })
        }, i * 100)
      }
    }

    // Add sound effect simulation (in real app, would use Web Audio API)
    if (typeof window !== 'undefined') {
      // Simulate sound effect
      console.log(`🎉 ${type} celebration triggered!`)
    }
  }, [trigger, type, position])

  return null
} 