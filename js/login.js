const BTN = document.getElementById("btn");
const DIRECTION = "http://localhost:9900/users";

BTN.onclick = () => {
  const usernameForm = document.getElementsByName("username")[0].value;
  const passwordForm = document.getElementsByName("password")[0].value;
  usersRequest(usernameForm,passwordForm);
};

function login(username, password,usernameForm,passwordForm) {
  
  if (passwordForm == password && usernameForm == username) {
    alert("Bienvenido. Login OK");
  } else {
    alert("Porfavor ingrese, nombre de usuario y contraseña correctos.");
  }
}

function usersRequest(usernameForm,passwordForm) {  //Busco el id del usuario en mi "base de datos"
  fetch(DIRECTION)
    .then((response) => response.json())
    .then((result) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i]["username"] == usernameForm) {
          const ID = result[i]["id"];
          userByIdRequest(ID,usernameForm,passwordForm);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

function userByIdRequest(ID,usernameForm,passwordForm) {          //Busco por id unicamente al usuario q quiero para no mosotrar la password de todos los usuarios
  const USER_DIRECTION = DIRECTION + "/" + ID;
  fetch(USER_DIRECTION)
    .then((response) => response.json())
    .then((result) => {
      let username = result["username"];
      let password = result["password"];
      login(username, password,usernameForm,passwordForm);
    });
}

