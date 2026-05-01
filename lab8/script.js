
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

const slides = [
    "images/slide1.jpg",
    "images/slide2.jpg",
    "images/slide3.webp",
    "images/slide4.jpg"
];

let current = 0;

slides.forEach(src => {
    const div = document.createElement('div');
    div.className = 'carousel-slide';
    div.innerHTML = `<img src="${src}" alt="Timeless Radiance">`;
    track.appendChild(div);
});

slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
});

const allDots = document.querySelectorAll('.dot');

function goToSlide(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    allDots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    goToSlide(current);
});

prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    goToSlide(current);
});

let interval = setInterval(() => {
    nextBtn.click();
}, 5200);

document.querySelector('.carousel-container').addEventListener('mouseenter', () => clearInterval(interval));
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    interval = setInterval(() => nextBtn.click(), 5200);
});
