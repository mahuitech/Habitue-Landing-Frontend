# Convenciones del contrato público

**Estado: propuesta.** No reutilizar automáticamente Bearer/scopes del panel.

## Contexto y autorización

- GET de landing anónimo, sin datos personales. `slug` identifica el comercio,
  nunca autoriza leer una membresía. `404` si no existe; `410` si se retira.
- Sesión del cliente mediante cookie persistente **HttpOnly, Secure** y política
  SameSite/duración a acordar. No guardar tokens en localStorage.
- Para operaciones privadas, el servidor deriva Customer y Membership de la
  sesión y comprueba pertenencia al comercio. No autorizar por un memberId enviado.
- Resolver despliegue same-origin/BFF frente a API en otro dominio. Si es otro
  origen, permitir solo los orígenes concretos y credentials; nunca CORS `*`.
- Mutaciones con cookie: `X-CSRF-Token` emitido por GET `/api/customer/csrf`,
  validación de Origin y rate limit. El bootstrap también debe cubrir el alta
  anónima que establece una sesión. Respuesta: `200 { "token": "opaque" }`,
  sin caché. Renovar tras rotación de sesión según contrato final.
- El token NFC identifica un dispositivo/contexto autorizado; no es prueba
  suficiente de presencia física. Validar abuso, estado y frecuencia en servidor.

## Formato y errores

JSON UTF-8; GET sin body. Fechas UTC ISO 8601; `serverTime` en respuestas sensibles
al reloj. Cumpleaños `{ day, month }`, sin año. Teléfono normalizado por backend a
E.164 tras acordar país por defecto; email se valida en servidor.

```ts
type ApiError = {
  code: string;
  message: string;
  traceId: string;
  fieldErrors?: Record<string, string[]>;
};
```

Errores comunes: `400 VALIDATION_ERROR`, `401 SESSION_REQUIRED`,
`403 NOT_AUTHORIZED/CSRF_INVALID`, `404 NOT_FOUND`, `409` conflicto de negocio,
`429 RATE_LIMITED` con Retry-After, `503 TEMPORARILY_UNAVAILABLE`.
Errores privados y respuestas con contactos/sesión llevan `Cache-Control: no-store`.
No publicar stack traces ni existencia de teléfonos/email.

## Idempotencia y fallos de red

Mutaciones con efectos (alta, validación de interacción, canje, Wallet, salida de
reseñas) usan `Idempotency-Key` opaca por operación. Reintentar con misma clave y
mismo body devuelve el resultado original. Body distinto con misma clave: `409
IDEMPOTENCY_KEY_REUSED`. Acordar ventana de retención. Un timeout no confirma fallo:
conservar clave y recuperar estado antes de iniciar otra operación.

GET puede reintentarse; no repetir POST automáticamente con una clave nueva.
Las respuestas de éxito son la autoridad: nunca acreditar visitas por renderizar,
recargar, navegar, contar sellos o cambiar el reloj local.

## Imágenes, marca y textos

URLs HTTPS absolutas o null para imágenes; nombre disponible como fallback.
`primaryColor` en `#RRGGBB`, validado tanto en backend como frontend. El frontend
elige texto blanco/oscuro según contraste; no aceptar CSS arbitrario del endpoint.
Los enlaces legales son HTTPS y versionados por finalidad. No enviar HTML libre.
Los cambios de reglas no alteran condiciones de recompensas ya emitidas.

## Privacidad operativa

No colocar teléfono, email, OTP, tokens de sesión o payloads de formularios en
URLs, analítica o logs. El consentimiento se registra con finalidad, versión,
resultado y evidencia de servidor. No premarcar ni exigir marketing para el club.
Políticas/textos finales deben venir del comercio; la demo no es un documento legal.
