import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { fadeUp, goldGlowHover, staggerContainer } from '../lib/motion'
import './Hero.css'

const HeroParticles = lazy(() => import('./HeroParticles'))

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const container = staggerContainer()

  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      {!prefersReducedMotion && (
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
      )}

      <motion.div
        className="hero-content"
        variants={container}
        initial={prefersReducedMotion ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.span className="hero-eyebrow" variants={fadeUp}>
          Est. Occasions &middot; Curated Events
        </motion.span>

        <motion.h1 className="hero-title" variants={fadeUp}>
          Unforgettable events,
          <br />
          <span className="hero-title-accent">flawlessly crafted.</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={fadeUp}>
          From intimate galas to landmark celebrations, KTG Events designs and
          manages premium experiences that leave a lasting impression.
        </motion.p>

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
