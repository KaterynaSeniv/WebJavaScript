const mode = document.getElementById("mode");
const difficulty = document.getElementById("difficulty");
const colorPicker = document.getElementById("colorPicker");
const startBtn = document.getElementById("startBtn");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const end = document.getElementById("end");

const square = document.getElementById("square");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const final = document.getElementById("final");

const again = document.getElementById("again");
const back = document.getElementById("back");

let score = 0;
let timer;
let timeLeft;
let moveInterval;

const settings = {
    easy: 2,
    medium: 1.5,
    hard: 1
};

function check() {
    startBtn.disabled = !(mode.value && difficulty.value && colorPicker.value);
}

mode.onchange = check;
difficulty.onchange = check;
colorPicker.oninput = check;

startBtn.onclick = () => {
    menu.classList.add("hidden");
    end.classList.add("hidden");
    game.classList.remove("hidden");

    score = 0;
    scoreEl.textContent = score;

    square.style.background = colorPicker.value;

    startRound();
};

function startRound() {
    clearInterval(timer);

    timeLeft = settings[difficulty.value];
    timeEl.textContent = timeLeft.toFixed(1);

    moveSquare();

    timer = setInterval(() => {
        timeLeft -= 0.1;
        timeEl.textContent = timeLeft.toFixed(1);

        if (timeLeft <= 0) endGame();
    }, 100);
}

function moveSquare() {
    const field = document.getElementById("field");

    let maxX = field.clientWidth - 40;
    let maxY = field.clientHeight - 40;

    if (mode.value === "challenge") {
        field.style.width = (400 + score * 10) + "px";
        field.style.height = (300 + score * 5) + "px";
    }

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    square.style.left = x + "px";
    square.style.top = y + "px";

    if (mode.value === "challenge") {
        square.style.transition = "0.3s linear";
    } else {
        square.style.transition = "none";
    }
}

square.onclick = () => {
    score++;
    scoreEl.textContent = score;

    startRound(); 
};

function endGame() {
    clearInterval(timer);

    game.classList.add("hidden");
    end.classList.remove("hidden");

    final.textContent = score;
}

again.onclick = () => {
    game.classList.remove("hidden");
    end.classList.add("hidden");
    startRound();
};

back.onclick = () => {
    end.classList.add("hidden");
    menu.classList.remove("hidden");
};
