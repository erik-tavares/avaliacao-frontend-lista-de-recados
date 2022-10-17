function joinButton(event) {
  console.log("Clicou no botão para acessar página Join.");

  location.href = "./join.html";
}

function clickLogar() {
  console.log("Clicou no botão para acessar página de Login.");

  location.href = "./join.html";
}

axios.defaults.baseURL = "http://localhost:3000/";

// FUNÇÃO DE ADICIONAR RECADO
async function saveNewUser(event) {
  event.preventDefault();

  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;

  const { data } = await axios.post("/user", {
    username: username,
    password: password,
  });

  const message = `Usuário adicionado com sucesso! Bem vinda(o), ${username}! ☻`;

  alert(message);
  console.log(message);
}

async function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById("userLogin").value;
  const password = document.getElementById("passwordLogin").value;

  let loged = false;

  const users = await axios.get("/user");

  if (user.username == username.value && user.password == password.value) {
    loged = true;
    checkedLoged(true);
  } else {
    checkedLoged(false);
  }

  if (!loged) {
    alert("Dados inválidos!");
  }

  console.log("Usuário logado com sucesso!");
}

function checkLoged(loged) {
  if (loged) {
    console.log(`User loged: ${loged}. `);

    const loginPageExposed = document.getElementById("loginPage");
    const joinPageExposed = document.getElementById("joinPage");
    const anottationPageExposed = document.getElementById("anottationPage");

    loginPageExposed.style.display = "none";
    joinPageExposed.style.display = "none";
    anottationPageExposed.style.display = "flex";
  } else {
    loginPageExposed.style.display = "flex";
    joinPageExposed.style.display = "none";
    anottationPageExposed.style.display = "none";
  }
}

checkLoged(false);

function logarUsuario(event) {
  event.preventDefault();

  const username = document.getElementById("userLogin");
  const password = document.getElementById("passwordLogin");

  let usuarioInvalido = true;
  let usuario = {
    username: username.value,
    password: md5(password.value),
  };

  if (!localStorage.listaUsuarios) {
    alert("Usuário não cadastrado!");
    window.location.href = "./index.html";
  }

  const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));

  for (let item of listaUsuarios) {
    if (
      item.username === usuario.username &&
      item.password === usuario.password
    ) {
      usuarioInvalido = false;
    }
  }

  if (usuarioInvalido) {
    alert("Usuário ou senha inválidos!");
    return false;
  }

  window.location.href = "./recados.html";
}

function atualizaTabela() {
  let tabela = document.getElementById("tabela");

  $("#tabela tr").remove();

  listaRecados = JSON.parse(localStorage.listaRecados);

  for (var item in listaRecados) {
    $("#tabela").append(
      '<tr><td scope="row">' +
        listaRecados[item].id +
        "</td><td>" +
        listaRecados[item].descricao +
        "</td><td>" +
        listaRecados[item].detalhamento +
        '</td><td><div class="btn-group" role="group" aria-label="Basic example"><button id="apagarRecado" onclick="apagarRecado(' +
        item +
        ')" type="button" class="btn btn-danger">Limpar</button><button id="editarBtn" onclick="editarRecado(' +
        item +
        ')" type="button" class="btn btn-success">Editar</button></div></td></tr>'
    );
  }
}
