// Main elements
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const body = document.body;
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar-overlay');
const themeToggle = document.getElementById('themeToggle');
const langButtons = document.querySelectorAll('.lang-btn');
const navButtons = document.querySelectorAll('.nav-btn');
const mainContent = document.getElementById('mainContent');

// Translations
const translations = {
    uz: {
        courses_add: "Kurs qo'shish",
        lesson_upload:"Dars yuklash",
        test_answers:"Test javoblari",
        test_upload:"Test yuklash",
        tests:"Testlar",
        directions_add: "Yo'nalish qo'shish",
        lastActive: "Oxirgi faollik: 2 kun oldin",
        profileSettings: "Profil sozlamalari",
        ansver_view:"Topshiriqlarni ko'rish",
        editProfile: "Profilni tahrirlash",
        profile: "Shaxsiy hisob",
        changePassword: "Parolni o'zgartirish",
        logout: "Tizimdan chiqish",
        teacher_add: "O'qituvchi qo'shish",
        navigation: "Navigatsiya",
        home: "Bosh sahifa",
        statistics: "Statistika",
        students: "O'quvchilar",
        student_add:"O'quvchi qo'shish",
        teachers: "O'qituvchilar",
        directions: "Yo'nalishlar",
        courses: "Topshiriqlar",
        youtube: "YouTube sahifasi",
        darkMode: "Qorong'i rejim",
        language: "Til",
        welcomeMessage: "Xush kelibsiz!",
        selectNavigation: "Chapdan navigatsiya bo'limini tanlang."
    },
    ru: {
        courses_add: "Добавить курс",
        lesson_upload:"Скачать урок",
        test_upload:"Тестовая загрузка",
        test_answers:"Тестовые ответы",
        tests: "Тесты",
        directions_add:"Добавить маршрут",
        lastActive: "Последняя активность: 2 дня назад",
        profileSettings: "Настройки профиля",
        editProfile: "Редактировать профиль",
        changePassword: "Изменить пароль",
        logout: "Выйти из системы",
        ansver_view:"Посмотреть задания",
        profile: "Личный счет",
        navigation: "Навигация",
        teacher_add:"Добавить учителя",
        home: "Главная",
        statistics: "Статистика",
        student_add:"Добавить читателя",
        students: "Ученики",
        teachers: "Учителя",
        directions: "Направления",
        courses: "Задания",
        youtube: "YouTube канал",
        darkMode: "Темный режим",
        language: "Язык",
        welcomeMessage: "Добро пожаловать!",
        selectNavigation: "Выберите раздел навигации слева."
    }
};

// Initialize the app
function initApp() {
    const themeToggle = document.getElementById('themeToggle'); // Get fresh reference
    if (themeToggle) {
        loadThemePreference(themeToggle);
    }
    loadLanguagePreference();
    setupEventListeners();
}

// Load saved theme preference
function loadThemePreference(themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = savedTheme;
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
    }
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('language') || 'uz';
    setActiveLanguage(savedLanguage);
    updateTexts(savedLanguage);
}

// Toggle sidebar visibility
function toggleSidebar() {
    body.classList.toggle('sidebar-open');
}

