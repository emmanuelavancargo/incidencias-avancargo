import { useState, useRef } from 'react'
import type { Viaje } from '../types'

const CLIENT_ID   = import.meta.env.VITE_MS_GRAPH_CLIENT_ID  as string
const TENANT_ID   = import.meta.env.VITE_MS_GRAPH_TENANT_ID  as string
const FILE_ID     = import.meta.env.VITE_EXCEL_FILE_ID        as string
const SHEET_NAME  = import.meta.env.VITE_EXCEL_SHEET_NAME     as string

let _token: string | null = null
let _tokenExpiry = 0

async function getToken(): Promise<string> {
  if (_token && Date.now() < _tokenExpiry) return _token
  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: import.meta.env.VITE_MS_GRAPH_CLIENT_SECRET as string,
        scope: 'https://graph.microsoft.com/.default',
      }),
    }
  )
  const data = await res.json() as { access_token: string; expires_in: number }
  _token = data.access_token
  _tokenExpiry = Date.now() + (data.expires_in - 60) * 1000
  return _token
}

export function useMsGraph() {
  const [results, setResults] = useState<Viaje[]>([])
  const [loading, setLoading] = useState(false)
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = (query: string) => {
    if (debounce.current) clearTimeout(debounce.current)
    if (query.length < 2) { setResults([]); return }

    debounce.current = setTimeout(async () => {
      setLoading(true)
      try {
        const token = await getToken()
        const url = `https://graph.microsoft.com/v1.0/drives/${FILE_ID}/items/root:/workbook/worksheets/${SHEET_NAME}/usedRange`
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json() as { values: string[][] }
        const rows = data.values?.slice(1) ?? [] // skip header

        const q = query.toLowerCase()
        const matches: Viaje[] = rows
          .filter(r => r[0]?.toLowerCase().includes(q) || r[1]?.toLowerCase().includes(q))
          .slice(0, 8)
          .map(r => ({
            nro_viaje:    r[0] ?? '',
            hoja_de_ruta: r[1] ?? '',
            cliente:      r[2] ?? '',
            origen:       r[3] ?? '',
            destino:      r[4] ?? '',
          }))
        setResults(matches)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }

  return { results, loading, search, clear: () => setResults([]) }
}
