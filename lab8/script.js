const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

const slide = document.getElementById('carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

let counter = 0;
const size = images[0].clientWidth;

images.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    indicatorsContainer.appendChild(dot);
});

function updateIndicators() {
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === counter);
    });
}

function goToSlide(index) {
    counter = index;
    slide.style.transform = 'translateX(' + (-images[0].clientWidth * counter) + 'px)';
    updateIndicators();
}

nextBtn.addEventListener('click', () => {
    if (counter >= images.length - 1) counter = -1;
    goToSlide(counter + 1);
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) counter = images.length;
    goToSlide(counter - 1);
});

setInterval(() => {
    nextBtn.click();
}, 5000);
