const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButtonBlue = document.getElementById("sendButtonBlue");
let y = 1

setInterval(() => {
  loadMessages();
}, 1000);

setInterval(() => {
  messagesContainer="[]";
},1000);


let tableauTimestamp = []; // Initialise le tableau des timestamps déjà affichés

async function loadMessages() {
  const response = await fetch("messages");
  const data = await response.json();

  data.forEach(({ timestamp, text, type }) => {
    if (!tableauTimestamp.includes(timestamp)) { // Vérifie si le timestamp est absent
      tableauTimestamp.push(timestamp); // Ajoute le timestamp au tableau pour éviter les doublons
      addMessage(text, type, timestamp); // Ajoute le message
    }
  });
}

function addMessage(text, type, timestamp) {
  const message = document.createElement("div"); // Création d'un nouvel élément message
  const boutton = document.getElementById("sendButtonBlue");
  const bouttonmessage = document.getElementById("messageColor");
  tableauTimestamp.push(timestamp); // Ajoute le timestamp au tableau pour éviter les doublons
  message.style.background = type;
  boutton.style.background = type;
  bouttonmessage.style.background = type;
  message.className = "message-div";
  message.innerHTML = text;
  messagesContainer.appendChild(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Défile vers le bas
}



// Envoyer un message au serveur
async function sendMessage(text, type) {
  const response = await fetch("messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, type }),
  });
  return response.json();
}

// Gestion de l'envoi de message


sendButtonBlue.addEventListener("click", async () => {
  let y = 0;
  const text = messageInput.value.trim();
  type = document.getElementById("messageColor").value;
  if (text) {
  //  addMessage(text, type);
    messageInput.value = "";
    const response = await sendMessage(text, type);
  }
  loadMessages();
});

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendButtonBlue.click();
});
loadMessages();

