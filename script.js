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
function handleProjectLink() {
  const hash = window.location.hash;
  // Request to test an app before it launches, e.g. #contact?test=echoes from the Echoes site
  if (hash.includes('test=echoes')) {
    const textarea = document.getElementById('message');
    if (textarea) {
      textarea.value = `Hi Antoni,\nI'd like to test Echoes before it launches.\n\n- My phone (Android or iPhone): \n- Why I'd like to test it: \n- Do I keep a journal now? (never / sometimes / most days): \n- Google Play or Apple account email for the invite, if different from the one above: `;
      // Grow the box so every question shows without scrolling inside it,
      // and again once the web fonts have loaded, as they change the text's height
      const fit = () => {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight + textarea.offsetHeight - textarea.clientHeight) + 'px';
      };
      fit();
      if (document.fonts) document.fonts.ready.then(fit);
      closeSimpleView();
      setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    return;
  }
  if (hash.includes('project=')) {
    // Links write spaces as "+", which decodeURIComponent leaves alone
    const project = decodeURIComponent(hash.split('project=')[1].replace(/\+/g, ' '));
    const textarea = document.getElementById('message');
    if (textarea) {
      textarea.value = `Hi Antoni,\nI'd like to request access to your ${project} project.\n\nA bit about me:\n- Name: \n- Role / company: \n- Why I'm interested in this project: `;
      // Close quick view first if it's open
      closeSimpleView();
      // Small delay to let the overlay close before scrolling
      setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}
// Fires on page load (direct URL)
window.addEventListener('DOMContentLoaded', handleProjectLink);
// Fires when hash changes (clicking link on same page)
window.addEventListener('hashchange', handleProjectLink);

// Form submit: send to Formspree in the background so visitors stay on the page
async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector('.form-submit');
    const success = document.getElementById('form-success');
    const error = document.getElementById('form-error');
    success.style.display = 'none';
    error.style.display = 'none';
    button.disabled = true;
    button.textContent = 'Sending…';
    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error(res.status);
        // Tell Analytics whether this was an Echoes test request, a project access request or a plain message
        const message = form.message.value;
        const kind = message.includes('test Echoes') ? 'echoes_test'
            : message.includes('request access') ? 'project_access' : 'message';
        if (typeof gtag === 'function') gtag('event', 'generate_lead', { form_kind: kind });
        form.reset();
        success.style.display = 'block';
        setTimeout(() => success.style.display = 'none', 8000);
    } catch {
        error.style.display = 'block';
    } finally {
        button.disabled = false;
        button.textContent = 'Send Message →';
    }
}
document.querySelector('#contact form').addEventListener('submit', handleSubmit);

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