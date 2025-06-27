document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('sign-in-btn');

    signInBtn.addEventListener('click', () => {
        alert("Код надіслано!\nНаступна відправка можлива за 1хв");
        signInBtn.textContent = 'Надіслати код повторно';
    });
});