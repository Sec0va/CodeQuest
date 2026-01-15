document.addEventListener('DOMContentLoaded', () => {
    // Инициализация
    const currentUser = JSON.parse(localStorage.getItem('codequest_user'));
    
    updateAuthUI(currentUser);
    initCalendar();
    initAuthForms();
    initProfilePage(currentUser);
    updateHomeCTA(currentUser);
    initNotifications();
});

/* --- AUTH & UI LOGIC --- */

function updateAuthUI(user) {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;

    if (user) {
        // Логин: Аватар + Уведомления + Выход
        authContainer.innerHTML = `
            <div class="relative">
                <button id="notif-btn" class="flex items-center justify-center rounded-full size-10 hover:bg-surface-dark text-white transition-colors relative">
                    <span class="material-symbols-outlined">notifications</span>
                    <span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-background-dark"></span>
                </button>
                <!-- Notification Dropdown -->
                <div id="notif-dropdown" class="hidden absolute right-0 mt-2 w-64 bg-surface-dark border border-surface-border rounded-xl shadow-xl z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
                    <h4 class="text-white font-bold text-sm mb-2">Уведомления</h4>
                    <p class="text-text-secondary text-xs">Здесь пока пусто. Мы сообщим, когда появятся новые соревнования!</p>
                </div>
            </div>
            
            <div class="relative cursor-pointer group" onclick="window.location.href='profile.html'">
                <div class="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary" style='background-image: url("${user.avatar || 'https://ui-avatars.com/api/?background=2b8cee&color=fff&name=' + user.username}");'></div>
            </div>
            
            <button onclick="logout()" class="flex items-center justify-center gap-2 rounded-lg h-9 px-3 bg-surface-dark hover:bg-red-900/50 border border-surface-border hover:border-red-500/50 text-white text-xs font-bold transition-all ml-2">
                <span class="material-symbols-outlined text-[16px]">logout</span>
            </button>
        `;
    } else {
        // Гость: Войти
        authContainer.innerHTML = `
            <a href="registration.html" class="hidden md:flex items-center justify-center rounded-lg h-9 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-lg shadow-primary/20">
                <span>Войти</span>
            </a>
            <button class="md:hidden text-white">
                <span class="material-symbols-outlined">menu</span>
            </button>
        `;
    }
}

function initNotifications() {
    const btn = document.getElementById('notif-btn');
    const dropdown = document.getElementById('notif-dropdown');
    
    if(btn && dropdown) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });
        
        // Закрыть при клике вне
        document.addEventListener('click', () => {
            if(!dropdown.classList.contains('hidden')) dropdown.classList.add('hidden');
        });
        dropdown.addEventListener('click', (e) => e.stopPropagation());
    }
}

function updateHomeCTA(user) {
    const ctaContainer = document.getElementById('home-cta-container');
    if (!ctaContainer) return;

    if (user) {
        ctaContainer.innerHTML = `
            <h2 class="text-3xl lg:text-4xl font-black text-white relative z-10 max-w-2xl">Рады видеть вас снова, ${user.username}!</h2>
            <p class="text-white/90 text-lg max-w-xl relative z-10">Новые турниры уже ждут. Проверьте свой календарь и приступайте к задачам.</p>
            <div class="flex gap-4 relative z-10 mt-2">
                <a href="contests.html" class="flex h-12 items-center justify-center rounded-xl px-8 bg-white text-primary text-base font-bold hover:bg-slate-100 transition-all shadow-lg">
                    <span class="material-symbols-outlined mr-2">list_alt</span>
                    Каталог турниров
                </a>
            </div>
        `;
    }
}

/* --- REGISTRATION LOGIC --- */

function initAuthForms() {
    const toggleBtns = document.querySelectorAll('.auth-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (!loginForm || !registerForm) return;

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            if (target === 'register') {
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
                updateTabs('register');
            } else {
                registerForm.classList.add('hidden');
                loginForm.classList.remove('hidden');
                updateTabs('login');
            }
        });
    });

    // Регистрация
    const regBtn = document.getElementById('doRegister');
    if (regBtn) {
        regBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-pass').value;

            // Проверка почты (симуляция базы данных)
            const existingEmails = ['admin@codequest.com', 'test@test.com', 'ivan@mail.ru'];
            if (existingEmails.includes(email)) {
                alert('Ошибка: Пользователь с таким email уже существует!');
                return;
            }

            if (!name || !email || !pass) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            const newUser = {
                username: name,
                email: email,
                handle: '@' + name.toLowerCase().replace(/\s/g, '_'),
                location: 'Не указано',
                avatar: null // Будет сгенерирован автоматически в UI
            };

            localStorage.setItem('codequest_user', JSON.stringify(newUser));
            window.location.href = 'profile.html';
        });
    }

    // Вход
    const logBtn = document.getElementById('doLogin');
    if (logBtn) {
        logBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            // Упрощенный вход для демо
            if(email) {
                const mockUser = {
                    username: "Alex Coder",
                    email: email,
                    handle: "@alexcoder",
                    location: "Санкт-Петербург"
                };
                localStorage.setItem('codequest_user', JSON.stringify(mockUser));
                window.location.href = 'profile.html';
            } else {
                alert("Введите Email");
            }
        });
    }
}

