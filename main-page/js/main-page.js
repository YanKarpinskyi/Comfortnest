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
    favIcon.addEventListener('click', (event) => {
      event.stopPropagation(); 
      if (favIcon.src.endsWith('fav-icon-default.png')) {
        favIcon.src = './img/fav-icon.png';
      } else {
        favIcon.src = './img/fav-icon-default.png';
      }
    });
});

function openProductPage(card) {
    const productData = {
        name: card.dataset.name,
        img: card.dataset.img,
        price: card.dataset.price,
        style: card.dataset.style,
        color: card.dataset.color,
        materials: card.dataset.materials,
        lengths: card.dataset.lengths.split(','),
        widths: card.dataset.widths.split(','),
        heights: card.dataset.heights.split(','),
        type: card.dataset.type,
        images: card.dataset.images ? card.dataset.images.split(',').map(v => v.trim()) : [card.dataset.img],
    };

    localStorage.setItem('product', JSON.stringify(productData));
    window.location.href = '../ware-card/ware-card.html';
}
