import { ChevronLeft } from 'lucide-react'
import type { Viaje, Categoria } from '../types'
import { CATEGORIAS } from '../types'

interface Props {
  viaje: Viaje
  onBack: () => void
  onSelect: (c: Categoria) => void
}

export default function Step2Categoria({ viaje, onBack, onSelect }: Props) {
  return (
    <div className="px-4 pt-4 space-y-4 animate-fade-up">
      {/* Back + viaje */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition tap-active">
          <ChevronLeft className="w-5 h-5" style={{ color: '#1E3252' }} />
        </button>
        <span className="text-sm text-gray-500">Viaje seleccionado</span>
      </div>

      {/* Viaje card */}
      <div className="rounded-2xl p-4 shadow-sm" style={{ background: '#1E3252' }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono-brand text-xs font-bold" style={{ color: '#FF6C02' }}>
            {viaje.trip_id}
          </span>
          {viaje.nro_hr && (
            <span className="text-white/50 text-xs">· HR: {viaje.nro_hr}</span>
          )}
        </div>
        <p className="text-white font-semibold text-sm">{viaje.transporte ?? viaje.chofer ?? '—'}</p>
        <p className="text-white/60 text-xs mt-0.5">{viaje.lugar_carga ?? '—'}{viaje.fecha ? ` · ${viaje.fecha}` : ''}</p>
      </div>

      <div>
        <h2 className="font-mono-brand text-lg font-bold" style={{ color: '#1E3252' }}>
          ¿Qué tipo de incidencia?
        </h2>
        <p className="text-sm text-gray-500 mt-1">Seleccioná una categoría</p>
      </div>

      {/* Grid 2x3 */}
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIAS.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="tap-active rounded-2xl p-4 text-left shadow-sm border border-transparent active:scale-95 transition-all"
            style={{ background: cat.bg, borderColor: cat.color + '30' }}
          >
            <span className="text-3xl block mb-2">{cat.emoji}</span>
            <span className="text-sm font-semibold leading-tight block" style={{ color: cat.color }}>
              {cat.id}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
