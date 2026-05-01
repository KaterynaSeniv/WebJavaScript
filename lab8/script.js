const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

const slidesData = [
    {
        img: "https://picsum.photos/id/1015/1200/600",
        alt: "Розкішні золоті персні з діамантами"
    },
    {
        img: "https://picsum.photos/id/1060/1200/600",
        alt: "Елегантна діамантова підвіска"
    },
    {
        img: "https://picsum.photos/id/201/1200/600",
        alt: "Золоті сережки з перлами"
    },
    {
        img: "https://picsum.photos/id/133/1200/600",
        alt: "Колекція ювелірних виробів"
    }
];

let currentIndex = 0;

slidesData.forEach(slide => {
    const slideEl = document.createElement('div');
    slideEl.className = 'carousel-slide';
    slideEl.innerHTML = `<img src="${slide.img}" alt="${slide.alt}">`;
    track.appendChild(slideEl);
});

slidesData.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(dot);
});

const allDots = document.querySelectorAll('.dot');

function updateIndicators() {
    allDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slidesData.length;
    goToSlide(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
    goToSlide(currentIndex);
});

let autoSlide = setInterval(() => {
    nextBtn.click();
}, 5000);

const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
carouselContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => nextBtn.click(), 5000);
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
