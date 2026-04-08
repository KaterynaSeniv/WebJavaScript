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
      <p>
        <a href="#" onclick="loadCategory('${cat.shortname}')">
          ${cat.name}
        </a>
      </p>
    `;
  });

  html += `<p><a href="#" onclick="loadRandom()">Specials</a></p>`;

  document.getElementById("content").innerHTML = html;
}

function loadCategory(name) {
  fetch(`data/${name}.json`)
    .then(res => res.json())
    .then(data => showItems(data, name));
}

function showItems(items, category) {
  let html = `<h2>${category}</h2>`;

  items.forEach(item => {
    html += `
      <div class="item">
        <img src="https://placehold.co/200x200" alt="img">
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
