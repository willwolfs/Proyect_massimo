// Script carrusel
const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
let index = 0;
const duration = 3000; // Duración en milisegundos (3000ms = 3 segundos)

function updateSlidePosition() {
  const offset = -index * 100;
  track.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateSlidePosition();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateSlidePosition();
}

// Avanzar automáticamente cada "duration" milisegundos
setInterval(nextSlide, duration);

// Script navegación
function mostrarSeccion(id) {
  document
    .querySelectorAll("section")
    .forEach((sec) => sec.classList.remove("active"));
  document
    .querySelectorAll(".carousel")
    .forEach((car) => car.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function mostrarReservacion() {
  document
    .querySelectorAll("section")
    .forEach((sec) => sec.classList.remove("active"));
  document
    .querySelectorAll(".carousel")
    .forEach((car) => car.classList.remove("active"));

  const iframe = document.getElementById("ReservacionIframe");
  iframe.src = "eservacion.html"; // ← ahora directo
  document.getElementById("Reservacion").classList.add("active");
}

function mostrarCategoria() {
  document
    .querySelectorAll("section")
    .forEach((sec) => sec.classList.remove("active"));
  document
    .querySelectorAll(".carousel")
    .forEach((car) => car.classList.remove("active"));

  const iframe = document.getElementById("categoriasIframe");
  iframe.src = "../categoria/categoria.html";
  document.getElementById("categorias").classList.add("active");
}

function ajustarAlturaIframe(iframe) {
  setTimeout(() => {
    try {
      iframe.style.height =
        iframe.contentWindow.document.body.scrollHeight + "px";
    } catch (e) {
      console.warn(
        "No se pudo ajustar la altura automáticamente. Posible restricción de origen cruzado."
      );
      iframe.style.height = "800px"; // Altura por defecto
    }
  }, 300);
}


// funcion de productos

var swiper = new Swiper(".mySwiper", {
  loop: true, // Repetir imágenes en bucle
  autoplay: {
      delay: 3000, // Cambia cada 3 segundos
      disableOnInteraction: false
  },
  pagination: {
      el: ".swiper-pagination",
      clickable: true
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
  }
});


// Simulación de usuario logueado
let usuarioActivo = localStorage.getItem("usuarioActivo");

if (usuarioActivo) {
  document.querySelector('.login').style.display = 'none';
  document.getElementById('userMenu').style.display = 'flex';
  document.getElementById('nombreUsuario').innerText = `Hola, ${usuarioActivo}`;

  document.getElementById('userMenu').addEventListener('click', () => {
    const dropdown = document.querySelector('.user-dropdown');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
  });
}

// Función de cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  location.reload();
}

// Ejemplo: llamar esta función después de iniciar sesión correctamente
function iniciarSesion(nombre) {
  localStorage.setItem("usuarioActivo", nombre);
  location.reload();
}

function irAPerfil() {
  window.location.href = "html/perfil.html";
}
