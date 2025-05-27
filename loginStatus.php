<?php
session_start();
?>
<a href="<?php echo isset($_SESSION['usuario']) ? 'logout.php' : 'html/Login.html'; ?>" class="login">
    <img src="image/usuario2.png" alt="Iniciar Sesión" />
    <span id="texto-login">
        <?php
        if (isset($_SESSION['usuario'])) {
            echo 'Hola, <br>' . $_SESSION['usuario'] . '<br><strong>Cerrar Sesión</strong>';
        } else {
            echo 'Hola, <br> Iniciar Sesión';
        }
        ?>
    </span>
</a>