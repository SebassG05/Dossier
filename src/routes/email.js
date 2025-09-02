import { Router } from 'express';
import { createTransporter } from '../mailer/transporter.js';
import { renderDossierEmail } from '../templates/renderEmail.js';
import { SMTP, validateEnv } from '../config/env.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));

router.get('/preview', (req, res) => {
  const { message = ' Desde el equipo estamos encantados de poder contactar con usted. Le comparto el dossier de como podemos ayudaros en detalle con el kit digital.', toName = 'Contacto', company = 'Tu Empresa' } = req.query;
  const html = renderDossierEmail({ message, toName, company });
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
      subject: subject || 'Dossier: Kit Digital para Empresas Agrícolas',
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
