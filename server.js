const express = require("express");
const fs = require("fs");
const app = express();

const MESSAGE_FILE = "messages.json";

// Charger les messages depuis un fichier JSON
let messages = [];
if (fs.existsSync(MESSAGE_FILE)) {
  messages = JSON.parse(fs.readFileSync(MESSAGE_FILE, "utf8"));
}

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.static("public")); // Servir les fichiers statiques (HTML, CSS, JS)

// Endpoint pour obtenir les messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Endpoint pour envoyer un message
app.post("/messages", (req, res) => {
  const { text, type } = req.body;
  if (text && type) {
    const message = { text, type, timestamp: new Date().toISOString() };
    messages.push(message);

    // Sauvegarder les messages dans un fichier JSON
    fs.writeFileSync(MESSAGE_FILE, JSON.stringify(messages, null, 2));

    res.status(201).json(message);
  } else {
    res.status(400).json({ error: "Texte ou type manquant." });
  }
});
const cors = require("cors");
app.use(cors());

// Lancer le serveur
app.listen(port, "0.0.0.0", () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
