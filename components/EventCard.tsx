'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Event } from '@/lib/events'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const isPaperPresentation = event.slug === 'paper-presentation' || event.id === 'paper-presentation'
  const isPhotonQuest = event.slug === 'photon-quest' || event.id === 'photon-quest'
  const isCircuitDebugging = event.slug === 'circuit-debugging' || event.id === 'circuit-debugging'
  const isMindSpark = event.slug === 'mind-spark' || event.id === 'mind-spark'
  const isPowerhouse = event.slug === 'powerhouse' || event.id === 'powerhouse'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={`group relative h-full bg-gray-900/40 border border-gray-700/50 p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-colors ${(isPaperPresentation || isPhotonQuest || isCircuitDebugging || isMindSpark || isPowerhouse) ? '' : 'overflow-hidden'
        }`}
    >
      {/* Container for background elements that need clipping */}
      <div className={`absolute inset-0 ${(isPaperPresentation || isPhotonQuest || isCircuitDebugging || isMindSpark || isPowerhouse) ? 'overflow-hidden rounded-[inherit]' : ''}`}>
        {/* Hover Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-500 group-hover:border-cyan-400 transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-500 group-hover:border-cyan-400 transition-colors" />

        {/* Decorative scanline */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform -translate-x-full group-hover:animate-scan-line opacity-50" />
      </div>

      {isPaperPresentation && (
        <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-auto h-[35%] z-20 pointer-events-none">
          <img
            src="/images/chibi.png"
            alt="Character"
            className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}

      {isPhotonQuest && (
        <div className="absolute -top-[14%] left-1/2 -translate-x-1/2 w-auto h-[28%] z-20 pointer-events-none">
          <img
            src="/images/chibi-electro.png"
            alt="PhotonQuest Character"
            className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}

      {isCircuitDebugging && (
        <div className="absolute -top-[14%] left-1/2 -translate-x-1/2 w-auto h-[28%] z-20 pointer-events-none">
          <img
            src="/images/chibi-circuit.png"
            alt="Circuit Debugging Character"
            className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}

      {isMindSpark && (
        <div className="absolute -top-[16%] left-1/2 -translate-x-1/2 w-auto h-[30%] z-20 pointer-events-none">
          <img
            src="/images/chibi-mind-spark-sitting.png"
            alt="Mind Spark Character"
            className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}

      {isPowerhouse && (
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-auto h-[30%] z-20 pointer-events-none">
          <img
            src="/images/chibi-powerhouse.png"
            alt="Powerhouse Character"
            className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-2xl font-tech font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
          {event.name}
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>

        <p className="text-gray-400 mb-6 flex-grow font-sans text-sm leading-relaxed whitespace-pre-line">
          {event.description}
        </p>

        <Link
          href={`/events/${event.slug}`}
          className="inline-flex items-center gap-2 text-primary font-tech font-bold text-sm tracking-wider hover:text-cyan-400 transition-colors group/link"
        >
          ACCESS PROTOCOL
          <svg
            className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}
