import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './GreetingForm.css'

export default function GreetingForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef(null)

  const MAX_MSG = 200

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError('Nama dan ucapan wajib diisi ya 🙏')
      return
    }
    if (message.length > MAX_MSG) {
      setError(`Ucapan maksimal ${MAX_MSG} karakter`)
      return
    }

    setError('')
    setLoading(true)

    try {
      await onSubmit(name.trim(), message.trim())
      setSuccess(true)
      setName('')
      setMessage('')
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error(err)
      setError(`Gagal: ${err.message || 'Periksa koneksi internetmu'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="form-section section">
      <div className="pattern-bg" />

      <motion.div
        className="form-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">✉️ Kartu Ucapan</span>
        <h2 className="section-title">Sampaikan Hangat<br />dari Hatimu</h2>
        <p className="section-desc">
          Sampaikan salammu untuk semua 👋<br /> Pesan terbaikmu akan disampaikan di papan ucapan bersama.
        </p>
      </motion.div>

      <motion.form
        ref={formRef}
        className="greeting-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="form-group">
          <label className="form-label">Nama kamu</label>
          <input
            type="text"
            className="form-input"
            placeholder="Nama lengkap atau panggilan kamu "
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Ucapan Lebaran dari kamu</label>
          <textarea
            className="form-textarea"
            placeholder="Tulis ucapan lebaran yang ikhlas dari hatimu..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MAX_MSG}
            disabled={loading}
            rows={4}
          />
          <span className={`char-count ${message.length > MAX_MSG * 0.85 ? 'warn' : ''}`}>
            {message.length}/{MAX_MSG}
          </span>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="form-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          className="btn-primary form-submit-btn"
          disabled={loading}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? (
            <>
              <span className="spinner" /> Menyimpan...
            </>
          ) : (
            <>Kirim Ucapan 🌙</>
          )}
        </motion.button>

        <AnimatePresence>
          {success && (
            <motion.div
              className="success-toast"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              ✅ Ucapanmu sudah tersampaikan, terima kasih! 🌟
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  )
}
