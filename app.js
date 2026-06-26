/* ===== HEADER ===== */
const header = document.getElementById('header');
const backTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 60);
  backTop.classList.toggle('show', y > 400);
  updateActiveNav();
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== MOBILE MENU ===== */
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => { menuToggle.classList.remove('open'); nav.classList.remove('open'); });
});

/* ===== ACTIVE NAV ===== */
function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  document.querySelectorAll('section[id]').forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight);
  });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' }); }
  });
});

/* ===== GALLERY FILTER ===== */
document.querySelectorAll('.gf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gm-item').forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

/* ===== LIGHTBOX ===== */
const galleryData = [
  { category:'Living Room', title:'Warm Minimalist Living Room', desc:'Custom furniture, accent wall & layered lighting for a serene living space.' },
  { category:'Kitchen', title:'Blue Gloss Modular Kitchen', desc:'Sleek blue gloss shutters with quartz countertop and smart storage solutions.' },
  { category:'Bedroom', title:'Lavender Luxury Bedroom', desc:'LED cove ceiling, custom headboard and premium fabrics for restful sleep.' },
  { category:'False Ceiling', title:'LED Cove False Ceiling', desc:'Dramatic POP false ceiling with ambient LED cove lighting and center fixture.' },
  { category:'Office', title:'Contemporary Office Interior', desc:'Ergonomic professional workspace with branded partitions and smart lighting.' },
  { category:'Living Room', title:'Earthy Tones Living Room', desc:'Warm orange palette with custom TV unit, sofa set and area rug.' },
  { category:'Bedroom', title:'Gold Accent Bedroom', desc:'Walk-in wardrobe, gold accents and warm wood tones for a luxe retreat.' },
  { category:'Kitchen', title:'Rose Gloss Modular Kitchen', desc:'Bold rose gloss cabinets with open shelves and granite worktops.' },
];

const lightbox = document.getElementById('lightbox');
const lbBody = document.getElementById('lbBody');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
let lbIndex = 0;

function openLb(i) {
  lbIndex = i;
  renderLb();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function renderLb() {
  const d = galleryData[lbIndex];
  lbBody.innerHTML = `
    <div class="lb-eyebrow">${d.category}</div>
    <h3>${d.title}</h3>
    <p>${d.desc}</p>
    <p class="lb-note">📸 View actual project photos on our Instagram page</p>
    <a href="https://www.instagram.com/home_decor_interior06_huliyar/" target="_blank" class="lb-cta">View on Instagram →</a>
  `;
}
function closeLb() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }

lbClose.addEventListener('click', closeLb);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
lbPrev.addEventListener('click', () => { lbIndex = (lbIndex - 1 + galleryData.length) % galleryData.length; renderLb(); });
lbNext.addEventListener('click', () => { lbIndex = (lbIndex + 1) % galleryData.length; renderLb(); });

document.querySelectorAll('.gm-view-btn').forEach(btn => {
  btn.addEventListener('click', e => { e.stopPropagation(); openLb(parseInt(btn.dataset.idx)); });
});
document.querySelectorAll('.gm-item').forEach((item, i) => {
  item.addEventListener('click', () => { if (i < galleryData.length) openLb(i); });
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') lbNext.click();
  if (e.key === 'ArrowLeft') lbPrev.click();
});

