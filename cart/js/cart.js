document.addEventListener('DOMContentLoaded', () => {
    //   const cartItem = JSON.parse(localStorage.getItem('cartItem')) || {
    //     quantity: 0,
    //     length: '',
    //     width: '',
    //     height: '',
    //     totalCost: 0,
    //     img: '',
    //     name: ''
    //   };

    //   document.getElementById('cart-product-img').src = cartItem.img || '../main-page/img/default.jpg';
    //   document.getElementById('cart-product-name').textContent = cartItem.name || 'Назва не вказана';
    //   document.getElementById('cart-length').textContent = cartItem.length || 'Невідомо';
    //   document.getElementById('cart-width').textContent = cartItem.width || 'Невідомо';
    //   document.getElementById('cart-height').textContent = cartItem.height || 'Невідомо';
    //   document.getElementById('cart-quantity').textContent = cartItem.quantity || 0;
    //   document.getElementById('cart-total-cost').textContent = cartItem.totalCost || 0;

      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const container = document.getElementById('cart-items-container');

      cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <img src="${item.img || '../main-page/img/default.jpg'}" alt="Product Image" class="cart-product-img">
          <div class="cart-info">
            <h2>${item.name || 'Назва не вказана'}</h2>
            <p><strong>Розміри:</strong> ${item.length || 'Невідомо'} x ${item.width || 'Невідомо'} x ${item.height || 'Невідомо'} см</p>
            <p><strong>Кількість:</strong> ${item.quantity || 0}</p>
            <p><strong>Загальна вартість:</strong> ${item.totalCost || 0} грн</p>
          </div>
        `;
        container.appendChild(cartItem);
    });
});