interface Props { step: 1 | 2 | 3 }

const LABELS = ['Viaje', 'Categoría', 'Subcategoría']

export default function ProgressBar({ step }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      {LABELS.map((label, i) => {
        const n = i + 1
        const done    = n < step
        const current = n === step
        return (
          <div key={n} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: done ? '#0DCB7B' : current ? '#FF6C02' : '#E3E4E4',
                  color: done || current ? '#fff' : '#9CA3AF',
                }}
              >
                {done ? '✓' : n}
              </div>
              <span
                className="text-xs font-medium hidden sm:block"
                style={{ color: current ? '#1E3252' : done ? '#0DCB7B' : '#9CA3AF' }}
              >
                {label}
              </span>
            </div>
            {i < LABELS.length - 1 && (
              <div className="flex-1 h-0.5 rounded-full transition-all duration-500"
                style={{ background: done ? '#0DCB7B' : '#E3E4E4' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
