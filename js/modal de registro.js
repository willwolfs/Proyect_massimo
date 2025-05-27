document.addEventListener('DOMContentLoaded', function() {
  // Elementos del modal
  const modal = document.getElementById('modalLogin');
  const abrirBtn = document.getElementById('abrirLogin');
  const cerrarBtn = document.querySelector('.cerrar-modal');
  
  // Abrir modal
  abrirBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evita el scroll del body
  });
  
  // Cerrar modal
  cerrarBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura el scroll del body
  });
  
  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Función para mostrar/ocultar contraseña (ya existente)
  function togglePassword() {
    const input = document.getElementById('passwordInput');
    const icon = document.getElementById('eyeIcon');
    
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  }
  
  // Asigna la función al botón de mostrar contraseña
  document.querySelector('.toggle-password').addEventListener('click', togglePassword);
});