function updateTabs(active) {
    const tLogin = document.getElementById('tab-login');
    const tReg = document.getElementById('tab-register');
    if (active === 'login') {
        tLogin.classList.add('text-primary', 'border-primary');
        tLogin.classList.remove('text-slate-500', 'border-transparent');
        tReg.classList.remove('text-primary', 'border-primary');
        tReg.classList.add('text-slate-500', 'border-transparent');
    } else {
        tReg.classList.add('text-primary', 'border-primary');
        tReg.classList.remove('text-slate-500', 'border-transparent');
        tLogin.classList.remove('text-primary', 'border-primary');
        tLogin.classList.add('text-slate-500', 'border-transparent');
    }
}

function logout() {
    localStorage.removeItem('codequest_user');
    window.location.href = 'home.html';
}

/* --- PROFILE LOGIC --- */

function initProfilePage(user) {
    const profileName = document.getElementById('profile-name');
    if (!profileName || !user) return; // Не страница профиля или нет юзера

    // Заполнение данных
    document.getElementById('profile-name').innerText = user.username;
    document.getElementById('profile-handle').innerText = user.handle;
    document.getElementById('profile-location').innerText = user.location || "Планета Земля";
    const avatarUrl = user.avatar || `https://ui-avatars.com/api/?background=2b8cee&color=fff&size=128&name=${user.username}`;
    document.getElementById('profile-avatar').style.backgroundImage = `url('${avatarUrl}')`;

    // Редактирование
    const editBtn = document.getElementById('edit-profile-btn');
    const modal = document.getElementById('edit-modal');
    const saveBtn = document.getElementById('save-profile');
    const closeBtn = document.getElementById('close-edit');

    editBtn.addEventListener('click', () => {
        document.getElementById('edit-username').value = user.username;
        document.getElementById('edit-handle').value = user.handle;
        document.getElementById('edit-location').value = user.location;
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

    saveBtn.addEventListener('click', () => {
        user.username = document.getElementById('edit-username').value;
        user.handle = document.getElementById('edit-handle').value;
        user.location = document.getElementById('edit-location').value;
        
        localStorage.setItem('codequest_user', JSON.stringify(user));
        location.reload(); // Перезагрузка для обновления
    });
}

/* --- CALENDAR LOGIC --- */

function initCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;

    // Январь 2026: 1 число = Четверг (index 3, если пн=0)
    // пн вт ср чт пт сб вс
    // 0  1  2  3  4  5  6
    
    const startOffset = 3; // Четверг
    const daysInMonth = 31;
    let html = '';

    for (let i = 0; i < startOffset; i++) {
        html += `<div class="bg-[#111a22] p-2 min-h-[120px] border-r border-b border-[#233648] opacity-50"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let events = '';
        if (day === 5) events = `<div class="w-full bg-primary/20 border-l-2 border-primary rounded px-2 py-1 mt-1 cursor-pointer hover:bg-primary/30"><p class="text-xs text-white truncate">Codeforces Round</p></div>`;
        if (day === 14) events = `<div class="w-full bg-purple-500/20 border-l-2 border-purple-500 rounded px-2 py-1 mt-1 cursor-pointer hover:bg-purple-500/30"><p class="text-xs text-white truncate">LeetCode Weekly</p></div>`;

        html += `
            <div class="bg-[#111a22] p-2 min-h-[120px] border-r border-b border-[#233648] relative group hover:bg-[#16212e] transition-colors">
                <span class="text-slate-300 text-sm font-bold">${day}</span>
                <div class="flex flex-col gap-1 mt-1">${events}</div>
            </div>
        `;
    }
    grid.innerHTML = html;
}

/* --- CONTEST MODAL --- */

function openContestModal(title, platform, time, difficulty, description, imageUrl) {
    const modal = document.getElementById('contest-modal');
    if (!modal) return;

    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-platform').innerText = platform;
    document.getElementById('modal-time').innerText = time;
    document.getElementById('modal-diff').innerText = difficulty;
    document.getElementById('modal-desc').innerText = description;
    
    const imgEl = document.getElementById('modal-image');
    if(imageUrl) {
        imgEl.src = imageUrl;
        imgEl.classList.remove('hidden');
    } else {
        imgEl.classList.add('hidden');
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeContestModal() {
    const modal = document.getElementById('contest-modal');
    if(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}