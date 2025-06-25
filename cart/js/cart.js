document.addEventListener('DOMContentLoaded', () => {
      function updateCartDisplay() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const container = document.getElementById('cart-items-container');
        const totalCostElement = document.getElementById('total-purchase-cost');

        if (!container || !totalCostElement) {
          console.error('Container or total cost element not found! Container:', container, 'Total Cost Element:', totalCostElement);
          return;
        }

        container.innerHTML = '';
        totalCostElement.textContent = '';

        cartItems.forEach(item => {
          const itemPrice = parseFloat(item.price) || 0;
          const itemQuantity = parseInt(item.quantity) || 0;
          const calculatedTotalCost = itemPrice * itemQuantity;
          const displayTotalCost = isNaN(item.totalCost) || item.totalCost === 0 ? calculatedTotalCost : parseFloat(item.totalCost);

          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
            <img src="${item.img || '../main-page/img/default.jpg'}" alt="Product Image" class="cart-product-img">
            <div class="cart-info">
              <h2>${item.name || 'Назва не вказана'}</h2>
              <p><strong>Розміри:</strong> ${item.length || 'Невідомо'} x ${item.width || 'Невідомо'} x ${item.height || 'Невідомо'} см</p>
              <p><strong>Кількість:</strong> ${itemQuantity}</p>
              <hr>
              <p><strong>Загальна вартість:</strong> ${isNaN(displayTotalCost) ? '0.00' : displayTotalCost.toFixed(2)} грн</p>
            </div>
          `;
          container.appendChild(cartItem);
        });

        const totalPurchaseCost = cartItems.reduce((sum, item) => {
          const itemPrice = parseFloat(item.price) || 0;
          const itemQuantity = parseInt(item.quantity) || 0;
          const itemTotalCost = itemPrice * itemQuantity;
          return sum + (isNaN(item.totalCost) || item.totalCost === 0 ? itemTotalCost : parseFloat(item.totalCost));
        }, 0);

        totalCostElement.textContent = `Загальна вартість покупки: ${totalPurchaseCost.toFixed(2)} грн`;
      }

      updateCartDisplay();

      window.addEventListener('message', (event) => {
        if (event.data.type === 'UPDATE_CART') {
          console.log('Received update cart message, refreshing display');
          updateCartDisplay();
        }
      });
    });