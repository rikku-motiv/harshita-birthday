/* =====================================================================
   EDIT HERE
   Replace the `src` of each photo with your own file, for example
   "images/us1.jpg". Keep the images folder next to this HTML file.
   Rare-moment screenshots work best in portrait (phone screenshot) size.
   ===================================================================== */
const CONFIG = {
  birthday: new Date(2026, 9, 31, 0, 0, 0),   // 31 Oct 2026, 12:00 AM (month is 0-based)
  music: "",                                   // e.g. "song.mp3" (leave empty for no music)

  memories: [
    { src: "us1-love.jpeg",  cap: "The day it all began", r: -3, ar: "3/4" },
    { src: "Harshita2.jpeg",  cap: "Your smile, my favourite", r: 2, ar: "1/1" },
    { src: "us3-1.jpeg",  cap: "Us, being silly", r: -1.5, ar: "4/5" },
    { src: "us1-2.jpeg",  cap: "Evenings with you", r: 3, ar: "6/7" },
    { src: "image3.jpeg",  cap: "Home is wherever you are", r: -2, ar: "3/4" },
    { src: "Image2.jpeg",  cap: "My happy place", r: 1.5, ar: "15/16" }
  ],

  rare: [
    { src: "Harshita4.jpeg", cap: "Just you, being you" },
    { src: "annu2.jpeg", cap: "Caught my heart here" },
    { src: "Harshita6.jpeg", cap: "My favourite One" },
    { src: "Harshita1.jpeg", cap: "So cute, can't stop" },
    { src: "us 3.jpeg", cap: "Only mine" }
  ],

  letter:
`My love,
Loving you is the easiest and best thing I have ever done.
Every time I look at you, I am reminded of how lucky I am to share my life with someone so kind, beautiful, and extraordinary.
Your smile has an effortless way of making my hardest days fade away, and your laugh is easily my favorite sound in the world.
With you, even the quietest, simplest moments feel special and full of warmth.
You are my peace when life gets loud and my favorite person to share every adventure with.
Thank you for being my safe place, my biggest supporter, and my best friend.
No matter what the future holds, I promise to always stand beside you, hold your hand, and love you with everything I have.
You have my whole heart, today and always.

I made this little corner of the internet only for you, because you deserve a birthday that feels as special as you make my life.

Be happy always, Annu. I will make sure of it.

Forever yours,
Motuuuuu`,

  reasons: [
    { f: "Smile", b: "Your smile fixes my worst day in one second." },
    { f: "Heart", b: "You care so deeply, about everyone, and about me." },
    { f: "Laugh", b: "Your laugh is my favourite song." },
    { f: "Support", b: "You believe in me even when I forget to." },
    { f: "Silly us", b: "With you, even doing nothing is the best plan." },
    { f: "You", b: "Simply because you are My Chotuu, and there is no one like you." }
  ],

  wishes: [
    "May every dream of yours come true",
    "I wished for you, today and always"
  ]
};
/* ===================================================================== */

/* ----- always start from the very beginning on open / reload / back ----- */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', e => { if (e.persisted) location.reload(); });
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
window.scrollTo(0, 0);
document.documentElement.classList.add('locked');

const $ = id => document.getElementById(id);

/* ----- gate stars ----- */
(() => {
  const s = $('stars');
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('i');
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.animationDelay = (Math.random() * 3) + 's';
    s.appendChild(el);
  }
})();

/* ----- countdown ----- */
function tick() {
  let diff = CONFIG.birthday - new Date();
  if (diff <= 0) {
    $('gateTop').textContent = "Today is all about you";
    $('count').style.display = 'none';
    return;
  }
  const d = Math.floor(diff / 864e5); diff %= 864e5;
  const h = Math.floor(diff / 36e5);  diff %= 36e5;
  const m = Math.floor(diff / 6e4);   diff %= 6e4;
  const s = Math.floor(diff / 1e3);
  $('cd').textContent = d;
  $('ch').textContent = String(h).padStart(2, '0');
  $('cm').textContent = String(m).padStart(2, '0');
  $('cs').textContent = String(s).padStart(2, '0');
}
tick(); setInterval(tick, 1000);

