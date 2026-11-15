const audio = document.querySelector('#audio');
const playButton = document.querySelector('#play-button');
const seek = document.querySelector('#seek');
const volume = document.querySelector('#volume');
const currentTimeLabel = document.querySelector('#current-time');
const durationLabel = document.querySelector('#duration');
const trackState = document.querySelector('#track-state');
const audioMessage = document.querySelector('#audio-message');
const currentLyric = document.querySelector('#current-lyric');
const lyricProgress = document.querySelector('#lyric-progress');
const photoInput = document.querySelector('#photo-files');
const photoSlides = document.querySelector('#photo-slides');
const photoStage = document.querySelector('#photo-stage');
const photoPlaceholder = document.querySelector('#photo-placeholder');
const photoCount = document.querySelector('#photo-count');
const photoPrev = document.querySelector('#photo-prev');
const photoNext = document.querySelector('#photo-next');
let lyricLines = [];
let activeLine = -1;
let isSeeking = false;
const bundledPhotoUrls = ['/public/photos/foto-especial.jpg'];
let photoUrls = [...bundledPhotoUrls];
let photoObjectUrls = [];
let photoIndex = 0;
let photoTimer = null;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
  const total = Math.floor(seconds);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function updateSeekProgress() {
  const percent = Number(seek.max) > 0 ? (Number(seek.value) / Number(seek.max)) * 100 : 0;
  seek.style.setProperty('--progress', `${percent}%`);
}

function setPlaying(isPlaying) {
  playButton.classList.toggle('is-playing', isPlaying);
  playButton.setAttribute('aria-label', isPlaying ? 'Pausar' : 'Reproducir');
  trackState.textContent = isPlaying ? 'REPRODUCIENDO AHORA' : 'LISTA PARA REPRODUCIR';
  if (isPlaying) startPhotoShow();
  else stopPhotoShow();
}

function parseLrc(text) {
  return text.split(/\r?\n/).flatMap((line, index) => {
    const match = line.trim().match(/^\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]\s*(.+)$/);
    if (!match) return [];
    const fraction = match[3] ? Number(`0.${match[3]}`) : 0;
    return [{ id: index, time: Number(match[1]) * 60 + Number(match[2]) + fraction, text: match[4].trim() }];
  }).filter((line) => line.text.length > 0);
}

function updateActiveLyric() {
  let nextActive = -1;
  lyricLines.forEach((line, index) => {
    if (line.time <= audio.currentTime) nextActive = index;
  });
  if (nextActive === activeLine) return;
  activeLine = nextActive;
  currentLyric.classList.add('is-changing');
  window.setTimeout(() => {
    currentLyric.textContent = activeLine >= 0 ? lyricLines[activeLine].text : 'La letra aparecerá con la canción.';
    lyricProgress.textContent = activeLine >= 0
      ? `${String(activeLine + 1).padStart(2, '0')} / ${String(lyricLines.length).padStart(2, '0')}`
      : `— / ${String(lyricLines.length).padStart(2, '0')}`;
    currentLyric.classList.remove('is-changing');
    currentLyric.classList.add('is-visible');
  }, 180);
}

async function loadLyrics() {
  try {
    const response = await fetch('/public/lyrics/sera-porque-te-amo.lrc');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    lyricLines = parseLrc(await response.text());
    lyricProgress.textContent = `— / ${String(lyricLines.length).padStart(2, '0')}`;
    updateActiveLyric();
  } catch {
    currentLyric.textContent = 'No se pudo cargar la letra sincronizada.';
  }
}

function showMessage(text, isError = false) {
  audioMessage.textContent = text;
  audioMessage.classList.toggle('is-error', isError);
}

function showPhoto(index) {
  if (!photoUrls.length) return;
  photoIndex = (index + photoUrls.length) % photoUrls.length;
  photoSlides.querySelectorAll('.photo-slide').forEach((image, imageIndex) => {
    image.classList.toggle('is-active', imageIndex === photoIndex);
  });
  photoCount.textContent = `${photoUrls.length} ${photoUrls.length === 1 ? 'FOTO' : 'FOTOS'} · ${photoObjectUrls.length ? `${photoObjectUrls.length} AÑADIDAS` : 'EN EL CARRUSEL'}`;
  photoPrev.disabled = photoUrls.length < 2;
  photoNext.disabled = photoUrls.length < 2;
  photoPrev.hidden = photoUrls.length < 2;
  photoNext.hidden = photoUrls.length < 2;
}

function startPhotoShow() {
  stopPhotoShow();
  if (audio.paused || photoUrls.length < 2) return;
  photoTimer = window.setInterval(() => showPhoto(photoIndex + 1), 6000);
}

