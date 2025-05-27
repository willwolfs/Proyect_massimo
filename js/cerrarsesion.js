fetch('usuario_actual.php')
  .then(response => response.text())
  .then(nombre => {
    if (nombre.trim() !== "") {
      document.getElementById('nombreUsuario').textContent = nombre;
      document.getElementById('loginEnlace').href = "#";
      document.getElementById('btnCerrarSesion').style.display = "inline-block";
    }
  });

// Lógica para cerrar sesión
document.getElementById('btnCerrarSesion').addEventListener('click', () => {
  window.location.href = 'cerrar_sesion.php';
});

