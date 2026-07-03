import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { supabase } from './lib/supabase'
import type { Viaje, Categoria } from './types'

import LoginPage         from './pages/LoginPage'
import Step1Viaje        from './pages/Step1Viaje'
import Step2Categoria    from './pages/Step2Categoria'
import Step3Subcategoria from './pages/Step3Subcategoria'
import SuccessPage       from './pages/SuccessPage'
import Header            from './components/Header'
import ProgressBar       from './components/ProgressBar'

type Step = 1 | 2 | 3 | 'success'

interface FlowState {
  viaje?:       Viaje
  categoria?:   Categoria
  subcategoria?: string
}

export default function App() {
  const { email, loading, error, login, logout } = useAuth()
  const [step, setStep]   = useState<Step>(1)
  const [state, setState] = useState<FlowState>({})
  const [saving, setSaving] = useState(false)

  if (loading) {
    return (
      <div className="min-h-svh flex items-center justify-center" style={{ background: '#1E3252' }}>
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (!email) {
    return <LoginPage onLogin={login} error={error} />
  }

  if (step === 'success' && state.viaje && state.categoria && state.subcategoria) {
    return (
      <SuccessPage
        viaje={state.viaje}
        categoria={state.categoria}
        subcategoria={state.subcategoria}
        onAddAnother={() => { setState(s => ({ viaje: s.viaje })); setStep(2) }}
        onReset={() => { setStep(1); setState({}) }}
      />
    )
  }

  const handleViajeSelect = (v: Viaje) => {
    setState(s => ({ ...s, viaje: v }))
    setStep(2)
  }

  const handleCategoriaSelect = (c: Categoria) => {
    setState(s => ({ ...s, categoria: c }))
    setStep(3)
  }

  const handleConfirm = async (subcategoria: string, descripcionOtro: string | null) => {
    if (!state.viaje || !state.categoria || !email) return
    setSaving(true)
    try {
      await supabase.from('incidencias').insert({
        user_email:       email,
        numero_viaje:     state.viaje.trip_id,
        hoja_de_ruta:     state.viaje.nro_hr || null,
        categoria:        state.categoria,
        subcategoria,
        descripcion_otro: descripcionOtro,
      })
      setState(s => ({ ...s, subcategoria }))
      setStep('success')
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const numStep = (step === 'success' ? 3 : step) as 1 | 2 | 3

  return (
    <div className="min-h-svh flex flex-col" style={{ maxWidth: 480, margin: '0 auto', background: '#F7F8FA' }}>
      <Header user={{ email }} onLogout={logout} />
      <ProgressBar step={numStep} />
      <div className="flex-1 overflow-y-auto">
        {step === 1 && <Step1Viaje onSelect={handleViajeSelect} />}
        {step === 2 && state.viaje && (
          <Step2Categoria viaje={state.viaje} onBack={() => setStep(1)} onSelect={handleCategoriaSelect} />
        )}
        {step === 3 && state.viaje && state.categoria && (
          <Step3Subcategoria
            viaje={state.viaje}
            categoria={state.categoria}
            onBack={() => setStep(2)}
            onConfirm={handleConfirm}
            saving={saving}
          />
        )}
      </div>
    </div>
  )
}
