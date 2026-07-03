import { useState, useRef } from 'react'
import { Search, Loader2, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Viaje } from '../types'

interface Props { onSelect: (v: Viaje) => void }

export default function Step1Viaje({ onSelect }: Props) {
  const [query, setQuery]     = useState('')
  const [open, setOpen]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Viaje[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = async (val: string) => {
    if (val.length < 2) { setResults([]); return }
    setLoading(true)
    const { data } = await supabase
      .from('viajes')
      .select('*')
      .or(`trip_id.ilike.%${val}%,nro_hr.ilike.%${val}%`)
      .limit(10)
    setResults((data as Viaje[]) ?? [])
    setLoading(false)
  }

  const handleChange = (val: string) => {
    setQuery(val)
    setOpen(val.length >= 2)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 300)
  }

  const handleSelect = (v: Viaje) => {
    setOpen(false)
    setQuery('')
    onSelect(v)
  }

  return (
    <div className="px-4 pt-4 space-y-4 animate-fade-up">
      <div>
        <h2 className="font-mono-brand text-lg font-bold" style={{ color: '#1E3252' }}>
          Buscá el viaje
        </h2>
        <p className="text-sm text-gray-500 mt-1">Por N° de viaje o hoja de ruta</p>
      </div>

      <div className="relative">
        <div className="flex items-center gap-3 bg-white rounded-2xl border-2 px-4 py-3 shadow-sm transition-all"
          style={{ borderColor: query.length >= 2 ? '#2C9FC0' : '#E3E4E4' }}>
          <Search className="w-5 h-5 flex-shrink-0" style={{ color: '#2C9FC0' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleChange(e.target.value)}
            placeholder="Ej: AV-2024-001 o HR-123..."
            className="flex-1 outline-none text-sm bg-transparent placeholder:text-gray-300"
            style={{ color: '#1E3252' }}
            autoComplete="off"
          />
          {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10">
            {results.length === 0 && !loading && (
              <div className="px-4 py-6 text-center text-sm text-gray-400">
                Sin resultados para "{query}"
              </div>
            )}
            {results.map((v, i) => (
              <button
                key={i}
                onClick={() => handleSelect(v)}
                className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50 active:bg-blue-50 transition border-b border-gray-50 last:border-0 tap-active"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono-brand text-xs font-bold" style={{ color: '#FF6C02' }}>
                      {v.trip_id}
                    </span>
                    {v.nro_hr && (
                      <span className="text-xs text-gray-400">HR: {v.nro_hr}</span>
                    )}
                  </div>
                  <div className="text-sm font-medium truncate" style={{ color: '#1E3252' }}>
                    {v.transporte ?? v.chofer ?? '—'}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {v.lugar_carga ?? '—'}{v.fecha ? ` · ${v.fecha}` : ''}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl p-4" style={{ background: '#EBF4FA' }}>
        <p className="text-xs" style={{ color: '#2C9FC0' }}>
          💡 Escribí al menos 2 caracteres para ver coincidencias del Excel de viajes.
        </p>
      </div>
    </div>
  )
}
