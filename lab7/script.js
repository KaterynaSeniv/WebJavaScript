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
        <div class="welcome" style="text-align:center">
            <h2>Ласкаво просимо 💎</h2>
            <p>Вишукані прикраси з натурального каміння</p>
            <button class="back-btn" onclick="loadCatalog()">Відкрити каталог</button>
        </div>
    `;
}

function loadCatalog() {
    currentPage = "catalog";
    setActiveButton("catalogBtn");
    fetch('data/categories.json')
        .then(res => res.json())
        .then(data => {
            let html = "<h2 style='text-align:center'>Наші категорії</h2>";
            html += '<div class="grid-container">';
            data.forEach(cat => {
                let fileName = `${cat.shortname}Necklace.jpg`;
                if (cat.shortname === "turquoise") fileName = "turquoseNecklace.jpg";

                html += `
                    <div class="category">
                        <img src="images/${fileName}" onerror="this.src='https://placehold.co/300x300?text=${cat.name}'">
                        <h3>${cat.name}</h3>
                        <p>${cat.notes}</p>
                        <button class="back-btn" style="width:100%" onclick="loadCategory('${cat.shortname}', '${cat.name}')">Відкрити</button>
                    </div>
                `;
            });
            html += '</div>';
            document.getElementById("content").innerHTML = html;
        });
}

function loadCategory(shortname, name) {
    currentPage = "category";
    setActiveButton(null);
    fetch(`data/${shortname}.json`)
        .then(res => res.json())
        .then(data => {
            let html = `<h2 style='text-align:center'>Колекція: ${name}</h2>`;
            html += '<div class="grid-container">';
            data.forEach(item => {
                html += `
                    <div class="item">
                        <img src="${item.image}" onerror="this.src='https://placehold.co/300x300?text=No+Photo'">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <span class="price">${item.price}</span>
                    </div>
                `;
            });
            html += '</div>';
            html += `<div style="text-align:center"><button class="back-btn" onclick="loadCatalog()">← Назад</button></div>`;
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
                allData.forEach((items) => {
                    items.forEach(item => allItems.push(item));
                });

                let selected = allItems.sort(() => 0.5 - Math.random()).slice(0, 4);
                
                let html = `<h2 style='text-align:center'>Specials</h2>`;
                html += '<div class="grid-container">';
                selected.forEach(item => {
                    html += `
                        <div class="item">
                            <img src="${item.image}" alt="${item.name}">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <span class="price">${item.price}</span>
                        </div>
                    `;
                });
                html += '</div>';
                html += `<div style="text-align:center"><button class="back-btn" onclick="generateSpecials()">🔄 Оновити</button></div>`;
                document.getElementById("content").innerHTML = html;
            });
        });
}
