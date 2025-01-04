const API_URL = "https://camcompete-messagerie-github-io.onrender.com/messages";
const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

async function loadMessages() {
  const response = await fetch(API_URL);
  const data = await response.json();
  data.forEach(({ text, type }) => addMessage(text, type));
}

// Ajouter un message à l'interface
function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  messagesContainer.appendChild(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Défile vers le bas
}

// Envoyer un message au serveur
async function sendMessage(text, type) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, type }),
  });
  return response.json();
}

// Gestion de l'envoi de message
sendButton.addEventListener("click", async () => {
  const text = messageInput.value.trim();
  if (text) {
    addMessage(text, "sent");
    messageInput.value = "";

    const response = await sendMessage(text, "sent");
  }
});

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendButton.click();
});

// Charger les messages au démarrage
loadMessages();
