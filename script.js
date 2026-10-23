/* ═══════════════════════════════════════════════════════════════
   ROMANTIC APOLOGY WEBSITE · script.js
   Clean, well-structured vanilla ES6+ JavaScript
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────────────
   ★  EASY CUSTOMIZATION — EDIT THESE VALUES
   ─────────────────────────────────────────────────────────────────
   Replace the values below to personalize the website.
   ───────────────────────────────────────────────────────────────── */
// Separate so letterText can safely reference it
const HIS_NAME  = 'Prabir';         // ← change this to his nickname
const YOUR_NAME = 'Your girl, Nikita ♡';  // ← change this to your sign-off name

const CONFIG = {
  // Your nickname (displayed in the letter sign-off)
  yourName: YOUR_NAME,

  // His nickname (used in romantic messages)
  hisName: HIS_NAME,

  // The apology letter body (use \n for new lines)
  letterText: `I know that sometimes my words or actions may hurt you, and I am genuinely sorry for the pain I caused. You mean so much more to me than my pride or any silly argument.

I don't want to dismiss your feelings or expect everything to be okay immediately. I just want you to know that I care about you, I value us, and I want to do better.

You are not just someone I love. You are someone whose feelings matter to me, whose happiness matters to me, and whose trust I want to protect.

I'm sorry, ${HIS_NAME}. When you're ready, I want to listen, understand, and make things right — one little step at a time.`,

  // The surprise note (shown when gift opens)
  surpriseNote: `This little website is just one small way of showing you how much you mean to me. Every little thing about you — your laughter, your patience, your heart — I treasure it all. Thank you for being you. I love you Prabir endlessly. ♡`,

  // Romantic messages (shown when universe heart is tapped)
  romanticMessages: [
    "You're still my favorite notification. ♡",
    "I wish I could hug you right now.",
    "Your smile is my favorite view in the whole world.",
    "We don't have to be perfect to keep growing together.",
    "Whenever you're ready, I'm here to listen.",
    "Every little thing you do makes me fall more.",
    "You make ordinary moments feel like magic.",
    "Missing you feels like missing a piece of myself.",
    "I'm grateful every single day that you're mine.",
    "No matter what, I choose you — every time.",
  ],

  // "Things I Love About You" cards
  loveCards: [
    { icon: '☀️', title: 'Your Smile',          desc: 'It is literally the best thing in the entire universe. It makes every hard day worth it.' },
    { icon: '🫂', title: 'The Comfort I Feel',   desc: 'With you, I feel safe. More at home than anywhere else in the world.' },
    { icon: '✨', title: 'The Little Things',    desc: 'The tiny gestures, the inside jokes, the way you just *get* me — I notice every single one.' },
    { icon: '🌙', title: 'Our Memories',         desc: 'Every moment we have shared lives in my heart like a little treasure.' },
    { icon: '🌸', title: 'How You See the World', desc: 'You make ordinary moments feel like something out of a dream.' },
    { icon: '💫', title: 'Who You Are',          desc: 'Your kindness, your strength, your beautiful heart — I admire you more than words can say.' },
  ],

  // Memory gallery photos
  // Replace the src values with your actual photo paths (e.g. "images/our-photo-1.jpg")
  // Leave the placeholder emoji and gradient for photos you haven't added yet.
  galleryPhotos: [
    { src: 'wp1.jpeg', caption: 'One of my favorite days with you ♡', gradient: 'linear-gradient(135deg,#fce4ec,#e91e63)', emoji: '📸' },
    { src: 'wp2.jpeg', caption: 'I keep coming back to this memory ♡', gradient: 'linear-gradient(135deg,#f8bbd0,#c2185b)', emoji: '💕' },
    { src: 'wp3.jpeg', caption: 'You looked so beautiful here ♡',      gradient: 'linear-gradient(135deg,#ffe0ec,#ad1457)', emoji: '🌸' },
    { src: 'wp5.jpeg', caption: 'This moment made me so happy ♡',      gradient: 'linear-gradient(135deg,#fce4ec,#880e4f)', emoji: '✨' },
    { src: 'wp6.jpeg', caption: 'Us, always ♡',                        gradient: 'linear-gradient(135deg,#ffd6e0,#c2185b)', emoji: '🫀' },
    { src: 'wp4.jpeg', caption: 'I Love You, Prabirr ♡',                        gradient: 'linear-gradient(135deg,#ffd6e0,#c2185b)', emoji: '💞' },
  ],

  // Path to your background music file
  musicSrc: 'WhatsApp-Audio-2026-10-23-at-3.50.04-PM.mp3',
};

