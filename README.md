# Cocina Oculta Curumaní

Sitio web profesional para restaurante/cocina oculta en Curumaní, Cesar, Colombia.

## Stack

- Next.js 14 (App Router) + TypeScript
- Supabase (Auth, PostgreSQL, Storage)
- Tailwind CSS
- Animaciones: Framer Motion, GSAP, Lottie
- Deploy: Vercel

## Estructura

```
/app/(public)
/app/admin
/components/public
/components/admin
/components/ui
/components/animations
/lib/supabase
/hooks
/types
```

## Requisitos previos

- Node.js 18+
- Cuenta de Supabase y proyecto creado
- Cuenta de Vercel

## Configuración

1. Clonar el repo e instalar dependencias:

```
npm install
```

2. Crear variables de entorno usando `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

3. Ejecutar el esquema SQL en Supabase:

- Abrir SQL Editor y pegar el contenido de `supabase/schema.sql`.
- Ejecutar.

4. Buckets de Storage:

- `dish-images`, `gallery`, `assets` (públicos).

## Desarrollo

```
npm run dev
```

- App pública en `http://localhost:3000/`
- Panel admin en `/admin`

## Producción

- Deploy en Vercel (importar proyecto, configurar variables de entorno).
- Configurar dominio y preview.

## Accesibilidad y rendimiento

- Respeta `prefers-reduced-motion`.
- Lazy loading de imágenes.
- Lighthouse >90 (usar imágenes optimizadas y Vercel).

## SEO

- Metadata en `app/layout.tsx`.
- `app/sitemap.ts` y `app/robots.txt`.

## Notas

- Panel admin con CRUD de platillos, categorías con orden, horarios y galería.
- Validación con Zod.
- Animaciones 60fps con Framer Motion y Lottie.