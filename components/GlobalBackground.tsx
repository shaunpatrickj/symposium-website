'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    life: number
    type: 'background' | 'trail' | 'shooting'
}

const GlobalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight
        let animationFrameId: number
        let particles: Particle[] = []

        const colors = {
            gold: '#fbbf24',
            cyan: '#22d3ee',
            white: '#ffffff'
        }

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
            initParticles()
        }

        const mouse = { x: -1000, y: -1000, lastX: -1000, lastY: -1000 }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.lastX = mouse.x
            mouse.lastY = mouse.y
            mouse.x = e.clientX
            mouse.y = e.clientY

            // Create trail particles
            const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2))
            const count = Math.min(5, Math.ceil(speed / 2))

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: mouse.x + (Math.random() - 0.5) * 10,
                    y: mouse.y + (Math.random() - 0.5) * 10,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    size: Math.random() * 2 + 1,
                    color: Math.random() > 0.5 ? colors.gold : colors.cyan,
                    life: 1.0,
                    type: 'trail'
                })
            }
        }

        // Initialize background stars
        const initParticles = () => {
            // Keep existing particles that are trails, reset background ones
            particles = particles.filter(p => p.type !== 'background')

            const particleCount = Math.floor(width * height / 15000) // Responsive count

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    size: Math.random() * 1.5 + 0.5,
                    color: Math.random() > 0.7 ? colors.cyan : colors.white, // mostly white stars
                    life: 1.0,
                    type: 'background'
                })
            }
        }

        const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string, opacity: number) => {
            let rot = Math.PI / 2 * 3;
            let x = cx;
            let y = cy;
            let step = Math.PI / spikes;

            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius)
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y)
                rot += step

                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y)
                rot += step
            }
            ctx.lineTo(cx, cy - outerRadius)
            ctx.closePath();
            ctx.fillStyle = color
            ctx.globalAlpha = opacity
            ctx.fill();
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            // Random Shooting Star
            if (Math.random() < 0.02) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height * 0.5,
                    vx: (Math.random() - 0.5) * 10 + 5, // Fast horizontal
                    vy: (Math.random() - 0.5) * 2 + 2, // Downward
                    size: Math.random() * 2 + 2,
                    color: colors.white,
                    life: 1.0,
                    type: 'shooting'
                })
            }

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i]

                p.x += p.vx
                p.y += p.vy

                if (p.type === 'background') {
                    // Wrap around
                    if (p.x < 0) p.x = width
                    if (p.x > width) p.x = 0
                    if (p.y < 0) p.y = height
                    if (p.y > height) p.y = 0

                    // Connected lines for background stars
                    // (Optimization: only check nearby stars? brute force is ok for <100 stars)
                    // Let's only connect if close to mouse or random flicker

                    // Draw Background Star
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                    ctx.fillStyle = p.color
                    ctx.globalAlpha = Math.random() * 0.5 + 0.3 // Twinkle
                    ctx.fill()
                } else if (p.type === 'trail') {
                    p.life -= 0.02
                    p.size *= 0.95

                    if (p.life <= 0) {
                        particles.splice(i, 1)
                        continue
                    }

                    drawStar(p.x, p.y, 4, p.size * 2, p.size, p.color, p.life)
                } else if (p.type === 'shooting') {
                    p.life -= 0.01
                    p.x += p.vx * 2
                    p.y += p.vy * 2

                    if (p.life <= 0 || p.x > width || p.y > height) {
                        particles.splice(i, 1)
                        continue
                    }

                    // Trail for shooting star
                    ctx.beginPath()
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3)
                    ctx.strokeStyle = `rgba(255, 255, 255, ${p.life})`
                    ctx.lineWidth = 2
                    ctx.stroke()

                    drawStar(p.x, p.y, 5, p.size * 2, p.size, p.color, p.life)
                }
            }

            // Connect nearby background particles (constellation effect)
            ctx.globalAlpha = 0.15
            ctx.lineWidth = 0.5
            ctx.strokeStyle = colors.cyan

            const backgroundParticles = particles.filter(p => p.type === 'background')
            backgroundParticles.forEach((p1, idx) => {
                for (let j = idx + 1; j < backgroundParticles.length; j++) {
                    const p2 = backgroundParticles[j]
                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 100) {
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }

                // Connect to mouse
                const dx = mouse.x - p1.x
                const dy = mouse.y - p1.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 150) {
                    ctx.beginPath()
                    ctx.strokeStyle = colors.gold
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.stroke()
                }
            })


            animationFrameId = requestAnimationFrame(draw)
        }

        // Initialize
        handleResize()
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        draw()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    )
}

export default GlobalBackground
