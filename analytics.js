// Google Analytics, shared by every page on the site
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9PYTMMY21R');

// Count clicks on the links that matter most: the Play Store and Echoes early-access requests
document.addEventListener('click', e => {
  const link = e.target.closest('a');
  if (!link) return;
  if (link.href.includes('play.google.com')) {
    gtag('event', 'play_store_click', { app: 'chalkboard', page: location.pathname });
  } else if (link.href.includes('test=echoes')) {
    gtag('event', 'echoes_test_click', { page: location.pathname });
  }
});
