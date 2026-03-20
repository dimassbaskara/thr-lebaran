import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Hanya buat client jika env sudah dikonfigurasi dengan URL yang valid
const isValidUrl = (url) => {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl))

// Lazy init — hanya createClient jika URL valid
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
