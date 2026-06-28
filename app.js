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
  { category:'Living Room',  title:'Marble TV Wall & False Ceiling',  desc:'Custom TV unit with Italian marble panel, wooden fluted frame and vibrant false ceiling with pink & yellow POP design.',          img:'Photos/WhatsApp%20Image%202026-06-27%20at%209.34.37%20AM%20(1).jpeg' },
  { category:'Kitchen',      title:'Mint Green Modular Kitchen',       desc:'Elegant mint-finish modular kitchen with black granite countertop, pendant lights and a beautiful teak wood arched entrance.',       img:'Photos/WhatsApp%20Image%202026-06-27%20at%209.34.37%20AM.jpeg' },
  { category:'Bedroom',      title:'Pink Gloss Wardrobe Unit',         desc:'Floor-to-ceiling pink & white gloss wardrobe with sliding doors, full-length dressing mirror and matching storage units.',          img:'Photos/WhatsApp%20Image%202026-06-27%20at%209.34.36%20AM%20(1).jpeg' },
  { category:'False Ceiling',title:'Sri Yantra Backlit Ceiling',       desc:'Unique backlit false ceiling panel with intricate Sri Yantra sacred geometry CNC cut design and warm golden LED glow.',              img:'Photos/WhatsApp%20Image%202026-06-27%20at%209.34.38%20AM%20(1).jpeg' },
  { category:'Pooja Room',   title:'Wooden Mandir & Pooja Unit',       desc:'Handcrafted teak wood pooja room with CNC backlit Om/Ganesha panel, marble platform and blue LED cove ceiling above.',              img:'Photos/WhatsApp%20Image%202026-06-27%20at%209.34.39%20AM%20(2).jpeg' },
  { category:'Living Room',  title:'Marble & Wood TV Accent Wall',     desc:'Stunning full-width TV accent wall with white marble panels, wooden fluted arches and multi-colour LED cove ceiling lighting.',       img:'Photos/WhatsApp%20Image%202026-06-27%20at%209.34.39%20AM%20(1).jpeg' },
  { category:'Bedroom',      title:'Grey Luxury Master Bedroom',       desc:'Modern bedroom with grey fluted headboard wall, upholstered bed frame, side tables and warm LED cove ceiling over hardwood flooring.', img:'Photos/WhatsApp%20Image%202026-06-27%20at%209.34.39%20AM.jpeg' },
  { category:'Kitchen',      title:'Pink Gloss L-Shape Kitchen',       desc:'Spacious L-shaped modular kitchen in gloss pink with black granite tops, warm-lit glass display cabinets and marble wall tiles.',     img:'Photos/WhatsApp%20Image%202026-06-27%20at%209.34.37%20AM%20(2).jpeg' },
  { category:'Bedroom',      title:'Hydraulic Storage Bed',            desc:'Space-saving hydraulic lift-up storage bed with custom built overhead cabinets in matching pink & white finish — maximum storage, zero clutter.', img:'Photos/WhatsApp%20Image%202026-06-27%20at%209.34.36%20AM.jpeg' },
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
    <div class="lb-img-wrap">
      <img class="lb-photo" src="${d.img}" alt="${d.title}" />
    </div>
    <div class="lb-info">
      <div class="lb-eyebrow">${d.category}</div>
      <h3>${d.title}</h3>
      <p>${d.desc}</p>
      <a href="https://www.instagram.com/home_decor_interior06_huliyar/" target="_blank" class="lb-cta">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        View More on Instagram
      </a>
    </div>
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

/* ===== FOUNDER PHOTO GALLERY ===== */
const founderPhotos = {
  yogi: [
    'Founder%20Photo/Yogi%20Maharaj/WhatsApp%20Image%202026-06-28%20at%209.25.02%20AM%20(1).jpeg',
    'Founder%20Photo/Yogi%20Maharaj/WhatsApp%20Image%202026-06-28%20at%209.25.02%20AM.jpeg',
    'Founder%20Photo/Yogi%20Maharaj/WhatsApp%20Image%202026-06-28%20at%209.25.02%20AM%20(2).jpeg',
    'Founder%20Photo/Yogi%20Maharaj/WhatsApp%20Image%202026-06-28%20at%209.25.03%20AM.jpeg',
  ],
  prashanth: [
    'Founder%20Photo/Prashanth/WhatsApp%20Image%202026-06-28%20at%209.20.47%20AM.jpeg',
    'Founder%20Photo/Prashanth/WhatsApp%20Image%202026-06-28%20at%209.20.45%20AM%20(1).jpeg',
    'Founder%20Photo/Prashanth/WhatsApp%20Image%202026-06-28%20at%209.20.45%20AM.jpeg',
    'Founder%20Photo/Prashanth/WhatsApp%20Image%202026-06-28%20at%209.20.45%20AM%20(2).jpeg',
  ]
};
const founderNames = { yogi: 'Yogi Maharaj', prashanth: 'Prashanth' };

const founderModal = document.getElementById('founderModal');
const fmPhoto     = document.getElementById('fmPhoto');
const fmNameEl    = document.getElementById('fmName');
const fmCounter   = document.getElementById('fmCounter');
const fmClose     = document.getElementById('fmClose');
const fmPrev      = document.getElementById('fmPrev');
const fmNext      = document.getElementById('fmNext');

let fmList = [], fmIdx = 0, fmKey = '';

function openFounderModal(key) {
  fmKey  = key;
  fmList = founderPhotos[key];
  fmIdx  = 0;
  renderFm();
  founderModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderFm() {
  fmPhoto.src        = fmList[fmIdx];
  fmPhoto.alt        = founderNames[fmKey];
  fmNameEl.textContent   = founderNames[fmKey];
  fmCounter.textContent  = (fmIdx + 1) + ' / ' + fmList.length;
}

function closeFm() { founderModal.classList.remove('open'); document.body.style.overflow = ''; }

function fmGoNext() { fmIdx = (fmIdx + 1) % fmList.length; renderFm(); }
function fmGoPrev() { fmIdx = (fmIdx - 1 + fmList.length) % fmList.length; renderFm(); }

fmClose.addEventListener('click', closeFm);
fmNext.addEventListener('click', fmGoNext);
fmPrev.addEventListener('click', fmGoPrev);
founderModal.addEventListener('click', e => { if (e.target === founderModal) closeFm(); });

document.addEventListener('keydown', e => {
  if (!founderModal.classList.contains('open')) return;
  if (e.key === 'Escape')      closeFm();
  if (e.key === 'ArrowRight')  fmGoNext();
  if (e.key === 'ArrowLeft')   fmGoPrev();
});

document.querySelectorAll('.founder-card').forEach(card => {
  card.addEventListener('click', () => openFounderModal(card.dataset.founder));
});
