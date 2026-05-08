const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

function openMenu(){
    menu.classList.add('active');
    hamburger.classList.add('active'); 
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu(){
    menu.classList.remove('active');
    hamburger.classList.remove('active'); 
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.onclick = () => {
    menu.classList.contains('active') ? closeMenu() : openMenu();
};

overlay.onclick = closeMenu;

const track = document.getElementById('track');
const dotsContainer = document.getElementById('dots');

const slides = [
    'images/slide1.jpg',
    'images/slide2.jpg',
    'images/slide3.jpg',
    'images/slide4.jpg'
];

let current = 0;

slides.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `<img src="${src}">`;
    track.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => goTo(i);
    dotsContainer.appendChild(dot);
});

function goTo(i){
    track.style.transform = `translateX(-${i * 100}%)`;
    current = i;

    document.querySelectorAll('.dot').forEach((d, index) => {
        d.classList.toggle('active', index === i);
    });
}

function next() {
    goTo((current + 1) % slides.length);
}
function prev() {
    goTo((current - 1 + slides.length) % slides.length);
}

document.getElementById('next').onclick = next;
document.getElementById('prev').onclick = prev;

setInterval(next, 5000);

goTo(0);

function loadCatalog() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return; 

    const products = [
        { name: "Eternal Band", price: "Gold / Diamond", img: "images/1.jpg" },
        { name: "Lumina Pendant", price: "White Gold", img: "images/2.jpg" },
        { name: "Solaris Drops", price: "Rose Gold", img: "images/3.jpg" },
        { name: "Luna Bracelet", price: "Silver / Pearl", img: "images/4.jpg" },
        { name: "Aurelia Ring", price: "Pure Gold", img: "images/5.jpg" },
        { name: "Velvet Necklace", price: "Emerald", img: "images/6.jpg" }
    ];

    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product-card';
        item.innerHTML = `
            <div class="img-wrapper">
                <img src="${product.img}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;
        grid.appendChild(item);
    });
}

window.addEventListener('DOMContentLoaded', loadCatalog);
