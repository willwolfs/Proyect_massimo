  // Funciones para el modal de login
  function abrirModal() {
    event.preventDefault();
    document.getElementById('modalLogin').style.display = 'flex';
  }

  function cerrarModal() {
    document.getElementById('modalLogin').style.display = 'none';
  }

  function togglePassword() {
    const passwordField = document.querySelector('.password-input input');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
      passwordField.type = 'password';
      toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    }
  }

  // Cambiar entre pestañas de login/registro
  const tabs = document.querySelectorAll('.modal-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('modalLogin');
    if (event.target === modal) {
      cerrarModal();
    }
  });

  // (Mantén tus otros scripts existentes aquí)