/* ─────────────────────────────────────────────────────────────────
   UTILITIES
   ───────────────────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max + 1)); }
function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

/* ─────────────────────────────────────────────────────────────────
   SCROLL PROGRESS
   ───────────────────────────────────────────────────────────────── */
const scrollProgressBar = $('#scroll-progress');
const backToTopBtn       = $('#back-to-top');

function updateScrollProgress() {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  scrollProgressBar.style.width = clamp(pct, 0, 100) + '%';
  if (h.scrollTop > 300) backToTopBtn.classList.add('visible');
  else backToTopBtn.classList.remove('visible');
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
});

/* ─────────────────────────────────────────────────────────────────
   HERO STAGGER ENTRANCE
   ───────────────────────────────────────────────────────────────── */
function initHeroEntrance() {
  const items = $$('.reveal-stagger');
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), 300 + i * 180);
  });
}

/* ─────────────────────────────────────────────────────────────────
   PARTICLES CANVAS (floating hearts + stars)
   ───────────────────────────────────────────────────────────────── */
(function initParticles() {
  if (REDUCED) return;

  const canvas = $('#particles-canvas');
  const ctx    = canvas.getContext('2d');
  let   W, H;
  const particles = [];
  const SHAPES = ['♡', '✦', '·', '✿'];
  const COLORS = ['rgba(212,86,122,', 'rgba(249,192,203,', 'rgba(197,160,216,', 'rgba(255,210,230,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function spawnParticle() {
    return {
      x:      rand(0, W),
      y:      rand(H * 0.2, H),
      vx:     rand(-0.3, 0.3),
      vy:     rand(-0.5, -1.4),
      size:   rand(10, 20),
      shape:  SHAPES[randInt(0, SHAPES.length - 1)],
      color:  COLORS[randInt(0, COLORS.length - 1)],
      alpha:  rand(0.15, 0.5),
      spin:   rand(-0.02, 0.02),
      angle:  rand(0, Math.PI * 2),
      life:   0,
      maxLife: rand(120, 280),
    };
  }

  for (let i = 0; i < 28; i++) particles.push(spawnParticle());

  let raf;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x    += p.vx;
      p.y    += p.vy;
      p.angle += p.spin;
      p.life++;

      const progress = p.life / p.maxLife;
      const alpha    = p.alpha * (1 - Math.pow(progress, 2));

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.font        = `${p.size}px serif`;
      ctx.fillStyle   = p.color + alpha + ')';
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.shape, 0, 0);
      ctx.restore();

      if (p.life >= p.maxLife) particles[i] = spawnParticle();
    }

    raf = requestAnimationFrame(draw);
  }

  // Pause when page hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(draw);
  });

  resize();
  window.addEventListener('resize', resize, { passive: true });
  draw();
})();

/* ─────────────────────────────────────────────────────────────────
   STARS CANVAS (universe & closing sections)
   ───────────────────────────────────────────────────────────────── */
function initStarsCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx  = canvas.getContext('2d');
  const stars = [];
  let W, H;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
  }

  function buildStars() {
    stars.length = 0;
    const count = REDUCED ? 0 : Math.floor((W * H) / 3000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x:     rand(0, W),
        y:     rand(0, H),
        r:     rand(0.5, 2),
        alpha: rand(0.2, 0.9),
        speed: rand(0.003, 0.012),
        phase: rand(0, Math.PI * 2),
      });
    }
  }

  let raf;
  function draw(t = 0) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const a = s.alpha * (0.4 + 0.6 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,220,235,${a})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(draw);
  });

  const ro = new ResizeObserver(() => { resize(); buildStars(); });
  ro.observe(canvas.parentElement);

  resize(); buildStars(); draw();
}