/* ----- confetti / party bomb ----- */
const cv = $('confetti'), ctx = cv.getContext('2d');
let W, H, parts = [], running = false;
const COLORS = ['#ff7aa8', '#ffdbe5', '#f4d9a6', '#ffffff', '#d9396f', '#ffc0d5'];
function resize() {
  const dpr = window.devicePixelRatio || 1;
  W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize(); addEventListener('resize', resize);

function burst(x, y, n, angle, spread, power) {
  for (let i = 0; i < n; i++) {
    const a = angle + (Math.random() - .5) * spread;
    const v = power * (.4 + Math.random() * .8);
    parts.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
      size: 6 + Math.random() * 8, rot: Math.random() * 6, vr: (Math.random() - .5) * .35,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      heart: Math.random() < .28, life: 0, max: 150 + Math.random() * 90
    });
  }
  if (!running) { running = true; requestAnimationFrame(loop); }
}
function loop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter(p => p.life < p.max && p.y < innerHeight + 40);
  for (const p of parts) {
    p.vy += .26; p.vx *= .985; p.vy *= .985;
    p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
    ctx.globalAlpha = Math.min(1, (p.max - p.life) / 40);
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
    if (p.heart) { ctx.font = p.size * 1.6 + 'px serif'; ctx.textAlign = 'center'; ctx.fillText('♥', 0, 0); }
    else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  if (parts.length) requestAnimationFrame(loop); else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}
function partyBomb() {
  const w = innerWidth, h = innerHeight;
  burst(0, h, 110, -Math.PI / 3.2, .9, 24);
  burst(w, h, 110, -Math.PI + Math.PI / 3.2, .9, 24);
  setTimeout(() => burst(w / 2, h * .9, 140, -Math.PI / 2, 1.3, 26), 250);
  setTimeout(() => {
    for (let i = 0; i < 6; i++) burst(Math.random() * w, -10, 25, Math.PI / 2, 1.2, 4);
  }, 500);
}

/* ----- floating hearts ----- */
let heartTimer;
function startHearts() {
  const box = $('hearts');
  heartTimer = setInterval(() => {
    if (document.hidden || box.childElementCount > 22) return;
    const s = document.createElement('span');
    s.textContent = Math.random() < .8 ? '♥' : '✦';
    s.style.left = Math.random() * 100 + '%';
    s.style.fontSize = (12 + Math.random() * 22) + 'px';
    s.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
    s.style.animationDuration = (9 + Math.random() * 7) + 's';
    box.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }, 700);
}

/* ----- build galleries ----- */
const lb = $('lb'), lbImg = lb.querySelector('img'), lbCap = lb.querySelector('p');
function openLB(src, cap) { lbImg.src = src; lbCap.textContent = cap; lb.classList.add('on'); }
lb.addEventListener('click', () => lb.classList.remove('on'));
addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('on'); });

function makeImg(src, alt) {
  const img = new Image(); img.src = src; img.alt = alt; img.loading = 'lazy';
  img.onerror = () => img.remove();   // gradient background stays as a graceful fallback
  return img;
}

CONFIG.memories.forEach(m => {
  const el = document.createElement('figure');
  el.className = 'polaroid rv';
  el.style.setProperty('--r', (m.r || 0) + 'deg');
  el.style.setProperty('--ar', m.ar || '3/4');
  el.innerHTML = '<div class="ph"></div><p></p>';
  el.querySelector('.ph').appendChild(makeImg(m.src, m.cap));
  el.querySelector('p').textContent = m.cap;
  el.addEventListener('click', () => openLB(m.src, m.cap));
  $('memGrid').appendChild(el);
});

