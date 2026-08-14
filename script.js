const ASSET = 'assets/';
const app = document.getElementById('app');

const config = {
  name: 'Soumita',
  message: `Thanks for being such an awesome and cool person. Stay blessed, explore all the mountains because I know you love mountains, live your life to the fullest, and keep smiling and shining every day.`,
  songTitle: 'I Wanna Be Yours',
  songArtist: 'Arctic Monkeys',
  songStart: 140
};

let history = [];
let current = 'wish';
let song = null;

function go(screen, save = true) {
  if (save && current !== screen) history.push(current);
  current = screen;
  render();
  if (screen === 'accept') setTimeout(() => startSong(), 250);
}

function back() { go(history.pop() || 'gifts', false); }

function btn(text, action, cls='') {
  return `<button class="btn ${cls}" onclick="${action}">${text}</button>`;
}

function startSong() {
  if (!song) song = document.getElementById('song');
  if (!song) return;
  if (song.currentTime < config.songStart) song.currentTime = config.songStart;
  song.play().catch(() => {});
  updatePlayer();
}

function toggleSong() {
  if (!song) song = document.getElementById('song');
  if (!song) return;
  if (song.paused) startSong(); else song.pause();
  updatePlayer();
}

function updatePlayer() {
  const play = document.getElementById('playIcon');
  if (play && song) play.textContent = song.paused ? '▶' : 'Ⅱ';
}

function render() {
  const screens = {
    wish: `
      <section class="screen wish-screen">
        <div class="background-shot" style="background-image:url('${ASSET}birthday-start.jpg')"></div>
        <div class="hotspot" aria-label="Blow the candles" onclick="go('blown')"></div>
        <button class="screen-btn" onclick="go('blown')">≈ &nbsp; BLOW THE CANDLES</button>
        <div class="candle-overlay" aria-hidden="true"><span class="flame">🔥</span></div>
      </section>`,

    blown: `
      <section class="screen wish-screen">
        <div class="background-shot" style="background-image:url('${ASSET}birthday-blown.jpg')"></div>
        <div class="hotspot" aria-label="Next" onclick="go('accept')"></div>
        <button class="screen-btn" onclick="go('accept')">≈ &nbsp; NEXT</button>
        <div class="smoke">〰</div>
      </section>`,

    accept: `
      <section class="screen accept-screen">
        <div class="mini-heading">A LITTLE SURPRISE FOR YOU, ${config.name.toUpperCase()} ❤️</div>
        <h1 class="script">Please accept the gift</h1>
        <img class="character" src="${ASSET}cute-yes.jpg" alt="Cute character holding a bouquet" />
        <div class="btn-row">
          ${btn('YES ❤️', "go('gifts')")}
          ${btn('NO 😭', "go('no')", 'secondary')}
        </div>
      </section>`,

    no: `
      <section class="screen accept-screen">
        <h1 class="script">Why did you click NO? 😭</h1>
        <img class="character crying" src="${ASSET}crying.jpg" alt="Crying cute character" />
        <p class="small-note">That was the wrong answer, Soumita 😭</p>
        ${btn('TRY AGAIN 💗', "go('accept')")}
      </section>`,

    gifts: `
      <section class="screen gifts-screen">
        <h1>Choose Your Gifts</h1>
        <p class="small-note">Three little surprises, just for you ❤️</p>
        <div class="gifts">
          <button class="gift-card" onclick="go('letter')"><img src="${ASSET}envelope.jpg" alt="Red envelope"/><span class="gift-label">A letter 💌</span></button>
          <button class="gift-card" onclick="go('flowers')"><img src="${ASSET}roses.jpg" alt="Red roses"/><span class="gift-label">Flowers 🌹</span></button>
          <button class="gift-card" onclick="go('final')"><img src="${ASSET}gift.jpg" alt="Red gift box"/><span class="gift-label">One more surprise 🎁</span></button>
        </div>
      </section>`,

    letter: `
      <section class="screen">
        ${btn('← Back', 'back()', 'secondary back')}
        <div class="letter">
          <div class="letter-heart">♥</div>
          <h2>Happy Birthday, ${config.name}!</h2>
          <p class="letter-message">${config.message}</p>
          <p class="signature">Keep smiling & shining ✨</p>
          <div class="heart">♡</div>
        </div>
      </section>`,

    flowers: `
      <section class="screen">
        ${btn('← Back', 'back()', 'secondary back')}
        <div class="flower-layout">
          <div class="flower-copy">
            <h2>flowers for<br>my sweetheart! ♡</h2>
            <span class="tag">my favorite person</span>
            <br><span class="tag">i'm your #1 fan</span>
            <div class="cute-face">🥰</div>
          </div>
          <img class="flower-img" src="${ASSET}roses.jpg" alt="A bouquet of red roses" />
        </div>
      </section>`,

    final: `
      <section class="screen final">
        ${btn('← Back', 'back()', 'secondary back')}
        <div class="final-grid">
          <div class="final-left">
            <div class="final-title">happy<br>birthday<br>${config.name} ♡</div>
            <div class="record-card">
              <div class="record"></div>
              <div class="record-copy">and suddenly all the love songs were about you</div>
            </div>
            <div class="audio-box">
              <div class="song-art">♪</div>
              <div class="song-copy"><strong>${config.songTitle}</strong><small>${config.songArtist}</small></div>
              <button class="play-btn" onclick="toggleSong()" aria-label="Play or pause"><span id="playIcon">▶</span></button>
            </div>
            <audio id="song" preload="metadata" src="${ASSET}i-wanna-be-yours.mp3" onplay="updatePlayer()" onpause="updatePlayer()"></audio>
            <p class="song-note">The song starts from 2:20, just like you asked 🎶</p>
          </div>
          <img class="love-card" src="${ASSET}love-card.png" alt="Handmade birthday card" />
        </div>
      </section>`
  };
  app.innerHTML = screens[current] || screens.wish;
  song = document.getElementById('song') || song;
}

render();
