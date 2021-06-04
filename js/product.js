import * as articles from "./articles.js";
import * as bids from "./bids.js";
import { updateCountdown, MILLISECONDS_OF_A_SECOND } from "./chrono.js";

var currentBid;
var nextBid = currentBid + currentBid * 0.1;
const spanCurrentBid = document.getElementById("price");
const spanNextBid = document.getElementById("next");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btnDirectBid = document.getElementById("direct-bid-btn");
const inputBid = document.getElementById("direct-input");

const alert = document.getElementById("alert");
const confirmPanel = document.getElementById("confirm");
const confirmBtn = document.getElementById("confirmbtn");
const cancelBtn = document.getElementById("cancelbtn");
const loading = document.getElementById("loading");

const h3 = document.getElementById("name-article");
const img = document.getElementById("img");
const description = document.getElementById("description");
const btnPurchase = document.getElementById("btn-purchase");

const TABLE_BIDS = document.getElementById("table-bids-body");
const ARTICLEID = window.location.search.substr(4);
const BID_HOST = "http://localhost:9900/products/";
const HOST = "http://localhost:9900/products/";
const BIDS_DIRECTION = BID_HOST + ARTICLEID + "/bids";
let DIRECTION = HOST + ARTICLEID;

productRequest();

function productRequest() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(DIRECTION, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const DATETIME = new Date(data["datetime"]);
      showArticle(data);
      bidsRequest();
      setCurrentBid();
      loading.style.display = "none";
      updateCountdown(DATETIME);
      setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);
      clickFastBid();
      directBid();
    });
}

function bidsRequest() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(BIDS_DIRECTION, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      getBids(data);
    })
    .catch((error) => console.log("error", error));
}

async function bid(currentBid) {
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
  let response = await fetch(BIDS_DIRECTION, requestOptions);
  if (response.ok) {
    let json = await response.json();
    location.reload();
  } else {
    alert("Error-HTTP: " + response.status);
  }
}

function getBids(data) {
  TABLE_BIDS.innerHTML = "";
  for (var i = data.length; i > 0; i--) {   //No muestro la primera puja porque es la que se crea por defecto al crear producto
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

      currentBid = bid["currentBid"];
      getCurrentBid(data);
    }
  }
}

function getCurrentBid(data) {
  for (var i = 1; i <= data.length; i++) {
    var bid = data[i];
    if (typeof bid === "object") {
      currentBid = bid["currentBid"];
    }
  }
  setCurrentBid();
}

function showArticle(data) {
  h3.textContent = data.name;
  img.src = data.image;
  description.innerHTML = `
        <p id="pdescription"><strong>Descripción:</strong> ${data.description}</p>
        `;
  directPurchase(data);
  setCurrentBid();
}

function directPurchase(data) {
  var price = Math.ceil(data.price / 14);
  var purchasePrice = Math.ceil(
    parseFloat(data.price) + parseFloat(data.price * 0.14)
  );
  btnPurchase.textContent = `Compra por:\n ${purchasePrice}€`;
  currentBid = price;
  if (currentBid >= data.price) {
    btnPurchase.style.display = "none";
  }
}

export function setCurrentBid() {
  spanCurrentBid.textContent = currentBid;
  nextBid = Math.ceil(parseFloat(currentBid) + parseFloat(currentBid * 0.1));
  spanNextBid.textContent = nextBid;
  inputBid.value = Math.ceil(nextBid);

  btn1.textContent = Math.ceil(nextBid) + "€";
  btn2.textContent = Math.ceil(nextBid + nextBid * 0.05) + "€";
  btn3.textContent = Math.ceil(nextBid + nextBid * 0.1) + "€";
}

function clickFastBid() {
  document.querySelectorAll(".click").forEach((element) => {
    element.addEventListener("click", (e) => {
      const id = e.target.getAttribute("id");
      const button = document.getElementById(id);
      fastBid(button);
    });
  });
}

