
// Función para cambiar el estado de las opciones de pedido
function togglePedido(tipo) {
  const buttons = document.querySelectorAll('.pedido-button');
  buttons.forEach(button => button.classList.remove('active'));

  if (tipo === 'delivery') {
    document.querySelector('.pedido-button:first-child').classList.add('active');
  } else {
    document.querySelector('.pedido-button:last-child').classList.add('active');
  }
}

// Validación simple de la ubicación
document.querySelector('form').addEventListener('submit', function (e) {
  const ubicacion = document.getElementById('ubicacion').value;
  if (!ubicacion.trim()) {
    alert('Por favor, ingresa tu ubicación.');
    e.preventDefault();
  }
});

