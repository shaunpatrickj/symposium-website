'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function TransformerNavbar() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { name: 'HOME', path: '/' },
        { name: 'EVENTS', path: '/events' },
        { name: 'MAP', path: '/map' },
    ]

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "py-2 bg-bg-darker/90 backdrop-blur-md border-b border-primary/20" : "py-4 bg-bg-darker/80 backdrop-blur-sm border-b border-white/5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo / Brand HUD */}
                <div className="flex items-center gap-4">
                    <div className="w-2 h-10 bg-primary animate-pulse" />
                    <Link href="/" className="font-tech text-2xl font-bold tracking-widest text-white relative group">
                        <span className="text-glow group-hover:text-primary transition-colors">BLITZKRIEG</span>
                        <span className="text-primary ml-2 text-sm opacity-70">2K26</span>
                    </Link>
                </div>

                {/* Navigation HUD */}
                <div className="hidden md:flex items-center gap-1 clip-mech-panel bg-bg-darker/50 border border-primary/20 px-8 py-2 relative">
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary" />

                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={cn(
                                "relative px-6 py-2 font-tech font-bold tracking-wider text-sm transition-all hover:text-primary",
                                pathname === item.path ? "text-primary" : "text-gray-400"
                            )}
                        >
                            <span className="relative z-10">{item.name}</span>
                            {pathname === item.path && (
                                <motion.div
                                    layoutId="nav-glow"
                                    className="absolute inset-0 bg-primary/10 border-b-2 border-primary z-0"
                                />
                            )}
                        </Link>
                    ))}

                    <div className="w-[1px] h-6 bg-gray-700 mx-2" />

                    <Link
                        href="/register"
                        className="group relative px-6 py-2 font-tech font-bold text-black bg-primary clip-button-mech hover:bg-white transition-colors"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            DEPLOY <span className="text-xs opacity-70">{"/// REGISTER"}</span>
                        </span>
                    </Link>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-4">
                    <Link
                        href="/register"
                        className="px-4 py-2 font-tech font-bold text-black bg-primary rounded-sm hover:bg-white transition-colors text-sm"
                    >
                        DEPLOY /// REGISTER
                    </Link>
                    <div className="text-primary font-tech">
                        [ MENU ]
                    </div>
                </div>
            </div>

            {/* Decorative HUD Lines */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.nav>
    )
}
