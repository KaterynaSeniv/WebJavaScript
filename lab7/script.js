function loadHome() {
  document.getElementById("content").innerHTML = `
    <div class="welcome">
      <h2>Ласкаво просимо 💎</h2>
      <p>Обери каталог або переглянь спеціальні пропозиції</p>
    </div>
  `;
}

loadHome();

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
        <p class="price">${item.price}</p>
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

      let promises = categories.map(cat =>
        fetch(`data/${cat.shortname}.json`).then(res => res.json())
      );

      Promise.all(promises).then(allData => {

        let allItems = [];

        allData.forEach((items, index) => {
          items.forEach(item => {
            allItems.push({
              ...item,
              category: categories[index].name
            });
          });
        });

        let shuffled = allItems.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 4);

        showSpecials(selected);
      });
    });
}

function showSpecials(items) {
  let html = `<h2> Specials</h2>`;

  items.forEach(item => {
    html += `
      <div class="item">
        <img src="https://placehold.co/200x200?text=${item.category}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">${item.price}</p>
        <small>${item.category}</small>
      </div>
    `;
  });

  html += `<br><button class="back-btn" onclick="loadCatalog()">⬅ Назад</button>`;

  document.getElementById("content").innerHTML = html;
}
