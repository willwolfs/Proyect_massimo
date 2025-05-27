// Función para abrir el modal
function openModal(title, description, price, imageSrc) {
    // Llenar el contenido del modal con la información del producto
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-description").textContent = description;
    document.getElementById("modal-price").textContent = price;
    document.getElementById("modal-image").src = imageSrc;

    // Mostrar el modal
    document.getElementById("modal").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    // Cerrar el modal
    document.getElementById("modal").style.display = "none";
}

// Función para agregar el producto al pedido
function addToOrder() {
    // Aquí puedes agregar la lógica para agregar el producto al pedido
    alert("Producto agregado al pedido");
    closeModal();
}

// Cerrar el modal cuando el usuario hace clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == document.getElementById("modal")) {
        closeModal();
    }
}

// Inicialmente aseguramos que el modal esté oculto al cargar la página
document.getElementById("modal").style.display = "none";

// Eventos de clic para cada botón "Ver Información"
const viewButtons = document.querySelectorAll('.ver-info'); // Selecciona los botones "Ver Información"

viewButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Extraemos la información del producto correspondiente
        const card = button.closest('.card');
        const title = card.querySelector('.titulo').textContent;
        const description = card.querySelector('.descripcion').textContent;
        const price = card.querySelector('.precio').textContent;
        const imageSrc = card.querySelector('img').src;

        // Llamamos a la función para abrir el modal con la información del producto
        openModal(title, description, price, imageSrc);
    });
});
