// Función para abrir/cerrar el carrito
function toggleCarrito() {
  const modal = document.getElementById('modalCarrito');
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
    actualizarCarrito(); // Actualizar contenido cada vez que se abre
  }
}

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
  event.preventDefault();
  event.stopPropagation(); // Evita que el evento se propague
  
  const card = event.target.closest('.pizza-card'); // Cambiado de .card a .pizza-card
  const producto = {
    imagen: card.querySelector('img').src,
    titulo: card.querySelector('.pizza-name').textContent, // Cambiado de .titulo a .pizza-name
    descripcion: card.querySelector('.pizza-ingredients').textContent, // Cambiado de .descripcion a .pizza-ingredients
    precio: parseFloat(card.querySelector('.pizza-price').textContent.split(' ')[1].replace('S/', '')), // Cambiado para obtener el precio correcto
    cantidad: 1
  };
  
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const productoExistente = carrito.find(item => item.titulo === producto.titulo);
  
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push(producto);
  }
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
  toggleCarrito(); // Abre el carrito al agregar un producto
}

// Función para actualizar el carrito
function actualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const itemsCarrito = document.querySelector('.items-carrito');
  const totalElement = document.querySelector('.total-carrito');
  
  itemsCarrito.innerHTML = '';
  
  if (carrito.length === 0) {
    itemsCarrito.innerHTML = '<p>No hay productos aún.</p>';
    totalElement.innerHTML = '<strong>Total: </strong> S/0.00';
    return;
  }
  
  let total = 0;
  
  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    
    const item = document.createElement('div');
    item.className = 'item-carrito';
    item.innerHTML = `
      <div class="item-imagen">
        <img src="${producto.imagen}" alt="${producto.titulo}">
      </div>
      <div class="item-info">
        <h4>${producto.titulo}</h4>
        <p>${producto.descripcion}</p>
        <div class="item-controles">
          <button class="cantidad-btn menos" data-index="${index}">-</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button class="cantidad-btn mas" data-index="${index}">+</button>
          <button class="eliminar-item" data-index="${index}">×</button>
        </div>
      </div>
      <div class="item-precio">S/${subtotal.toFixed(2)}</div>
    `;
    itemsCarrito.appendChild(item);
  });
  
  totalElement.innerHTML = `<strong>Total: </strong> S/${total.toFixed(2)}`;
  agregarEventosCarrito();
}

// Función para manejar eventos del carrito
function agregarEventosCarrito() {
  // Botones de cantidad
  document.querySelectorAll('.cantidad-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      const carrito = JSON.parse(localStorage.getItem('carrito'));
      
      if (this.classList.contains('menos')) {
        if (carrito[index].cantidad > 1) {
          carrito[index].cantidad--;
        } else {
          carrito.splice(index, 1);
        }
      } else if (this.classList.contains('mas')) {
        carrito[index].cantidad++;
      }
      
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito();
    });
  });
  
  // Botones de eliminar
  document.querySelectorAll('.eliminar-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      const carrito = JSON.parse(localStorage.getItem('carrito'));
      
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito();
    });
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
  // Botones "Añadir al carrito" - Cambiado de .boton a .add-to-cart
  document.querySelectorAll('.add-to-cart').forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
  });
  
  // Icono del carrito
  document.querySelector('.carrito').addEventListener('click', function(e) {
    e.preventDefault();
    toggleCarrito();
  });
  
  // Botón cerrar carrito
  document.querySelector('.cerrar-carrito').addEventListener('click', toggleCarrito);
  
  // Cargar carrito inicial
  actualizarCarrito();
});