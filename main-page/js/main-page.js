const categoriesBtn = document.querySelector('.categories-btn');
const categoriesMenu = document.querySelector('.cat-menu');

categoriesBtn.addEventListener('click', () => {
    if (categoriesMenu.style.display =='block') {
        categoriesMenu.style.display = 'none';
    } else {
        categoriesMenu.style.display = 'block';
    }
})