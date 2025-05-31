
  const loginLink = document.getElementById("login-link");
  const loginText = document.getElementById("texto-login");
  const logueado = localStorage.getItem("usuarioLogueado");

  if (logueado === "true") {
    const correo = localStorage.getItem("usuarioCorreo") || "Usuario";
    loginText.innerHTML = `Hola, <br>${correo}`;
    loginLink.href = "html/Perfil.html"; // Redirige a editar perfil
  }
