import * as product from "./product.js";

/* const TABLE_BIDS = document.getElementById("table-bids-body");
const ARTICLEID = window.location.search.substr(4);
const BID_HOST = "http://localhost:9900/products/";
const DIRECTION = BID_HOST + ARTICLEID + "/bids";
let currentBid;

//bidsRequest();

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

export function bidsRequest() {
  fetch(DIRECTION, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      getBids(data);
    }).catch((error) => console.log("error", error));
}

export let current='';
export function getBids(data) {
  TABLE_BIDS.innerHTML = "";
  for (var i = data.length; i >= 0; i--) {
    var bid = data[i];
    if (typeof bid === "object") {
      var tdUser = document.createElement("td");
      let tdBid = document.createElement("td");
      let tdTime = document.createElement("td");

      tdUser.textContent = "User";
      tdBid.textContent = bid["currentBid"];
      tdTime.textContent = bid["datetime"];

      let row = document.createElement("tr");
      row.appendChild(tdUser);
      row.appendChild(tdBid);
      row.appendChild(tdTime);
      TABLE_BIDS.appendChild(row);

      current = bid["currentBid"];
      product.setCurrentBid();
      return current;
    }
  }
}
console.log(current);

export function bid(currentBid) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    productId: `${ARTICLEID}`,
    currentBid: `${currentBid}`,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(DIRECTION, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
    location.reload();
} */
