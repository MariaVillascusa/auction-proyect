import {updateCountdown, MILLISECONDS_OF_A_SECOND} from './chrono.js';

export function showArticles(data) {
  for (let article of data) {
    const CARD = document.createElement("div");
    let datetime = new Date(article['datetime']);

    CARD.innerHTML = `
      <div id="card">
      <img src="${article["image"]}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${article["name"]}</h5>
        <p class="card-text price">${article["price"]}€</p>
        <p class="card-text datetime">${datetime.toDateString()}</p>
        <a href="product.html?id=${article["articleId"]}" class="btn bttn click" id="${article["articleId"]}">Pujar</a>
      </div>
    </div>
      `;
    container.appendChild(CARD);
  }
}



