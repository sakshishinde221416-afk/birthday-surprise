// ===== FALLING PETALS =====
const petalEmojis = ['🌸', '🌹', '🌺', '💮', '🏵️', '💐'];
const container = document.getElementById('petals-container');

function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
  const dur = Math.random() * 8 + 6;
  petal.style.animationDuration = dur + 's';
  petal.style.animationDelay = Math.random() * 5 + 's';
  container.appendChild(petal);
  setTimeout(() => petal.remove(), (dur + 5) * 1000);
}

setInterval(createPetal, 600);
for (let i = 0; i < 12; i++) setTimeout(createPetal, i * 200);

// ===== CONFETTI =====
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let confettiPieces = [];
let confettiActive = false;

function launchConfetti() {
  confettiActive = true;
  confettiPieces = [];
  const colors = ['#e74c6e','#c0392b','#f8b4c8','#ffd6e7','#ff9800','#fff','#f06292'];
  for (let i = 0; i < 180; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      spin: Math.random() * 6 - 3,
      opacity: 1
    });
  }
  animateConfetti();
  setTimeout(() => { confettiActive = false; }, 4000);
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!confettiActive && confettiPieces.length === 0) return;
  confettiPieces.forEach((p, i) => {
    p.y += p.speed;
    p.angle += p.spin;
    p.opacity -= 0.005;
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });
  confettiPieces = confettiPieces.filter(p => p.y < canvas.height + 20 && p.opacity > 0);
  if (confettiPieces.length > 0) requestAnimationFrame(animateConfetti);
  else ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ===== HERO BUTTON =====
function startJourney() {
  launchConfetti();
  document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });
}

// ===== SURPRISE MESSAGES =====
const surprises = [
  {
    emoji: '🌹',
    text: 'You are the kind of friend who makes ordinary days feel like celebrations. Just by being you. 💖'
  },
  {
    emoji: '🎀',
    text: 'First bench, first semester, first friend who felt like home. That was you, Malvika. Always you. 🌸'
  },
  {
    emoji: '✨',
    text: 'Here\'s a secret: the best part of college wasn\'t the lectures or the marks — it was every single moment with you. 💕'
  }
];

let surpriseIndex = 0;

function showSurprise(idx) {
  const s = surprises[idx !== undefined ? idx : surpriseIndex % surprises.length];
  document.querySelector('.surprise-emoji').textContent = s.emoji;
  document.getElementById('surprise-text').textContent = s.text;
  document.getElementById('surprise-overlay').classList.remove('hidden');
  launchConfetti();
  surpriseIndex++;
}

function closeSurprise() {
  document.getElementById('surprise-overlay').classList.add('hidden');
}

// Close on overlay click
document.getElementById('surprise-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeSurprise();
});

// ===== CAKE / CANDLES =====
let candlesBlown = false;

function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;
  const flames = document.querySelectorAll('.flame');
  flames.forEach((f, i) => {
    setTimeout(() => f.classList.add('out'), i * 200);
  });
  setTimeout(() => {
    document.getElementById('wish-msg').classList.remove('hidden');
    launchConfetti();
  }, flames.length * 200 + 300);
}

// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.msg-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(card);
});

// ===== AUTO SURPRISE on load =====
window.addEventListener('load', () => {
  setTimeout(() => {
    showSurprise(2);
  }, 2000);
});

// ===== MUSIC PLAYER =====
let musicPlaying = false;
const audio = document.getElementById('bg-music');

function toggleMusic() {
  if (musicPlaying) {
    audio.pause();
    document.getElementById('music-icon').textContent = '🎵';
    document.getElementById('music-text').textContent = 'Play Music';
    musicPlaying = false;
  } else {
    audio.play();
    document.getElementById('music-icon').textContent = '🎶';
    document.getElementById('music-text').textContent = 'Pause Music';
    musicPlaying = true;
  }
}



let pass=prompt("Enter Secret Password");

if(pass!="nickname"){
document.body.innerHTML="Access Denied";
}