// Set active language
function setActiveLanguage(lang) {
    const langButtons = document.querySelectorAll('.lang-btn'); // Get fresh reference
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Update all texts based on selected language
function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-key]');
    
    elements.forEach(element => {
        const key = element.dataset.key;
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Handle theme toggle
function handleThemeToggle() {
    const themeToggle = document.getElementById('themeToggle'); // Get fresh reference
    if (themeToggle && themeToggle.checked) {
        body.className = 'dark sidebar-open';
        localStorage.setItem('theme', 'dark');
    } else {
        body.className = 'light sidebar-open';
        localStorage.setItem('theme', 'light');
    }
}

// Handle language selection
function handleLanguageToggle(e) {
    const lang = e.target.dataset.lang;
    if (!lang) return;
    
    localStorage.setItem('language', lang);
    setActiveLanguage(lang);
    updateTexts(lang);
}

// Handle navigation button clicks
function handleNavigation(e) {
    const button = e.currentTarget;
    const page = button.dataset.page;
    
    if (!page) return;
    
    // Remove active class from all buttons
    const navButtons = document.querySelectorAll('.nav-btn'); // Get fresh reference
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Load page content (simulated)
    loadPageContent(page);
    
    // On mobile, close the sidebar after navigation
    if (window.innerWidth < 768) {
        body.classList.remove('sidebar-open');
    }
}

// Load page content
function loadPageContent(page) {
    const mainContent = document.getElementById('mainContent'); // Get fresh reference
    if (!mainContent) return;
    
    // This would typically load content via AJAX or change routes
    // For this demo, we'll just update the content placeholder
    const currentLang = localStorage.getItem('language') || 'uz';
    const pageContent = getPageContent(page, currentLang);
    
    // Animate content change
    mainContent.style.opacity = '0';
    
    setTimeout(() => {
        mainContent.innerHTML = pageContent;
        mainContent.style.opacity = '1';
    }, 300);
}

// Get page content based on page name and language
function getPageContent(page, lang) {
    // This would be replaced with actual content or templates
    const titles = {
        uz: {
            home: "Bosh sahifa",
            statistics: "Statistika",
            students: "O'quvchilar",
            teachers: "O'qituvchilar",
            directions: "Yo'nalishlar",
            courses: "Kurslar",
            youtube: "YouTube sahifasi",
            'edit-profile': "Profilni tahrirlash",
            'change-password': "Parolni o'zgartirish",
            logout: "Tizimdan chiqish"
        },
        ru: {
            home: "Главная",
            statistics: "Статистика",
            students: "Ученики",
            teachers: "Учителя",
            directions: "Направления",
            courses: "Курсы",
            youtube: "YouTube канал",
            'edit-profile': "Редактировать профиль",
            'change-password': "Изменить пароль",
            logout: "Выйти из системы"
        }
    };
    
    const title = titles[lang][page] || page;
    
    return `
        <div class="content-placeholder">
            <h1>${title}</h1>
            <p>${lang === 'uz' ? 'Bu sahifa hali ishlov jarayonida...' : 'Эта страница еще в разработке...'}</p>
        </div>
    `;
}

// Setup all event listeners
function setupEventListeners() {
    const menuBtn = document.getElementById('menuBtn'); // Get fresh references
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.querySelector('.sidebar-overlay');
    const themeToggle = document.getElementById('themeToggle');
    const langButtons = document.querySelectorAll('.lang-btn');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Sidebar toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleSidebar);
    }
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', handleThemeToggle);
    }
    
    // Language toggle
    langButtons.forEach(btn => {
        btn.addEventListener('click', handleLanguageToggle);
    });
    
    // Navigation buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });
    
    // Settings buttons (same behavior as nav buttons for this demo)
    document.querySelectorAll('.settings-btn').forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar'); // Get fresh reference
        const menuBtn = document.getElementById('menuBtn');
        
        if (window.innerWidth < 768 && 
            body.classList.contains('sidebar-open') && 
            sidebar && !sidebar.contains(e.target) && 
            menuBtn && e.target !== menuBtn &&
            !menuBtn.contains(e.target)) {
            body.classList.remove('sidebar-open');
        }
    });
    
    // Handle escape key to close sidebar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.classList.contains('sidebar-open')) {
            body.classList.remove('sidebar-open');
        }
    });
}

// Create a function to expose the sidebar functionality for external use
window.asideSystem = {
    open: () => body.classList.add('sidebar-open'),
    close: () => body.classList.remove('sidebar-open'),
    toggle: toggleSidebar,
    setTheme: (theme) => {
        const validTheme = theme === 'dark' ? 'dark' : 'light';
        body.className = validTheme + (body.classList.contains('sidebar-open') ? ' sidebar-open' : '');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.checked = validTheme === 'dark';
        }
        localStorage.setItem('theme', validTheme);
    },
    setLanguage: (lang) => {
        const validLang = lang === 'ru' ? 'ru' : 'uz';
        localStorage.setItem('language', validLang);
        setActiveLanguage(validLang);
        updateTexts(validLang);
        
        // Update current page content with new language
        const activePage = document.querySelector('.nav-btn.active')?.dataset.page || 'home';
        loadPageContent(activePage);
    }
};