initStarsCanvas('stars-canvas');
initStarsCanvas('closing-stars');

/* ─────────────────────────────────────────────────────────────────
   INTERSECTION OBSERVER — scroll-triggered animations
   ───────────────────────────────────────────────────────────────── */
const observerOpts = { threshold: 0.12 };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

$$('.scroll-reveal, .love-card, .gallery-photo').forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────────────────────────────
   HERO BUTTONS
   ───────────────────────────────────────────────────────────────── */
$('#btn-open-heart').addEventListener('click', () => {
  const target = $('#love-letter');
  target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  // Trigger envelope open after scroll
  setTimeout(() => openEnvelope(), 800);
});

$('#btn-still-listening').addEventListener('click', () => openPopup('still-listening-overlay'));

/* ─────────────────────────────────────────────────────────────────
   ENVELOPE ANIMATION + TYPEWRITER LETTER
   ───────────────────────────────────────────────────────────────── */
let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const envelope = $('#envelope');
  const flap     = $('#env-flap');
  const letter   = $('#letter');
  const hint     = $('#env-hint-outer');

  envelope.setAttribute('aria-expanded', 'true');
  envelope.classList.add('open');
  hint.classList.add('hidden');

  // After flap animation, start letter reveal
  setTimeout(() => {
    letter.style.display = 'block';
    // Force reflow then apply transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Typewriter effect for the letter body
        const letterBodyEl = $('#letter-body');
        const signEl       = $('#letter-sign-name');
        signEl.textContent = CONFIG.yourName;
        typewriterReveal(letterBodyEl, CONFIG.letterText, 18);
      });
    });
  }, 650);
}

function typewriterReveal(el, text, speed = 22) {
  if (REDUCED) {
    el.textContent = text;
    return;
  }

  el.textContent = '';
  let i = 0;

  // Wrap each character
  const chars = text.split('');
  chars.forEach(ch => {
    const span = document.createElement('span');
    span.className = 'letter-char';
    span.textContent = ch === '\n' ? '' : ch;
    if (ch === '\n') {
      el.appendChild(document.createElement('br'));
    } else {
      el.appendChild(span);
    }
  });

  const spans = el.querySelectorAll('.letter-char');
  let idx = 0;

  function next() {
    if (idx >= spans.length) return;
    spans[idx].classList.add('revealed');
    idx++;
    setTimeout(next, speed);
  }
  setTimeout(next, 100);
}

// Envelope click / keyboard
const envelope = $('#envelope');
envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
});

/* ─────────────────────────────────────────────────────────────────
   LOVE CARDS — build + stagger observer
   ───────────────────────────────────────────────────────────────── */
function buildLoveCards() {
  const grid = $('#love-cards-grid');
  CONFIG.loveCards.forEach((card, i) => {
    const el = document.createElement('article');
    el.className = 'love-card';
    el.style.transitionDelay = `${i * 0.1}s`;
    el.innerHTML = `
      <span class="love-card-icon" aria-hidden="true">${card.icon}</span>
      <h3 class="love-card-title">${card.title}</h3>
      <p class="love-card-desc">${card.desc}</p>
    `;

    // 3D tilt on desktop
    if (!REDUCED && window.matchMedia('(pointer: fine)').matches) {
      el.addEventListener('mousemove', e => {
        const r    = el.getBoundingClientRect();
        const x    = (e.clientX - r.left) / r.width  - 0.5;
        const y    = (e.clientY - r.top)  / r.height - 0.5;
        el.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.7s, box-shadow 0.4s';
      });
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform 0.1s linear, opacity 0.7s, box-shadow 0.4s';
      });
    }

    grid.appendChild(el);
    revealObserver.observe(el);
  });
}

buildLoveCards();

/* ─────────────────────────────────────────────────────────────────
   UNIVERSE — romantic message generator + floating hearts
   ───────────────────────────────────────────────────────────────── */
let lastMsgIndex = -1;

