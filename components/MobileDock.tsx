'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Calendar, Map, Zap, Bus } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MobileDock() {
    const pathname = usePathname()

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Events', path: '/events', icon: Calendar },
        { name: 'Map', path: '/map', icon: Map },
        { name: 'Transport', path: '/transport', icon: Bus },
        { name: 'Register', path: '/register', icon: Zap },
    ]

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden w-full max-w-[350px] px-4">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-bg-darker/90 backdrop-blur-lg border border-primary/20 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex justify-between items-center clip-mech-corned relative overflow-hidden"
            >
                {/* Decorative scanning line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-line opacity-50" />

                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.path

                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={cn(
                                "flex flex-col items-center gap-1 relative group p-2 rounded-xl transition-colors",
                                isActive ? "text-primary" : "text-gray-400 hover:text-gray-200"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="dock-bg"
                                    className="absolute inset-0 bg-primary/10 rounded-xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-tech tracking-wider">{item.name}</span>
                        </Link>
                    )
                })}
            </motion.div>
        </div>
    )
}
