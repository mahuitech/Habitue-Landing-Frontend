# Implementación de landing y registro

Fecha: 18/11/2026.

## Rutas

- `/`: abre el ejemplo Costra mientras no se configure un origen API.
- `/{commerceSlug}`: landing por comercio. Fixtures `/costra` y `/fresh-food`.
- `/{commerceSlug}/registro`: formulario con validación y estados de error.
- `/{commerceSlug}/acceso`: informa de recuperación futura; no presenta un OTP ficticio.
- `/{commerceSlug}/privacidad` y `/condiciones`: solo textos de aviso de demo.
- Comercio inexistente: 404. Fallo del loader: error con reintento. Loading accesible.

## Componentes

UI: Button/CTA (variantes/tamaños/asChild), Input, Select y Checkbox.
Compartidos: FormField, MerchantLogo, MerchantShell, PoweredBy e Icon.
Features: MerchantHero, LandingScreen, StampPreview, ReviewInvitation,
RegistrationScreen y RegistrationForm. Sin librerías nuevas.

## Datos y límites

`Commerce` define branding, copy, oferta y enlaces/versiones legales. El loader es
server-side y acepta un origen API configurable; el contrato todavía es propuesta.
La demo está señalizada y no crea datos. Logo/hero remotos tienen fallback si no
cargan; primaryColor tiene validación y contraste automático de CTA.

Los assets de demostración no son originales de los comercios: los logos son
aproximaciones SVG y las fotografías son de muestra. No se recortaron las capturas.
La marca habitué se reutilizó del panel administrativo.

Registro: nombre, email o móvil, cumpleaños opcional (día/mes), aceptación de
condiciones y marketing opcional separado. Validación accesible y foco en primer
error. Tras validar se indica que no se ha enviado ni guardado información.
No hay alta real, cookie, envío de comunicaciones ni navegación falsa a una tarjeta.

Los estados de recompensa de las referencias quedan pendientes del contrato de
canje/tiempo de servidor. Reseñas todavía no redirige ni contabiliza eventos.

## Recursos de ejemplo

- Café: https://images.unsplash.com/photo-1442512595331-e89e73853f31
- Comida: https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38

Reemplazables por las URLs que devuelva el comercio.

## Verificación realizada

- Pruebas unitarias: validación de contacto/cumpleaños/consentimientos, contrato de
  marca, URLs y contraste de CTA.
- Navegador local: landing, navegación a registro, errores y foco inicial,
  formulario válido sin marketing, invitación neutral y comercio inexistente.
- Revisión visual: escritorio y móvil (390 px y 320 px), sin desbordamiento horizontal
  observado en landing/registro.
- No se ha probado un backend real ni se acredita funcionamiento de proveedores.
