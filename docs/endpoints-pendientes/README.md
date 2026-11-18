# Endpoints pendientes — experiencia cliente

Fecha: 18/11/2026. **Estado: propuesta para revisión con backend .NET.**
Mismo formato que el paquete del panel administrativo: convenciones, decisiones
abiertas, DTO, método/URL, body/query, éxito y errores por módulo.
No acredita la existencia de estas rutas. El panel no se ha modificado.

## Lectura recomendada

1. [Convenciones](00-convenciones.md).
2. [Decisiones abiertas](decisiones-abiertas.md).
3. El módulo correspondiente. Confirmar contrato y OpenAPI antes de activar datos reales.

| Documento | Alcance | Estado frontend |
| --- | --- | --- |
| [Landing y NFC](01-landing-nfc.md) | Identidad pública, programa y contexto de interacción | Loader configurable y fixtures; API real sin verificar |
| [Alta y sesión](02-alta-sesion.md) | Registro, consentimientos, cookie, acceso y recuperación | Formulario y validación local; sin alta/sesión real |
| [Membresía y recompensas](03-membresia-recompensas.md) | Progreso, recompensas y comprobante de canje | Pendiente; referencias visuales recibidas |
| [Wallet y reseñas](04-wallet-resenas.md) | Emisión, sincronización y salida a Google | Pendiente; invitación visual sin salida ni registro |

## Catálogo propuesto

| Método | URL bajo el origen API | Fase |
| --- | --- | --- |
| GET | `/api/public/businesses/{slug}/landing` | Landing |
| POST | `/api/public/nfc-interactions` | Validar entrada NFC |
| GET | `/api/customer/csrf` | Antes de mutaciones con cookie |
| POST | `/api/public/businesses/{slug}/memberships` | Alta |
| GET | `/api/customer/session?businessSlug={slug}` | Reconocimiento |
| POST | `/api/customer/logout` | Salida |
| POST | `/api/public/access-challenges` | Recuperación posterior |
| POST | `/api/public/access-challenges/{challengeId}/verify` | Recuperación posterior |
| GET | `/api/customer/membership` | Progreso y recompensas |
| POST | `/api/customer/rewards/{rewardId}/redemptions` | Canje; semántica por cerrar |
| GET | `/api/customer/redemptions/{redemptionId}` | Restaurar comprobante |
| POST | `/api/customer/wallet-passes` | Apple / Google Wallet |
| POST | `/api/public/review-outbounds` | Registro de salida a Google |

## Relación con el panel

La landing es una proyección **pública** de negocio, sede, programa y configuración
administrativa, no una exposición directa de sus DTO autenticados. No usa Bearer
ni endpoints administrativos en el navegador del cliente.

- `logoUrl` deriva de `business/settings.logo.url`.
- `heroImageUrl`, título y descripción derivan de `landing/settings`.
- `primaryColor` todavía no aparece en el DTO documentado de configuración del
  panel: acordar su persistencia/edición allí, sin fijarlo solo en esta landing.
- Reglas de progreso y recompensa derivan de `loyalty-program`; un sello de
  bienvenida mostrado en la landing es una oferta, no una visita acreditada.
- Google Reviews depende de la sede resuelta desde el NFC.
- El panel documenta teléfono; el wireframe público ofrece email o móvil. Cerrar
  este cambio de identidad antes de habilitar el alta.
- El canje público y el administrativo deben compartir transición atómica,
  elegibilidad y auditoría. Nunca permitir dos canjes de la misma recompensa.

Ver [decisiones abiertas](decisiones-abiertas.md) antes de implementar módulos.
