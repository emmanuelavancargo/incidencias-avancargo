export type Categoria =
  | 'Clima y Rutas'
  | 'Cliente'
  | 'Mercadería'
  | 'Logística / Operaciones'
  | 'Administrativo'

export interface Viaje {
  trip_id: string
  hr: string | null
  nro_hr: string | null
  fecha: string | null
  transporte: string | null
  chofer: string | null
  lugar_carga: string | null
  estado: string | null
}

export interface Incidencia {
  id?: string
  created_at?: string
  user_email: string
  numero_viaje: string
  hoja_de_ruta: string | null
  categoria: Categoria
  subcategoria: string
  descripcion_otro: string | null
}

export const SUBCATEGORIAS: Record<Categoria, string[]> = {
  'Clima y Rutas': [
    'Desvío por mal estado de caminos',
    'Ingreso denegado por lluvia',
    'Desvío por ruta sugerida inadecuada',
    'Dirección errónea en hoja de ruta',
    'Mapa erróneo en hoja de ruta',
    'Error en el orden de las etapas del viaje',
    'Cambio de almacenes de carga',
    'Otro',
  ],
  'Cliente': [
    'Cliente cambia el lugar de descarga',
    'Cliente posterga la entrega',
    'Cliente no informado del envío',
    'Cliente no tiene personal para descargar',
    'Cliente rechaza la entrega',
    'Carga enviada a campo sin condiciones para recibir',
    'Otro',
  ],
  'Mercadería': [
    'Bolsas dañadas o rotas',
    'Faltante de bolsas',
    'Bolsas sucias o contaminadas',
    'Pallets mal fajados',
    'Envío de recambio de bolsas dañadas',
    'Devolución de bolsas con costo',
    'Devolución de bolsas sin costo',
    'Otro',
  ],
  'Logística / Operaciones': [
    'Error en tipo de unidad solicitada',
    'Descarga errónea del chofer',
    'Envío de híbrido incorrecto',
    'Error de calibre enviado',
    'Envío de lote incorrecto',
    'Envío de producto vencido o no aceptado',
    'Error de rotulado',
    'Otro',
  ],
  'Administrativo': [
    'Problemas de créditos del cliente',
    'Demora para generar DOPRO San Luis',
    'Otro',
  ],
}

export const CATEGORIAS: { id: Categoria; emoji: string; color: string; bg: string }[] = [
  { id: 'Clima y Rutas',          emoji: '🌧️', color: '#4A7C9E', bg: '#EBF4FA' },
  { id: 'Cliente',                emoji: '👤', color: '#FF6C02', bg: '#FFF3EB' },
  { id: 'Mercadería',             emoji: '📦', color: '#DC2626', bg: '#FEF2F2' },
  { id: 'Logística / Operaciones',emoji: '⚙️', color: '#16A34A', bg: '#F0FDF4' },
  { id: 'Administrativo',         emoji: '📋', color: '#7C3AED', bg: '#F5F3FF' },
]
