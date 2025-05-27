<?php
$host = "localhost";
$usuario = "root";
$contrasena = "";
$base_datos = "massimodb";

$conn = new mysqli($host, $usuario, $contrasena, $base_datos);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = trim($_POST['nombre'] ?? '');
  $correo = trim($_POST['correo'] ?? '');
  $contraseña = $_POST['contraseña'] ?? '';

  if (empty($nombre) || empty($correo) || empty($contraseña)) {
    echo "Todos los campos son obligatorios.";
    exit();
  }

  $correo = filter_var($correo, FILTER_VALIDATE_EMAIL);
  if (!$correo) {
    echo "Correo inválido.";
    exit();
  }

  $hash = password_hash($contraseña, PASSWORD_BCRYPT);

  $sql = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $nombre, $correo, $hash);

  if ($stmt->execute()) {
    echo "Registro exitoso.";
  } else {
    echo "Error al registrar: " . $stmt->error;
  }

  $stmt->close();
}

$conn->close();
?>