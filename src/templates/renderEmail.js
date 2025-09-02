import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tplPath = path.resolve(__dirname, './email.html');

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function fill(template, vars) {
  return template
    .replace('{{greeting}}', vars.greeting || '')
    .replace('{{messageBlock}}', vars.messageBlock || '');
}

export function renderDossierEmail({ message, toName, company } = {}) {
  const raw = fs.readFileSync(tplPath, 'utf8');
  const greeting = `<p style=\"margin:0 0 12px;\">Hola soy Sebastián Gandía le escribimos desde el equipo de Evenor-Tech.</p>`;
  let msg = message || '';
  if (msg && msg.includes('Encantado de hablar contigo')) {
    msg = msg.replace(legacy, '').trim();
  }
  const messageBlock = msg ? `<div style=\"margin:0 0 16px;\">${escapeHtml(msg).replace(/\n/g, '<br/>')}</div>` : '';
  const filled = fill(raw, { greeting, messageBlock });
  return filled;
}
