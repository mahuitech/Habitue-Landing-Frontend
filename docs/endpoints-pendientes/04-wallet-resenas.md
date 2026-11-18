# Wallet y reseñas

**Estado:** pendientes de integración real. [Convenciones](00-convenciones.md).

## POST /api/customer/wallet-passes

- **Acceso:** cookie + CSRF. **Headers:** Idempotency-Key.
- **Body:** `{ provider: "APPLE" | "GOOGLE" }`.
- **200:** `{ provider: "APPLE" | "GOOGLE"; addUrl: string; expiresAt: string | null }`.
- **409:** `PROVIDER_NOT_READY`; **503:** `WALLET_TEMPORARILY_UNAVAILABLE`.
- El servidor obtiene la membresía de la sesión, firma el pase/Save URL y devuelve
  solo HTTPS de un host permitido para el proveedor o descarga autorizada del backend.
- No exponer certificados, llaves privadas, token de actualización ni credenciales
  de Apple/Google al cliente. El botón no implica que el pase haya sido añadido.
- Repetir no crea una membresía ni un nuevo pase lógico por cada clic.

## Actualización de tarjeta

No necesita un POST del navegador cada vez que cambien visitas/recompensas.
Backend mantiene identificador estable de pase y actualiza el proveedor mediante
sus mecanismos de registro/notificación/actualización. Callbacks Apple, objetos
Google y jobs internos requieren un contrato de integración separado y documentación
oficial vigente al implementarlos. No se inventan URLs de proveedor en este paquete.

## POST /api/public/review-outbounds

- **Acceso:** interacción válida; no exigir marketing ni reseña positiva.
- **Headers:** Idempotency-Key. **Body:** `{ interactionId: string }`.
- **201:** `{ outboundId: string; url: string; recordedAt: string }`.
- Backend comprueba elegibilidad y resuelve destino de la sede; registra el clic
  antes de devolver el enlace. **403:** `INTERACTION_NOT_ELIGIBLE`; **410:**
  `INTERACTION_EXPIRED`; **409:** `REVIEW_DESTINATION_NOT_CONFIGURED`.
- `url` HTTPS con host permitido Google; nunca aceptar destinationUrl del cliente
  ni exponer una redirección abierta. La UI redirige solo tras recibir éxito.
- Un clic es salida a Google, **no reseña publicada**. No inventar puntuación ni
  verificar publicación por retorno a la pestaña. No hay pregunta de satisfacción
  previa para filtrar quién puede ir a Google.
- Los cinco iconos del diseño son una sola invitación neutral, no un selector de
  puntuación que condicione el enlace. En esta entrega solo muestran explicación;
  no llaman al endpoint ni generan eventos ficticios.
