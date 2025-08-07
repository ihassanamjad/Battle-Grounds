'use client'

import { useState } from 'react'
import { useBattleGroundsStore } from '@/store'
import { motion } from 'framer-motion'
import { Target, DollarSign, Calendar, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'

export default function SubmitDealPage() {
  const { agents, currentContest, addDeal } = useBattleGroundsStore()
  
  const [formData, setFormData] = useState({
    agentId: '',
    premium: '',
    linesOfBusiness: [] as string[],
    notes: '',
    date: new Date().toISOString().split('T')[0]
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const lineOfBusinessOptions = [
    'Auto',
    'Home',
    'Life',
    'Commercial',
    'Health',
    'Umbrella',
    'Motorcycle',
    'RV'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.agentId) {
      newErrors.agentId = 'Please select an agent'
    }
    
    if (!formData.premium || parseFloat(formData.premium) <= 0) {
      newErrors.premium = 'Please enter a valid premium amount'
    }
    
    if (formData.linesOfBusiness.length === 0) {
      newErrors.linesOfBusiness = 'Please select at least one line of business'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    if (!currentContest) {
      toast.error('No active contest found')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const newDeal = {
        id: `deal-${Date.now()}`,
        agentId: formData.agentId,
        contestId: currentContest.id,
        premium: parseFloat(formData.premium),
        linesOfBusiness: formData.linesOfBusiness,
        notes: formData.notes,
        date: formData.date,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
      }
      
      addDeal(newDeal)
      
      // Trigger confetti for large deals
      if (parseFloat(formData.premium) >= 10000) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
      
      toast.success(`Deal submitted successfully! $${parseFloat(formData.premium).toLocaleString()} premium`)
      
      // Reset form
      setFormData({
        agentId: '',
        premium: '',
        linesOfBusiness: [],
        notes: '',
        date: new Date().toISOString().split('T')[0]
      })
      
    } catch (error) {
      toast.error('Failed to submit deal. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLineOfBusinessToggle = (lob: string) => {
    setFormData(prev => ({
      ...prev,
      linesOfBusiness: prev.linesOfBusiness.includes(lob)
        ? prev.linesOfBusiness.filter(item => item !== lob)
        : [...prev.linesOfBusiness, lob]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-battle-success to-battle-fire rounded-lg flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Submit Deal</h1>
              <p className="text-gray-600">
                {currentContest?.name || 'No active contest'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Agent Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent
              </label>
              <select
                value={formData.agentId}
                onChange={(e) => setFormData(prev => ({ ...prev, agentId: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-battle-success focus:border-transparent ${
                  errors.agentId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select an agent</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} - {agent.office}
                  </option>
                ))}
              </select>
              {errors.agentId && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.agentId}
                </div>
              )}
            </div>

            {/* Premium Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Premium Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.premium}
                  onChange={(e) => setFormData(prev => ({ ...prev, premium: e.target.value }))}
                  placeholder="0.00"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-battle-success focus:border-transparent ${
                    errors.premium ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.premium && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.premium}
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deal Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-battle-success focus:border-transparent"
                />
              </div>
            </div>

            {/* Lines of Business */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lines of Business
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {lineOfBusinessOptions.map((lob) => (
                  <motion.button
                    key={lob}
                    type="button"
                    onClick={() => handleLineOfBusinessToggle(lob)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.linesOfBusiness.includes(lob)
                        ? 'border-battle-success bg-battle-success text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-battle-success'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {lob}
                  </motion.button>
                ))}
              </div>
              {errors.linesOfBusiness && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.linesOfBusiness}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes about the deal..."
                  rows={3}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-battle-success focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-battle-success to-battle-fire hover:from-battle-fire hover:to-battle-success'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Deal
                </div>
              )}
            </motion.button>
          </form>

          {/* Quick Stats */}
          {currentContest && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contest Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Goal</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${currentContest.goal.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Theme</p>
                  <p className="text-xl font-bold text-gray-900 capitalize">
                    {currentContest.theme}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(currentContest.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(currentContest.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 