/* main.js — Interactividad del portafolio */

/* Año dinámico en el footer */
document.getElementById('year').textContent = new Date().getFullYear();

/* Navbar: cambia estilo al hacer scroll */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* Cerrar el menú móvil al hacer clic en un enlace */
const navLinks = document.querySelectorAll('.nav-link');
const navCollapse = document.getElementById('navMenu');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
    if (bsCollapse) bsCollapse.hide();
  });
});

/* Marcar enlace activo según sección visible */
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

/* Feedback al enviar el formulario */
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('.btn-submit');
  const original = btn.innerHTML;

  btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡Enviado!';
  btn.style.background = 'linear-gradient(135deg, #2ECC71, #27AE60)';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
});
