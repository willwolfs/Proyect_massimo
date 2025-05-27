<?php
session_start();
if (!isset($_SESSION['usuario'])) {
  header("Location: Login.html");
  exit();
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <title>Mi Perfil</title>
  <link rel="stylesheet" href="css/perfil.css">
</head>

<body>

  <div class="perfil-container">
    <h1>Bienvenido, <?php echo $_SESSION['usuario']; ?> 👋</h1>

    <div class="perfil-opciones">
      <p>Aquí puedes cerrar tu sesión cuando quieras.</p>
      <button onclick="cerrarSesion()">Cerrar Sesión</button>
    </div>
  </div>

  <script>
    function cerrarSesion() {
      window.location.href = 'logout.php';
    }
  </script>

</body>

</html>