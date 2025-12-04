function openModal(e) {
    e.preventDefault();
    const modal = document.querySelector('.modal');
    modal.style.opacity = '0';
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = '1', 10);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.opacity = '0';
    setTimeout(() => modal.style.display = 'none', 300);
}

document.querySelector('.modal__close').onclick = closeModal;