function loadHome() {
  document.getElementById("content").innerHTML =
    "<h2>Ласкаво просимо</h2>";
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
      <button onclick="loadCategory('${cat.shortname}')">
        ${cat.name}
      </button>
    `;
  });

  html += `<br><br>
           <button onclick="loadRandom()">🎲 Specials</button>`;

  document.getElementById("content").innerHTML = html;
}

function loadCategory(name) {
  fetch(`data/${name}.json`)
    .then(res => res.json())
    .then(data => showItems(data, name));
}

function showItems(items, category) {
  let html = `<h2>${category} Jewelry</h2>`;

  items.forEach(item => {
    html += `
      <div class="item">
        <img src="https://placehold.co/300x200?text=${category}" alt="img">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><b>${item.price}</b></p>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}

function loadRandom() {
  fetch('data/categories.json')
    .then(res => res.json())
    .then(categories => {
      let random = categories[Math.floor(Math.random() * categories.length)];
      loadCategory(random.shortname);
    });
}
