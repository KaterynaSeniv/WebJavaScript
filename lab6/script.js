let levels = [];
let currentLevelIndex = -1;

let grid = [];
let initialGrid = [];

let moves = 0;
let time = 0;
let timerInterval;

let currentSolution = [];
let hintIndex = 0;

async function loadLevels() {
  const res = await fetch("data.json");
  const data = await res.json();
  levels = data.levels;

  startGame();
}

function getNextLevel() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * levels.length);
  } while (newIndex === currentLevelIndex);

  currentLevelIndex = newIndex;
  return levels[newIndex];
}

function startGame() {
  const level = getNextLevel();

  grid = JSON.parse(JSON.stringify(level.grid));
  initialGrid = JSON.parse(JSON.stringify(level.grid));

  currentSolution = level.solution || [];
  hintIndex = 0;

  moves = 0;
  time = 0;

  document.getElementById("moves").textContent = moves;
  document.getElementById("time").textContent = time;
  document.getElementById("minSteps").textContent = level.minSteps;

  document.getElementById("winMessage").classList.add("hidden");

  render();
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    time++;
    document.getElementById("time").textContent = time;
  }, 1000);
}

function toggle(r, c) {
  if (r < 0 || c < 0 || r >= 5 || c >= 5) return;
  grid[r][c] = grid[r][c] === 1 ? 0 : 1;
}

function handleClick(r, c) {
  toggle(r, c);
  toggle(r - 1, c);
  toggle(r + 1, c);
  toggle(r, c - 1);
  toggle(r, c + 1);

  moves++;
  document.getElementById("moves").textContent = moves;

  render();
  checkWin();
}

function render() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const div = document.createElement("div");
      div.className = "cell " + (cell ? "on" : "off");

      div.addEventListener("click", () => handleClick(r, c));

      board.appendChild(div);
    });
  });
}

function checkWin() {
  const isWin = grid.flat().every(cell => cell === 0);

  if (isWin) {
    clearInterval(timerInterval);

    document.getElementById("finalTime").textContent = time;
    document.getElementById("finalMoves").textContent = moves;

    document.getElementById("winMessage").classList.remove("hidden");
  }
}

function newGame() {
  startGame();
}

function restartGame() {
  grid = JSON.parse(JSON.stringify(initialGrid));

  moves = 0;
  time = 0;

  hintIndex = 0;

  document.getElementById("moves").textContent = moves;
  document.getElementById("time").textContent = time;

  document.getElementById("winMessage").classList.add("hidden");

  render();
  startTimer();
}

function showHint() {
  if (hintIndex >= currentSolution.length) {
    alert("Більше підказок немає");
    return;
  }

  const [r, c] = currentSolution[hintIndex];
  highlightCell(r, c);

  hintIndex++;
}

function highlightCell(r, c) {
  const index = r * 5 + c;
  const board = document.getElementById("board");
  const cell = board.children[index];

  cell.style.outline = "3px solid red";

  setTimeout(() => {
    cell.style.outline = "";
  }, 800);
}

loadLevels();
