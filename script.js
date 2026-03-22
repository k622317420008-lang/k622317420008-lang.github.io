/* ============================================
   PORTFOLIO JAVASCRIPT 🌸
   ============================================ */
 
// ---- Khởi tạo AOS (scroll animation) ----
AOS.init({
  duration: 800,     // Thời gian animation (ms)
  once: true,        // Chỉ chạy 1 lần khi scroll tới
  offset: 80,        // Khoảng cách để trigger
  easing: 'ease-out-cubic',
});
 
 
// ---- Navbar: đổi màu khi scroll ----
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
 
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle('scrolled', scrolled);
  backTop.classList.toggle('visible', window.scrollY > 400);
  animateProgressBars(); // Kích hoạt progress bar khi scroll tới Skills
});
 
 
// ---- Mobile hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
 
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
 
// Đóng menu khi click vào link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
 
 
// ---- Smooth Back to Top ----
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
 
 
// ---- Typewriter Effect ----
// Thay đổi mảng này để hiển thị nghề nghiệp / sở thích của bạn
const phrases = [
  'Gia sư Toán 📐',
  'Sinh viên FTU 🎓',
  '9.5 Toán THPTQG ⭐',
  'Luôn giúp bạn hiểu Toán 💡',
  'Kinh tế & Phát triển quốc tế 🌏',
];
 
let phraseIdx = 0;
let charIdx   = 0;
let isDeleting = false;
const typeEl  = document.getElementById('typewriter');
 
function typeWriter() {
  const currentPhrase = phrases[phraseIdx];
 
  if (!isDeleting) {
    // Đang gõ chữ
    typeEl.textContent = currentPhrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentPhrase.length) {
      // Đã gõ xong → chờ rồi xóa
      setTimeout(() => { isDeleting = true; }, 1800);
    }
  } else {
    // Đang xóa chữ
    typeEl.textContent = currentPhrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
 
  const speed = isDeleting ? 60 : 100;
  setTimeout(typeWriter, speed);
}
typeWriter();
 
 
// ---- Progress Bars Animation ----
let progressAnimated = false;
 
function animateProgressBars() {
  if (progressAnimated) return;
 
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
 
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    progressAnimated = true;
    document.querySelectorAll('.progress-fill').forEach(bar => {
      const targetWidth = bar.getAttribute('data-width') + '%';
      bar.style.width = targetWidth;
    });
  }
}
 
 
// ---- Contact Form ----
function sendMessage() {
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const feedback = document.getElementById('formFeedback');
  const btn      = document.getElementById('sendBtn');
 
  // Validation đơn giản
  if (!name || !email || !message) {
    feedback.textContent = '⚠️ Vui lòng điền đầy đủ thông tin!';
    feedback.className   = 'form-feedback error';
    return;
  }
 
  if (!isValidEmail(email)) {
    feedback.textContent = '⚠️ Email không hợp lệ!';
    feedback.className   = 'form-feedback error';
    return;
  }
 
  // Giả lập gửi thành công (thực tế cần backend hoặc FormSubmit)
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
 
  setTimeout(() => {
    feedback.textContent = '🎉 Cảm ơn bạn! Mình sẽ phản hồi sớm nhé!';
    feedback.className   = 'form-feedback success';
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi tin nhắn';
    // Reset form
    document.getElementById('contactName').value    = '';
    document.getElementById('contactEmail').value   = '';
    document.getElementById('contactMessage').value = '';
  }, 1500);
}
 
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
 
 
// ---- Particles Canvas (hiệu ứng nền lung linh) ----
const canvas  = document.getElementById('particleCanvas');
const ctx     = canvas.getContext('2d');
 
// Resize canvas khi thay đổi cửa sổ
function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
 
// Tạo particles
const PARTICLE_COUNT = 60;
const particles = [];
 
const COLORS = [
  'rgba(255, 181, 200, 0.6)',  // pink
  'rgba(201, 184, 255, 0.6)',  // lavender
  'rgba(255, 214, 231, 0.5)',  // light pink
  'rgba(237, 228, 255, 0.5)',  // light lav
];
 
class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x    = Math.random() * canvas.width;
    this.y    = Math.random() * canvas.height;
    this.size = Math.random() * 6 + 2;       // kích thước 2–8px
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.opacity = Math.random() * 0.5 + 0.3;
    this.pulse  = Math.random() * Math.PI * 2; // phase khác nhau
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += 0.02;
    // Khi ra khỏi màn hình → reset
    if (this.x < -20 || this.x > canvas.width + 20 ||
        this.y < -20 || this.y > canvas.height + 20) {
      this.reset();
    }
  }
  draw() {
    const pulsedSize = this.size + Math.sin(this.pulse) * 1.5;
    ctx.save();
    ctx.globalAlpha = this.opacity + Math.sin(this.pulse) * 0.15;
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    // Vẽ hình tròn nhỏ (có thể đổi thành ★ ♥ ✦)
    ctx.arc(this.x, this.y, pulsedSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
 
// Khởi tạo particles
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}
 
// Animation loop
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
 
 
// ---- Mouse parallax cho avatar ----
const homeImage = document.querySelector('.home-image');
document.addEventListener('mousemove', (e) => {
  if (!homeImage) return;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  homeImage.style.transform = `translate(${dx * 12}px, ${dy * 12}px)`;
});
 
 
// ---- Active nav link highlight khi scroll ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
 
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navItems.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--pink-dark)';
      a.style.background = 'var(--pink-light)';
    }
  });
});
 
 
// ---- Cursor sparkle effect (optional, rất lung linh!) ----
document.addEventListener('click', (e) => {
  createSparkle(e.clientX, e.clientY);
});
 
function createSparkle(x, y) {
  const sparkles = ['✦', '✧', '★', '♡', '✿', '·'];
  for (let i = 0; i < 6; i++) {
    const el = document.createElement('div');
    el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 9999;
      font-size: ${Math.random() * 14 + 10}px;
      color: ${Math.random() > 0.5 ? '#FFB5C8' : '#C9B8FF'};
      animation: sparkleAnim 0.8s ease forwards;
      transform-origin: center;
    `;
    document.body.appendChild(el);
 
    const angle = (i / 6) * 360;
    const dist  = Math.random() * 60 + 30;
    el.style.setProperty('--dx', Math.cos(angle * Math.PI/180) * dist + 'px');
    el.style.setProperty('--dy', Math.sin(angle * Math.PI/180) * dist + 'px');
 
    setTimeout(() => el.remove(), 800);
  }
}
 
// Thêm style cho sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkleAnim {
    0%   { opacity: 1; transform: translate(0, 0) scale(1); }
    100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
  }
`;
document.head.appendChild(sparkleStyle);