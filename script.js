const intro = document.getElementById('intro');
const siteShell = document.getElementById('siteShell');
const skipIntro = document.getElementById('skipIntro');
const welcomeButton = document.getElementById('welcomeButton');

const sequence = [
  ['.intro-title', 300, 1800],
  ['.intro-one', 2300, 1200],
  ['.intro-two', 3700, 1200],
  ['.intro-three', 5100, 1700],
  ['.intro-welcome', 7000, 99999]
];

let timers = [];

function clearSequence(){
  timers.forEach(clearTimeout);
  timers = [];
  document.querySelectorAll('.intro-line').forEach(el => el.classList.remove('show'));
}

function startIntro(){
  clearSequence();
  document.body.classList.add('intro-open');
  intro.classList.remove('closed');
  siteShell.classList.remove('ready');
  siteShell.setAttribute('aria-hidden','true');

  sequence.forEach(([selector,start,duration]) => {
    const el = document.querySelector(selector);
    timers.push(setTimeout(() => el.classList.add('show'), start));

    if(duration < 90000){
      timers.push(setTimeout(() => el.classList.remove('show'), start + duration));
    }
  });

  timers.push(setTimeout(showSite, 9300));
}

function showSite(){
  clearSequence();
  intro.classList.add('closed');
  siteShell.classList.add('ready');
  siteShell.setAttribute('aria-hidden','false');
  document.body.classList.remove('intro-open');
  window.scrollTo({top:0,behavior:'instant'});
}

skipIntro.addEventListener('click', showSite);
welcomeButton.addEventListener('click', showSite);
document.getElementById('replayIntro').addEventListener('click', startIntro);
document.getElementById('footerReplay').addEventListener('click', startIntro);
window.addEventListener('load', startIntro);

/* Captain's Call audio */
const soundButton = document.getElementById('soundButton');
const engineAudio = document.getElementById('engineAudio');

soundButton.addEventListener('click', async () => {
  if(engineAudio.paused){
    try{
      await engineAudio.play();
      soundButton.textContent = '❚❚ Pause Exhaust Audio';
      soundButton.classList.add('playing');
    }catch(error){
      console.error(error);
    }
  }else{
    engineAudio.pause();
    soundButton.textContent = '▶ Click Here to Listen';
    soundButton.classList.remove('playing');
  }
});

engineAudio.addEventListener('ended', () => {
  soundButton.textContent = '▶ Click Here to Listen';
  soundButton.classList.remove('playing');
});

/* Photo lightbox */
const dialog = document.getElementById('lightbox');
const dialogImage = document.getElementById('lightboxImage');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.parentElement.addEventListener('click', () => {
    dialogImage.src = img.src;
    dialogImage.alt = img.alt;
    dialog.showModal();
  });
});

document.getElementById('closeLightbox').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', event => {
  if(event.target === dialog) dialog.close();
});