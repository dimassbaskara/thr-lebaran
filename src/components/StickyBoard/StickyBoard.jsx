import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StickyNote from '../StickyNote/StickyNote'
import './StickyBoard.css'

export default function StickyBoard({ greetings, loading }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <section className="board-section section">
      <div className="board-bg-layer" />

      <motion.div
        className="board-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">📌 Papan Ucapan</span>
        <h2 className="section-title">Salam untuk Semua</h2>
        <p className="section-desc">
          {loading
            ? 'Memuat ucapan...'
            : greetings.length === 0
              ? 'Belum ada ucapan. Jadilah yang pertama! 🌙'
              : `${greetings.length} ucapan telah dikirim`}
        </p>
      </motion.div>

      {/* CTA Reveal Button */}
      <AnimatePresence mode="wait">
        {!loading && !revealed && greetings.length > 0 && (
          <motion.div
            className="reveal-cta-wrapper"
            key="cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {/* Preview blur peek */}
            <div className="notes-peek">
              {greetings.slice(0, 4).map((g, index) => (
                <div
                  key={g.id}
                  className="peek-note"
                  style={{ '--i': index }}
                />
              ))}
            </div>

            <motion.button
              className="btn-primary reveal-btn"
              onClick={() => setRevealed(true)}
              whileTap={{ scale: 0.96 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              📖 Lihat Ucapan
            </motion.button>
            <p className="reveal-hint">
              {greetings.length} orang telah mengirimkan salam hangat 💚
            </p>
          </motion.div>
        )}

        {/* Skeleton loading */}
        {loading && (
          <motion.div
            key="loading"
            className="board-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-note" style={{ '--i': i }} />
            ))}
          </motion.div>
        )}

        {/* Revealed Notes */}
        {!loading && revealed && (
          <motion.div
            key="notes"
            className="notes-masonry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {greetings.map((g, index) => (
              <StickyNote
                key={g.id}
                greeting={g}
                index={index}
                totalCount={greetings.length}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live indicator — only when revealed */}
      {!loading && revealed && greetings.length > 0 && (
        <motion.div
          className="live-badge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="live-dot" />
          Live · memperbarui otomatis
        </motion.div>
      )}
    </section>
  )
}
