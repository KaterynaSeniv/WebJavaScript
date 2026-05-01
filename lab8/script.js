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
        spans.forEach(s => {
            s.style.transform = 'none';
            s.style.opacity = '1';
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

let currentIndex = 0;

slides.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `
        <img src="${src}" alt="Jewelry">
        <div class="slide-overlay">
            <div class="slide-content">
                <h2>Timeless Radiance</h2>
                <p>Exquisite Jewelry Since 2018</p>
            </div>
        </div>
    `;
    track.appendChild(slide);
});

slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
});

let autoInterval = setInterval(() => nextBtn.click(), 5200);

document.querySelector('.carousel-container').addEventListener('mouseenter', () => clearInterval(autoInterval));
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    autoInterval = setInterval(() => nextBtn.click(), 5200);
});
