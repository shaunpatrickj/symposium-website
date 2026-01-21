'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date('2026-02-09T00:00:00')
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        }
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
}

export default function TransformerCountdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const timeUnits = [
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HOURS', value: timeLeft.hours },
        { label: 'MINUTES', value: timeLeft.minutes },
        { label: 'SECONDS', value: timeLeft.seconds },
    ]

    return (
        <div className="flex gap-4 md:gap-8 justify-center py-8">
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className="flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-primary/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative bg-bg-darker border border-primary/30 p-4 min-w-[80px] md:min-w-[100px] text-center clip-mech-corned backdrop-blur-sm">
                            <span className="text-3xl md:text-5xl font-mono font-bold text-white text-glow">
                                {unit.value.toString().padStart(2, '0')}
                            </span>

                            {/* Decorative ticks */}
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
                        </div>
                    </div>
                    <div className="mt-2 text-cyan-400 font-tech text-xs md:text-sm tracking-widest opacity-80">
                        {unit.label}
                    </div>
                </div>
            ))}
        </div>
    )
}
