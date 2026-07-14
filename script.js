
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

const audioToggle=document.getElementById('audioToggle');
const exhaustAudio=document.getElementById('exhaustAudio');
if(audioToggle&&exhaustAudio){audioToggle.addEventListener('click',async()=>{if(exhaustAudio.paused){await exhaustAudio.play();audioToggle.textContent='❚❚ PAUSE EXHAUST AUDIO';audioToggle.classList.add('playing');}else{exhaustAudio.pause();audioToggle.textContent='▶ CLICK HERE TO LISTEN';audioToggle.classList.remove('playing');}});exhaustAudio.addEventListener('ended',()=>{audioToggle.textContent='▶ CLICK HERE TO LISTEN';audioToggle.classList.remove('playing');});}
