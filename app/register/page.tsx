'use client'

import { Suspense } from 'react'
import RegistrationFormWrapper from '@/components/RegistrationFormWrapper'

function RegisterContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-center text-gold-400 mb-12">
          Register Now
        </h1>
        <RegistrationFormWrapper />
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-center text-gold-400 mb-12">
            Register Now
          </h1>
          <div className="bg-gray-900/50 border-2 border-gold-500/30 rounded-2xl p-8 md:p-12">
            <p className="text-center text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  )
}
