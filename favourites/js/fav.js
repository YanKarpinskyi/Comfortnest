document.addEventListener('DOMContentLoaded', () => {
    function updateFavDisplay() {
        const favItems = JSON.parse(localStorage.getItem('favItems')) || [];
        const container = document.getElementById('fav-items-container');
        const totalCostElement = document.getElementById('total-purchase-cost');
        if (!container || !totalCostElement) {
            console.error('Container or total cost element not found! Container:', container, 'Total Cost Element:', totalCostElement);
            return;
        }
        container.innerHTML = '';
        totalCostElement.textContent = '';
        favItems.forEach(item => {
            const itemPrice = parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
            const itemQuantity = 1; 
            const calculatedTotalCost = itemPrice * itemQuantity;
            const favItem = document.createElement('div');
            favItem.className = 'fav-item';
            favItem.innerHTML = `
            <label class="custom-checkbox">
                <input type="checkbox" class="fav-checkbox">
                <span class="checkmark"></span>
            </label>
            <img src="${item.img || '../main-page/img/default.jpg'}" alt="Product Image" class="fav-product-img">
            <div class="fav-info">
                <h2>${item.name || 'Назва не вказана'}</h2>
                <p><strong>Розміри:</strong> ${item.lengths ? item.lengths.join(' / ') + ' см' : 'Невідомо'} x ${item.widths ? item.widths.join(' / ') + ' см' : 'Невідомо'} x ${item.heights ? item.heights.join(' / ') + ' см' : 'Невідомо'}</p>
                <p><strong>Кількість:</strong> ${itemQuantity}</p>
                <hr>
                <p><strong>Загальна вартість:</strong> ${isNaN(calculatedTotalCost) ? '0.00' : calculatedTotalCost.toFixed(2)} грн</p>
            </div>
            `;
            container.appendChild(favItem);
        });

        const totalPurchaseCost = favItems.reduce((sum, item) => {
            const itemPrice = parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
            const itemQuantity = 1;
            const itemTotalCost = itemPrice * itemQuantity;
            return sum + itemTotalCost;
        }, 0);

        totalCostElement.textContent = `Загальна вартість покупки: ${totalPurchaseCost.toFixed(2)} грн`;
    }

    function moveToCart() {
        const favItems = JSON.parse(localStorage.getItem('favItems')) || [];
        const checkedItems = document.querySelectorAll('.fav-checkbox:checked');
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        checkedItems.forEach(checkbox => {
            const favItem = checkbox.closest('.fav-item');
            const name = favItem.querySelector('h2').textContent;
            const img = favItem.querySelector('.fav-product-img').src;
            const price = favItem.querySelector('p:last-child').textContent.replace(' грн', '').replace(/[^0-9.,]/g, '').replace(',', '.');
            const lengths = favItem.querySelector('p:nth-child(2)').textContent.match(/\d+/g)?.[0] || 'Невідомо';
            const widths = favItem.querySelector('p:nth-child(2)').textContent.match(/\d+/g)?.[1] || 'Невідомо';
            const heights = favItem.querySelector('p:nth-child(2)').textContent.match(/\d+/g)?.[2] || 'Невідомо';

            const newItem = {
                name,
                img,
                price: parseFloat(price) || 0,
                length: lengths,
                width: widths,
                height: heights,
                quantity: 1,
                totalCost: parseFloat(price) || 0
            };

            const existingItemIndex = cartItems.findIndex(item =>
                item.name === newItem.name &&
                item.length === newItem.length &&
                item.width === newItem.width &&
                item.height === newItem.height
            );

            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].quantity += 1;
                cartItems[existingItemIndex].totalCost = cartItems[existingItemIndex].quantity * cartItems[existingItemIndex].price;
            } else {
                cartItems.push(newItem);
            }

            const favIndex = favItems.findIndex(item => item.name === newItem.name);
            if (favIndex !== -1) {
                favItems.splice(favIndex, 1);
            }
        });

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('favItems', JSON.stringify(favItems));
        console.log('Moved to cart:', cartItems);

        window.postMessage({ type: 'UPDATE_CART' }, '*');
        window.postMessage({ type: 'UPDATE_FAV' }, '*');
        window.dispatchEvent(new Event('storage'));
    }

    updateFavDisplay();

    window.addEventListener('message', (event) => {
        if (event.data.type === 'UPDATE_FAV') {
            console.log('Received update fav message, refreshing display');
            updateFavDisplay();
        }
    });

    window.addEventListener('storage', (event) => {
        if (event.key === 'favItems') {
            console.log('Storage event detected, refreshing fav display');
            updateFavDisplay();
        }
    });

    document.querySelector('.to-cart').addEventListener('click', moveToCart);
});