function getNextMessage() {
  let idx;
  do { idx = randInt(0, CONFIG.romanticMessages.length - 1); } while (idx === lastMsgIndex);
  lastMsgIndex = idx;
  return CONFIG.romanticMessages[idx];
}

function spawnFloatingHeart(originEl) {
  if (REDUCED) return;
  const count = randInt(4, 9);
  const rect  = originEl.getBoundingClientRect();
  const cx    = rect.left + rect.width  / 2;
  const cy    = rect.top  + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.textContent = '♡';
    heart.style.cssText = `
      position:fixed;
      left:${cx}px;
      top:${cy}px;
      font-size:${rand(14,26)}px;
      color:hsl(${rand(320,360)},80%,${rand(55,75)}%);
      pointer-events:none;
      user-select:none;
      z-index:9999;
      animation:popHeart ${rand(0.9,1.6).toFixed(2)}s ease-out forwards;
      --dx:${rand(-80,80)}px;
      --dy:${rand(-120,-30)}px;
      transform:translate(-50%,-50%);
    `;
    // Custom move animation via Web Animations API for each heart
    document.body.appendChild(heart);
    heart.animate([
      { transform: 'translate(-50%,-50%) scale(0)', opacity: 1 },
      { transform: `translate(calc(-50% + ${rand(-80,80)}px), calc(-50% + ${rand(-140,-40)}px)) scale(1)`, opacity: 1, offset: 0.6 },
      { transform: `translate(calc(-50% + ${rand(-100,100)}px), calc(-50% + ${rand(-200,-80)}px)) scale(0.3)`, opacity: 0 },
    ], { duration: rand(900,1600), easing: 'ease-out', fill: 'forwards' })
      .onfinish = () => heart.remove();
  }
}

const universeHeartBtn = $('#universe-heart');
const romanticMsgBox   = $('#romantic-msg-box');
const romanticMsgText  = $('#romantic-msg-text');

universeHeartBtn.addEventListener('click', () => {
  const msg = getNextMessage();
  romanticMsgText.textContent = msg;
  romanticMsgBox.classList.add('visible');
  spawnFloatingHeart(universeHeartBtn);
});

/* ─────────────────────────────────────────────────────────────────
   POPUP SYSTEM (apology moment + still listening)
   ───────────────────────────────────────────────────────────────── */
let lastFocused = null;

function openPopup(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  lastFocused = document.activeElement;
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Focus first focusable element
  const focusable = overlay.querySelector('button, [tabindex="0"]');
  if (focusable) setTimeout(() => focusable.focus(), 50);

  // Trap focus
  overlay.addEventListener('keydown', trapFocus);
}

function closePopup(overlay) {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  overlay.removeEventListener('keydown', trapFocus);
  if (lastFocused) lastFocused.focus();
}

function trapFocus(e) {
  if (e.key !== 'Tab') {
    if (e.key === 'Escape') closePopup(e.currentTarget);
    return;
  }
  const overlay    = e.currentTarget;
  const focusable  = $$('button:not([disabled]), [tabindex="0"]', overlay);
  const first      = focusable[0];
  const last       = focusable[focusable.length - 1];
  if (e.shiftKey) { if (document.activeElement === first) { last.focus(); e.preventDefault(); } }
  else             { if (document.activeElement === last)  { first.focus(); e.preventDefault(); } }
}

// Apology popup
$('#btn-tap-ready').addEventListener('click', () => openPopup('apology-popup'));
$('#popup-close').addEventListener('click', () => closePopup($('#apology-popup')));
$('#apology-popup').addEventListener('click', e => {
  if (e.target === e.currentTarget) closePopup(e.currentTarget);
});

// Still Listening popup
$('#sl-close').addEventListener('click', () => closePopup($('#still-listening-overlay')));
$('#still-listening-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closePopup(e.currentTarget);
});

// Escape key global
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const openOverlay = $('.popup-overlay.open');
  if (openOverlay) closePopup(openOverlay);
  const lightbox = $('#lightbox');
  if (lightbox.classList.contains('open')) closeLightbox();
});