function fastBid(button) {
  currentBid = button.textContent.slice(0, button.textContent.length - 1);
  confirm();
}

function directBid() {
  //keysInput();
  btnDirectBid.onclick = () => {
    validate();
  };
}

function validate() {
  switch (true) {
    case inputBid.value == "":
      alert.classList.remove("d-none");
      alert.textContent = "Error. El campo no puede estar vacío.";
      inputBid.value = nextBid;
      break;
    case inputBid.value < nextBid:
      alert.classList.remove("d-none");
      alert.textContent =
        "Error. El valor introducido debe ser mayor que el precio establecido para la próxima puja.";
      inputBid.value = nextBid;
      break;
    case inputBid.value % 1 != 0:
      alert.classList.remove("d-none");
      alert.textContent = "Error. Introduce un número entero.";
      inputBid.value = nextBid;
      break;
    case !Number(inputBid.value):
      alert.classList.remove("d-none");
      alert.textContent = "Error. Introduce un número entero.";
      inputBid.value = nextBid;
      break;
    default:
      alert.classList.add("d-none");
      currentBid = inputBid.value;
      confirm();
      break;
  }
}

function confirm() {
  confirmPanel.style.display = "block";
  clickCancel();
  clickConfirm();
}

function clickCancel() {
  cancelBtn.onclick = () => {
    confirmPanel.style.display = "none";
  };
}

function clickConfirm() {
  confirmBtn.onclick = () => {
    confirmPanel.style.display = "none";
    //setCurrentBid();
    bid(currentBid);
  };
}



// function updateList() {
//   let date = new Date().toLocaleDateString();
//   let time = new Date().toLocaleTimeString();

//   recordStorage = {
//     user: "user",
//     bid: currentBid,
//     time: time,
//     date: date,
//   };
//   localStorage.setItem(id + "" + counterStorage, JSON.stringify(recordStorage));
//   counterStorage++;
//   alert.classList.add("d-none");
//   getList();
//   //setCurrentBid();
// }

// function getList() {
//   bodyTableBids.innerHTML = "";
//   for (var i = localStorage.length; i >= 0; i--) {
//     let key = id + "" + i;
//     var local = JSON.parse(localStorage.getItem(key));
//     if (local != null) {
//       var tdUser = document.createElement("td");
//       let tdBid = document.createElement("td");
//       let tdTime = document.createElement("td");

//       tdUser.textContent = local["user"];
//       tdBid.textContent = local["bid"];
//       tdTime.textContent = local["time"];

//       let row = document.createElement("tr");
//       row.appendChild(tdUser);
//       row.appendChild(tdBid);
//       row.appendChild(tdTime);

//       bodyTableBids.appendChild(row);
//     }
//   }
// }

/* function buttonsClick(articles) {
  var articles = articles;

  btnPrev.onclick = () => {
    left(articles);
  };
  btnNext.onclick = () => {
    rigth(articles);
  };
}

function rigth() {
  if (id < 4) {
    counter++;
    id++;
    request();
  }
}

function left() {
  if (id > 1) {
    counter--;
    id--;
    request();
  }
} 

function keysChange() {
  document.onkeydown = (key) => {
    var pressKey = key.keyCode;
    if (pressKey == ri) {
      rigth();
    } else if (pressKey == le) {
      left();
    }
  };
}
*/

/* function keysInput() {
  inputBid.onclick = () => {
    document.onkeydown = (tecla) => {
      var keyPress = tecla.keyCode;
      if (keyPress == up) {
        inputBid.value++;
      } else if (keyPress == down) {
        inputBid.value--;
      }
    };
  };
} */

/* function getStorage() {
  for (var i = 1; i <= localStorage.length; i++) {
    let key = id + "" + i;
    var local = JSON.parse(localStorage.getItem(key));
    if (local != null) {
      currentBid = local["bid"];
    }
  }
} */
