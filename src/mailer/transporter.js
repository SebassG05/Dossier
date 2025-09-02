import nodemailer from 'nodemailer';
import { SMTP } from '../config/env.js';

export function createTransporter() {
  return nodemailer.createTransport({
    host: SMTP.host,
    port: SMTP.port,
    secure: SMTP.secure,
    auth: { user: SMTP.user, pass: SMTP.pass },
  });
}
