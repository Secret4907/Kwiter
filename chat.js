const firebaseConfig = {
  apiKey: "AIzaSyBwV0hanJkW4CiaDoQK1baSm1evHWJyV0I",
  authDomain: "chatkwiter.firebaseapp.com",
  databaseURL: "https://chatkwiter-default-rtdb.firebaseio.com",
  projectId: "chatkwiter",
  storageBucket: "chatkwiter.appspot.com",
  messagingSenderId: "399893944438",
  appId: "1:399893944438:web:e863f6ae44a23a28bca757"
};

const nomeUsuario = localStorage.getItem("nomeUsuario");
const nomeSala = localStorage.getItem("nomeSala");
firebase.initializeApp(firebaseConfig);
getData();

document.getElementById("nomeSala").textContent = nomeSala;

function getData() {
  firebase.database().ref('/' + nomeSala).on("value", snapshot => {
    var chaTag = [];
    console.log("novas mensagens");
    snapshot.forEach(childSnapshot => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      //console.log(childKey, childData)


      if (childKey != "purpose") {
        const nomi = childData.name
        const msg = childData.message
        const likes = childData.likes

        const nomeTag = '<div class="chatCard">'
          + '<h4 class="chatNome">'
          + nomi
          + ":</h4>"
        const msgTag = '<div class = "row">'
        + '<div class="col">'
        + '<h5 class="chatMsg">'
        + msg
        + '</h5></div>'
        +'<div class="col-auto">'
        +'<button class="btn btn-info" id="'
        + childKey
        + '"value="'
        +likes
        +'" onclick="like(this.id)">'
        +'<i class="fa-regular fa-thumbs-up"></i>'
        + likes
        +'</button></div></div></div>'
        console.log(msg)







        chaTag.push(nomeTag + msgTag)
      }
    });
    output.innerHTML = chaTag.join("")
  });
}

function send() {
  const msg = document.getElementById("msg").value;
  if (msg) {
    firebase.database().ref(nomeSala).push({
      name: nomeUsuario,
      message: msg,
      likes: 0

    });
    document.getElementById("msg").value = "";
  }
}

function like(btnId) {
  let like = Number(document.getElementById(btnId).value);
  like++;
  console.log("Botão: " + btnId + " | Likes: " + like);
  firebase.database().ref("/" + nomeSala).child(btnId).update({
    likes: like
  });
}