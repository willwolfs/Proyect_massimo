<?php
session_start();
$conexion = new mysqli("localhost", "root", "", "massimodb");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = trim($_POST['correo'] ?? '');
    $contraseña = $_POST['contraseña'] ?? '';

    if (empty($correo) || empty($contraseña)) {
        echo "Todos los campos son obligatorios.";
        exit();
    }

    $correo = filter_var($correo, FILTER_VALIDATE_EMAIL);
    if (!$correo) {
        echo "Correo inválido.";
        exit();
    }

    $sql = "SELECT nombre, contraseña FROM usuarios WHERE correo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
        if (password_verify($contraseña, $fila['contraseña'])) {
            $_SESSION['nombre_usuario'] = $fila['nombre'];
            echo "ok";
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Correo no registrado.";
    }

    $stmt->close();
}

$conexion->close();
?>