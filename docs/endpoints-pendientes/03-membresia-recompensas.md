# Membresía, progreso y recompensas

**Estado:** pendiente. Las pantallas recibidas de felicitación/comprobante sirven
como referencia; todavía no están implementadas. [Convenciones](00-convenciones.md).

## GET /api/customer/membership

- **Acceso:** cookie de sesión válida para el comercio; sin body/query.
- **200:**

```ts
type CustomerMembership = {
  id: string;
  businessSlug: string;
  name: string;
  totalVisits: number;
  progress: null | {
    programVersionId: string;
    visitsInCycle: number;
    targetVisits: number;
    nextRewardTitle: string;
  };
  availableRewards: {
    id: string;
    version: string;
    title: string;
    description: string;
    expiresAt: string | null;
    canRedeem: boolean;
    unavailableReasonCode: string | null;
  }[];
  wallet: { appleAvailable: boolean; googleAvailable: boolean };
  serverTime: string;
};
```

- **401:** sesión ausente/caducada. **403/404:** membresía fuera de contexto.
- Misma fuente de verdad de visitas/programas que el panel. No calcular premio
  desde visitas totales ni aceptar un contador del cliente. Definir paginación
  si el número de recompensas deja de ser pequeño.

## POST /api/customer/rewards/{rewardId}/redemptions

**Propuesta bloqueada por la decisión de cuándo consumir el premio.** El body y
los estados siguientes describen la opción de consumir al pulsar; no activarla
hasta acordar producto/backend. Si se elige reserva con confirmación del camarero,
el contrato debe cambiar a intención + confirmación y no marcar REDEEMED aún.

- **Acceso:** cookie + CSRF. **Headers:** Idempotency-Key.
- **Body:** `{ expectedVersion: string; interactionId: string }`.
- **201:** `RedemptionReceipt`; repetición de la misma operación devuelve `200`
  con el mismo comprobante. Solo si se confirma consumo inmediato:

```ts
type RedemptionReceipt = {
  id: string;
  rewardId: string;
  businessSlug: string;
  locationId: string;
  rewardTitle: string;
  status: "REDEEMED";
  redeemedAt: string;
  displayUntil: string;
  serverTime: string;
  displayCode: string;
};
```

- **409:** `REWARD_ALREADY_REDEEMED`, `REWARD_NOT_AVAILABLE`, `VERSION_CONFLICT`,
  `LOCATION_NOT_ELIGIBLE`, `IDEMPOTENCY_KEY_REUSED`. **410:** interacción expirada.
- Transición atómica compartida con el canje administrativo. Misma recompensa no
  puede consumirse desde ambos canales. Sede se resuelve desde interacción válida.
- Los cinco minutos son **vigencia del comprobante**, no restitución del premio.
  Si se consume al pulsar, recargar/cerrar/expirar no lo deshace.
- No aceptar duración/fecha/código de comprobante desde el navegador.

## GET /api/customer/redemptions/{redemptionId}

- **Acceso:** cookie y pertenencia del comprobante; sin body/query.
- **200:** `RedemptionReceipt` actualizado, incluso si ya terminó su vigencia visual.
- **404:** no existe/no pertenece; **401:** sesión requerida.
- Restaura el mismo comprobante al refrescar. Si se pierde la respuesta del POST,
  reintentar con la misma clave permite conocer el resultado original.
- Backend calcula vigencia con serverTime; frontend deriva el contador de
  displayUntil con offset de servidor. No reiniciar cinco minutos al recargar.
- El código corto es referencia visual, no credencial de autorización. Definir
  verificación del camarero para evitar acreditar capturas reutilizadas.
