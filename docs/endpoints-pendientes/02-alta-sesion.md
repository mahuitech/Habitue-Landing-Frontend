# Alta, consentimientos, sesión y recuperación

**Estado:** formulario/validación local implementados. Sin POST de alta,
reconocimiento de cookie ni OTP reales. [Convenciones](00-convenciones.md).

## POST /api/public/businesses/{slug}/memberships

- **Headers:** Idempotency-Key, X-CSRF-Token según bootstrap final.
- **Body:** `RegistrationRequest` en `src/features/membership/validation.ts`,
  más `interactionId?: string` únicamente cuando provenga del flujo NFC validado.

```json
{
  "name": "María",
  "contact": { "type": "EMAIL", "value": "maria@example.com" },
  "birthday": { "day": 29, "month": 2 },
  "consents": [
    { "purpose": "CLUB_TERMS", "textVersion": "2026-11-v1", "accepted": true },
    { "purpose": "MARKETING", "textVersion": "2026-11-v1", "accepted": false }
  ],
  "interactionId": "interaction_opaque"
}
```

Teléfono alternativo: `{ "type": "PHONE", "value": "+34612345678" }`.
`birthday` es null si se omite. No exigir año. `MARKETING=false` permite registrarse.
Los nombres `CLUB_TERMS`/`MARKETING` son propuestas pendientes de mapear a las
finalidades definitivas del dominio; aceptar condiciones no se presenta como
consentimiento genérico de todos los tratamientos.

- **Respuesta 201:** `{ membershipId: string; businessSlug: string; createdAt:
  string; nextAction: "MEMBERSHIP" | "VERIFY_CONTACT" }`, con Set-Cookie solo
  cuando la política de verificación permita autenticar al cliente.
- **Errores:** `400 VALIDATION_ERROR`, `409 CONTACT_VERIFICATION_REQUIRED`,
  `409 CONSENT_VERSION_CHANGED`, `410 INTERACTION_EXPIRED`, `429`.
- La política ante un contacto existente debe ser neutral y guiar a recuperación,
  sin devolver su perfil ni crear una sesión de esa persona. No fusionar identidades
  por coincidencia de email/teléfono sin verificar propiedad.
- Backend deduplica por ámbito acordado, registra versiones/evidencia de aceptación,
  normaliza contacto y resuelve beneficio de bienvenida/visita en transacción.
- Pendiente: si `VERIFY_CONTACT` aplica al alta MVP, hace falta un flujo de
  verificación inicial adicional; no confundirlo con recuperación posterior.

## GET /api/customer/session?businessSlug={slug}

- **Acceso:** cookie; sin body. Contexto de comercio explícito y validado.
- **200:** `{ authenticated: true; businessSlug: string; membershipId: string }`.
- **401:** `SESSION_REQUIRED`; mostrar landing anónima. **403:** pertenencia no
  autorizada; no reutilizar la tarjeta de otro comercio.
- No devuelve contactos. No renueva indefinidamente la sesión sin política acordada.

## POST /api/customer/logout

- **Acceso:** cookie + CSRF. **Body:** ninguno.
- **204**, invalida sesión en servidor y expira cookie; volver a landing.
- Repetición segura; no borra membresía ni revoca consentimientos.

## Recuperación posterior — POST /api/public/access-challenges

- **Body:** `{ businessSlug: string; phone: string }`.
- **202:** `{ challengeId: string; expiresAt: string; retryAfterSeconds: number }`.
- Respuesta neutral independientemente de la existencia del contacto. Rate limit
  por identidad/red/dispositivo; `429` con Retry-After. No exponer el OTP.
- Pendiente decidir cómo recupera su cuenta alguien registrado solo con email.
  No habilitar email como identidad final sin resolver este caso.

## POST /api/public/access-challenges/{challengeId}/verify

- **Body:** `{ code: string }`, código tratado como string para conservar ceros.
- **200:** `{ businessSlug: string; membershipId: string }` y Set-Cookie rotada.
- **400:** `INVALID_CODE`; **410:** `CHALLENGE_EXPIRED`; **429:**
  `ATTEMPTS_EXCEEDED`. Uso único, expiración y límites en servidor.
- Redirigir al club del challenge validado, sin URL de retorno arbitraria.