function stopPhotoShow() {
  if (photoTimer !== null) window.clearInterval(photoTimer);
  photoTimer = null;
}

function renderPhotoSlides() {
  photoSlides.replaceChildren();
  photoUrls.forEach((url, index) => {
    const image = document.createElement('img');
    image.className = `photo-slide${index === 0 ? ' is-active' : ''}`;
    image.src = url;
    image.alt = `Foto personal ${index + 1}`;
    photoSlides.appendChild(image);
  });
  photoPlaceholder.hidden = photoUrls.length > 0;
  photoStage.classList.toggle('has-photos', photoUrls.length > 0);
  if (photoUrls.length) {
    showPhoto(0);
  } else {
    photoIndex = 0;
    photoPrev.disabled = true;
    photoNext.disabled = true;
    photoPrev.hidden = true;
    photoNext.hidden = true;
    photoCount.textContent = 'SOLO EN ESTE DISPOSITIVO';
  }
}

photoInput.addEventListener('change', () => {
  stopPhotoShow();
  const selectedFiles = Array.from(photoInput.files || []).filter((file) => file.type.startsWith('image/'));
  const addedUrls = selectedFiles.map((file) => URL.createObjectURL(file));
  if (!addedUrls.length) {
    if (photoInput.files?.length) showMessage('Elige archivos de imagen compatibles.', true);
    photoInput.value = '';
    return;
  }
  photoObjectUrls.push(...addedUrls);
  photoUrls = [...bundledPhotoUrls, ...photoObjectUrls];
  renderPhotoSlides();
  startPhotoShow();
  showMessage('Las fotos que añadas permanecen en este dispositivo.');
  photoInput.value = '';
});
photoPrev.addEventListener('click', () => showPhoto(photoIndex - 1));
photoNext.addEventListener('click', () => showPhoto(photoIndex + 1));

audio.addEventListener('loadedmetadata', () => {
  durationLabel.textContent = formatTime(audio.duration);
  seek.max = String(audio.duration || 0);
  playButton.disabled = false;
  seek.disabled = false;
  volume.disabled = false;
  updateSeekProgress();
  trackState.textContent = 'LISTA PARA REPRODUCIR';
  showMessage('La canción está lista. Pulsa reproducir para empezar.');
});
audio.addEventListener('timeupdate', () => {
  if (!isSeeking) {
    currentTimeLabel.textContent = formatTime(audio.currentTime);
    seek.value = String(audio.currentTime || 0);
    updateSeekProgress();
  }
  updateActiveLyric();
});
audio.addEventListener('play', () => setPlaying(true));
audio.addEventListener('pause', () => setPlaying(false));
audio.addEventListener('ended', () => setPlaying(false));
audio.addEventListener('error', () => showMessage('No se pudo cargar la canción adjunta.', true));

playButton.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      showMessage('Que disfrutes la canción.');
    } catch {
      showMessage('No se pudo iniciar el audio en este navegador.', true);
    }
  } else {
    audio.pause();
  }
});
seek.addEventListener('input', () => {
  isSeeking = true;
  currentTimeLabel.textContent = formatTime(Number(seek.value));
  updateSeekProgress();
});
seek.addEventListener('change', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Number(seek.value);
  isSeeking = false;
});
volume.addEventListener('input', () => { audio.volume = Number(volume.value); });
audio.volume = Number(volume.value);
document.querySelector('#back-button').addEventListener('click', () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
  isSeeking = false;
});
document.querySelector('#forward-button').addEventListener('click', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  isSeeking = false;
});
document.querySelector('#repeat-button').addEventListener('click', (event) => {
  audio.loop = !audio.loop;
  event.currentTarget.classList.toggle('is-on', audio.loop);
  event.currentTarget.setAttribute('aria-label', `Repetir ${audio.loop ? 'activado' : 'desactivado'}`);
  showMessage(audio.loop ? 'Repetición activada.' : 'Repetición desactivada.');
});
document.querySelector('#mute-button').addEventListener('click', (event) => {
  audio.muted = !audio.muted;
  event.currentTarget.classList.toggle('is-on', audio.muted);
  event.currentTarget.setAttribute('aria-label', audio.muted ? 'Activar sonido' : 'Silenciar');
});
window.addEventListener('beforeunload', () => {
  stopPhotoShow();
  photoObjectUrls.forEach((url) => URL.revokeObjectURL(url));
});
document.querySelector('#footer-year').textContent = String(new Date().getFullYear());
renderPhotoSlides();
loadLyrics();
