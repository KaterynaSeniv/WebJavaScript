const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const track = document.getElementById('track');
const dotsContainer = document.getElementById('dots');

const slides = [
    'images/slide1.jpg',
    'images/slide2.jpg',
    'images/slide3.webp',
    'images/slide4.jpg'
];

let current = 0;

const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

function toggleMenu() {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

hamburger.onclick = toggleMenu;
overlay.onclick = toggleMenu;

function initCarousel() {
    slides.forEach((src, i) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<img src="${src}" alt="Aurum Slide ${i + 1}">`;
        track.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => goTo(i);
        dotsContainer.appendChild(dot);
    });
    goTo(0);
}

function goTo(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
    current = i;
    document.querySelectorAll('.dot').forEach((d, idx) => {
        d.classList.toggle('active', idx === i);
    });
}

function nextSlide() {
    current = (current + 1) % slides.length;
    goTo(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    goTo(current);
}

document.getElementById('next').onclick = nextSlide;
document.getElementById('prev').onclick = prevSlide;
setInterval(nextSlide, 5000); 

async function fetchProducts() {
    const container = document.getElementById('catalog-container');
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        container.innerHTML = '';

        data.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="img-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <p>${product.material}</p>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error('Error loading products:', err);
        container.innerHTML = '<p>The catalog is currently unavailable.</p>';
    }
}

document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.innerText.toLowerCase();
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            if (menu.classList.contains('active')) toggleMenu();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    fetchProducts();
});