CONFIG.rare.forEach((m, i) => {
  const el = document.createElement('div');
  el.className = 'frame';
  el.tabIndex = 0;
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', 'Flip to see rare moment ' + (i + 1));
  el.innerHTML =
    '<div class="in">' +
      '<div class="f"><div class="lockheart">♥</div><div class="t">A rare moment</div><div class="s">tap to flip</div></div>' +
      '<div class="b"><div class="ph"></div><p></p><span class="zoom" title="View big">⤢</span></div>' +
    '</div>';
  el.querySelector('.ph').appendChild(makeImg(m.src, m.cap));
  el.querySelector('p').textContent = m.cap;
  const flip = () => {
    el.classList.toggle('flip');
    if (el.classList.contains('flip')) {
      const b = el.getBoundingClientRect();
      burst(b.left + b.width / 2, b.top + b.height / 2, 18, -Math.PI / 2, 2.6, 6);
    }
  };
  el.addEventListener('click', flip);
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
  el.querySelector('.zoom').addEventListener('click', e => { e.stopPropagation(); openLB(m.src, m.cap); });
  $('rareStrip').appendChild(el);
});

CONFIG.reasons.forEach(r => {
  const el = document.createElement('button');
  el.className = 'card';
  el.innerHTML = '<div class="in"><div class="f"></div><div class="b"></div></div>';
  el.querySelector('.f').textContent = r.f;
  el.querySelector('.b').textContent = r.b;
  el.addEventListener('click', () => {
    el.classList.toggle('flip');
    if (el.classList.contains('flip')) {
      const b = el.getBoundingClientRect();
      burst(b.left + b.width / 2, b.top + b.height / 2, 14, -Math.PI / 2, 2.5, 6);
    }
  });
  $('cards').appendChild(el);
});

/* ----- reveal photos on scroll ----- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* ----- typewriter letter (starts when she reaches it) ----- */
let typed = false;
const letter = $('letter');
new IntersectionObserver((es, ob) => {
  if (es[0].isIntersecting && !typed) {
    typed = true; ob.disconnect();
    const txt = CONFIG.letter; let i = 0;
    letter.classList.add('typing');
    (function type() {
      letter.textContent = txt.slice(0, ++i);
      if (i < txt.length) setTimeout(type, txt[i - 1] === '\n' ? 260 : 32);
      else letter.classList.remove('typing');
    })();
  }
}, { threshold: .35 }).observe(letter);

/* ----- cake ----- */
let blown = false;
$('blowBtn').addEventListener('click', () => {
  if (blown) {
    blown = false; $('cake').classList.remove('out');
    $('wishOut').textContent = ''; $('blowBtn').textContent = 'Blow the candles';
    return;
  }
  blown = true;
  $('cake').classList.add('out');
  $('wishOut').textContent = CONFIG.wishes[Math.floor(Math.random() * CONFIG.wishes.length)];
  $('blowBtn').textContent = 'Light them again';
  partyBomb();
});

/* ----- music (optional) ----- */
let audio = null;
if (CONFIG.music) {
  audio = new Audio(CONFIG.music); audio.loop = true;
  $('music').hidden = false;
  $('music').addEventListener('click', () => {
    if (audio.paused) { audio.play(); $('music').textContent = '♪'; }
    else { audio.pause(); $('music').textContent = '✕'; }
  });
}

/* ----- open the surprise ----- */
$('openBtn').addEventListener('click', () => {
  $('gate').classList.add('gone');
  document.documentElement.classList.remove('locked');
  window.scrollTo(0, 0);
  $('bomb').classList.add('show');
  if (audio) { $('music').classList.add('show'); audio.play().catch(() => {}); }
  setTimeout(partyBomb, 350);
  startHearts();
});

$('bomb').addEventListener('click', partyBomb);
$('replay').addEventListener('click', () => location.reload());
