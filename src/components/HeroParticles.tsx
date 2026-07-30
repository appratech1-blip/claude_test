import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
}

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let running = true

    const setup = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      const count = Math.min(60, Math.floor((width * height) / 22000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.15,
      }))
    }

    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x = (p.x + p.vx + width) % width
        p.y = (p.y + p.vy + height) % height
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.a})`
        ctx.fill()
      }
      frame = requestAnimationFrame(draw)
    }

    const handleVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running) draw()
      else cancelAnimationFrame(frame)
    }

    setup()
    draw()

    window.addEventListener('resize', setup)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', setup)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />
}

export default HeroParticles
