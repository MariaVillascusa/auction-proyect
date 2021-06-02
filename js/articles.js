export function showArticles(data) {
  for (let article of data) {
    const CARD = document.createElement("div");
    CARD.innerHTML = `
      <div id="card">
      <img src="${article["image"]}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${article["name"]}</h5>
        <p class="card-text">${article["price"]}€</p>
        <a href="product.html?id=${article["articleId"]}" class="btn btn-primary click" id="${article["articleId"]}">Pujar</a>
      </div>
    </div>
      `;
    container.appendChild(CARD);
  }
}
// export let articleId = "";
// export function getIdProduct() {
//   document.querySelectorAll(".click").forEach((element) => {
//     element.addEventListener("click", (e) => {
//       articleId = e.target.getAttribute("id");
//       console.log(articleId);
//       request()
//     });
//   });
// }

// export let articleResponse = '';
// export function request() {
//   console.log(articleId);

//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };
//   let direction = "http://localhost:9900/products/" + articleId;

//   fetch(direction, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {console.log(result)})
//     .catch((error) => console.log("error", error));
    
// }
