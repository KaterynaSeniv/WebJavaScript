const mode = document.getElementById("mode");
const difficulty = document.getElementById("difficulty");
const colorPicker = document.getElementById("colorPicker");
const startBtn = document.getElementById("startBtn");

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
let timer;
let timeLeft;

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

    setupField();
    startRound();
};

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

    timeLeft = settings[difficulty.value];
    timeEl.textContent = timeLeft.toFixed(1);

    moveSquare();
    spawnFakeSquares();

    timer = setInterval(() => {
        timeLeft -= 0.1;
        timeEl.textContent = timeLeft.toFixed(1);

        if (timeLeft <= 0) endGame();
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

        square.style.transition = "0.3s linear";
    } else {
        square.style.transition = "none";
    }

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    square.style.left = x + "px";
    square.style.top = y + "px";
}

function spawnFakeSquares() {
    document.querySelectorAll(".fake").forEach(el => el.remove());

    if (mode.value === "challenge" &&
        field.clientWidth >= maxField.width) {

        let count = Math.min(2 + Math.floor(score / 3), 6);

        for (let i = 0; i < count; i++) {
            const fake = document.createElement("div");
            fake.classList.add("fake");

            fake.style.width = "40px";
            fake.style.height = "40px";
            fake.style.position = "absolute";
            fake.style.background = "red";
            fake.style.borderRadius = "6px";

            let x = Math.random() * (field.clientWidth - 40);
            let y = Math.random() * (field.clientHeight - 40);

            fake.style.left = x + "px";
            fake.style.top = y + "px";

            fake.onclick = () => endGame(); 

            field.appendChild(fake);
        }
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
