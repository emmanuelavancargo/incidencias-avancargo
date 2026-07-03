-- Tabla de emails habilitados (administrada manualmente)
create table if not exists public.usuarios_permitidos (
  email text primary key
);

-- Cualquiera puede leer la lista (solo para verificar si está habilitado)
alter table public.usuarios_permitidos enable row level security;
create policy "lectura publica" on public.usuarios_permitidos
  for select using (true);

-- Tabla de incidencias
create table if not exists public.incidencias (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  user_email       text not null,
  numero_viaje     text not null,
  hoja_de_ruta     text,
  categoria        text not null,
  subcategoria     text not null,
  descripcion_otro text
);

alter table public.incidencias enable row level security;

-- Cualquier anon puede insertar (la validación de email se hace en la app)
create policy "insert anon" on public.incidencias
  for insert with check (true);

-- Índices
create index on public.incidencias (numero_viaje);
create index on public.incidencias (created_at desc);
