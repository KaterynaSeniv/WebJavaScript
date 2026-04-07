let levels = [];
let currentLevelIndex = -1;

let grid = [];
let initialGrid = [];

let moves = 0;
let time = 0;
let timerInterval;

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

  moves = 0;
  time = 0;

  document.getElementById("moves").textContent = moves;
  document.getElementById("time").textContent = time;
  document.getElementById("minSteps").textContent = level.minSteps;

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
  const before = JSON.stringify(grid);

  toggle(r, c);
  toggle(r - 1, c);
  toggle(r + 1, c);
  toggle(r, c - 1);
  toggle(r, c + 1);

  const after = JSON.stringify(grid);

  if (before !== after) {
    moves++;
    document.getElementById("moves").textContent = moves;
  }

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
    showWin();
  }
}

function showWin() {
  document.getElementById("finalTime").textContent = time;
  document.getElementById("finalMoves").textContent = moves;
  document.getElementById("winModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("winModal").classList.add("hidden");
}

function newGame() {
  startGame();
}

function restartGame() {
  grid = JSON.parse(JSON.stringify(initialGrid));

  moves = 0;
  time = 0;

  document.getElementById("moves").textContent = moves;
  document.getElementById("time").textContent = time;

  render();
  startTimer();
}

function copyGrid(g) {
  return g.map(row => [...row]);
}

function toggleSolver(g, r, c) {
  if (r < 0 || c < 0 || r >= 5 || c >= 5) return;
  g[r][c] = g[r][c] === 1 ? 0 : 1;
}

function clickSolver(g, r, c) {
  toggleSolver(g, r, c);
  toggleSolver(g, r-1, c);
  toggleSolver(g, r+1, c);
  toggleSolver(g, r, c-1);
  toggleSolver(g, r, c+1);
}

function solveLightsOut(startGrid) {
  let bestSolution = null;

  for (let mask = 0; mask < (1 << 5); mask++) {
    let g = copyGrid(startGrid);
    let moves = [];

    for (let c = 0; c < 5; c++) {
      if (mask & (1 << c)) {
        clickSolver(g, 0, c);
        moves.push([0, c]);
      }
    }

    for (let r = 1; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (g[r-1][c] === 1) {
          clickSolver(g, r, c);
          moves.push([r, c]);
        }
      }
    }

    if (g[4].every(cell => cell === 0)) {
      if (!bestSolution || moves.length < bestSolution.length) {
        bestSolution = moves;
      }
    }
  }

  return bestSolution;
}

function autoSolve() {
  const solution = solveLightsOut(grid);

  if (!solution) {
    alert("Немає рішення");
    return;
  }

  animateSolution(solution);
}

function animateSolution(solution) {
  let i = 0;

  const interval = setInterval(() => {
    if (i >= solution.length) {
      clearInterval(interval);
      return;
    }

    const [r, c] = solution[i];
    handleClick(r, c);

    i++;
  }, 400);
}

loadLevels();
