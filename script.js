let timer;
let isRunning = false;
let elapsedMilliseconds = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');

function updateDisplay() {
  const minutes = Math.floor(elapsedMilliseconds / 60000);
  const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor((elapsedMilliseconds % 1000) / 10);

  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
  millisecondsDisplay.textContent = String(milliseconds).padStart(2, '0');
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  const startTime = Date.now() - elapsedMilliseconds;
  
  timer = setInterval(() => {
    elapsedMilliseconds = Date.now() - startTime;
    updateDisplay();
  }, 10);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  elapsedMilliseconds = 0;
  isRunning = false;
  updateDisplay();
  lapsContainer.innerHTML = '';
}

function recordLap() {
  if (!isRunning) return;
  const lapItem = document.createElement('li');
  lapItem.textContent = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
  lapsContainer.appendChild(lapItem);
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
