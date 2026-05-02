let currentPage = "home";

init();

function init() {
    loadHome(true);
}

function setActiveButton(activeId) {
    const buttons = ["homeBtn", "catalogBtn", "specialsBtn"];
    buttons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.disabled = (id === activeId);
    });
}

function loadHome(force = false) {
    if (currentPage === "home" && !force) return;
    currentPage = "home";
    setActiveButton("homeBtn");
    document.getElementById("content").innerHTML = `
        <div class="welcome">
            <h2>Ласкаво просимо 💎</h2>
            <p>Вишукані прикраси з натурального каміння</p>
            <button class="back-btn" onclick="loadCatalog()">Перейти до каталогу</button>
        </div>
    `;
}

function loadCatalog() {
    currentPage = "catalog";
    setActiveButton("catalogBtn");
    fetch('data/categories.json')
        .then(res => res.json())
        .then(data => {
            let html = "<h2>Категорії</h2>";
            data.forEach(cat => {
                html += `
                    <div class="category">
                        <img src="images/${cat.shortname}Necklace.jpg" onerror="this.src='https://placehold.co/300x300?text=${cat.name}'">
                        <h3>${cat.name}</h3>
                        <p>${cat.notes}</p>
                        <button class="back-btn" onclick="loadCategory('${cat.shortname}', '${cat.name}')">Відкрити</button>
                    </div>
                `;
            });
            document.getElementById("content").innerHTML = html;
        });
}

function loadCategory(shortname, name) {
    currentPage = "category";
    setActiveButton(null);
    fetch(`data/${shortname}.json`)
        .then(res => res.json())
        .then(data => {
            let html = `<h2>${name}</h2>`;
            data.forEach(item => {
                const imgName = item.shortname.charAt(0).toUpperCase() + item.shortname.slice(1);
                html += `
                    <div class="item">
                        <img src="images/${shortname}${imgName}.jpg" onerror="this.src='https://placehold.co/300x300?text=${item.name}'">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <span class="price">${item.price}</span>
                    </div>
                `;
            });
            html += `<br><button class="back-btn" onclick="loadCatalog()">Назад до каталогу</button>`;
            document.getElementById("content").innerHTML = html;
        });
}

function loadRandom() {
    currentPage = "specials";
    setActiveButton("specialsBtn");
    generateSpecials();
}

function generateSpecials() {
    fetch('data/categories.json')
        .then(res => res.json())
        .then(categories => {
            let promises = categories.map(cat => fetch(`data/${cat.shortname}.json`).then(res => res.json()));
            Promise.all(promises).then(allData => {
                let allItems = [];
                allData.forEach((items, index) => {
                    items.forEach(item => {
                        allItems.push({ ...item, categoryFolder: categories[index].shortname });
                    });
                });
                let selected = allItems.sort(() => 0.5 - Math.random()).slice(0, 4);
                let html = `<h2>Specials</h2>`;
                selected.forEach(item => {
                    const imgName = item.shortname.charAt(0).toUpperCase() + item.shortname.slice(1);
                    html += `
                        <div class="item">
                            <img src="images/${item.categoryFolder}${imgName}.jpg">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <span class="price">${item.price}</span>
                        </div>
                    `;
                });
                html += `<br><button class="back-btn" onclick="generateSpecials()">🔄 Оновити</button>`;
                document.getElementById("content").innerHTML = html;
            });
        });
}
