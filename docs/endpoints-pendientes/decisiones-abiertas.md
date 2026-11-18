# Decisiones abiertas con producto y backend

**Fecha: 18/11/2026.** Resolver antes de activar el módulo afectado.

| Decisión | Motivo / criterio a acordar | Bloquea |
| --- | --- | --- |
| Origen API, BFF, cookies y CSRF | Despliegue/domino, CORS, duración/rotación y contexto por comercio | Alta y reconocimiento |
| Contrato público de branding | Fuente de primaryColor y mapeo al panel; nulls, programa inactivo y límites | Marca real |
| Email o móvil | Panel/recuperación esperan teléfono; el wireframe ofrece email. Verificación inicial y recuperación de email-only | Alta real |
| Consentimientos | Finalidades, obligatoriedad, textos/versiones, evidencia y actualización | Alta real |
| Formato del enlace NFC | Token, comercio/sede, caducidad, abuso y prueba de interacción | Visitas y reseñas |
| Beneficio de bienvenida | Sello promocional vs visita, aplicación atómica y por versión de programa | Progreso inicial |
| Momento de consumo del premio | Clic del cliente vs confirmación del camarero; relación con canje del panel | Pantallas de felicitación/comprobante |
| Vigencia de cinco minutos | Qué expira, método de verificación y estado mostrado tras caducar | Comprobante |
| Revisión Google | Elegibilidad de interacción y destino por sede, deduplicación de clics | Salida real |
| Wallet | Proveedores habilitados, firma, emisión/actualización, errores y reintentos | Añadir tarjeta real |

No confundir límites del navegador con garantías del servidor. El MVP visual
actual no habilita alta, visitas, canje, recuperación ni Wallet por sí solo.
