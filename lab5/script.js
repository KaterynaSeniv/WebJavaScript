const difficulty = document.getElementById("difficulty");
const colorPicker = document.getElementById("colorPicker");
const startBtn = document.getElementById("startBtn");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const endScreen = document.getElementById("endScreen");

const square = document.getElementById("square");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const finalScore = document.getElementById("finalScore");

const restartBtn = document.getElementById("restartBtn");
const menuBtn = document.getElementById("menuBtn");

let score, time, timer, moveInterval;

const settings = {
    easy: { time: 12, speed: 900 },
    medium: { time: 8, speed: 600 },
    hard: { time: 5, speed: 350 }
};

function checkStart() {
    startBtn.disabled = !(difficulty.value && colorPicker.value);
}

difficulty.addEventListener("change", checkStart);
colorPicker.addEventListener("input", checkStart);

startBtn.addEventListener("click", startGame);

function startGame() {
    menu.classList.add("hidden");
    endScreen.classList.add("hidden");
    game.classList.remove("hidden");

    score = 0;
    scoreEl.textContent = score;

    const level = settings[difficulty.value];
    time = level.time;
    timeEl.textContent = time;

    square.style.backgroundColor = colorPicker.value;

    moveSquare(level.speed);
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        timeEl.textContent = time;

        if (time <= 0) endGame();
    }, 1000);
}

function moveSquare(speed) {
    moveInterval = setInterval(() => {
        const field = document.getElementById("field");

        const maxX = field.clientWidth - 50;
        const maxY = field.clientHeight - 50;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        square.style.left = x + "px";
        square.style.top = y + "px";
    }, speed);
}

square.addEventListener("click", () => {
    score++;
    scoreEl.textContent = score;

    square.style.transform = "scale(1.2)";
    setTimeout(() => square.style.transform = "scale(1)", 100);
});

function endGame() {
    clearInterval(timer);
    clearInterval(moveInterval);

    game.classList.add("hidden");
    endScreen.classList.remove("hidden");

    finalScore.textContent = score;
}

restartBtn.addEventListener("click", startGame);

menuBtn.addEventListener("click", () => {
    endScreen.classList.add("hidden");
    menu.classList.remove("hidden");
});