/* ─────────────────────────────────────────────────────────────────
   SURPRISE SECTION — gift box + confetti
   ───────────────────────────────────────────────────────────────── */
let surprisePlayed = false;

const CONFETTI_COLORS = [
  '#f9c0cb','#d4567a','#8b1a3a','#e8d5f0',
  '#c5a0d8','#ffd6e0','#fff0f5','#f5b4c4',
];

function launchConfetti() {
  if (REDUCED) return;
  const container = $('#confetti-container');
  container.innerHTML = '';

  const count = 80;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = rand(6, 13);
    const color = CONFETTI_COLORS[randInt(0, CONFETTI_COLORS.length - 1)];
    const x = rand(10, 90);
    const dur = rand(2.2, 4.5);
    const delay = rand(0, 1.2);
    const shape = Math.random() > 0.5 ? '50%' : '2px';

    piece.style.cssText = `
      left:${x}%;
      width:${size}px;
      height:${size}px;
      background:${color};
      border-radius:${shape};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    container.appendChild(piece);
  }

  setTimeout(() => { container.innerHTML = ''; }, 6000);
}

function spawnSurpriseHearts() {
  if (REDUCED) return;
  const emojis = ['♡','✦','🌸','✿','*'];
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.textContent = emojis[randInt(0, emojis.length-1)];
      el.style.cssText = `
        position:fixed;
        left:${rand(5,95)}%;
        top:${rand(10,60)}%;
        font-size:${rand(18,38)}px;
        color:hsl(${rand(310,360)},70%,${rand(55,75)}%);
        pointer-events:none;
        user-select:none;
        z-index:9999;
        opacity:0.9;
      `;
      document.body.appendChild(el);
      el.animate([
        { transform:'scale(0) rotate(0deg)', opacity:1 },
        { transform:`scale(1.2) rotate(${rand(-30,30)}deg)`, opacity:1, offset: 0.3 },
        { transform:`scale(0.5) rotate(${rand(-60,60)}deg) translateY(-${rand(80,200)}px)`, opacity:0 },
      ], { duration: rand(1200, 2200), easing:'ease-out', fill:'forwards' })
        .onfinish = () => el.remove();
    }, i * 60);
  }
}

function playSurprise() {
  surprisePlayed = true;

  // Open gift lid
  $('#gift-lid').classList.add('open');

  // Confetti + hearts
  launchConfetti();
  spawnSurpriseHearts();

  // Show note
  const note = $('#surprise-note');
  const text = $('#surprise-note-text');
  text.textContent = CONFIG.surpriseNote;
  setTimeout(() => note.classList.add('visible'), 700);

  // Show replay button, hide open button
  $('#btn-surprise').style.display = 'none';
  setTimeout(() => {
    const replayBtn = $('#btn-replay-surprise');
    replayBtn.style.display = 'inline-flex';
  }, 1500);
}

function resetSurprise() {
  surprisePlayed = false;
  $('#gift-lid').classList.remove('open');
  $('#surprise-note').classList.remove('visible');
  $('#btn-replay-surprise').style.display = 'none';
  setTimeout(() => {
    $('#btn-surprise').style.display = 'inline-flex';
  }, 400);
}

$('#btn-surprise').addEventListener('click', () => { if (!surprisePlayed) playSurprise(); });
$('#btn-replay-surprise').addEventListener('click', () => {
  resetSurprise();
  setTimeout(playSurprise, 500);
});

/* ─────────────────────────────────────────────────────────────────
   MEMORY GALLERY — build + lightbox
   ───────────────────────────────────────────────────────────────── */
function buildGallery() {
  const grid = $('#gallery-grid');

  CONFIG.galleryPhotos.forEach((photo, i) => {
    const article = document.createElement('article');
    article.className = 'gallery-photo';
    article.style.transitionDelay = `${i * 0.12}s`;
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'button');
    article.setAttribute('aria-label', `View photo: ${photo.caption}`);

    article.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" loading="lazy"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="gallery-placeholder" style="background:${photo.gradient}; display:none;">
        <span style="font-size:3rem">${photo.emoji}</span>
        <span style="color:rgba(255,255,255,0.8);font-size:0.85rem;padding:0 1rem;text-align:center;">Add your photo here<br/><em style="font-size:0.78rem;opacity:0.7">${photo.src}</em></span>
      </div>
      <div class="gallery-overlay" aria-hidden="true">
        <p class="gallery-caption">${photo.caption}</p>
      </div>
    `;

    article.addEventListener('click', () => openLightbox(photo, article));
    article.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(photo, article); }
    });

    grid.appendChild(article);
    revealObserver.observe(article);
  });
}

