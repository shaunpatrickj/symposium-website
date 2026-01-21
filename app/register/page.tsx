'use client'

import { Suspense } from 'react'
import RegistrationFormWrapper from '@/components/RegistrationFormWrapper'

function RegisterContent() {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-2xl mx-auto pt-20">
        <div className="mb-12 text-center relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 tracking-wider">
            <span className="text-primary text-2xl md:text-4xl align-top mr-2">[</span>
            INITIATE
            <span className="text-primary mx-2">/</span>
            REGISTRATION
            <span className="text-primary text-2xl md:text-4xl align-top ml-2">]</span>
          </h1>
          <p className="text-cyan-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase bg-bg-dark inline-block px-4">
            Enter_Candidate_Details
          </p>
        </div>
        <RegistrationFormWrapper />
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-transparent py-12 px-4">
        <div className="max-w-2xl mx-auto pt-20">
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
