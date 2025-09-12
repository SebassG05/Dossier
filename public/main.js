const form = document.getElementById('emailForm');
const previewFrame = document.getElementById('previewFrame');
const previewSection = document.getElementById('previewSection');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

// Inicialmente ocultar la sección de vista previa
previewSection.style.display = 'none';

function togglePreview() {
  if (previewSection.style.display === 'none') {
    previewSection.style.display = 'block';
    updatePreview();
  } else {
    previewSection.style.display = 'none';
  }
}

function showStatus(message, type = 'success') {
  formStatus.innerHTML = message;
  formStatus.className = `form-status ${type}`;
  formStatus.style.display = 'block';

  // Hacer scroll hacia el mensaje
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Ocultar después de 8 segundos si es éxito
  if (type === 'success') {
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 8000);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar email
  const emailInput = form.to;
  if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    showStatus('Por favor, introduce un email válido', 'error');
    emailInput.focus();
    return;
  }

  // Mostrar spinner y deshabilitar botón
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.error || json.detail || 'Error al enviar');

    showStatus(`<strong>¡Dossier enviado correctamente!</strong><br>El email ha sido enviado a ${data.to}`, 'success');

    // Opcionalmente, limpiar el formulario
    emailInput.value = '';
  } catch (err) {
    showStatus(`<strong>Error:</strong> ${err.message}`, 'error');
  } finally {
    // Restaurar botón
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
  }
});

// Nueva función para abrir la versión imprimible
if (downloadPdfBtn) {
  downloadPdfBtn.addEventListener('click', () => {
    showStatus('<strong>Preparando documento PDF...</strong><br>Se abrirá una nueva ventana con el diálogo de impresión.', 'info');

    const params = new URLSearchParams({
      toName: form.toName?.value || 'Contacto',
      company: form.company?.value || 'Tu Empresa',
      message: form.message?.value || 'Desde el equipo de Evenor-Tech estamos encantados de poder contactar con usted. Le comparto el dossier de como podemos ayudaros en detalle con el kit digital.'
    });

    // Abrir en nueva ventana la versión imprimible
    const printWindow = window.open(`/printable?${params.toString()}`, '_blank');

    // Asegurarse de que la ventana se abrió correctamente
    if (!printWindow) {
      showStatus('<strong>Error:</strong> No se pudo abrir la ventana. Por favor, permite las ventanas emergentes para este sitio.', 'error');
    }
  });
}

// Actualizar vista previa con entradas del formulario
const updatePreview = () => {
  const params = new URLSearchParams({
    toName: form.toName?.value || '',
    company: form.company?.value || '',
    message: form.message?.value || ''
  });
  previewFrame.src = '/preview?' + params.toString();
};

// Escuchar cambios en los campos para actualizar vista previa
['toName', 'company', 'message'].forEach(name => {
  if (form[name]) {
    form[name].addEventListener('input', updatePreview);
  }
});

// Prevenir envío de formulario al presionar Enter en campos de texto (excepto textarea)
form.querySelectorAll('input').forEach(input => {
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') e.preventDefault();
  });
});