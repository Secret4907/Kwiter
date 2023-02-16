const firebaseConfig = {
  apiKey: "AIzaSyBwV0hanJkW4CiaDoQK1baSm1evHWJyV0I",
  authDomain: "chatkwiter.firebaseapp.com",
  databaseURL: "https://chatkwiter-default-rtdb.firebaseio.com",
  projectId: "chatkwiter",
  storageBucket: "chatkwiter.appspot.com",
  messagingSenderId: "399893944438",
  appId: "1:399893944438:web:e863f6ae44a23a28bca757"
};

firebase.initializeApp(firebaseConfig);
getData();

const nomeUsuario = localStorage.getItem("nomeUsuario");
document.getElementById("nomeUsuario").textContent = "Olá, " + nomeUsuario + "!";

function getData() {
  firebase.database().ref('/').on("value", snapshot => {
      let salas = [];
      console.log("Banco de dados modificado");
      snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          let html = "<div class='nomeSala' id='"
              + key
              + "' onclick='carregaSala(this.id)'>#"
              + key
              + "</div>";
          salas.push(html);
      });
      const output = document.getElementById("output");
      console.log(output)
      output.innerHTML = salas.join("");
  });
}

function addSala() {
  const sala = document.getElementById("nomeSala").value;
  console.log(sala);

  if (sala) {
      firebase.database().ref('/').child(sala).set({
          purpose: "sala criada",
      });
      carregaSala(sala);
  }
}

function carregaSala(sala) {
  localStorage.setItem("nomeSala", sala);
  location = "chat.html";
}