document.addEventListener('DOMContentLoaded', function() {
  // Binary orqa fon
  const canvas = document.getElementById('binaryCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const binary = '01';
  const fontSize = 12;
  const columns = canvas.width / fontSize;
  
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
  }
  
  let isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
  
  function drawBinary() {
    ctx.fillStyle = isDarkMode ? 'rgba(18, 18, 18, 0.05)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = isDarkMode ? 'rgba(67, 97, 238, 0.7)' : 'rgba(67, 97, 238, 0.3)';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      const text = binary.charAt(Math.floor(Math.random() * binary.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
  }
  
  setInterval(drawBinary, 60);
  
  // Window 
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const newColumns = canvas.width / fontSize;
    
    if (newColumns > columns) {
      for (let i = columns; i < newColumns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
      }
    }
  });
  
  // Captcha 
  const captchaCanvas = document.getElementById('captchaCanvas');
  const captchaCtx = captchaCanvas.getContext('2d');
  let captchaText = '';
  
  function generateCaptcha() {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    captchaText = '';
    
    for (let i = 0; i < 6; i++) {
      captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    captchaCtx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
    
    const gradient = captchaCtx.createLinearGradient(0, 0, captchaCanvas.width, 0);
    gradient.addColorStop(0, isDarkMode ? '#4361ee' : '#6483ff');
    gradient.addColorStop(1, isDarkMode ? '#7209b7' : '#f72585');
    
    captchaCtx.fillStyle = isDarkMode ? '#1e1e1e' : '#f8f9fa';
    captchaCtx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);
    
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * captchaCanvas.width;
      const y = Math.random() * captchaCanvas.height;
      captchaCtx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
      captchaCtx.fillRect(x, y, 2, 2);
    }
    
    for (let i = 0; i < 5; i++) {
      captchaCtx.beginPath();
      captchaCtx.moveTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
      captchaCtx.lineTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
      captchaCtx.strokeStyle = gradient;
      captchaCtx.lineWidth = 1;
      captchaCtx.stroke();
    }
    
    captchaCtx.font = 'bold 24px Arial';
    captchaCtx.fillStyle = gradient;
    captchaCtx.textAlign = 'center';
    captchaCtx.textBaseline = 'middle';
    
    for (let i = 0; i < captchaText.length; i++) {
      const x = (i + 0.5) * (captchaCanvas.width / captchaText.length);
      const y = captchaCanvas.height / 2 + Math.random() * 6 - 3;
      
      captchaCtx.save();
      captchaCtx.translate(x, y);
      captchaCtx.rotate((Math.random() - 0.5) * 0.3);
      captchaCtx.fillText(captchaText[i], 0, 0);
      captchaCtx.restore();
    }
  }
  
  generateCaptcha();
  
  document.getElementById('refreshCaptcha').addEventListener('click', generateCaptcha);
  
  const togglePasswordBtn = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  
  togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.classList.toggle('show');
  });
  
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const captchaInput = document.getElementById('captchaInput');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const captchaError = document.getElementById('captchaError');
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    emailError.textContent = '';
    passwordError.textContent = '';
    captchaError.textContent = '';
    
    if (!emailInput.value) {
      emailError.textContent = 'Email kiritish majburiy';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
      emailError.textContent = 'Email noto\'g\'ri formatda';
      isValid = false;
    }
    
    if (!passwordInput.value) {
      passwordError.textContent = 'Parol kiritish majburiy';
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      passwordError.textContent = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
      isValid = false;
    }
    
    if (!captchaInput.value) {
      captchaError.textContent = 'Captcha kiritish majburiy';
      isValid = false;
    } else if (captchaInput.value !== captchaText) {
      captchaError.textContent = 'Captcha noto\'g\'ri';
      captchaInput.value = '';
      generateCaptcha();
      isValid = false;
    }
    
    if (isValid) {
      const successAnimation = document.createElement('div');
      successAnimation.className = 'success-animation';
      document.body.appendChild(successAnimation);
      
      setTimeout(() => {
        window.location.href = 'nav.html';
      }, 1000);
    }
  });
  
  const themeToggle = document.getElementById('themeToggle');
  
  themeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    generateCaptcha();
  });
  
  const langBtns = document.querySelectorAll('.lang-btn');
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      langBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const lang = this.getAttribute('data-lang');
      if (lang === 'ru') {
        document.querySelector('.welcome-text .title').textContent = 'Добро пожаловать!';
        document.querySelector('.welcome-text .subtitle').textContent = 'Введите свои данные для входа в аккаунт';
        document.querySelector('label[for="email"]').textContent = 'Электронная почта';
        document.querySelector('label[for="password"]').textContent = 'Пароль';
        document.querySelector('label[for="captchaInput"]').textContent = 'Капча';
        document.querySelector('label[for="remember"]').textContent = 'Запомнить меня';
        document.querySelector('.forgot-link').textContent = 'Забыли пароль?';
        document.querySelector('.login-button').textContent = 'Войти';
        emailInput.placeholder = 'email@example.com';
        passwordInput.placeholder = '••••••••';
        captchaInput.placeholder = 'Введите код капчи';
      } else {
        document.querySelector('.welcome-text .title').textContent = 'Xush kelibsiz!';
        document.querySelector('.welcome-text .subtitle').textContent = 'Hisobingizga kirish uchun ma\'lumotlarni kiriting';
        document.querySelector('label[for="email"]').textContent = 'Email';
        document.querySelector('label[for="password"]').textContent = 'Parol';
        document.querySelector('label[for="captchaInput"]').textContent = 'Captcha';
        document.querySelector('label[for="remember"]').textContent = 'Meni eslab qolish';
        document.querySelector('.forgot-link').textContent = 'Parolni unutdingizmi?';
        document.querySelector('.login-button').textContent = 'Kirish';
        emailInput.placeholder = 'email@example.com';
        passwordInput.placeholder = '••••••••';
        captchaInput.placeholder = 'Captcha kodini kiriting';
      }
    });
  });
  
  const inputs = document.querySelectorAll('input');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
});