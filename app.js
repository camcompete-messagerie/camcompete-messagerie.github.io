// script.js
const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButtonBlue = document.getElementById("sendButtonBlue");
const messageColor = document.getElementById("messageColor");
let tableauTimestamp = JSON.parse(localStorage.getItem("messages")) || [];

displayMessages();

sendButtonBlue.addEventListener("click", () => {
  const text = messageInput.value.trim();
  const type = messageColor.value;
  if (text) {
    const timestamp = new Date().toISOString();
    const message = { text, type, timestamp };
    tableauTimestamp.push(message);
    localStorage.setItem("messages", JSON.stringify(tableauTimestamp));
    addMessage(text, type);
    messageInput.value = "";
  }
});

function displayMessages() {
  messagesContainer.innerHTML = "";
  tableauTimestamp.forEach(({ text, type }) => addMessage(text, type));
}

function addMessage(text, type) {
  const message = document.createElement("div");
  message.style.background = type;
  message.className = "message-div";
  message.textContent = text;
  messagesContainer.appendChild(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendButtonBlue.click();
});
