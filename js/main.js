// Анимации и навигация

document.addEventListener('DOMContentLoaded', function() {
    // Элементы навигации
    const navLinks = document.querySelectorAll('nav ul li a');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const sections = document.querySelectorAll('.section');
    
    // Плавная прокрутка и навигация для меню
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Удаляем активный класс со всех секций
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Добавляем активный класс к целевой секции
            targetSection.classList.add('active');
            
            // Плавная прокрутка
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Плавная прокрутка для кнопки "Узнать больше"
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Удаляем активный класс со всех секций
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Добавляем активный класс к целевой секции
            targetSection.classList.add('active');
            
            // Плавная прокрутка
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Анимация при загрузке страницы
    window.addEventListener('load', function() {
        const firstSection = document.querySelector('.section');
        firstSection.classList.add('active');
    });

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards ${entry.target.dataset.delay || 0}s`;
            }
        });
    }, observerOptions);

    // Наблюдаем за карточками услуг
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.animationDelay = `${0.2 + index * 0.2}s`;
        observer.observe(card);
    });

    // Обработка форм
    const contactForm = document.getElementById('contactForm');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabButtons = document.querySelectorAll('.tab-button');
    const authTabs = document.querySelectorAll('.auth-tab-content');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = registerForm?.querySelectorAll('input[type="password"]')[1];
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthLevel = document.getElementById('strengthLevel');

    // Переключение вкладок авторизации
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активные классы
            tabButtons.forEach(btn => btn.classList.remove('active'));
            authTabs.forEach(tab => tab.classList.remove('active'));
            
            // Добавляем активные классы
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Проверка сложности пароля
    function checkPasswordStrength(password) {
        let strength = 0;
        let strengthText = '';
        let color = '';

        // Проверка длины
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        
        // Проверка наличия различных типов символов
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;

        // Ограничиваем максимальное значение
        strength = Math.min(strength, 100);

        // Определяем уровень сложности
        if (strength < 50) {
            strengthText = 'Слабый';
            color = '#f44336';
        } else if (strength < 75) {
            strengthText = 'Средний';
            color = '#ff9800';
        } else if (strength < 90) {
            strengthText = 'Хороший';
            color = '#4caf50';
        } else {
            strengthText = 'Отличный';
            color = '#2e7d32';
        }

        return { strength, strengthText, color };
    }

    // Обновление индикатора сложности пароля
    if (passwordInput && strengthMeter && strengthLevel) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const { strength, strengthText, color } = checkPasswordStrength(password);
            
            strengthMeter.style.width = strength + '%';
            strengthMeter.style.background = color;
            strengthLevel.textContent = strengthText;
            strengthLevel.style.color = color;
        });
    }

    // Обработка формы контактов
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Анимация кнопки
            const submitButton = this.querySelector('button');
            submitButton.textContent = 'Отправка...';
            
            setTimeout(() => {
                alert('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
                submitButton.textContent = 'Отправить';
            }, 1000);
        });
    }

    // Обработка формы входа
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = this.querySelector('input[type="text"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Анимация кнопки
            const submitButton = this.querySelector('button');
            submitButton.textContent = 'Вход...';
            
            setTimeout(() => {
                if (username && password) {
                    alert(`Добро пожаловать, ${username}!`);
                    loginForm.reset();
                } else {
                    alert('Пожалуйста, заполните все поля!');
                }
                submitButton.textContent = 'Войти';
            }, 1500);
        });
    }

    // Обработка формы регистрации
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = document.getElementById('password').value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            
            // Анимация кнопки
            const submitButton = this.querySelector('button');
            submitButton.textContent = 'Регистрация...';
            
            setTimeout(() => {
                if (password !== confirmPassword) {
                    alert('Пароли не совпадают!');
                    submitButton.textContent = 'Зарегистрироваться';
                    return;
                }
                
                if (username && email && password && password.length >= 8) {
                    alert('Регистрация успешно завершена! Добро пожаловать!');
                    registerForm.reset();
                    
                    // Сброс индикатора сложности
                    if (strengthMeter && strengthLevel) {
                        strengthMeter.style.width = '0%';
                        strengthLevel.textContent = 'Слабый';
                        strengthLevel.style.color = '';
                    }
                } else {
                    alert('Пожалуйста, заполните все поля и используйте пароль не менее 8 символов!');
                }
                
                submitButton.textContent = 'Зарегистрироваться';
            }, 1500);
        });
    }

    // Параллакс-эффект для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });

    // Создание частиц для анимированного фона
    function createParticles() {
        const container = document.querySelector('.video-container');
        
        // Создаем 5 частиц
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            container.appendChild(particle);
        }
    }

    // Запуск создания частиц после загрузки страницы
    window.addEventListener('load', createParticles);
});