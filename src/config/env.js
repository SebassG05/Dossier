import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const SMTP = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  from: process.env.MAIL_FROM || process.env.SMTP_USER,
};

export function validateEnv() {
  const missing = [];
  if (!SMTP.host) missing.push('SMTP_HOST');
  if (!SMTP.port) missing.push('SMTP_PORT');
  if (!SMTP.user) missing.push('SMTP_USER');
  if (!SMTP.pass) missing.push('SMTP_PASS');
  if (missing.length) throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);
}
