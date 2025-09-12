import { Router } from 'express';
import { createTransporter } from '../mailer/transporter.js';
import { renderDossierEmail } from '../templates/renderEmail.js';
import { SMTP, validateEnv } from '../config/env.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const printTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/printable.html'), 'utf8');

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));

router.get('/preview', (req, res) => {
  const { message = ' Desde el equipo de Evenor-Tech estamos encantados de poder contactar con usted. Le comparto el dossier de como podemos ayudaros en detalle con el kit digital.', toName = 'Contacto', company = 'Tu PYME' } = req.query;
  const html = renderDossierEmail({ message, toName, company });
  res.type('html').send(html);
});

// Nueva ruta para versión imprimible
router.get('/printable', (req, res) => {
  const { message = 'Desde el equipo de Evenor-Tech estamos encantados de poder contactar con usted. Le comparto el dossier de como podemos ayudaros en detalle con el kit digital.',
    toName = 'Contacto',
    company = 'Tu Empresa' } = req.query;

  // Leer la plantilla para la versión imprimible
  const printTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/printable.html'), 'utf8');

  // Escape básico para evitar inyección HTML
  const escapeHtml = (str) => {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // Reemplazar variables en la plantilla
  const html = printTemplate
    .replace('{{toName}}', escapeHtml(toName))
    .replace('{{company}}', escapeHtml(company))
    .replace('{{message}}', escapeHtml(message).replace(/\n/g, '<br>'));

  res.type('html').send(html);
});

router.post('/send', async (req, res) => {
  try {
    validateEnv();
    const { to, subject, message, cc, bcc, toName, company } = req.body || {};
    if (!to) return res.status(400).json({ error: 'Falta el campo "to" (destinatario).' });

    const transporter = createTransporter();
    const html = renderDossierEmail({ message, toName, company });

    const info = await transporter.sendMail({
      from: SMTP.from,
      to,
      subject: subject || 'Dossier: Kit Digital para PYMES',
      html,
      cc: cc || undefined,
      bcc: bcc || undefined,
    });

    res.json({ message: 'Dossier enviado correctamente.', id: info.messageId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo enviar el email.', detail: String(err?.message || err) });
  }
});

export default router;