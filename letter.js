// ===== FALLING PETALS =====
const petalEmojis = ['🌸','🌹','🌺','💮','💐'];
const container = document.getElementById('petals-container');

function createPetal() {
  const p = document.createElement('div');
  p.classList.add('petal');
  p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
  const dur = Math.random() * 8 + 6;
  p.style.animationDuration = dur + 's';
  p.style.animationDelay = Math.random() * 4 + 's';
  container.appendChild(p);
  setTimeout(() => p.remove(), (dur + 5) * 1000);
}
setInterval(createPetal, 700);
for (let i = 0; i < 10; i++) setTimeout(createPetal, i * 250);

// ===== CONFETTI =====
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let pieces = [];

function launchConfetti() {
  const colors = ['#e74c6e','#c0392b','#f8b4c8','#ffd6e7','#ff9800','#fff','#f06292','#ffb3c6'];
  for (let i = 0; i < 200; i++) {
    pieces.push({
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
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    p.y += p.speed; p.angle += p.spin; p.opacity -= 0.005;
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
    ctx.restore();
  });
  pieces = pieces.filter(p => p.y < canvas.height + 20 && p.opacity > 0);
  if (pieces.length > 0) requestAnimationFrame(animateConfetti);
  else ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ===== SURPRISES =====
const surprises = [
  {
    emoji: '🌸',
    text: 'You are the kind of person who makes the world softer just by being in it. Happy Birthday, Malvika. 💖'
  },
  {
    emoji: '😭🔒',
    text: 'Locking Shifa in the toilet and walking back to class like nothing happened... we are genuinely unhinged and I love us for it. 😭💕'
  },
  {
    emoji: '🌹',
    text: 'I hope you know — even on the days I don\'t say it, you are one of the most important people in my life. Always. 💖'
  },
  {
    emoji: '🎂✨',
    text: 'This is your year, Malvika. Big dreams, bigger success, and all the happiness you deserve. The universe is rooting for you. 🌟💖'
  }
];

function showSurprise(idx) {
  const s = surprises[idx];
  document.getElementById('s-emoji').textContent = s.emoji;
  document.getElementById('surprise-text').textContent = s.text;
  document.getElementById('surprise-overlay').classList.remove('hidden');
  launchConfetti();
}

function closeSurprise() {
  document.getElementById('surprise-overlay').classList.add('hidden');
}

document.getElementById('surprise-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeSurprise();
});

// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.letter-para, .memory-box, .wishes-box, .memory-list, .final-line, .sign-off').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// ===== AUTO CONFETTI on load =====
window.addEventListener('load', () => {
  setTimeout(launchConfetti, 800);
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
