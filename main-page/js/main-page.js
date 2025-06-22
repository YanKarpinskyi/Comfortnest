const categoriesBtn = document.querySelector('.categories-btn');
const categoriesMenu = document.querySelector('.cat-menu');
const favIcons = document.querySelectorAll('.fav-icon-card')

categoriesBtn.addEventListener('click', () => {
    if (categoriesMenu.style.display =='block') {
        categoriesMenu.style.display = 'none';
    } else {
        categoriesMenu.style.display = 'block';
    }
})

document.querySelectorAll('.grade').forEach(p => {
    const text = p.textContent.replace(/[^\d.,]/g, '').replace(',', '.');
    const number = parseFloat(text);

    if (!isNaN(number) && Number.isInteger(number)) {
        p.style.marginLeft = '0.5vw';
    }
});

favIcons.forEach(favIcon => {
    favIcon.addEventListener('click', () => {
        if (favIcon.src.endsWith('fav-icon-default.png')) {
            favIcon.src = './img/fav-icon.png';
        } else {
            favIcon.src = './img/fav-icon-default.png';
        }
    });
});