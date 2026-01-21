'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function TransformerAbout() {
    return (
        <section className="relative py-32 bg-transparent overflow-hidden">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header - Data Log Style */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <div className="w-12 h-[2px] bg-primary" />
                        <h2 className="text-primary font-mono text-sm tracking-widest">DATA_LOG_001</h2>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold font-tech text-white mb-2"
                    >
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">CORE</span>
                    </motion.h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Vision - Classified Transmission */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group origin-left"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-transparent opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
                        <div className="relative bg-black border-l-4 border-primary p-8 clip-mech-corned">
                            <h3 className="text-2xl font-tech font-bold text-white mb-6 flex items-center justify-between">
                                VISION
                                <span className="text-xs font-mono text-primary/50">SECURE_TRANSMISSION</span>
                            </h3>
                            <p className="text-xl text-gray-300 font-sans leading-relaxed border-t border-gray-800 pt-6">
                                "To Mould the Young Professionals into Creative and Successful Electrical Engineers to meet with the Global Technological Challenges"
                            </p>
                            {/* Decoding Effect Lines */}
                            <div className="absolute bottom-4 right-4 flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-1 h-1 bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Mission - Stacked Data Blocks */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-8 justify-end"
                        >
                            <h2 className="text-cyan-400 font-mono text-sm tracking-widest">DATA_LOG_002 // MISSION_PROTOCOLS</h2>
                            <div className="w-12 h-[2px] bg-cyan-400" />
                        </motion.div>

                        {[
                            "Provide high quality technical education to students",
                            "Creating excellent infrastructure and learning environment",
                            "Incubating students for successful career and life long learning",
                            "Interaction involving the students and faculty",
                            "Research and Development activities"
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative bg-bg-dark border border-gray-800 p-4 hover:border-cyan-400/50 transition-colors group flex items-center gap-4"
                            >
                                <div className="text-cyan-400 font-mono text-xs opacity-50">0{index + 1}</div>
                                <div className="w-[2px] h-full absolute left-0 top-0 bg-cyan-400 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                                <p className="text-gray-300 group-hover:text-white transition-colors">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
