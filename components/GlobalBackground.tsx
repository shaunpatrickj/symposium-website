'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
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

        // Configuration
        const particleCount = 60
        const connectionDistance = 150
        const mouseDistance = 200
        const colors = ['#fbbf24', '#22d3ee'] // Gold and Cyan

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
            initParticles()
        }

        const mouse = { x: -1000, y: -1000 }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const initParticles = () => {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                })
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            // Update and draw particles
            particles.forEach((p, i) => {
                // Movement
                p.x += p.vx
                p.y += p.vy

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1
                if (p.y < 0 || p.y > height) p.vy *= -1

                // Mouse interaction (repel)
                const dx = mouse.x - p.x
                const dy = mouse.y - p.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (mouseDistance - distance) / mouseDistance
                    const directionX = forceDirectionX * force * 2
                    const directionY = forceDirectionY * force * 2
                    p.x -= directionX
                    p.y -= directionY
                }

                // Draw Star
                const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
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
                    ctx.fillStyle = p.color
                    ctx.globalAlpha = 0.8
                    ctx.fill();
                }

                drawStar(p.x, p.y, 5, p.size * 2, p.size)

                // Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < connectionDistance) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist / connectionDistance * 0.1})`
                        ctx.lineWidth = 1
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
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
