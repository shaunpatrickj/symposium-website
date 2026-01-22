'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import TransformerCountdown from './TransformerCountdown'

export default function TransformerHero() {
    const [mounted, setMounted] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="min-h-screen bg-bg-dark" />

    return (
        <section ref={containerRef} className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-cyber opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-darker" />
            </div>

            {/* Cinematic Intro Text */}
            <div className="relative z-10 text-center space-y-8 pt-24 md:pt-0 pb-20 md:pb-0">


                <motion.div
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                >
                    <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold font-tech text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-tighter relative z-10 leading-tight">
                        BLITZKRIEG&apos;26
                    </h1>
                    <h1 className="absolute top-0 left-0 w-full text-4xl md:text-8xl lg:text-9xl font-bold font-tech text-primary opacity-20 blur-sm animate-pulse z-0 tracking-tighter leading-tight">
                        BLITZKRIEG&apos;26
                    </h1>
                    <div className="absolute -inset-10 border border-primary/10 rounded-full animate-spin-slow opacity-20" />
                </motion.div>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent w-full max-w-2xl mx-auto"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="font-tech text-sm md:text-xl text-gray-400 tracking-widest uppercase px-4"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div>
                            <span className="text-primary mr-2">[</span>
                            National Level Technical Symposium
                            <span className="text-primary ml-2">]</span>
                        </div>
                        <div>
                            <span className="text-primary mr-2">[</span>
                            Department of Electrical and Electronics Engineering
                            <span className="text-primary ml-2">]</span>
                        </div>
                    </div>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 }}
                >
                    <TransformerCountdown />
                </motion.div>

                {/* HUD Controls / Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex flex-col sm:flex-row gap-8 justify-center mt-12"
                >
                    <Link href="/register" className="group relative">
                        <div className="absolute -inset-1 bg-primary/20 blur opacity-0 group-hover:opacity-100 transition duration-200" />
                        <button className="relative px-8 py-4 bg-primary text-black font-tech font-bold tracking-wider clip-button-mech hover:bg-white transition-colors flex items-center gap-3">
                            <span className="w-2 h-2 bg-black animate-pulse" />
                            INITIATE REGISTRATION
                        </button>
                    </Link>

                    <Link href="#events" className="group relative">
                        <button className="relative px-8 py-4 bg-transparent border border-cyan-500/50 text-cyan-500 font-tech font-bold tracking-wider clip-button-mech hover:bg-cyan-500/10 transition-colors flex items-center gap-3">
                            EXPLORE EVENTS
                            <span className="w-2 h-2 border border-cyan-500" />
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative HUD Elements */}
            <div className="absolute top-20 left-10 w-[2px] h-32 bg-gradient-to-b from-primary to-transparent opacity-50 hidden md:block" />
            <div className="absolute bottom-20 right-10 w-[2px] h-32 bg-gradient-to-t from-primary to-transparent opacity-50 hidden md:block" />

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/50 text-xs font-mono tracking-widest"
            >
                SCROLL TO ACCESS DATA
            </motion.div>
        </section>
    )
}
