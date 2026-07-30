import { motion, type Variants } from 'motion/react'
import './Hero.css'

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />

      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
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
          From intimate galas to landmark celebrations, we design and manage
          premium experiences that leave a lasting impression.
        </motion.p>

        <motion.div className="hero-actions" variants={fadeUp}>
          <motion.a
            href="#contact"
            className="hero-cta"
            whileHover={{ scale: 1.045, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Plan Your Event
          </motion.a>
          <a href="#portfolio" className="hero-secondary">
            View Portfolio
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
