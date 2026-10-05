const progress = document.getElementById('scrollProgress');
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menu = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.nav a')];

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${(scrollY / max) * 100}%`;
  header.style.background = scrollY > 40 ? 'rgba(7,6,26,.92)' : 'rgba(7,6,26,.72)';
});

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});

navLinks.forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const subject = encodeURIComponent(form.get('subject'));
  const body = encodeURIComponent(
`Name: ${form.get('name')}
Email: ${form.get('email')}
Phone: ${form.get('phone') || 'Not provided'}

Message:
${form.get('message')}`
  );
  window.location.href = `mailto:uu2767700@gmail.com?subject=${subject}&body=${body}`;
});
