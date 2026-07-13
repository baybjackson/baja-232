
const dialog = document.getElementById('lightbox');
const dialogImage = document.getElementById('lightboxImage');
const closeButton = document.getElementById('closeLightbox');

document.querySelectorAll('.gallery-item img').forEach((img) => {
  img.parentElement.addEventListener('click', () => {
    dialogImage.src = img.src;
    dialogImage.alt = img.alt;
    dialog.showModal();
  });
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
