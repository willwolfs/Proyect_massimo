fetch('usuario_actual.php')
    .then(response => response.text())
    .then(nombre => {
      if (nombre.trim() !== "") {
        document.getElementById('nombreUsuario').textContent = nombre;
        // Opcional: cambiar el enlace si ya inició sesión
        document.querySelector('.user-link').setAttribute('href', '#');
      }
    });