buildGallery();

// Lightbox
const lightbox        = $('#lightbox');
const lightboxImg     = $('#lightbox-img');
const lightboxHolder  = $('#lightbox-placeholder');
const lightboxCaption = $('#lightbox-caption');
let   lbLastFocused   = null;

function openLightbox(photo, triggerEl) {
  lbLastFocused = triggerEl;

  // Try to show real image, fall back to placeholder
  lightboxImg.style.display    = 'block';
  lightboxHolder.style.display = 'none';

  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.caption;
  lightboxImg.onerror = () => {
    lightboxImg.style.display    = 'none';
    lightboxHolder.style.display = 'flex';
    lightboxHolder.textContent   = photo.emoji;
    lightboxHolder.style.background = photo.gradient;
  };

  lightboxCaption.textContent = photo.caption;
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => $('#lightbox-close').focus(), 50);
  lightbox.addEventListener('keydown', trapFocus);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightbox.removeEventListener('keydown', trapFocus);
  if (lbLastFocused) lbLastFocused.focus();
}

$('#lightbox-close').addEventListener('click', closeLightbox);
$('#lightbox-backdrop').addEventListener('click', closeLightbox);

/* ─────────────────────────────────────────────────────────────────
   CLOSING — HUG BUTTON
   ───────────────────────────────────────────────────────────────── */
const hugBtn    = $('#btn-hug');
const hugReveal = $('#hug-reveal');

hugBtn.addEventListener('click', () => {
  hugReveal.classList.add('visible');
  hugBtn.style.opacity = '0';
  hugBtn.style.pointerEvents = 'none';
  spawnFloatingHeart(hugBtn);
  launchConfetti();
});

/* ─────────────────────────────────────────────────────────────────
   BACKGROUND MUSIC TOGGLE
   ───────────────────────────────────────────────────────────────── */
(function initMusic() {
  const audio     = $('#bg-music');
  const toggleBtn = $('#music-toggle');
  const playIcon  = $('#music-icon-play');
  const pauseIcon = $('#music-icon-pause');

  // Set src from config
  if (audio.querySelector('source')) {
    audio.querySelector('source').src = CONFIG.musicSrc;
    audio.load();
  }

  let playing = false;

  function setPlayState(isPlaying) {
    playing = isPlaying;
    playIcon.style.display  = isPlaying ? 'none'  : 'block';
    pauseIcon.style.display = isPlaying ? 'block' : 'none';
    toggleBtn.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
  }

  toggleBtn.addEventListener('click', async () => {
    if (!playing) {
      try {
        await audio.play();
        setPlayState(true);
      } catch {
        // File missing or playback blocked — fail gracefully
        console.info('Music file not available. Add your mp3 to the music/ folder.');
        toggleBtn.title = 'Music file not found — see CONFIG.musicSrc';
      }
    } else {
      audio.pause();
      setPlayState(false);
    }
  });

  audio.addEventListener('ended', () => setPlayState(false));
  audio.addEventListener('error', () => {
    setPlayState(false);
    toggleBtn.title = 'Music unavailable';
  });
})();

/* ─────────────────────────────────────────────────────────────────
   HERO HEART — click burst
   ───────────────────────────────────────────────────────────────── */
$('#hero-heart').addEventListener('click', () => {
  spawnFloatingHeart($('#hero-heart'));
});

/* ─────────────────────────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeroEntrance();
});

// Also run immediately in case DOMContentLoaded already fired
if (document.readyState !== 'loading') {
  initHeroEntrance();
}
