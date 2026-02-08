'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function MapPage() {
    return (
        <div className="min-h-screen text-white font-sans selection:bg-primary/30 relative overflow-hidden">
            <div className="container mx-auto px-4 py-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto space-y-12"
                >
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-200 to-gold-400 animate-shimmer">
                            EVENT LOCATION
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl font-mono">
                            {"// R.M.K. ENGINEERING COLLEGE_"}
                        </p>
                    </div>

                    {/* Map Container */}
                    <div className="relative p-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-xl">
                        <div className="bg-bg-darker/90 p-4 rounded-xl border border-primary/20 backdrop-blur-sm relative overflow-hidden group">

                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />

                            {/* Map Iframe */}
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1089.4909947144538!2d80.14262176942515!3d13.357040187078125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d807de229f987%3A0x11cc13e2927bfabc!2sR.M.K.%20Engineering%20College!5e0!3m2!1sen!2sin!4v1768967141071!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                ></iframe>
                            </div>

                            {/* Status Bar */}
                            <div className="mt-4 flex items-center justify-between text-xs font-mono text-primary/70">
                                <span>STATUS: ONLINE</span>
                                <span>COORDINATES: 13.3570° N, 80.1426° E</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
