import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './THRSection.css'

const GOPAY_LINK = 'https://gopay.co.id/klaim-thr' // ← Ganti dengan link GoPay asli

export default function THRSection() {
  const [opened, setOpened] = useState(false)

  return (
    <section className="thr-section section">
      <div className="thr-bg-ornament">
        <svg viewBox="0 0 430 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60 Q107 0 215 50 Q322 100 430 40 L430 0 L0 0 Z" fill="rgba(45,106,79,0.06)" />
          <path d="M0 120 Q107 60 215 100 Q322 140 430 90 L430 200 L0 200 Z" fill="rgba(212,160,23,0.05)" />
        </svg>
      </div>

      <motion.div
        className="thr-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">🎁 THR Lebaran</span>
        <h2 className="section-title">Yang Paling Ditunggu!</h2>
        <p className="section-desc">
          Sebagai bentuk syukur di hari kemenangan ini, ada sedikit rezeki untuk berbagi kebahagiaan
        </p>
      </motion.div>

      {/* Envelope */}
      <motion.div
        className={`envelope-wrapper ${opened ? 'opened' : ''}`}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'backOut', delay: 0.2 }}
        onClick={() => !opened && setOpened(true)}
      >
        <div className="envelope">
          <div className="envelope-body">
            {/* Decorative diamond pattern */}
            <div className="env-pattern" />

            {/* Flap */}
            <motion.div
              className="envelope-flap"
              animate={opened ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <div className="flap-inner" />
              <div className="flap-seal">
                <span>❋</span>
              </div>
            </motion.div>

            {/* Content inside envelope */}
            <AnimatePresence>
              {opened && (
                <motion.div
                  className="envelope-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="money-emoji">💵</div>
                  <p className="env-greeting">
                    Taqabbalallahu minna wa minkum.<br />
                    Semoga rezeki ini menjadi berkah.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!opened && (
              <div className="envelope-hint">
                <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  Ketuk untuk membuka 👆
                </motion.span>
              </div>
            )}
          </div>

          {/* Envelope bottom triangles */}
          <div className="envelope-left-corner" />
          <div className="envelope-right-corner" />
          <div className="envelope-bottom-corner" />
        </div>
      </motion.div>

      {/* CTA after opened */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="thr-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="cta-label">Klaim THR-mu sekarang melalui</p>
            <a
              href={GOPAY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="gopay-btn"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/1200px-Gopay_logo.svg.png"
                alt="GoPay"
                className="gopay-logo"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span>Klaim via GoPay</span>
              <span className="arrow-icon">→</span>
            </a>
            <p className="cta-note">*Link akan membuka aplikasi GoPay dari HP kamu</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        className="thr-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="ornament-divider">
          <span className="ornament-divider-icon">❋</span>
        </div>
        <p className="footer-text">
          Minal Aidin wal Faizin · Selamat Idul Fitri 1447 H
        </p>
        <p className="footer-sub">Dibuat dengan 💚 dan kebahagiaan</p>
      </motion.div>
    </section>
  )
}
