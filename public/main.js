const form = document.getElementById('emailForm');
const previewFrame = document.getElementById('previewFrame');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error al enviar');
    alert(json.message || 'Enviado');
  } catch (err) {
    alert('No se pudo enviar: ' + err.message);
  }
});

// Optional: update preview with form inputs
const updatePreview = () => {
  const params = new URLSearchParams({
    toName: form.toName.value,
    company: form.company.value,
    message: form.message.value
  });
  previewFrame.src = '/preview?' + params.toString();
};
['toName', 'company', 'message'].forEach(name => {
  form[name].addEventListener('input', updatePreview);
});

  // Carrusel informativo
  document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let current = 0;

    function showSlide(idx) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
      current = idx;
    }

    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        showSlide(Number(dot.dataset.slide));
      });
    });

    // Opcional: swipe con teclado
    document.querySelector('.info-carousel').addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') showSlide((current + slides.length - 1) % slides.length);
      if (e.key === 'ArrowRight') showSlide((current + 1) % slides.length);
    });

    showSlide(0);
  });
