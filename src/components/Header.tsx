import { LogOut } from 'lucide-react'

interface Props {
  user: { email: string }
  onLogout: () => void
}

export default function Header({ user, onLogout }: Props) {
  const initials = user.email.split('@')[0].slice(0, 2).toUpperCase()

  return (
    <header className="flex items-center justify-between px-4 py-3" style={{ background: '#1E3252' }}>
      <img src="/logo-avancargo.png" alt="Avancargo" className="h-6" style={{ filter: 'brightness(0) invert(1)' }} />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: '#FF6C02' }}>
          {initials}
        </div>
        <button onClick={onLogout} className="text-white/60 hover:text-white transition p-1">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
