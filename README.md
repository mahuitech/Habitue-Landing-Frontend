# Habitué · Landing de clientes

Base móvil para el club de cada comercio, accesible desde NFC sin instalación.
Las pantallas y la identidad visual se implementarán a partir de los wireframes.

## Desarrollo

Requisito: Node.js >=22.13.0 y npm. Versión de desarrollo fijada: 22.23.4
en `.nvmrc` y `.node-version` (compatible con nvm/fnm). Activarla antes de instalar.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3001 (el panel puede continuar en 3000).

```sh
npm run check
```

Ejecuta ESLint, generación de tipos, TypeScript y build de producción.
`npm run start` sirve el build en el puerto 3001.

## Tecnologías

Next.js App Router, React, TypeScript estricto y Tailwind CSS, con las mismas
versiones declaradas que el panel al inicializar. Roboto local, Radix Slot,
CVA, clsx y tailwind-merge para mantener sus patrones de componentes.
Sin gráficas, React Query ni servicios externos hasta que sean necesarios.

## Organización

- `src/app`: rutas, layouts, metadata y estados de navegación.
- `src/components/ui`: Button (CTA con variantes y asChild), Input y Checkbox.
- `src/components/shared`: FormField accesible con label, ayuda y errores.
- `src/features`: módulos por dominio, con components, contratos, validación y servicios cuando se implementen.
- `src/hooks`: hooks compartidos cuando exista una necesidad real.
- `src/lib`: utilidades transversales; `cn` combina clases como en el panel.
- `public`: recursos estáticos.
- `docs`: alcance y decisiones pendientes.

Los nombres de archivos usan kebab-case, los componentes PascalCase y las
importaciones el alias `@/`. Mantener las páginas ligeras y la lógica de negocio
en features. Usar Server Components por defecto y Client Components solo para
interacción. No agregar dependencias o capas sin un uso concreto.

## Estado actual

Landing y formulario de alta con branding por comercio. Ejemplos locales:
http://localhost:3001/costra y http://localhost:3001/fresh-food.
Los formularios validan datos pero no crean membresías ni los persisten.

`HABITUE_API_BASE_URL` permite cargar marca/configuración en servidor desde el
endpoint público propuesto. No definirla mantiene el modo de vista previa.
Ver `.env.example`, [estado frontend](docs/frontend-status.md) y
[endpoints pendientes](docs/endpoints-pendientes/README.md).

Las pantallas de canje, Wallet, sesión y recuperación quedan pendientes de sus
contratos. No se añaden integraciones ni credenciales del panel al cliente.
