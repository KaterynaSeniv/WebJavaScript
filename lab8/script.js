const hamburger   = document.getElementById('hamburger');
const navMenu     = document.getElementById('nav-menu');

const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function openMenu() {
    navMenu.classList.add('active');
    overlay.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) closeMenu();
    });
});

document.querySelectorAll('.dropdown .dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
            e.preventDefault();
            const dd = btn.closest('.dropdown').querySelector('.dropdown-content');
            const isOpen = dd.style.display === 'block';
            dd.style.display = isOpen ? 'none' : 'block';
        }
    });
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


const track              = document.getElementById('carousel-track');
const prevBtn            = document.getElementById('prevBtn');
const nextBtn            = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

const slides = [
    { src: 'images/slide1.jpg',  title: 'Timeless Radiance',  sub: 'Exquisite Jewelry Since 2018'       },
    { src: 'images/slide2.jpg',  title: 'Wear Your Story',    sub: 'Handcrafted with Passion'           },
    { src: 'images/slide3.webp', title: 'Pure Elegance',      sub: 'Each Piece, a Masterwork'           },
    { src: 'images/slide4.jpg',  title: 'Dare to Shine',      sub: 'Limited Edition Collections'        },
];

let current = 0;
let autoTimer;

slides.forEach((data, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `
        <img src="${data.src}" alt="${data.title}">
        <div class="slide-overlay">
            <div class="slide-content">
                <span class="label">AURUM Collection</span>
                <h2>${data.title}</h2>
                <p>${data.sub}</p>
            </div>
        </div>`;
    track.appendChild(slide);
});

slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    indicatorsContainer.appendChild(dot);
});

const allDots   = () => document.querySelectorAll('.dot');
const allSlides = () => document.querySelectorAll('.carousel-slide');

function goTo(index) {
    allSlides().forEach((s, i) => s.classList.toggle('active', i === index));
    allDots().forEach((d, i) => d.classList.toggle('active', i === index));
    track.style.transform = `translateX(-${index * 100}%)`;
    current = index;
}

function next() { goTo((current + 1) % slides.length); }
function prev() { goTo((current - 1 + slides.length) % slides.length); }

nextBtn.addEventListener('click', () => { next(); resetAuto(); });
prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

let touchStartX = 0;
const container = document.getElementById('carousel-container');

container.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
container.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 45) { dx < 0 ? next() : prev(); resetAuto(); }
}, { passive: true });

container.addEventListener('mouseenter', () => clearInterval(autoTimer));
container.addEventListener('mouseleave', startAuto);

function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 5200);
}
function resetAuto() { clearInterval(autoTimer); startAuto(); }

startAuto();

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

const emailInput = document.querySelector('.email-input');
const subscribeBtn = document.querySelector('.newsletter-section .cta-button');

if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', () => {
        const val = emailInput.value.trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (valid) {
            subscribeBtn.textContent = '✦ Thank you!';
            subscribeBtn.style.background = '#2a6e3f';
            emailInput.value = '';
            setTimeout(() => {
                subscribeBtn.textContent = 'Subscribe';
                subscribeBtn.style.background = '';
            }, 3000);
        } else {
            emailInput.style.borderColor = '#7a1522';
            setTimeout(() => { emailInput.style.borderColor = ''; }, 1500);
        }
    });
}
