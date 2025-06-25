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

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const favIcon = card.querySelector('.fav-icon-card');
    favIcon.addEventListener('click', (e) => {
      e.stopPropagation(); // Запобігаємо виклику openProductPage
      const product = {
        name: card.dataset.name,
        img: card.dataset.img,
        price: card.dataset.price,
        style: card.dataset.style,
        color: card.dataset.color,
        materials: card.dataset.materials,
        lengths: card.dataset.lengths.split(','),
        widths: card.dataset.widths.split(','),
        heights: card.dataset.heights.split(','),
        type: card.dataset.type
      };

      let favItems = JSON.parse(localStorage.getItem('favItems')) || [];
      const existingItemIndex = favItems.findIndex(item =>
        item.name === product.name &&
        item.lengths.join() === product.lengths.join() &&
        item.widths.join() === product.widths.join() &&
        item.heights.join() === product.heights.join()
      );

      if (existingItemIndex === -1) {
        favItems.push(product);
        localStorage.setItem('favItems', JSON.stringify(favItems));
        console.log('Added to favorites:', product);
      } else {
        console.log('Item already in favorites:', product.name);
      }

      // Надіслати повідомлення для оновлення fav.html
      window.postMessage({ type: 'UPDATE_FAV' }, '*');
      window.dispatchEvent(new Event('storage')); // Альтернативний тригер
    });
  });
});