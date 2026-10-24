const audio = document.querySelector('#audio');
const audioInput = document.querySelector('#audio-file');
const lyricsFile = document.querySelector('#lyrics-file');
const playButton = document.querySelector('#play-button');
const seek = document.querySelector('#seek');
const volume = document.querySelector('#volume');
const currentTimeLabel = document.querySelector('#current-time');
const durationLabel = document.querySelector('#duration');
const trackState = document.querySelector('#track-state');
const audioMessage = document.querySelector('#audio-message');
const lyricsEditor = document.querySelector('#lyrics-editor');
const lyricsInput = document.querySelector('#lyrics-input');
const lyricsContent = document.querySelector('#lyrics-content');
const emptyLyrics = document.querySelector('#empty-lyrics');
const vinyl = document.querySelector('#vinyl');
const objectUrls = new Set();
let lyricLines = [];
let activeLine = -1;
let lyricsText = '';

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
  const total = Math.floor(seconds);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function updateSeekProgress() {
  const percent = Number(seek.max) > 0 ? (Number(seek.value) / Number(seek.max)) * 100 : 0;
  seek.style.setProperty('--progress', `${percent}%`);
}

function showMessage(text, isError = false) {
  audioMessage.textContent = text;
  audioMessage.classList.toggle('is-error', isError);
}

function setPlaying(isPlaying) {
  playButton.classList.toggle('is-playing', isPlaying);
  playButton.setAttribute('aria-label', isPlaying ? 'Pausar' : 'Reproducir');
  vinyl.classList.toggle('is-spinning', isPlaying);
  if (audio.src) trackState.textContent = isPlaying ? 'REPRODUCIENDO AHORA' : 'EN PAUSA';
}

function parseLyrics(text) {
  return text.split(/\r?\n/).map((raw, index) => {
    const trimmed = raw.trim();
    const match = trimmed.match(/^\[(\d{1,2}):(\d{2})(?:\.(\d{1,2}))?\]\s*(.*)$/);
    if (match) {
      return {
        id: index,
        time: Number(match[1]) * 60 + Number(match[2]) + Number(`0.${match[3] || '0'}`),
        text: match[4].trim(),
      };
    }
    return { id: index, time: null, text: trimmed };
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
  activeLine = -1;
  updateActiveLyric();
}

function updateActiveLyric() {
  const hasTimedLines = lyricLines.some((line) => line.time !== null);
  if (!hasTimedLines || !Number.isFinite(audio.currentTime)) return;
  let nextActive = -1;
  lyricLines.forEach((line, index) => {
    if (line.time !== null && line.time <= audio.currentTime) nextActive = index;
  });
  if (nextActive === activeLine) return;
  activeLine = nextActive;
  lyricsContent.querySelectorAll('.lyric-line').forEach((node) => {
    const isActive = Number(node.dataset.index) === activeLine;
    node.classList.toggle('is-active', isActive);
    if (isActive) node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function openLyricsEditor(text = lyricsText) {
  lyricsInput.value = text;
  lyricsEditor.hidden = false;
  lyricsContent.hidden = true;
  lyricsInput.focus();
}

function closeLyricsEditor() {
  lyricsEditor.hidden = true;
  lyricsContent.hidden = false;
}

function loadTextFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => openLyricsEditor(String(reader.result ?? ''));
  reader.onerror = () => showMessage('No se pudo leer ese archivo de texto.', true);
  reader.readAsText(file);
}

audioInput.addEventListener('change', () => {
  const file = audioInput.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  objectUrls.add(url);
  audio.pause();
  audio.src = url;
  audio.load();
  document.querySelector('#track-name').textContent = file.name.replace(/\.[^.]+$/, '') || 'Tu canción';
  trackState.textContent = 'PREPARANDO TU CANCIÓN';
  document.querySelector('#audio-action-label').textContent = 'Cambiar archivo de audio';
  playButton.disabled = false;
  seek.disabled = false;
  volume.disabled = false;
  showMessage('Audio listo. Pulsa reproducir cuando quieras.');
  setPlaying(false);
});

audio.addEventListener('loadedmetadata', () => {
  durationLabel.textContent = formatTime(audio.duration);
  seek.max = String(audio.duration || 0);
  updateSeekProgress();
});
audio.addEventListener('timeupdate', () => {
  currentTimeLabel.textContent = formatTime(audio.currentTime);
  seek.value = String(audio.currentTime || 0);
  updateSeekProgress();
  updateActiveLyric();
});
audio.addEventListener('play', () => setPlaying(true));
audio.addEventListener('pause', () => setPlaying(false));
audio.addEventListener('ended', () => {
  setPlaying(false);
  if (audio.loop) audio.currentTime = 0;
});
audio.addEventListener('error', () => {
  if (audio.src) showMessage('Este formato no se pudo reproducir en tu navegador. Prueba con otro archivo de audio.', true);
});

playButton.addEventListener('click', async () => {
  if (!audio.src) return;
  if (audio.paused) {
    try {
      await audio.play();
      showMessage('Que disfrutes la canción.');
    } catch {
      showMessage('No se pudo iniciar el audio. Prueba seleccionando otro archivo.', true);
    }
  } else {
    audio.pause();
  }
});

seek.addEventListener('input', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Number(seek.value);
  updateSeekProgress();
});
audio.volume = Number(volume.value);
volume.addEventListener('input', () => { audio.volume = Number(volume.value); });
document.querySelector('#back-button').addEventListener('click', () => { if (audio.src) audio.currentTime = Math.max(0, audio.currentTime - 10); });
document.querySelector('#forward-button').addEventListener('click', () => { if (audio.src && Number.isFinite(audio.duration)) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); });

document.querySelector('#repeat-button').addEventListener('click', (event) => {
  audio.loop = !audio.loop;
  const button = event.currentTarget;
  button.classList.toggle('is-on', audio.loop);
  button.setAttribute('aria-label', `Repetir ${audio.loop ? 'activado' : 'desactivado'}`);
  showMessage(audio.loop ? 'Repetición activada.' : 'Repetición desactivada.');
});

document.querySelector('#mute-button').addEventListener('click', (event) => {
  audio.muted = !audio.muted;
  event.currentTarget.classList.toggle('is-on', audio.muted);
  event.currentTarget.setAttribute('aria-label', audio.muted ? 'Activar sonido' : 'Silenciar');
});

document.querySelector('#edit-lyrics').addEventListener('click', () => openLyricsEditor());
document.querySelector('#empty-cta').addEventListener('click', () => openLyricsEditor());
document.querySelector('#cancel-edit').addEventListener('click', closeLyricsEditor);
document.querySelector('#save-lyrics').addEventListener('click', () => {
  lyricsText = lyricsInput.value;
  lyricLines = parseLyrics(lyricsText);
  renderLyrics();
  closeLyricsEditor();
  document.querySelector('#edit-lyrics span').textContent = 'Editar letra';
  document.querySelector('#lyrics-footnote').textContent = lyricLines.some((line) => line.time !== null)
    ? 'LETRA SINCRONIZADA EN ESTE DISPOSITIVO'
    : 'TU LETRA NO SE SUBE A NINGÚN SERVIDOR';
});
lyricsFile.addEventListener('change', () => {
  loadTextFile(lyricsFile.files?.[0]);
  lyricsFile.value = '';
});
window.addEventListener('beforeunload', () => objectUrls.forEach((url) => URL.revokeObjectURL(url)));
document.querySelector('#footer-year').textContent = String(new Date().getFullYear());
