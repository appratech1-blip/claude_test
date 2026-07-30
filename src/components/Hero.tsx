import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { fadeUp, goldGlowHover, staggerContainer } from '../lib/motion'
import './Hero.css'

const HeroParticles = lazy(() => import('./HeroParticles'))
const Hero3D = lazy(() => import('./Hero3D'))

const REGIONS = ['TN', 'Kerala', 'Karnataka', 'Puducherry', 'Dubai']

function ParticlesFallback() {
  return (
    <Suspense fallback={null}>
      <HeroParticles />
    </Suspense>
  )
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isDesktop
}

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const container = staggerContainer()
  const show3D = isDesktop && !prefersReducedMotion

  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      {!prefersReducedMotion &&
        (show3D ? (
          <div className="hero-3d">
            <Suspense fallback={<ParticlesFallback />}>
              <Hero3D />
            </Suspense>
          </div>
        ) : (
          <ParticlesFallback />
        ))}

      <motion.div
        className="hero-content"
        variants={container}
        initial={prefersReducedMotion ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.span className="hero-eyebrow" variants={fadeUp}>
          Event Management &amp; Rentals
        </motion.span>

        <motion.h1 className="hero-title" variants={fadeUp}>
          Creating Extraordinary Events,
          <br />
          <span className="hero-title-accent">Lasting Memories.</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={fadeUp}>
          End-to-end event management and premium rentals — weddings,
          corporate events, conferences, and large-scale productions delivered
          flawlessly across South India and Dubai.
        </motion.p>

        <motion.div className="hero-regions" variants={fadeUp}>
          {REGIONS.map((region) => (
            <span key={region} className="hero-region-badge">
              {region}
            </span>
          ))}
        </motion.div>

        <motion.div className="hero-actions" variants={fadeUp}>
          <motion.a
            href="#quote"
            className="hero-cta"
            whileHover={prefersReducedMotion ? undefined : goldGlowHover}
            whileFocus={prefersReducedMotion ? undefined : goldGlowHover}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Request a Quote
          </motion.a>
          <motion.a
            href="#portfolio"
            className="hero-secondary"
            whileHover={prefersReducedMotion ? undefined : { color: '#D4AF37' }}
            whileFocus={prefersReducedMotion ? undefined : { color: '#D4AF37' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            View Portfolio
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
