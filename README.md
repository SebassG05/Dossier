# Dossier Emailer (Node.js + Nodemailer)

Aplicación sencilla en Node.js con estructura por carpetas (config, routes, mailer, templates, public) para enviar por email un dossier del Kit Digital con una plantilla HTML limpia y responsive. Configuración SMTP por variables de entorno.

## Requisitos
- Node.js 18+ (recomendado)
- Credenciales SMTP (por ejemplo: Gmail, Outlook, Sendinblue, Mailgun, etc.)

## Configuración
1. Copia el archivo de ejemplo y edítalo con tus credenciales SMTP:

```powershell
Copy-Item .env.example .env
```

2. Abre `.env` y completa los valores:

```
PORT=3000
SMTP_HOST=smtp.tu-proveedor.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=usuario@tu-dominio.com
SMTP_PASS=contraseña-super-secreta
MAIL_FROM="Evenor-Tech <no-reply@tu-dominio.com>"
```

- SMTP_SECURE=true se usa normalmente con puerto 465.
- Para proveedores como Gmail con 2FA, usa una contraseña de aplicación.

## Instalar dependencias
```powershell
npm install
```

## Ejecutar en local
```powershell
npm start
```

Abre http://localhost:3000 para ver el formulario (frontend básico en `public/`). Rellena el destinatario y envía el dossier.

## Endpoints API
- GET `/health` → estado del servicio
- GET `/preview` → vista previa HTML del email con query params opcionales: `toName`, `company`, `message`
- POST `/send` → envía el email
  - Body JSON: `{ "to": "destino@correo.com", "subject": "...", "message": "opcional", "toName": "opcional", "company": "opcional", "cc": "opcional", "bcc": "opcional" }`
  - Respuesta: `{ message: string, id?: string, error?: string }`

## Despliegue
- Cualquier plataforma que soporte Node.js (Railway, Render, Azure Web Apps, Heroku, etc.).
- Establece las mismas variables de entorno del `.env` en tu proveedor de hosting.
- Comando de arranque: `npm start`.

## Seguridad y buenas prácticas
- No subas `.env` a repositorios públicos.
- Usa remitentes verificados en tu proveedor SMTP para mejorar la entregabilidad.
- Considera DKIM/SPF en tu dominio para evitar SPAM.

## Personalización del contenido
El HTML del dossier está en `src/templates/email.html`. Puedes modificar estilos y bloques de contenido con total libertad (se usan estilos inline compatibles con clientes de correo). La página web estática (formulario y vista previa) está en `public/` (`index.html`, `styles.css`, `main.js`).

## Licencia
MIT