/* ===== VIDEO PLAYERS ===== */
function initVideoPlayers() {
  document.querySelectorAll('[data-vp]').forEach(wrap => {
    const video = wrap.querySelector('.vp-video');
    const playPauseBtn = wrap.querySelector('.vp-play-pause');
    const soundBtn = wrap.querySelector('.vp-sound');
    const progressBar = wrap.querySelector('.vp-progress-bar');
    if (!video) return;

    const iconPause = playPauseBtn?.querySelector('.icon-pause');
    const iconPlay = playPauseBtn?.querySelector('.icon-play');
    const iconMute = soundBtn?.querySelector('.icon-mute');
    const iconSound = soundBtn?.querySelector('.icon-sound');

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { video.play().catch(() => {}); wrap.classList.remove('paused'); setPlayIcons(true); }
        else { video.pause(); }
      });
    }, { threshold: 0.3 });
    obs.observe(wrap);

    function setPlayIcons(playing) {
      if (!iconPause || !iconPlay) return;
      iconPause.style.display = playing ? '' : 'none';
      iconPlay.style.display = playing ? 'none' : '';
    }

    wrap.addEventListener('click', e => {
      if (e.target.closest('.vp-sound')) return;
      if (video.paused) { video.play().catch(() => {}); wrap.classList.remove('paused'); setPlayIcons(true); }
      else { video.pause(); wrap.classList.add('paused'); setPlayIcons(false); }
    });

    soundBtn?.addEventListener('click', e => {
      e.stopPropagation();
      video.muted = !video.muted;
      soundBtn.classList.toggle('unmuted', !video.muted);
      if (iconMute) iconMute.style.display = video.muted ? '' : 'none';
      if (iconSound) iconSound.style.display = video.muted ? 'none' : '';
    });

    if (progressBar) {
      video.addEventListener('timeupdate', () => {
        if (video.duration) progressBar.style.width = (video.currentTime / video.duration * 100) + '%';
      });
    }

    wrap.querySelector('.vp-progress')?.addEventListener('click', e => {
      e.stopPropagation();
      const r = e.currentTarget.getBoundingClientRect();
      video.currentTime = ((e.clientX - r.left) / r.width) * video.duration;
    });
  });
}
initVideoPlayers();

/* ===== TESTIMONIALS ===== */
const testiTrack = document.getElementById('testiTrack');
const testiCards = document.querySelectorAll('.testi-card');
const testiDotsWrap = document.getElementById('testiDots');
let testiIdx = 0, testiTimer;

testiCards.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'testi-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => { goTesti(i); resetTestiTimer(); });
  testiDotsWrap.appendChild(d);
});

function getVisible() { return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3; }

function goTesti(i) {
  const vis = getVisible();
  const max = Math.max(0, testiCards.length - vis);
  testiIdx = Math.min(Math.max(i, 0), max);
  const w = testiTrack.parentElement.offsetWidth / vis;
  testiTrack.style.transform = `translateX(-${testiIdx * w}px)`;
  document.querySelectorAll('.testi-dot').forEach((d, j) => d.classList.toggle('active', j === testiIdx));
}

document.getElementById('testiNext').addEventListener('click', () => {
  const max = Math.max(0, testiCards.length - getVisible());
  goTesti(testiIdx >= max ? 0 : testiIdx + 1); resetTestiTimer();
});
document.getElementById('testiPrev').addEventListener('click', () => {
  const max = Math.max(0, testiCards.length - getVisible());
  goTesti(testiIdx <= 0 ? max : testiIdx - 1); resetTestiTimer();
});

function initTesti() {
  const vis = getVisible();
  testiCards.forEach(c => { c.style.minWidth = `calc(${100 / vis}% - ${(vis - 1) * 20 / vis}px)`; });
  goTesti(0);
}
function startTestiTimer() { testiTimer = setInterval(() => { const max = Math.max(0, testiCards.length - getVisible()); goTesti(testiIdx >= max ? 0 : testiIdx + 1); }, 4500); }
function resetTestiTimer() { clearInterval(testiTimer); startTestiTimer(); }

window.addEventListener('resize', initTesti);
setTimeout(() => { initTesti(); startTestiTimer(); }, 120);

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ===== CONTACT FORM → GOOGLE SHEETS ===== */
const SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdBW-FsqvKJ4NMTHOID5PqKumy-cRD3jMMlY2MyHbCVW8rrksKqMJ15jji1gnWE4UCcQ/exec';

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-submit-form');
  btn.textContent = 'Sending...'; btn.disabled = true;

  const payload = {
    name:     document.getElementById('name').value.trim(),
    phone:    document.getElementById('phone').value.trim(),
    location: document.getElementById('location').value.trim(),
    service:  document.getElementById('service').value,
    message:  document.getElementById('message').value.trim(),
    submitted: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  try {
    await fetch(SHEET_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('Sheet sync failed:', err);
  }

  formSuccess.classList.add('show');
  contactForm.reset();
  btn.textContent = 'Send Request →'; btn.disabled = false;
  setTimeout(() => formSuccess.classList.remove('show'), 5000);
});

/* ===== SCROLL REVEAL ===== */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));
