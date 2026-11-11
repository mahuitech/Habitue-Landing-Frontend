# Experiencia del cliente: alcance y próximos pasos

## Flujo recibido

NFC → landing del comercio → unirse al club → formulario → creación del miembro
→ opción de añadir tarjeta a Wallet.

La landing también ofrece una invitación neutral a Google Reviews después de una
interacción válida. La salida redirige al perfil del comercio y registra el clic;
un clic no demuestra que se haya publicado una reseña.

## Dominios preparados

- commerce: identidad y configuración pública por comercio.
- membership: alta, consentimientos aplicables y datos de membresía.
- loyalty: visitas, progreso y recompensas disponibles.
- wallet: enlaces de alta en Apple/Google Wallet y estado relevante.
- reviews: elegibilidad, invitación neutral y clic de salida.
- auth: reconocimiento posterior y recuperación futura por teléfono y OTP.

## Criterios para la implementación

- Cada comercio debe resolverse desde el enlace NFC. Confirmar el contrato del
  enlace y si identifica también local/dispositivo antes de fijar las rutas.
- Abrir un enlace no debe inventar ni acreditar una visita; la interacción válida
  y la elegibilidad de recompensas deben ser verificadas por el backend.
- Alta y consentimientos: definir campos mínimos, textos/versiones y evidencia
  a registrar con producto/backend. No premarcar aceptación. Tratar por separado
  las finalidades opcionales que correspondan.
- Sesión: el backend debe establecer la cookie persistente con las protecciones
  apropiadas; no almacenar credenciales en localStorage.
- Recuperación: fase posterior. No mostrar un flujo operativo sin un servicio OTP.
- Wallet: necesita generación/firma y actualización desde servicios del backend.
  No incluir credenciales ni certificados en el frontend.
- Reseñas: invitación neutral, sin filtrar por satisfacción ni condicionar las
  recompensas a reseñar. El backend registra el clic sin afirmar publicación.
- Diseñar carga, vacío, error, enlace inválido, sesión caducada, miembro existente,
  alta fallida, progreso sin recompensa y recompensa disponible.

## Siguiente paso

Recibir wireframes para landing, registro, membresía/progreso y Wallet; confirmar
estados y navegación. Después definir contratos de backend y desarrollar por
verticales. Las carpetas preparadas no implican funcionalidades implementadas.
