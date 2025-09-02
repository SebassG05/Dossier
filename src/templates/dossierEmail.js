// Simple, email-friendly HTML template with inline styles
// Exports: buildDossierEmail({ message, toName, company }) and dossierContentHtml

const primary = "#1a531b";
const textColor = "#222222";
const muted = "#6b7280";
const bg = "#f6f7f9";

// Core dossier content with inline styles, reusable in page preview and email body
export const dossierContentHtml = `
  <h1 style="margin:0 0 16px; font-size:24px; line-height:1.3; color:${primary};">
    Dossier Informativo – Kit Digital para Empresas Agrícolas
  </h1>
  <p style="margin:0 0 12px; color:${textColor};">
    El programa Kit Digital, impulsado por el Gobierno de España, ofrece ayudas económicas para la digitalización de pequeñas y medianas empresas. A través de bonos de hasta 12.000 €, las empresas pueden acceder a soluciones digitales que mejoran su visibilidad, optimizan la gestión interna y facilitan la toma de decisiones basada en datos.
  </p>

  <h2 style="margin:20px 0 8px; font-size:18px; color:${textColor};">Beneficios para el sector agrícola</h2>
  <ul style="margin:0 0 12px; padding-left:20px; color:${textColor};">
    <li style="margin:6px 0;">Mejorar su visibilidad en internet y acceder a nuevos clientes.</li>
    <li style="margin:6px 0;">Automatizar procesos internos para optimizar la gestión de explotaciones y entidades.</li>
    <li style="margin:6px 0;">Acceder a información clave mediante analítica avanzada.</li>
    <li style="margin:6px 0;">Potenciar su imagen de marca y presencia en redes sociales.</li>
  </ul>

  <h2 style="margin:20px 0 8px; font-size:18px; color:${textColor};">Soluciones digitales de Evenor-Tech</h2>
  <ol style="margin:0 0 12px 20px; color:${textColor};">
    <li style="margin:6px 0;"><strong>Diseño de página web y presencia online</strong> → Aumentar la visibilidad de la empresa y atraer nuevos clientes.</li>
    <li style="margin:6px 0;"><strong>Plataformas digitales de gestión</strong> → Desarrollo de herramientas personalizadas para gestionar explotaciones, clientes, socios o entidades.</li>
    <li style="margin:6px 0;"><strong>Gestión profesional de redes sociales</strong> → Potenciar la imagen de marca y mejorar la comunicación con el mercado.</li>
    <li style="margin:6px 0;"><strong>Inteligencia de negocio y analítica web</strong> → Implementar dashboards y sistemas de datos para una mejor toma de decisiones.</li>
  </ol>

  <h2 style="margin:20px 0 8px; font-size:18px; color:${textColor};">Cómo funciona el proceso</h2>
  <ol style="margin:0 0 12px 20px; color:${textColor};">
    <li style="margin:6px 0;"><strong>Evaluación de necesidades</strong> → Análisis de la situación actual y detección de oportunidades.</li>
    <li style="margin:6px 0;"><strong>Solicitud de la ayuda</strong> → Evenor-Tech gestiona todo el proceso de tramitación del bono.</li>
    <li style="margin:6px 0;"><strong>Implantación de la solución</strong> → Desarrollo y puesta en marcha de las herramientas digitales.</li>
    <li style="margin:6px 0;"><strong>Acompañamiento y soporte</strong> → Seguimiento y soporte continuo para asegurar el éxito de la transformación digital.</li>
  </ol>

  <h2 style="margin:20px 0 8px; font-size:18px; color:${textColor};">Por qué elegir Evenor-Tech</h2>
  <ul style="margin:0 0 12px; padding-left:20px; color:${textColor};">
    <li style="margin:6px 0;">Especialización en soluciones digitales para el sector agrícola.</li>
    <li style="margin:6px 0;">Experiencia en la implementación de herramientas avanzadas de gestión y analítica.</li>
    <li style="margin:6px 0;">Acompañamiento integral durante todo el proceso, desde la solicitud hasta la implantación.</li>
    <li style="margin:6px 0;">Soluciones financiadas al 100 % mediante el Kit Digital, sin coste para la empresa.</li>
  </ul>
`;

function esc(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildDossierEmail({ message, toName, company } = {}) {
  const greeting = `
    <p style="margin:0 0 12px; color:${textColor};">
      Hola, soy Sebastián Gandía. Le escribimos desde Evenor-Tech.
    </p>
  `;

  const messageBlock = (message && message.trim().length) ? `
    <div style="margin:0 0 16px; color:${textColor};">${esc(message).replace(/\n/g, "<br/>")}</div>
  ` : `
    <div style="margin:0 0 16px; color:${textColor};"> Desde el equipo estamos encantados de poder contactar con usted.Le comparto el dossier de como podemos ayudaros en detalle con el kit digital.</div>
  `;

  return `
  <!doctype html>
  <html lang="es">
    <head>
      <meta charset="utf-8"/>
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Dossier – Kit Digital</title>
      <style>
        /* Some clients honor minimal CSS in head; critical styles are inline */
        @media (max-width:620px){ .container{ width:100% !important; } .px{ padding-left:16px !important; padding-right:16px !important; } }
      </style>
    </head>
    <body style="margin:0; padding:0; background:${bg};">
      <span style="display:none; visibility:hidden; opacity:0; height:0; width:0; overflow:hidden;">Dossier Kit Digital para empresas agrícolas</span>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:${bg};">
        <tr>
          <td align="center" style="padding:24px;">
            <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background:#ffffff; border-radius:10px; overflow:hidden;">
              <tr>
                <td style="background:${primary}; color:#ffffff; padding:20px 24px; font-family:Arial, sans-serif;">
                  <div style="font-size:14px; color:#d1fae5;">Evenor-Tech</div>
                  <div style="font-size:20px; font-weight:bold;">Kit Digital para Empresas Agrícolas</div>
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:24px; font-family:Arial, sans-serif; color:${textColor};">
                  ${greeting}
                  ${messageBlock}
                  ${dossierContentHtml}
                  <div style="margin-top:20px; padding:12px 16px; background:#f0fdf4; border:1px solid #dcfce7; border-radius:8px; color:${textColor};">
                    ¿Te gustaría que te ayudemos con la solicitud del bono y la implantación? Responde a este correo o agenda una llamada.
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px 24px; font-family:Arial, sans-serif; color:${muted}; font-size:12px;">
                  Enviado por Evenor-Tech · Este mensaje puede contener información comercial.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

export default buildDossierEmail;
