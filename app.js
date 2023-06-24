const screen = document.querySelectorAll(".screen");
const startButton = document.querySelector(".start");
const timeList = document.querySelector(".time-list");
const timer = document.querySelector("#time");
const board = document.querySelector("#board");

let time = 0;
let score = 0;

startButton.addEventListener("click", (e) => {
  e.preventDefault();
  screen[0].classList.add("up");
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score += 1;
    e.target.remove();
    createCircle();
  }
});

timeList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("time-btn")) {
    return;
  }
  time = parseInt(e.target.getAttribute("data-time"));
  screen[1].classList.add("up");

  startGame();
});

// startGame();
function startGame() {
  setInterval(decreaseTime, 1000);
  setTime(time);
  createCircle();
}

function decreaseTime() {
  if (time === 0) {
    // console.log("finish");
    finishGame();
  } else {
    let currentTime = --time;

    // time -= 1;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }

    setTime(currentTime);
  }
}

function setTime(time) {
  timer.innerHTML = `00:${time}`;
}

function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const size = getRandomNumber(10, 50);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = getRandomHexColor();

  board.append(circle);
}
// startGame();

function finishGame() {
  timer.parentNode.classList.add("hide");
  board.innerHTML = `<h2>Score: <span class='primary'>${score}</span></h2>`;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
