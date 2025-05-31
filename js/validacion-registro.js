document.getElementById('registroForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.getElementById('newUsername').value;
  const correo = document.getElementById('email').value;
  const contraseña = document.getElementById('newPassword').value;
  const confirmar = document.getElementById('confirmPassword').value;
  const nacimiento = document.getElementById('birthdate').value;

  if (contraseña.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres');
    return;
  }

  if (contraseña !== confirmar) {
    alert('Las contraseñas no coinciden');
    return;
  }

  fetch('../guardar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `nombre=${encodeURIComponent(nombre)}&correo=${encodeURIComponent(correo)}&contraseña=${encodeURIComponent(contraseña)}&nacimiento=${encodeURIComponent(nacimiento)}`
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    if (data.includes("exitosamente")) {
      localStorage.setItem("usuarioActual", JSON.stringify({ nombre: nombre, correo: correo }));
      window.location.href = 'perfil.html';
    }
  })
  .catch(error => {
    alert('Error al registrar: ' + error);
  });
});
