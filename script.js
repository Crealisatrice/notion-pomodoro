let durations = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
  };
  
  let currentMode = 'focus';
  let timeLeft = durations[currentMode];
  let timerInterval = null;
  let running = false;
  
  const timerDisplay = document.getElementById('timer');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const modeButtons = document.querySelectorAll('nav button');
  
  function updateDisplay() {
    const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const sec = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${min}:${sec}`;
  }
  
  function startTimer() {
    if (running) return;
    running = true;
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        running = false;
        alert("Temps écoulé !");
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    timeLeft = durations[currentMode];
    updateDisplay();
  }
  
  function switchMode(mode) {
    currentMode = mode;
    modeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    resetTimer();
  }
  
  startBtn.addEventListener('click', startTimer);
  resetBtn.addEventListener('click', resetTimer);
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
  });
  
  updateDisplay();
  
  // === GESTION DU FOND ===
const bgSelect = document.getElementById('bg-select');
const savedBg = localStorage.getItem('bg');

function applyBackground(bg) {
  document.body.className = ''; // reset classes
  document.body.classList.add('bg-' + bg);
}

if (savedBg) {
  bgSelect.value = savedBg;
  applyBackground(savedBg);
} else {
  applyBackground('default');
}

bgSelect.addEventListener('change', () => {
  const selected = bgSelect.value;
  localStorage.setItem('bg', selected);
  applyBackground(selected);
});
