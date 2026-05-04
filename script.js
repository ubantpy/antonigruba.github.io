// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
    }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Pre-fill contact form from URL
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash.includes('project=')) {
    const project = decodeURIComponent(hash.split('project=')[1]);
    const textarea = document.getElementById('message');
    if (textarea) {
      textarea.value = `Hi Antoni,\n\nI'd like to request access to your ${project} project.\n\n`;
      // Scroll to contact section
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Form submit
function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const success = document.getElementById('form-success');
    success.style.display = 'block';
    form.reset();
    setTimeout(() => success.style.display = 'none', 5000);
}

// Simple view toggle
function openSimpleView() {
    document.getElementById('simple-view').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeSimpleView() {
    document.getElementById('simple-view').classList.remove('active');
    document.body.style.overflow = '';
}
// Close on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSimpleView();
});