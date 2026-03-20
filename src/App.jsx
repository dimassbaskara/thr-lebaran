import { useRef } from 'react'
import { useGreetings } from './hooks/useGreetings'
import Landing from './components/Landing/Landing'
import GreetingForm from './components/GreetingForm/GreetingForm'
import StickyBoard from './components/StickyBoard/StickyBoard'
import THRSection from './components/THRSection/THRSection'
import './App.css'

export default function App() {
  const { greetings, loading, addGreeting } = useGreetings()
  const boardRef = useRef(null)
  const formRef = useRef(null)

  function handleScrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleSubmitGreeting(name, message) {
    await addGreeting(name, message)
    setTimeout(() => {
      boardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 1200)
  }

  return (
    <div className="app-container">
      {/* Section 1: Landing / Hero */}
      <Landing onStart={handleScrollToForm} />

      {/* Section 2: Form Ucapan */}
      <div ref={formRef}>
        <GreetingForm onSubmit={handleSubmitGreeting} />
      </div>

      {/* Divider */}
      <div className="ornament-divider" style={{ padding: '0 24px' }}>
        <span className="ornament-divider-icon">❋</span>
      </div>

      {/* Section 3: Sticky Board */}
      <div ref={boardRef}>
        <StickyBoard greetings={greetings} loading={loading} />
      </div>

      {/* Section 4: THR Claim */}
      <THRSection />
    </div>
  )
}
