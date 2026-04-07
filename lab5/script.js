const mode = document.getElementById("mode");
const difficulty = document.getElementById("difficulty");
const colorPicker = document.getElementById("colorPicker");
const startBtn = document.getElementById("startBtn");

const warning = document.getElementById("warning");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const end = document.getElementById("end");

const square = document.getElementById("square");
const field = document.getElementById("field");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const final = document.getElementById("final");

const again = document.getElementById("again");
const back = document.getElementById("back");

let score = 0;
let timer = null;
let timeLeft = 0;

const settings = {
    easy: 2,
    medium: 1.5,
    hard: 1
};

const maxField = {
    width: 700,
    height: 500
};

function check() {
    startBtn.disabled = !(mode.value && difficulty.value && colorPicker.value);

    if (mode.value === "challenge") {
        warning.classList.remove("hidden");
    } else {
        warning.classList.add("hidden");
    }
}

mode.addEventListener("change", check);
difficulty.addEventListener("change", check);
colorPicker.addEventListener("input", check);

startBtn.addEventListener("click", startNewGame);

function startNewGame() {
    clearInterval(timer);
    removeFakes();

    score = 0;
    scoreEl.textContent = score;

    menu.classList.add("hidden");
    end.classList.add("hidden");
    game.classList.remove("hidden");

    square.style.background = colorPicker.value;

    setupField();
    startRound();
}

function setupField() {
    if (mode.value === "normal") {
        if (difficulty.value === "easy") {
            field.style.width = "300px";
            field.style.height = "200px";
        } else if (difficulty.value === "medium") {
            field.style.width = "500px";
            field.style.height = "300px";
        } else {
            field.style.width = "90vw";
            field.style.height = "70vh";
        }
    } else {
        field.style.width = "400px";
        field.style.height = "300px";
    }
}

function startRound() {
    clearInterval(timer);
    removeFakes();

    timeLeft = settings[difficulty.value];
    timeEl.textContent = timeLeft.toFixed(1);

    moveSquare();
    spawnFakes();

    timer = setInterval(() => {
        timeLeft -= 0.1;
        timeEl.textContent = timeLeft.toFixed(1);

        if (timeLeft <= 0) {
            endGame();
        }
    }, 100);
}

function moveSquare() {
    let maxX = field.clientWidth - 40;
    let maxY = field.clientHeight - 40;

    if (mode.value === "challenge") {
        let newW = Math.min(400 + score * 15, maxField.width);
        let newH = Math.min(300 + score * 10, maxField.height);

        field.style.width = newW + "px";
        field.style.height = newH + "px";
    }

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    square.style.left = x + "px";
    square.style.top = y + "px";
}

function spawnFakes() {
    if (mode.value === "challenge" && field.clientWidth >= maxField.width) {
        let count = Math.min(2 + Math.floor(score / 3), 5);

        for (let i = 0; i < count; i++) {
            const fake = document.createElement("div");
            fake.className = "fake";

            fake.style.left = Math.random() * (field.clientWidth - 40) + "px";
            fake.style.top = Math.random() * (field.clientHeight - 40) + "px";

            fake.onclick = endGame;

            field.appendChild(fake);
        }
    }
}

function removeFakes() {
    document.querySelectorAll(".fake").forEach(el => el.remove());
}

square.addEventListener("click", () => {
    score++;
    scoreEl.textContent = score;
    startRound();
});

function endGame() {
    clearInterval(timer);

    game.classList.add("hidden");
    end.classList.remove("hidden");

    final.textContent = score;
}

again.addEventListener("click", startNewGame);

back.addEventListener("click", () => {
    clearInterval(timer);
    removeFakes();

    end.classList.add("hidden");
    game.classList.add("hidden");
    menu.classList.remove("hidden");
});
