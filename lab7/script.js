function loadHome() {
  location.reload();
}

function loadCatalog() {
  fetch('data/categories.json')
    .then(res => res.json())
    .then(data => showCategories(data));
}

function showCategories(categories) {
  let html = "<h2>Категорії</h2>";

  categories.forEach(cat => {
    html += `
      <div class="category">
        <h3>${cat.name}</h3>
        <p>${cat.notes}</p>
        <button onclick="loadCategory('${cat.shortname}', '${cat.name}')">
          Відкрити
        </button>
      </div>
    `;
  });

  html += `
    <br>
    <button onclick="loadRandom()">🎲 Specials</button>
  `;

  document.getElementById("content").innerHTML = html;
}

function loadCategory(shortname, name) {
  fetch(`data/${shortname}.json`)
    .then(res => res.json())
    .then(data => showItems(data, name));
}

function showItems(items, categoryName) {
  let html = `<h2>${categoryName}</h2>`;

  items.forEach(item => {
    html += `
      <div class="item">
        <img src="https://placehold.co/200x200?text=${item.shortname}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price">${item.price}</div>
      </div>
    `;
  });

  html += `<br><button class="back-btn" onclick="loadCatalog()">⬅ Назад</button>`;

  document.getElementById("content").innerHTML = html;
}

function loadRandom() {
  fetch('data/categories.json')
    .then(res => res.json())
    .then(categories => {
      let random = categories[Math.floor(Math.random() * categories.length)];
      loadCategory(random.shortname, random.name);
    });
}
