const intro = document.getElementById('intro');
const siteShell = document.getElementById('siteShell');
const skipIntro = document.getElementById('skipIntro');
const welcomeButton = document.getElementById('welcomeButton');
const introStart = document.getElementById('introStart');
const introCopy = document.querySelector('.intro-copy');
const introEngineAudio = document.getElementById('introEngineAudio');

const sequence = [
  ['.intro-title', 300, 1800],
  ['.intro-one', 2300, 1200],
  ['.intro-two', 3700, 1200],
  ['.intro-three', 5100, 1700],
  ['.intro-welcome', 7000, 99999]
];

let timers = [];
let fadeTimer = null;

function clearSequence(){
  timers.forEach(clearTimeout);
  timers = [];
  document.querySelectorAll('.intro-line').forEach(el => el.classList.remove('show'));
}

function stopIntroAudio(){
  if(fadeTimer){
    clearInterval(fadeTimer);
    fadeTimer = null;
  }
  introEngineAudio.pause();
  introEngineAudio.currentTime = 0;
  introEngineAudio.volume = 1;
}

function fadeIntroAudio(){
  if(introEngineAudio.paused) return;
  if(fadeTimer) clearInterval(fadeTimer);

  fadeTimer = setInterval(() => {
    introEngineAudio.volume = Math.max(0, introEngineAudio.volume - 0.08);
    if(introEngineAudio.volume <= 0){
      stopIntroAudio();
    }
  }, 80);
}

function prepareIntro(){
  clearSequence();
  stopIntroAudio();
  document.body.classList.add('intro-open');
  intro.classList.remove('closed');
  siteShell.classList.remove('ready');
  siteShell.setAttribute('aria-hidden','true');

  introStart.style.display = 'flex';
  introCopy.style.opacity = '0';
  introCopy.style.pointerEvents = 'none';
  skipIntro.style.opacity = '0';
  skipIntro.style.pointerEvents = 'none';
}

async function startIntro(){
  clearSequence();

  introStart.style.display = 'none';
  introCopy.style.opacity = '1';
  introCopy.style.pointerEvents = 'auto';
  skipIntro.style.opacity = '1';
  skipIntro.style.pointerEvents = 'auto';

  introEngineAudio.currentTime = 0;
  introEngineAudio.volume = 1;

  try{
    await introEngineAudio.play();
  }catch(error){
    console.warn('Intro sound could not start:', error);
  }

  sequence.forEach(([selector,start,duration]) => {
    const el = document.querySelector(selector);
    timers.push(setTimeout(() => el.classList.add('show'), start));

    if(duration < 90000){
      timers.push(setTimeout(() => el.classList.remove('show'), start + duration));
    }
  });

  timers.push(setTimeout(fadeIntroAudio, 6600));
  timers.push(setTimeout(showSite, 9300));
}

function showSite(){
  clearSequence();
  fadeIntroAudio();
  intro.classList.add('closed');
  siteShell.classList.add('ready');
  siteShell.setAttribute('aria-hidden','false');
  document.body.classList.remove('intro-open');
  window.scrollTo({top:0,behavior:'instant'});
}

introStart.addEventListener('click', startIntro);
skipIntro.addEventListener('click', showSite);
welcomeButton.addEventListener('click', showSite);
document.getElementById('replayIntro').addEventListener('click', prepareIntro);
document.getElementById('footerReplay').addEventListener('click', prepareIntro);
window.addEventListener('load', prepareIntro);

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
