import { useState } from 'react'

interface Props {
  onLogin: (email: string) => Promise<boolean>
  error: string | null
}

export default function LoginPage({ onLogin, error }: Props) {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    await onLogin(email)
    setLoading(false)
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-6" style={{ background: '#1E3252' }}>
      <div className="w-full max-w-sm space-y-8 animate-fade-up">

        {/* Logo */}
        <div className="text-center space-y-3">
          <img src="/logo-avancargo.png" alt="Avancargo" className="h-16 mx-auto" style={{ filter: 'brightness(0) invert(1)' }} />
          <p className="text-white/60 text-sm">Registro de incidencias logísticas</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-xl space-y-4">
          <p className="text-center text-sm font-medium" style={{ color: '#1E3252' }}>
            Ingresá tu email para continuar
          </p>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tucorreo@empresa.com"
            required
            className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition"
            style={{
              borderColor: error ? '#ef4444' : '#E3E4E4',
              color: '#1E3252',
            }}
            onFocus={e => { if (!error) e.currentTarget.style.borderColor = '#2C9FC0' }}
            onBlur={e => { if (!error) e.currentTarget.style.borderColor = '#E3E4E4' }}
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full py-3 rounded-xl font-bold text-white text-sm transition tap-active disabled:opacity-40"
            style={{ background: '#FF6C02' }}
          >
            {loading ? 'Verificando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
