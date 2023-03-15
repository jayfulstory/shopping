// Fetchでjsonを読み取る
function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}
// 気になって　JSON.parse()で書いてみただけ
// function loadItems() {
//   return fetch('data/data.json')
//     .then(response => response.text())
//     .then(text => JSON.parse(text))
//     .then(json => json.items);
// }

// projectを追加
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// 追加する要素を作る
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumnail" />
        <span class="item_description">${item.gender}, ${item.size}</span>
      </li>
    `;
}

// ボタンで切り替え
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

// maim
loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
