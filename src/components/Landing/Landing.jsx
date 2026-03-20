import { motion } from 'framer-motion'
import './Landing.css'

const floatingElements = [
  { emoji: '☪️', x: '8%', y: '12%', size: 28, delay: 0 },
  { emoji: '🌙', x: '82%', y: '8%', size: 32, delay: 0.5 },
  { emoji: '✨', x: '15%', y: '72%', size: 20, delay: 1 },
  { emoji: '✨', x: '88%', y: '65%', size: 16, delay: 1.5 },
  { emoji: '🌿', x: '5%', y: '45%', size: 22, delay: 0.8 },
  { emoji: '🌿', x: '90%', y: '38%', size: 22, delay: 1.2 },
]

const arabesque = `M20 0 L40 20 L20 40 L0 20 Z`

export default function Landing({ onStart }) {
  return (
    <section className="landing-section section">
      <div className="pattern-bg" />

      {/* SVG Ornament Top */}
      <div className="ornament-top">
        <svg viewBox="0 0 430 80" xmlns="http://www.w3.org/2000/svg" className="ornament-svg">
          <defs>
            <pattern id="diamond" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d={arabesque} fill="none" stroke="#2d6a4f" strokeWidth="1" opacity="0.3" />
              <circle cx="20" cy="20" r="2" fill="#d4a017" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="430" height="80" fill="url(#diamond)" />
          <line x1="0" y1="79" x2="430" y2="79" stroke="#2d6a4f" strokeWidth="1.5" opacity="0.3" />
        </svg>
      </div>

      {/* Floating Elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="floating-el"
          style={{ left: el.x, top: el.y, fontSize: el.size }}
          animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: el.delay }}
        >
          {el.emoji}
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="landing-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="landing-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Selamat Hari Raya
          <span className="title-highlight"> Idul Fitri</span>
        </motion.h1>

        <motion.p
          className="badge-label"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          Mohon maaf lahir & batin 🙏
        </motion.p>

        <motion.p
          className="landing-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Mari rayakan hari kemenangan dengan berbagi kehangatan penuh suka cita!
        </motion.p>

        <motion.div
          className="divider-ornament"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <span className="line" />
          <span className="star">❋</span>
          <span className="line" />
        </motion.div>

        <motion.p
          className="landing-cta-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Tinggalkan ucapan hangatmu untuk semua yang berkunjung dan dapatkan THR Lebaran! 💰
        </motion.p>

        <motion.button
          className="btn-primary landing-btn"
          onClick={onStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileTap={{ scale: 0.97 }}
        >
          Tulis Ucapan ✉️
        </motion.button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="scroll-hint"
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>Bismillah THR cair</span>
        <span className="arrow">↓</span>
      </motion.div>

      {/* SVG Ornament Bottom */}
      <div className="ornament-bottom">
        <svg viewBox="0 0 430 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 Q107 30 215 15 Q322 0 430 30 L430 0 Z" fill="var(--color-beige-dark)" opacity="0.5" />
        </svg>
      </div>
    </section>
  )
}
