const bells = new Audio("./sounds/bell.wav"); // original bell
const startBtn = document.querySelector(".btn-start");
const session = document.querySelector(".minutes");
const inputMinutes = document.getElementById("custom-minutes"); // optional input
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");

let myInterval;
let totalSeconds = 0;
let state = true; // true = not running, false = running
let paused = false;

// Start / Timer function
const appTimer = () => {
  const sessionAmount = inputMinutes && inputMinutes.value 
    ? Math.max(1, parseInt(inputMinutes.value))
    : Number.parseInt(session.textContent);

  totalSeconds = sessionAmount * 60;

  if (state) {
    state = false;
    paused = false;
    pauseBtn.textContent = "pause";

    const updateSeconds = () => {
      if (!paused) {
        const minuteDiv = document.querySelector(".minutes");
        const secondDiv = document.querySelector(".seconds");

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        secondDiv.textContent = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
        minuteDiv.textContent = `${minutesLeft}`;

        if (totalSeconds <= 0) {
          bells.play();
          clearInterval(myInterval);
          state = true;
        }
      }
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert("Session has already started.");
  }
};

// Pause/Resume button
pauseBtn.addEventListener("click", () => {
  paused = !paused;
  pauseBtn.textContent = paused ? "resume" : "pause";
});

// Reset button
resetBtn.addEventListener("click", () => {
  clearInterval(myInterval);
  state = true;
  paused = false;
  pauseBtn.textContent = "pause";

  const sessionAmount = inputMinutes && inputMinutes.value 
    ? Math.max(1, parseInt(inputMinutes.value))
    : 25;

  totalSeconds = sessionAmount * 60;
  session.textContent = sessionAmount;
  document.querySelector(".seconds").textContent = "00";
});

// Start button
startBtn.addEventListener("click", appTimer);
