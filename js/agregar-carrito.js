// Namespace para evitar colisiones
const MiCarrito = (function() {
  // Variables privadas
  const CARRITO_KEY = 'miCarritoCompras';
  
  // Métodos públicos
  return {
    init: function() {
      this.asignarEventos();
      this.actualizarVista();
    },
    
    agregarProducto: function(event) {
      event.preventDefault();
      
      const card = event.target.closest('.card');
      if (!card) return;
      
      const producto = {
        imagen: card.querySelector('img').src,
        titulo: card.querySelector('.titulo').textContent,
        descripcion: card.querySelector('.descripcion').textContent,
        precio: parseFloat(card.querySelector('.precio').textContent.replace(/[^0-9.]/g, '')),
        cantidad: 1
      };
      
      let carrito = this.obtenerCarrito();
      const productoExistente = carrito.find(item => item.titulo === producto.titulo);
      
      if (productoExistente) {
        productoExistente.cantidad += 1;
      } else {
        carrito.push(producto);
      }
      
      this.guardarCarrito(carrito);
      this.actualizarVista();
      this.mostrarModal();
    },
    
    obtenerCarrito: function() {
      return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    },
    
    guardarCarrito: function(carrito) {
      localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    },
    
    actualizarVista: function() {
      const carrito = this.obtenerCarrito();
      const itemsCarrito = document.querySelector('.items-carrito');
      const totalElement = document.querySelector('.total-carrito');
      
      if (!itemsCarrito || !totalElement) return;
      
      itemsCarrito.innerHTML = '';
      
      if (carrito.length === 0) {
        itemsCarrito.innerHTML = '<p>No hay productos aún.</p>';
        totalElement.innerHTML = '<strong>Total: </strong> S/0.00';
        return;
      }
      
      let total = 0;
      
      carrito.forEach((producto, index) => {
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
              <span>${producto.cantidad}</span>
              <button class="cantidad-btn mas" data-index="${index}">+</button>
              <button class="eliminar-item" data-index="${index}">×</button>
            </div>
          </div>
          <div class="item-precio">S/${(producto.precio * producto.cantidad).toFixed(2)}</div>
        `;
        itemsCarrito.appendChild(item);
        
        total += producto.precio * producto.cantidad;
      });
      
      totalElement.innerHTML = `<strong>Total: </strong> S/${total.toFixed(2)}`;
      this.asignarEventosCarrito();
    },
    
    asignarEventos: function() {
      // Usa event delegation para manejar dinámicamente los botones
      document.addEventListener('click', (event) => {
        if (event.target.classList.contains('boton')) {
          this.agregarProducto(event);
        }
        
        if (event.target.classList.contains('cerrar-carrito')) {
          this.ocultarModal();
        }
      });
    },
    
    asignarEventosCarrito: function() {
      document.addEventListener('click', (event) => {
        const carrito = this.obtenerCarrito();
        
        if (event.target.classList.contains('menos')) {
          const index = parseInt(event.target.getAttribute('data-index'));
          if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
          } else {
            carrito.splice(index, 1);
          }
          this.guardarCarrito(carrito);
          this.actualizarVista();
        }
        
        if (event.target.classList.contains('mas')) {
          const index = parseInt(event.target.getAttribute('data-index'));
          carrito[index].cantidad++;
          this.guardarCarrito(carrito);
          this.actualizarVista();
        }
        
        if (event.target.classList.contains('eliminar-item')) {
          const index = parseInt(event.target.getAttribute('data-index'));
          carrito.splice(index, 1);
          this.guardarCarrito(carrito);
          this.actualizarVista();
        }
      });
    },
    
    mostrarModal: function() {
      const modal = document.getElementById('modalCarrito');
      if (modal) modal.style.display = 'block';
    },
    
    ocultarModal: function() {
      const modal = document.getElementById('modalCarrito');
      if (modal) modal.style.display = 'none';
    }
  };
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  MiCarrito.init();
});