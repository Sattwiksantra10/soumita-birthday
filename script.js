const A = 'assets/';
const app = document.getElementById('app');
const song = document.getElementById('song');
// Final-page soundtrack: Belong Together by Mark Ambor.
const SONG_START = 113; // 1:53

const birthday = {
  name: 'Soumita',
  message: 'Thanks to this awesome and cool person. Stay blessed, explore all the mountains because I know you love mountains, live your life to the fullest and keep smiling and shining everyday.',
  songStart: SONG_START
};

let current = 'wish';
let previous = [];
let finalOpened = false;

function go(next) {
  if (next !== current) previous.push(current);
  if (next !== 'final' && song && !song.paused) song.pause();
  current = next;
  render();

  if (next === 'final') {
    finalOpened = true;
    playFromSongStart();
  }
}

function back() {
  current = previous.pop() || 'gifts';
  render();
}

function playFromSongStart() {
  if (!song) return;

  const play = () => {
    // Always jump to the requested 1:53 position when entering the final screen.
    try { song.currentTime = birthday.songStart; } catch (_) {}
    const p = song.play();
    if (p && p.catch) p.catch(() => setPlayerState(false));
    setPlayerState(true);
  };

  if (song.readyState >= 1) {
    play();
  } else {
    song.addEventListener('loadedmetadata', play, { once: true });
    song.load();
  }
}

function toggleSong() {
  if (!song) return;
  if (song.paused) {
    if (song.currentTime < birthday.songStart - 0.5) song.currentTime = birthday.songStart;
    const p = song.play();
    if (p && p.catch) p.catch(() => {});
  } else {
    song.pause();
  }
  setPlayerState(!song.paused);
}

function setPlayerState(playing) {
  const control = document.getElementById('playerControl');
  if (control) control.textContent = playing ? '❚❚' : '▶';
}

song.addEventListener('play', () => setPlayerState(true));
song.addEventListener('pause', () => setPlayerState(false));
song.addEventListener('ended', () => setPlayerState(false));

function render() {
  const screens = {
    wish: `
      <section class="screen wish-screen">
        <img class="wish-bg" src="${A}birthday-cake-clean.jpg" alt="Birthday cake">
        <button class="screen-btn" onclick="go('blown')">≈ &nbsp; BLOW THE CANDLES</button>
        <div class="cake-candle" aria-hidden="true"><span class="wick"></span><span class="flame">🔥</span></div>
      </section>`,

    blown: `
      <section class="screen wish-screen">
        <img class="wish-bg" src="${A}birthday-blown.jpg" alt="Birthday cake after the candle is blown out">
        <button class="screen-btn" onclick="go('accept')">≈ &nbsp; NEXT</button>
        <div class="smoke">〰</div>
      </section>`,

    accept: `
      <section class="screen accept-screen">
        <h1 class="accept-title">PLEASE ACCEPT THE GIFT</h1>
        <img class="accept-character" src="${A}cute-yes.jpg" alt="Cute character">
        <div class="yes-no">
          <button onclick="go('gifts')">YES</button>
          <button onclick="go('no')">NO</button>
        </div>
      </section>`,

    no: `
      <section class="screen accept-screen">
        <h1 class="accept-title">WHY DID YOU CLICK NO 😭</h1>
        <img class="accept-character crying" src="${A}crying.jpg" alt="Crying character">
        <button class="retry" onclick="go('accept')">TRY AGAIN</button>
      </section>`,

    gifts: `
      <section class="screen gifts-screen">
        <h1>Choose Your Gifts</h1>
        <div class="gifts-row">
          <button class="gift-card envelope-card" onclick="go('letter')"><img src="${A}gift-envelope.png" alt="Envelope"></button>
          <button class="gift-card flowers-card" onclick="go('flowers')"><img src="${A}gift-flowers.png" alt="Flowers"></button>
          <button class="gift-card box-card" onclick="go('final')"><img src="${A}gift-box.png" alt="Gift box"></button>
        </div>
      </section>`,

    letter: `
      <section class="screen content-screen">
        <button class="back" onclick="back()">← Back</button>
        <div class="letter-wrap">
          <img class="envelope-large" src="${A}envelope-open.jpg" alt="Open envelope">
          <div class="letter-text">
            <h2>Happy Birthday</h2>
            <p>My Dear Soumita,</p>
            <p>${birthday.message}</p>
            <p>Thank you for being you. ❤️</p>
          </div>
        </div>
      </section>`,

    flowers: `
      <section class="screen content-screen">
        <button class="back" onclick="back()">← Back</button>
        <div class="flower-page">
          <div class="flower-copy">
            <div class="flower-title">flowers for<br>my sweetheart! ♡</div>
            <span>my favorite person</span>
            <span>i'm your #1 fan</span>
            <div class="cute-face">♡</div>
          </div>
          <img src="${A}roses.jpg" class="flower-large" alt="Red roses">
        </div>
      </section>`,

    card: `
      <section class="screen card-screen">
        <button class="back" onclick="back()">← Back</button>
        <div class="card-view"><img class="hug-card-large" src="${A}hugging-stickman-card.png" alt="Birthday card"></div>
      </section>`,

    final: `
      <section class="screen final-screen">
        <button class="back" onclick="back()">← Back</button>
        <div class="final-board">
          <div class="record-card">
            <div class="record-disc"><span>♥</span></div>
            <div class="record-copy">AND<br>SUDDENLY<br>ALL THE LOVE<br>SONGS WERE ABOUT<br><b>YOU</b></div>
          </div>
          <button class="open-card" onclick="go('card')" aria-label="Open Soumita's birthday card"><img src="${A}hugging-stickman-card.png" alt="Birthday card saying Keep Shining and Smile Every Day"></button>
          <button class="music-player" onclick="toggleSong()" aria-label="Play Belong Together by Mark Ambor from 1 minute 53 seconds">
            <img class="player-thumb" src="${A}belong-together-player.jpg" alt="Belong Together artwork">
            <span class="player-meta"><strong>Belong Together</strong><small>Mark Ambor · starts at 1:53</small></span>
            <span class="player-control" id="playerControl">▶</span>
          </button>
        </div>
      </section>`
  };

  app.innerHTML = screens[current] || screens.wish;
  if (current === 'final') setPlayerState(song && !song.paused);
}

render();
