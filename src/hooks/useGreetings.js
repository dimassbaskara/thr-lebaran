import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const LS_KEY = 'thr_greetings'

// localStorage helpers
function lsLoad() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] }
  catch { return [] }
}
function lsSave(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

export function useGreetings() {
  const [greetings, setGreetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Mode localStorage — data persisten di browser ini
      setTimeout(() => {
        setGreetings(lsLoad())
        setLoading(false)
      }, 300)
      return
    }

    fetchFromSupabase()
    const channel = subscribeRealtime()
    return () => { supabase.removeChannel(channel) }
  }, [])

  async function fetchFromSupabase() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('greetings')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setGreetings(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function subscribeRealtime() {
    return supabase
      .channel('greetings-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'greetings' }, (payload) => {
        setGreetings((prev) => [payload.new, ...prev])
      })
      .subscribe()
  }

  async function addGreeting(name, message) {
    const newItem = {
      id: crypto.randomUUID(),
      name,
      message,
      created_at: new Date().toISOString(),
    }

    if (!isSupabaseConfigured) {
      // Simpan ke localStorage
      const updated = [newItem, ...lsLoad()]
      lsSave(updated)
      setGreetings(updated)
      return newItem
    }

    const { data, error } = await supabase
      .from('greetings')
      .insert([{ name, message }])
      .select()
      .single()
    if (error) throw error
    return data
  }

  return { greetings, loading, error, addGreeting, isDemo: !isSupabaseConfigured }
}
