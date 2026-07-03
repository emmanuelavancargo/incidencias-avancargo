import { Plus, LogOut } from 'lucide-react'
import type { Viaje, Categoria } from '../types'
import { CATEGORIAS } from '../types'

interface Props {
  viaje: Viaje
  categoria: Categoria
  subcategoria: string
  onAddAnother: () => void
  onReset: () => void
}

export default function SuccessPage({ viaje, categoria, subcategoria, onAddAnother, onReset }: Props) {
  const cat = CATEGORIAS.find(c => c.id === categoria)!

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-6 animate-fade-up" style={{ background: '#F7F8FA' }}>
      <div className="w-full max-w-sm space-y-6 text-center">

        {/* Checkmark */}
        <div className="flex items-center justify-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center animate-check"
            style={{ background: '#0DCB7B' }}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path d="M8 22L18 32L36 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="font-mono-brand text-2xl font-bold" style={{ color: '#1E3252' }}>
            ¡Incidencia registrada!
          </h2>
          <p className="text-gray-500 text-sm">Se guardó correctamente en el sistema</p>
        </div>

        {/* Resumen */}
        <div className="rounded-2xl p-5 text-left space-y-3 shadow-sm" style={{ background: '#fff' }}>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Viaje</p>
            <p className="font-mono-brand font-bold text-sm" style={{ color: '#FF6C02' }}>{viaje.trip_id}</p>
            <p className="text-sm" style={{ color: '#1E3252' }}>{viaje.transporte ?? viaje.chofer ?? '—'}</p>
          </div>
          <div className="border-t border-gray-100" />
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Categoría</p>
            <p className="text-sm font-semibold" style={{ color: cat.color }}>
              {cat.emoji} {categoria}
            </p>
          </div>
          <div className="border-t border-gray-100" />
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Subcategoría</p>
            <p className="text-sm font-medium" style={{ color: '#1E3252' }}>{subcategoria}</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          <button
            onClick={onAddAnother}
            className="w-full py-4 rounded-2xl font-bold text-white text-base tap-active transition flex items-center justify-center gap-2"
            style={{ background: '#FF6C02' }}
          >
            <Plus className="w-5 h-5" />
            Agregar otra incidencia al viaje
          </button>

          <button
            onClick={onReset}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm tap-active transition flex items-center justify-center gap-2 border-2"
            style={{ color: '#1E3252', borderColor: '#1E3252', background: 'transparent' }}
          >
            <LogOut className="w-4 h-4" />
            Terminar
          </button>
        </div>

      </div>
    </div>
  )
}
