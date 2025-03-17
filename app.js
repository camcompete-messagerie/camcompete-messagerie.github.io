const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButtonBlue = document.getElementById("sendButton");
let filediv = document.getElementById("file");
let y = 1;
let colorelement = 0;
let a = 0;
var userName = " ";

setInterval(() => {
  loadMessages();
}, 5000);


let tableauTimestamp = []; // Initialise le tableau des timestamps déjà affichés

async function loadMessages() {
  const response = await fetch("/messages");
  const data = await response.json();

  data.forEach(({ timestamp, text, type, userName }) => {
    if (!tableauTimestamp.includes(timestamp)) { // Vérifie si le timestamp est absent
      tableauTimestamp.push(timestamp); // Ajoute le timestamp au tableau pour éviter les doublons
      addMessage(text, type, timestamp, userName); // Ajoute le message
      if (a>0) {
        const message_notification = userName + ': "'+ text + '"';
        new Notification("camcompete messagerie", {
          body: message_notification
      })
    };
    };
  });
  a = a + 1
}

function addMessage(text, type, timestamp, userName) {
  const message = document.createElement("div"); // Création d'un nouvel élément message
  tableauTimestamp.push(timestamp); // Ajoute le timestamp au tableau pour éviter les doublons
  message.style.background = type;
  message.className = "message-div";
  message.textContent = text;
  if (colorelement === 0) {
    message.style.color = "black";
  }
  else {
    message.style.color = "white";
  }
  const nameUser = document.createElement("h5");
  nameUser.textContent = userName;
  nameUser.style.background = type;
  nameUser.className = "name-div";
  message.appendChild(nameUser);
  messagesContainer.appendChild(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Défile vers le bas
}



// Envoyer un message au serveur
async function sendMessage(text, type, userName) {
  const response = await fetch("/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, type, userName }),
  });
  return response.json();
}
// Gestion de l'envoi de message


sendButtonBlue.addEventListener("click", async () => {
  let y = 0;
  const text = messageInput.value.trim();
  type = document.getElementById("messageColor").value;
  const userName = sessionStorage.getItem("Username")
  if (text) {
    messageInput.value = "";
    const response = await sendMessage(text, type, userName);
  }
  if (file){
    const response2 = await sendMessage(filediv.value, type, userName);
  }
  loadMessages();
});

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendButtonBlue.click();
});
loadMessages();


function changerBackground() {
  let body = document.querySelector('body');
  let bgColor = window.getComputedStyle(body).backgroundColor;

  if (bgColor === "rgb(0, 0, 0)") { 
      messagesContainer.style.backgroundColor = 'white'
      document.getElementById('inputContainer').style.backgroundColor = 'white'
      body.style.backgroundColor = "white"; 
  }
  if (bgColor === "rgb(255, 255, 255)")  { 
      messagesContainer.style.backgroundColor = 'black'
      document.getElementById('inputContainer').style.backgroundColor = 'black'
      body.style.backgroundColor = "black"; 
      
  }
}

function themepolice() {
  const elements = document.querySelectorAll('.message-div');
  const elements2 = document.querySelector('.message-div');
  let bgColor = window.getComputedStyle(elements2).color;
  if (bgColor === "rgb(0, 0, 0)") { 
    elements2.style.color = "white";
    colorelement = 1;
  }
  if (bgColor === "rgb(255, 255, 255)")  { 
    elements2.style.color = "black";
    colorelement = 0;
  }
  elements.forEach((element) => {
    if (window.getComputedStyle(elements2).color === "rgb(0, 0, 0)") { 
      element.style.color = "white";
    }
    if (window.getComputedStyle(elements2).color === "rgb(255, 255, 255)")  { 
      element.style.color = "black";
    }
  });
}

async function register(id, password) {
  const response = await fetch("/passwords", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: password}),
  });
  return response.json();
}

async function formulaire_login() {
  const reponse = await fetch("/passwords");
  const data = await reponse.json();
  if (data[document.getElementById("login_username").value] === document.getElementById("login_password").value){
    var userName = document.getElementById("login_username").value;  
    window.location.href = "menu.html";
    connexion = 1;
    sessionStorage.setItem("connection", "True");
    sessionStorage.setItem("Username", document.getElementById("login_username").value);
    Notification.requestPermission()
  } 
  else {
      alert ("identifiant ou mot de passe incorect")
  }
  }


  function rediriger_messages() {
    window.location.href = "messagerie.html";
  }

  window.addEventListener("load", function(){
    if (sessionStorage.getItem("connection") !== "True"){
      window.location.href = "index.html"
    }
  })