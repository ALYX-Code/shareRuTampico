# shareRuTampico

Mini landing publica para links compartidos de RuTampico.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

El deploy debe servir `dist` como sitio estatico y reenviar cualquier ruta a `index.html`.
Este repo incluye `public/_redirects` para hosts compatibles con ese formato y `vercel.json`
para Vercel.

## Rutas soportadas

- `/` muestra la landing general.
- `/route/:id` muestra una ruta compartida por identificador.
- `/share?...` conserva compatibilidad con los links actuales generados por la app Expo de RuTampico.

## Configuracion

Las URLs importantes viven en `src/config.ts`:

- `webBaseUrl`: fallback web de RuTampico.
- `appStoreUrl`: URL final de App Store.
- `googlePlayUrl`: URL final de Google Play.
- `appScheme`: esquema deep link de la app, actualmente `rutampico`.
- `shareHost`: host publico esperado para deploy.

Antes de produccion, cambia los placeholders de App Store y Google Play por las URLs reales.
