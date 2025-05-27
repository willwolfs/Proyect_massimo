document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const deliveryBtn = document.getElementById('deliveryBtn');
  const pickupBtn = document.getElementById('pickupBtn');
  const deliveryContent = document.getElementById('deliveryContent');
  const pickupContent = document.getElementById('pickupContent');
  const addressForm = document.querySelector('.address-form');
  const storeSelection = document.querySelector('.store-selection');

  // Función para cambiar entre métodos de entrega
  function toggleDeliveryMethod(method) {
    if (method === 'delivery') {
      deliveryBtn.classList.add('selected');
      pickupBtn.classList.remove('selected');
      deliveryContent.style.display = 'block';
      pickupContent.style.display = 'none';
    } else {
      pickupBtn.classList.add('selected');
      deliveryBtn.classList.remove('selected');
      pickupContent.style.display = 'block';
      deliveryContent.style.display = 'none';
    }
  }

  // Event listeners
  deliveryBtn.addEventListener('click', () => toggleDeliveryMethod('delivery'));
  pickupBtn.addEventListener('click', () => toggleDeliveryMethod('pickup'));

  // Inicializar con envío a domicilio seleccionado
  toggleDeliveryMethod('delivery');

  // Validación del formulario de dirección (ejemplo básico)
  if (addressForm) {
    addressForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const addressInput = this.querySelector('input[type="text"]');
      if (addressInput.value.trim() === '') {
        alert('Por favor ingresa tu dirección');
        return;
      }
      // Aquí iría la lógica para procesar la dirección
      console.log('Dirección enviada:', addressInput.value);
    });
  }

  // Selección de tienda (ejemplo básico)
  if (storeSelection) {
    const storeItems = storeSelection.querySelectorAll('.store-item');
    storeItems.forEach(item => {
      item.addEventListener('click', function() {
        storeItems.forEach(i => i.classList.remove('selected-store'));
        this.classList.add('selected-store');
        // Aquí puedes agregar lógica para guardar la tienda seleccionada
      });
    });
  }
});