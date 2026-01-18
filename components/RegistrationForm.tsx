'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface EventOption {
  id: string
  name: string
}

interface RegistrationFormProps {
  events: EventOption[]
  preSelectedEvent?: string | null
}

interface FormData {
  name: string
  email: string
  phone: string
  college: string
  department: string
  yearOfStudy: string
  selectedEvents: string[]
}

interface FormErrors {
  [key: string]: string
}

export default function RegistrationForm({ events, preSelectedEvent }: RegistrationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    yearOfStudy: '',
    selectedEvents: preSelectedEvent ? [preSelectedEvent] : [],
  })

  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (preSelectedEvent) {
      setFormData(prev => ({
        ...prev,
        selectedEvents: [preSelectedEvent],
      }))
    }
  }, [preSelectedEvent])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.college.trim()) {
      newErrors.college = 'Please enter your college name'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Please enter your department'
    }

    if (!formData.yearOfStudy.trim()) {
      newErrors.yearOfStudy = 'Please select your year of study'
    }

    if (formData.selectedEvents.length === 0) {
      newErrors.selectedEvents = 'Please select at least one event'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleEventToggle = (eventId: string) => {
    setFormData(prev => {
      const newSelectedEvents = prev.selectedEvents.includes(eventId)
        ? prev.selectedEvents.filter(id => id !== eventId)
        : [...prev.selectedEvents, eventId]
      
      return {
        ...prev,
        selectedEvents: newSelectedEvents,
      }
    })
    // Clear error when user selects an event
    if (errors.selectedEvents) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.selectedEvents
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.')
      }

      setSubmitSuccess(true)
      // Redirect to success page or show success message
      setTimeout(() => {
        router.push('/register/success')
      }, 2000)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-gray-900/50 border-2 border-gold-500 rounded-xl p-12 text-center">
        <div className="text-6xl mb-6">✓</div>
        <h2 className="text-3xl font-display font-bold text-gold-400 mb-4">
          Registration Successful!
        </h2>
        <p className="text-gray-300 text-lg">
          Redirecting you to the confirmation page...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/50 border-2 border-gold-500/30 rounded-2xl p-8 md:p-12 shadow-2xl">
      {/* Name */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-white font-semibold mb-2">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black/50 border-2 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all ${
            errors.name ? 'border-red-500' : 'border-gold-500/30'
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-white font-semibold mb-2">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black/50 border-2 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all ${
            errors.email ? 'border-red-500' : 'border-gold-500/30'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label htmlFor="phone" className="block text-white font-semibold mb-2">
          Phone <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black/50 border-2 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all ${
            errors.phone ? 'border-red-500' : 'border-gold-500/30'
          }`}
          placeholder="+1234567890"
        />
        {errors.phone && (
          <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* College */}
      <div className="mb-6">
        <label htmlFor="college" className="block text-white font-semibold mb-2">
          College <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="college"
          name="college"
          value={formData.college}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black/50 border-2 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all ${
            errors.college ? 'border-red-500' : 'border-gold-500/30'
          }`}
          placeholder="Enter your college name"
        />
        {errors.college && (
          <p className="text-red-400 text-sm mt-1">{errors.college}</p>
        )}
      </div>

      {/* Department */}
      <div className="mb-6">
        <label htmlFor="department" className="block text-white font-semibold mb-2">
          Department <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black/50 border-2 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all ${
            errors.department ? 'border-red-500' : 'border-gold-500/30'
          }`}
          placeholder="e.g., Electronics, Computer Science"
        />
        {errors.department && (
          <p className="text-red-400 text-sm mt-1">{errors.department}</p>
        )}
      </div>

      {/* Year of Study */}
      <div className="mb-6">
        <label htmlFor="yearOfStudy" className="block text-white font-semibold mb-2">
          Year of Study <span className="text-red-400">*</span>
        </label>
        <select
          id="yearOfStudy"
          name="yearOfStudy"
          value={formData.yearOfStudy}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black/50 border-2 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-all ${
            errors.yearOfStudy ? 'border-red-500' : 'border-gold-500/30'
          }`}
        >
          <option value="">Select year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
          <option value="Post Graduate">Post Graduate</option>
        </select>
        {errors.yearOfStudy && (
          <p className="text-red-400 text-sm mt-1">{errors.yearOfStudy}</p>
        )}
      </div>

      {/* Select Events */}
      <div className="mb-8">
        <label className="block text-white font-semibold mb-4">
          Select Event(s) <span className="text-red-400">*</span>
        </label>
        <div className="space-y-3">
          {events.map((event) => (
            <label
              key={event.id}
              className="flex items-center p-4 bg-black/30 border-2 border-gold-500/20 rounded-lg cursor-pointer hover:border-gold-500/50 transition-all"
            >
              <input
                type="checkbox"
                checked={formData.selectedEvents.includes(event.id)}
                onChange={() => handleEventToggle(event.id)}
                className="w-5 h-5 text-gold-500 bg-black border-gold-500 rounded focus:ring-gold-500 focus:ring-2"
              />
              <span className="ml-3 text-white font-medium">{event.name}</span>
            </label>
          ))}
        </div>
        {errors.selectedEvents && (
          <p className="text-red-400 text-sm mt-2">{errors.selectedEvents}</p>
        )}
      </div>

      {/* Submit Error */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
          <p className="text-red-400">{submitError}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gold-500 text-black font-bold text-xl rounded-lg hover:bg-gold-400 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none glow-gold"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
      </button>
    </form>
  )
}
