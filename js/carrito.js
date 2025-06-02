document.addEventListener('DOMContentLoaded', function() {
    // Variables del carrito
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const cartCountElement = document.querySelector('.cart-count');
    const cartContainer = document.querySelector('.cart-container');
    const cartToggle = document.querySelector('.cart-toggle');
    const closeCartBtn = document.querySelector('.close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Botones para abrir/cerrar el carrito
    cartToggle.addEventListener('click', () => {
        cartContainer.classList.add('active');
    });

    closeCartBtn.addEventListener('click', () => {
        cartContainer.classList.remove('active');
    });

    // Función para actualizar el carrito
    function updateCart() {
        // Limpiar el contenedor del carrito
        cartItemsContainer.innerHTML = '';

        // Calcular el total
        let total = 0;
        let itemCount = 0;

        // Agregar cada ítem al carrito
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            const itemPrice = parseFloat(item.price.replace('S/ ', ''));
            const itemTotal = itemPrice * item.quantity;

            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">S/ ${itemTotal.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="decrease-item" data-name="${item.name}">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="increase-item" data-name="${item.name}">+</button>
                </div>
            `;

            cartItemsContainer.appendChild(itemElement);
            total += itemTotal;
            itemCount += item.quantity;
        });

        // Actualizar total y contador
        totalPriceElement.textContent = `S/ ${total.toFixed(2)}`;
        cartCountElement.textContent = itemCount;

        // Botones de + y -
        document.querySelectorAll('.increase-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-name');
                const item = cart.find(item => item.name === itemName);
                if (item) {
                    item.quantity++;
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.decrease-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-name');
                const itemIndex = cart.findIndex(item => item.name === itemName);
                if (itemIndex !== -1) {
                    if (cart[itemIndex].quantity > 1) {
                        cart[itemIndex].quantity--;
                    } else {
                        cart.splice(itemIndex, 1);
                    }
                    updateCart();
                }
            });
        });

        // Activar/desactivar botón de pedido
        if (cart.length === 0) {
            checkoutBtn.disabled = true;
            checkoutBtn.onclick = null;
            checkoutBtn.classList.add('disabled');
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.onclick = () => {
                window.location.href = 'pago.html';
            };
            checkoutBtn.classList.remove('disabled');
        }
    }

    // Botones "Agregar al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const pizzaCard = e.target.closest('.pizza-card');
            const name = pizzaCard.querySelector('.pizza-name').textContent;
            const price = pizzaCard.querySelector('.pizza-price').textContent;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name,
                    price,
                    quantity: 1
                });
            }

            updateCart();

            cartContainer.classList.add('active');

            // Notificación
            const notification = document.createElement('div');
            notification.classList.add('notification');
            notification.textContent = `${name} agregado al carrito`;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.add('show');
            }, 10);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        });
    });

    // Estilos para notificaciones
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1001;
        }
        .notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(notificationStyle);
});
