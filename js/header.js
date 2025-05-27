
  let lastScrollTop = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scroll hacia abajo → ocultar header
      header.style.top = "-100px";
    } else {
      // Scroll hacia arriba → mostrar header
      header.style.top = "0";
    }

    lastScrollTop = scrollTop;
  });

