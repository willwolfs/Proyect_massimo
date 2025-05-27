    const images = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    images.forEach(img => {
      img.addEventListener('click', () => {
        modal.classList.add('active');
        modalImg.src = img.src;
      });
    });

    modal.addEventListener('click', () => {
      modal.classList.remove('active');
    });