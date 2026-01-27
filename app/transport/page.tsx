'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Bus } from 'lucide-react'
import busRoutesData from '@/data/bus_routes.json'

export default function TransportPage() {
    const [searchQuery, setSearchQuery] = useState('')

    // Filter routes based on search query
    const filteredRoutes = useMemo(() => {
        if (!searchQuery.trim()) return busRoutesData

        const lowerQuery = searchQuery.toLowerCase()
        return busRoutesData.filter((route) =>
            route.busNumber.toString().includes(lowerQuery) ||
            route.startingPoint.toLowerCase().includes(lowerQuery) ||
            route.route.toLowerCase().includes(lowerQuery)
        )
    }, [searchQuery])

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black overflow-x-hidden font-sans">
            <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            <div className="relative pt-24 pb-32 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">

                {/* Hero Section */}
                <div className="text-center mb-12 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <h1 className="text-4xl md:text-6xl font-tech font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            TRANSPORT <span className="text-primary">ROUTES</span>
                        </h1>
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                    </motion.div>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-tech tracking-wide">
                        Locate your bus route for the symposium. Search by bus number, starting point, or any stop name.
                    </p>
                </div>

                {/* Search Bar */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl mx-auto w-full mb-12 relative z-10"
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-bg-darker border border-white/10 rounded-full px-6 py-4 shadow-2xl focus-within:border-primary/50 transition-all duration-300">
                            <Search className="w-6 h-6 text-primary mr-4" />
                            <input
                                type="text"
                                placeholder="Search bus number, route, or stop..."
                                className="w-full bg-transparent border-none outline-none text-white placeholder:text-gray-500 font-tech tracking-wide text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                        {/* Corner Accents */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg opacity-50" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg opacity-50" />
                    </div>
                </motion.div>

                {/* Results List */}
                <div className="flex-1 w-full max-w-4xl mx-auto space-y-4">
                    {filteredRoutes.length > 0 ? (
                        filteredRoutes.map((route, index) => (
                            <motion.div
                                key={route.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative bg-bg-darker/50 border border-white/5 hover:border-primary/30 rounded-xl p-6 transition-all duration-300 hover:bg-white/5"
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                                    {/* Bus Number Badge */}
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 bg-black border-2 border-primary rounded-lg flex flex-col items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-shadow">
                                            <span className="text-xs text-primary/80 font-tech">BUS NO</span>
                                            <span className="text-3xl font-bold font-tech text-white">{route.busNumber}</span>
                                            <div className="absolute top-0 right-0 w-3 h-3 bg-primary" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                                        </div>
                                    </div>

                                    {/* Route Details */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2 text-primary font-bold text-xl font-tech uppercase tracking-wider">
                                            <MapPin className="w-5 h-5" />
                                            {route.startingPoint}
                                        </div>

                                        <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-white/20 transition-colors">
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {/* Highlight matches if searching */}
                                                {searchQuery ? (
                                                    <HighlightMatch text={route.route} query={searchQuery} />
                                                ) : (
                                                    route.route
                                                )}
                                            </p>

                                            {/* Decorative Line Indicator */}
                                            <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#FBBF24]" />
                                            <div className="absolute bottom-0 left-[-5px] w-2 h-2 rounded-full bg-gray-600" />
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 opacity-50">
                            <Bus className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                            <h3 className="text-xl font-tech text-gray-300">No matching bus route found</h3>
                            <p className="text-gray-500 mt-2">Try searching for a different stop or location.</p>
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                <div className="text-center mt-12 text-sm text-gray-500 font-tech">
                    * Bus timings are tentative. Please arrive at your stop 10 minutes early.
                </div>

            </div>
        </div>
    )
}

// Helper to highlight search terms
function HighlightMatch({ text, query }: { text: string, query: string }) {
    if (!query) return <>{text}</>

    const parts = text.split(new RegExp(`(${query})`, 'gi'))

    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <span key={i} className="bg-primary/20 text-primary font-bold px-1 rounded">{part}</span>
                ) : (
                    part
                )
            )}
        </>
    )
}
