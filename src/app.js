const audio = document.querySelector('#audio');
const playButton = document.querySelector('#play-button');
const seek = document.querySelector('#seek');
const volume = document.querySelector('#volume');
const currentTimeLabel = document.querySelector('#current-time');
const durationLabel = document.querySelector('#duration');
const trackState = document.querySelector('#track-state');
const audioMessage = document.querySelector('#audio-message');
const lyricsContent = document.querySelector('#lyrics-content');
const emptyLyrics = document.querySelector('#empty-lyrics');
const vinyl = document.querySelector('#vinyl');
let lyricLines = [];
let activeLine = -1;

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
  vinyl.classList.toggle('is-spinning', isPlaying);
  trackState.textContent = isPlaying ? 'REPRODUCIENDO AHORA' : 'LISTA PARA REPRODUCIR';
}

function parseLrc(text) {
  return text.split(/\r?\n/).flatMap((line, index) => {
    const match = line.trim().match(/^\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]\s*(.+)$/);
    if (!match) return [];
    const fraction = match[3] ? Number(`0.${match[3]}`) : 0;
    return [{ id: index, time: Number(match[1]) * 60 + Number(match[2]) + fraction, text: match[4].trim() }];
  }).filter((line) => line.text.length > 0);
}

function renderLyrics() {
  lyricsContent.querySelectorAll('.lyric-line').forEach((node) => node.remove());
  emptyLyrics.hidden = lyricLines.length > 0;
  if (!lyricLines.length) return;
  const fragment = document.createDocumentFragment();
  lyricLines.forEach((line, index) => {
    const paragraph = document.createElement('p');
    paragraph.className = 'lyric-line';
    paragraph.dataset.index = String(index);
    paragraph.textContent = line.text;
    fragment.appendChild(paragraph);
  });
  lyricsContent.appendChild(fragment);
}

function updateActiveLyric() {
  let nextActive = -1;
  lyricLines.forEach((line, index) => {
    if (line.time <= audio.currentTime) nextActive = index;
  });
  if (nextActive === activeLine) return;
  activeLine = nextActive;
  lyricsContent.querySelectorAll('.lyric-line').forEach((node) => {
    const isActive = Number(node.dataset.index) === activeLine;
    node.classList.toggle('is-active', isActive);
    if (isActive) node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

async function loadLyrics() {
  try {
    const response = await fetch('/public/lyrics/sera-porque-te-amo.lrc');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    lyricLines = parseLrc(await response.text());
    renderLyrics();
    document.querySelector('#lyrics-footnote').textContent = 'LETRA SINCRONIZADA CON EL AUDIO';
  } catch {
    emptyLyrics.querySelector('p').textContent = 'No se pudo cargar la letra sincronizada.';
  }
}

function showMessage(text, isError = false) {
  audioMessage.textContent = text;
  audioMessage.classList.toggle('is-error', isError);
}

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
  currentTimeLabel.textContent = formatTime(audio.currentTime);
  seek.value = String(audio.currentTime || 0);
  updateSeekProgress();
  updateActiveLyric();
});
audio.addEventListener('play', () => setPlaying(true));
audio.addEventListener('pause', () => setPlaying(false));
audio.addEventListener('ended', () => setPlaying(false));
audio.addEventListener('error', () => showMessage('No se pudo cargar la canción adjunta.', true));

document.querySelector('#play-button').addEventListener('click', async () => {
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
  if (Number.isFinite(audio.duration)) audio.currentTime = Number(seek.value);
  updateSeekProgress();
});
volume.addEventListener('input', () => { audio.volume = Number(volume.value); });
audio.volume = Number(volume.value);
document.querySelector('#back-button').addEventListener('click', () => { audio.currentTime = Math.max(0, audio.currentTime - 10); });
document.querySelector('#forward-button').addEventListener('click', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
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
document.querySelector('#footer-year').textContent = String(new Date().getFullYear());
loadLyrics();
