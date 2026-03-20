import { motion } from 'framer-motion'
import './StickyNote.css'

const NOTE_COLORS = [
  'var(--note-green)',
  'var(--note-beige)',
  'var(--note-sage)',
  'var(--note-cream)',
  'var(--note-mint)',
  'var(--note-peach)',
]

const ROTATIONS = [-3, -1.5, 0, 1.5, 2.5, -2, 1, -0.5, 2, -2.5]

function getSeededRandom(seed, index) {
  const x = Math.sin(seed + index) * 10000
  return x - Math.floor(x)
}

export default function StickyNote({ greeting, index, totalCount }) {
  const idStr = String(greeting.id || index)
  const seed = idStr.charCodeAt(0) + idStr.length
  const colorIndex = Math.floor(getSeededRandom(seed, 1) * NOTE_COLORS.length)
  const rotationIndex = Math.floor(getSeededRandom(seed, 2) * ROTATIONS.length)

  const bg = NOTE_COLORS[colorIndex]
  const rotate = ROTATIONS[rotationIndex]

  const timeStr = new Date(greeting.created_at).toLocaleString('id-ID', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
  })

  return (
    <motion.div
      className="sticky-note"
      style={{ background: bg, '--rotate': `${rotate}deg` }}
      initial={{ opacity: 0, y: 30, rotate: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: 'backOut', delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 10,
        boxShadow: '5px 8px 20px rgba(0,0,0,0.18)',
        transition: { duration: 0.2 }
      }}
    >
      <div className="note-tape" />
      <div className="note-name">✍️ {greeting.name}</div>
      <p className="note-message">{greeting.message}</p>
      <span className="note-time">{timeStr}</span>
    </motion.div>
  )
}
