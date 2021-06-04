const btn = document.getElementById("btn");
const name = document.getElementsByName("name")[0].value;
const username = document.getElementsByName("username")[0].value;
const email = document.getElementsByName("email")[0].value;
const password = document.getElementsByName("password")[0].value;

btn.onclick = () => {
  const name = document.getElementsByName("name")[0].value;
  const username = document.getElementsByName("username")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const password = document.getElementsByName("password")[0].value;
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    name: name,
    username: username,
    email: email,
    password: password,
  });
  
  createUser(raw,myHeaders)
  
};

function createUser(raw,headers) {
    var requestOptions = {
        method: "POST",
        headers: headers,
        body: raw,
        redirect: "follow",
      };
    fetch("http://localhost:9900/users", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
