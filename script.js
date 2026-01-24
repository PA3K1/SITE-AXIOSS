function openModal(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal');
    modal.style.opacity = '0';
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
}

function openBodal(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal--registration');
    modal.style.opacity = '0';
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
}

function closeModal() {
    const activeModal = document.querySelector('.modal[style*="display: block"]');
    if (activeModal) {
        activeModal.style.opacity = '0';
        
        setTimeout(() => activeModal.style.display = 'none', 300);
    }
}



// 🔹 Хранилище пользователей (только для демо)
let users = [
    {email: "admin@test.com", password: "12345"},
    {email: "user@test.com", password: "qwerty"}
];

// 🔹 Функция проверки капчи
function checkCaptcha(inputValue) {
    return inputValue === "6138B";
}

// 🔹 Функция проверки существования email
function checkEmailExists(email) {
    return users.find(user => user.email === email);
}

// 🔹 Функция регистрации нового пользователя
function registerUser(email, password) {
    users.push({email: email, password: password});
}

// 🔹 Функция обновления шапки сайта
function updateHeader() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const headerOpen = document.querySelector('.header__open');
    
    if (loggedInUser) {
        headerOpen.innerHTML = `
            <span>${loggedInUser}</span>
            <a class="header__link open__modal" onclick="logoutUser()" href="#">ВЫХОД</a>
        `;
    }
}

// 🔹 Функция поиска пользователя
function findUser(email, password) {
    return users.find(u => u.email === email && u.password === password);
}

// 🔹 Функция входа пользователя
function loginUser(email) {
    localStorage.setItem('loggedInUser', email);
    updateHeader();
}

// 🔹 Функция выхода пользователя
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    const headerOpen = document.querySelector('.header__open');
    headerOpen.innerHTML = `
        <a class="header__link" onclick="openBodal(event)" href="#">Регистрация</a>
        <a class="header__link open__modal" onclick="openModal(event)" href="">ВХОД</a>
    `;
}

// 🔹 Функция обработки регистрации
function handleRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const captcha = form.querySelector('input[placeholder="Введите код"]').value;
    
    if (!checkCaptcha(captcha)) {
        alert("Неверный код с картинки!");
        return;
    }
    
    if (checkEmailExists(email)) {
        alert("Пользователь с таким email уже существует!");
        return;
    }
    
    registerUser(email, password);
    alert("Регистрация успешна! Теперь можете войти.");
    
    closeModal();
    form.reset();
}

// 🔹 Функция обработки входа
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    const user = findUser(email, password);
    
    if (user) {
        loginUser(email);
        closeModal();
        form.reset();
        alert("Успешный вход!");
    } else {
        alert("Неверный email или пароль!");
    }
}
function initializeApp() {
    updateHeader();
    
    document.querySelector('.modal--registration form').addEventListener('submit', handleRegistration);
    document.querySelector('.modal form').addEventListener('submit', handleLogin);
    
    document.querySelectorAll('.modal__close').forEach(btn => {
        btn.onclick = closeModal;
    });
}
window.onload = initializeApp;





// ============= СЛАЙДЕР БЕЗ ЗАДЕРЖЕК НА ТОЧКИ =============

const gamesData = [
    { title: "Pubg", img: "https://axios-macro.com/images/gradient/avif/lite.avif", url: "https://axios-macro.com/pubg" },
    { title: "Apex", img: "https://axios-macro.com/images/gradient/avif/apex.avif", url: "https://axios-macro.com/apex" },
    { title: "BF 2042", img: "https://axios-macro.com/images/gradient/avif/bf2042.avif", url: "https://axios-macro.com/battlefield2042" },
    { title: "COD WARZONE", img: "https://axios-macro.com/images/gradient/avif/mw2.avif", url: "https://axios-macro.com/warzone" },
    { title: "cs:go", img: "https://axios-macro.com/images/gradient/avif/csgo.avif", url: "https://axios-macro.com/csgo" },
    { title: "РАСТ", img: "https://axios-macro.com/images/gradient/avif/rust.avif", url: "https://axios-macro.com/rust" },
    { title: "R6 Siege", img: "https://axios-macro.com/images/gradient/avif/r6.avif", url: "https://axios-macro.com/r6siege" }
];

const galery = document.getElementById('galery');
const textGames = document.getElementById('text-games');
const dotsContainer = document.getElementById('dots');
const totalRealItems = gamesData.length;
const itemsToShow = 4;
let currentIndex = totalRealItems;

function createElements() {
    const displayItems = [...gamesData, ...gamesData, ...gamesData];
    
    displayItems.forEach((game) => {
        const card = document.createElement('div');
        card.className = 'card-game';
        card.innerHTML = `<a href="${game.url}"><img src="${game.img}" alt="${game.title}"></a>`;
        galery.appendChild(card);
        
        const btnItem = document.createElement('div');
        btnItem.className = 'text-game-item';
        btnItem.innerHTML = `<a class="text-game" href="${game.url}">${game.title}</a>`;
        textGames.appendChild(btnItem);
    });
    
    // 7 точек - мгновенный клик
    for (let i = 0; i < 7; i++) {
        const dot = document.createElement('span');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        // БЕЗ ЗАДЕРЖЕК - кликаем сразу
        dot.onclick = () => {
            const targetIndex = i + totalRealItems;
            currentIndex = targetIndex;
            updateSlider();
        };
        dotsContainer.appendChild(dot);
    }
}

function updateSlider(withTransition = true) {
    if (withTransition) {
        galery.classList.add('transition');
        textGames.classList.add('transition');
    } else {
        galery.classList.remove('transition');
        textGames.classList.remove('transition');
    }
    
    const containerWidth = document.querySelector('.galery-wrapper').clientWidth;
    const gap = 20;
    const cardWidth = (containerWidth - (itemsToShow - 1) * gap) / itemsToShow;
    const step = cardWidth + gap;
    const offset = -currentIndex * step;
    
    galery.style.transform = `translateX(${offset}px)`;
    textGames.style.transform = `translateX(${offset}px)`;
    
    // Обновляем активную точку
    const realIndex = currentIndex % totalRealItems;
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === realIndex);
    });
    
    // Бесконечная прокрутка без transitionend
    setTimeout(() => {
        if (currentIndex < totalRealItems) {
            currentIndex += totalRealItems;
            updateSlider(false);
        }
        if (currentIndex >= totalRealItems * 2) {
            currentIndex -= totalRealItems;
            updateSlider(false);
        }
    }, 500); // Через время анимации
}

let autoPlay = setInterval(() => {
    currentIndex++;
    updateSlider();
}, 5000);

const container = document.querySelector('.games-slider-container');
container.onmouseenter = () => clearInterval(autoPlay);
container.onmouseleave = () => {
    autoPlay = setInterval(() => {
        currentIndex++;
        updateSlider();
    }, 5000);
};

// Инициализация
createElements();
setTimeout(() => updateSlider(false), 50);

// Ресайз
window.addEventListener('resize', () => updateSlider(false));