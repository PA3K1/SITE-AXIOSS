// Функция открытия модального окна "ВХОД"
function openModal(e) {
    e.preventDefault(); // Отменяет стандартное поведение ссылки (переход по URL)
    const modal = document.querySelector('.modal'); // Находит элемент с классом .modal (первое окно)
    modal.style.opacity = '0'; // Делает окно полностью прозрачным
    modal.style.display = 'block'; // Меняет display с none на block (показывает элемент)
    setTimeout(() => modal.style.opacity = '1', 10); // Через 10мс делает окно непрозрачным (плавное появление)
}

// Функция открытия модального окна "РЕГИСТРАЦИЯ"
function openBodal(e) {
    e.preventDefault(); // Отменяет стандартное поведение ссылки
    const modal = document.querySelector('.modal--registration'); // Находит элемент с классом .modal--registration (второе окно)
    modal.style.opacity = '0'; // Делает окно прозрачным
    modal.style.display = 'block'; // Показывает элемент
    setTimeout(() => modal.style.opacity = '1', 10); // Плавное появление через 10мс
}

// Функция закрытия модального окна
function closeModal() {
    // Находит модальное окно, у которого в стиле есть "display: block" (активное окно)
    const activeModal = document.querySelector('.modal[style*="display: block"]');
    
    // Если активное окно найдено
    if (activeModal) {
        activeModal.style.opacity = '0'; // Делает окно прозрачным (начало анимации закрытия)
        
        // Через 300мс (время анимации) скрывает элемент полностью
        setTimeout(() => activeModal.style.display = 'none', 300);
    }
}

// Находит ВСЕ элементы с классом .modal__close (крестики во всех окнах)
document.querySelectorAll('.modal__close').forEach(btn => {
    btn.onclick = closeModal; // Каждому крестику назначает функцию закрытия при клике
});
