import * as articles from './articles.js';

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("http://localhost:9900/products", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    
    articles.showArticles(result);
  })
  .catch((error) => console.log("error", error));



