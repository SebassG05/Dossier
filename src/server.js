import express from 'express';
import { PORT } from './config/env.js';
import emailRouter from './routes/email.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API routes
app.use('/', emailRouter);

// Fallback to index.html in public/ if needed
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor', detail: String(err?.message || err) });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
