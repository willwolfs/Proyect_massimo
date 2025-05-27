// Espera a que el contenido del DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', () => {
    // Le da el foco al body para que reciba eventos del teclado
    document.body.setAttribute('tabindex', '0');
    document.body.focus();
  
    let scrollingDown = null;
    let scrollingUp = null;
  
    // Cuando se presiona una tecla
    document.body.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowDown' && !scrollingDown) {
        scrollingDown = setInterval(() => {
          window.scrollBy({ top: 10, behavior: 'smooth' });
        }, 20);
      }
  
      if (event.key === 'ArrowUp' && !scrollingUp) {
        scrollingUp = setInterval(() => {
          window.scrollBy({ top: -10, behavior: 'smooth' });
        }, 20);
      }
    });
  
    // Cuando se suelta una tecla
    document.body.addEventListener('keyup', function(event) {
      if (event.key === 'ArrowDown' && scrollingDown) {
        clearInterval(scrollingDown);
        scrollingDown = null;
      }
  
      if (event.key === 'ArrowUp' && scrollingUp) {
        clearInterval(scrollingUp);
        scrollingUp = null;
      }
    });
  });
  