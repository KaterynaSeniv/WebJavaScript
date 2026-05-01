
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
        spans.forEach(s => { s.style.transform = 'none'; s.style.opacity = '1'; });
    }
});

const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

const slidesData = [
    {
        img: "images/slide1.jpg",
        title: "Timeless Radiance",
        subtitle: "The Pinnacle of High-End Craftsmanship"
    },
    {
        img: "images/slide2.jpg",
        title: "Golden Perfection",
        subtitle: "Premium Gold & Exquisite Diamonds"
    },
    {
        img: "images/slide3.webp",
        title: "Lustrous Pearls",
        subtitle: "Elegance Under Golden Hour Light"
    },
    {
        img: "images/slide4.jpg",
        title: "Signature Collection",
        subtitle: "Masterpieces in Diamond & Gold"
    }
];

let currentIndex = 0;

slidesData.forEach(slide => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'carousel-slide';
    slideDiv.innerHTML = `
        <img src="${slide.img}" alt="${slide.title}">
        <div class="slide-overlay">
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.subtitle}</p>
            </div>
        </div>
    `;
    track.appendChild(slideDiv);
});

slidesData.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
});

const allDots = document.querySelectorAll('.dot');

function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    allDots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slidesData.length;
    goToSlide(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
    goToSlide(currentIndex);
});

let autoSlide = setInterval(() => nextBtn.click(), 5500);

const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
carouselContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => nextBtn.click(), 5500);
});
