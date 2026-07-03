import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const STORAGE_KEY = 'incidencias_user_email'

export function useAuth() {
  const [email, setEmail]     = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setEmail(saved)
    setLoading(false)
  }, [])

  const login = async (inputEmail: string) => {
    setError(null)
    const normalized = inputEmail.trim().toLowerCase()
    const { data, error: dbError } = await supabase
      .from('usuarios_permitidos')
      .select('email')
      .eq('email', normalized)
      .maybeSingle()

    if (dbError) { console.error('Supabase error:', JSON.stringify(dbError)); setError('Error de conexión. Intentá de nuevo.'); return false }
    if (!data)   { setError('Este email no está habilitado para ingresar.'); return false }

    localStorage.setItem(STORAGE_KEY, normalized)
    setEmail(normalized)
    return true
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setEmail(null)
  }

  return { email, loading, error, login, logout }
}
