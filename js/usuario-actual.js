
  // Cuando se carga la página
  document.addEventListener("DOMContentLoaded", function() {
    fetch('../usuario_actual.php')
      .then(response => response.text())
      .then(nombre => {
        if (nombre.trim() !== "") {
          document.getElementById("texto-login").innerHTML = `Hola, <br> ${nombre}`;
        }
      })
      .catch(error => {
        console.error('Error al obtener el nombre de usuario:', error);
      });
  });

  function irPerfil(){
  if(localStorage.getItem("usuarioLogueado")){
    window.location.href = "html/perfil.html";
  } else {
    window.location.href = "html/Login.html";
  }
}
