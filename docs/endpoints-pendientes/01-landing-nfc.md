# Landing, marca y contexto NFC

**Estado:** loader configurable implementado; ruta/DTO propuestos, sin API real
verificada. [Convenciones](00-convenciones.md).

## GET /api/public/businesses/{slug}/landing

- **Acceso:** anónimo. **Query/body:** ninguno.
- **Respuesta 200:** `Commerce` de `src/features/commerce/contracts.ts`.
- **Errores:** `404 BUSINESS_NOT_FOUND`, `410 BUSINESS_UNAVAILABLE`, `503`.
- No incluye miembros, contactos ni credenciales. No registra visitas.

```json
{
  "slug": "costra",
  "name": "Costra",
  "logoUrl": "https://cdn.example.com/costra/logo.png",
  "heroImageUrl": "https://cdn.example.com/costra/hero.jpg",
  "primaryColor": "#FF9810",
  "welcomeTitle": "Únete al Club Costra",
  "description": "Un regalo en tu cumpleaños y novedades antes que nadie",
  "program": {
    "visitsRequired": 5,
    "welcomeStamps": 1,
    "rewardDescription": "Tu 5º café, gratis. Empiezas con 1 sello"
  },
  "legal": {
    "privacyUrl": "https://example.com/costra/privacy",
    "termsUrl": "https://example.com/costra/terms",
    "termsVersion": "2026-11-v1",
    "marketingVersion": "2026-11-v1"
  }
}
```

`logoUrl`/`heroImageUrl` pueden ser null. `program` puede ser null; no inventar
objetivo ni sellos si no hay programa. `visitsRequired`: entero 2–20 en la propuesta
actual; `welcomeStamps`: entero 0..visitsRequired-1. Los sellos se distribuyen en varias filas si es necesario. Cerrar límites con
el panel. La oferta de bienvenida debe ser aplicada por backend al alta si procede.

El loader lee `HABITUE_API_BASE_URL` solo en servidor, sin caché y con timeout de
5 segundos. Sin variable usa únicamente Costra/FreshFood como vista previa
identificada. Con origen configurado, un fallo nunca recurre a datos ficticios.
Los enlaces de legales deben resolver contenido del comercio, no las páginas demo.

## POST /api/public/nfc-interactions

- **Acceso:** público con rate limit y validación del token/contexto NFC.
- **Headers:** Idempotency-Key.
- **Body:** `{ token: string }`. Token opaco capturado del enlace NFC; el frontend
  deberá retirarlo de la barra de dirección antes de otros enlaces/analítica.
- **Respuesta 201** propuesta:

```ts
type NfcInteraction = {
  id: string;
  businessSlug: string;
  location: { id: string; name: string };
  expiresAt: string;
  serverTime: string;
  visitStatus: "PENDING_MEMBERSHIP" | "RECORDED" | "NOT_ELIGIBLE";
  reviewEligible: boolean;
};
```

- **Errores:** `400 INVALID_NFC_TOKEN`, `410 NFC_INACTIVE/INTERACTION_EXPIRED`,
  `409 VISIT_COOLDOWN`, `429 RATE_LIMITED`.
- El servidor resuelve negocio, sede, NFC y empleado; no acepta esos IDs como
  prueba enviada por cliente. La acreditación pendiente tras alta es atómica e
  idempotente. Abrir la landing desde un enlace compartido no da sellos.
- No implementado. Formato del enlace, tipo de token y prueba de interacción
  requieren decisión de backend; no prometer seguridad física de un NFC estático.
