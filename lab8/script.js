const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

if (hamburger && menu) {
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
}

function loadCatalog() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return; 

    const products = [
        { name: "Eternal Band", price: "Gold / Diamond", img: "images/1.webp" },
        { name: "Lumina Pendant", price: "White Gold", img: "images/2.jpg" },
        { name: "Solaris Drops", price: "Rose Gold / Emerald", img: "images/3.jpg" },
        { name: "Luna Bracelet", price: "Silver / Pearl", img: "images/4.webp" },
        { name: "Aurelia Ring", price: "Pure 18k Gold", img: "images/5.jpg" },
        { name: "Velvet Necklace", price: "Sapphire Details", img: "images/6.jpg" }
    ];

    grid.innerHTML = '';
    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product-card';
        item.innerHTML = `
            <a href="product.html?name=${encodeURIComponent(product.name)}&img=${encodeURIComponent(product.img)}&price=${encodeURIComponent(product.price)}" style="text-decoration:none; color:inherit;">
                <div class="img-wrapper">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            </a>
        `;
        grid.appendChild(item);
    });
}

function loadProductDetails() {
    const titleEl = document.getElementById('product-title');
    const priceEl = document.getElementById('product-price');
    const imgEl = document.getElementById('main-product-img');

    if (!titleEl) return;

    const params = new URLSearchParams(window.location.search);
    if (params.has('name')) {
        titleEl.innerText = params.get('name');
        priceEl.innerText = params.get('price');
        imgEl.src = params.get('img');
        document.title = `${params.get('name')} | AURUM`;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadCatalog();
    loadProductDetails();
});
