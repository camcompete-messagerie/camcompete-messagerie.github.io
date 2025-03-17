const express = require("express");
const fs = require("fs");
const app = express();
const host = "0.0.0.0"
const MESSAGE_FILE = "messages.json";
const IDENT_FILES = "passwords.json";


// Charger les messages depuis un fichier JSON
let messages = [];
if (fs.existsSync(MESSAGE_FILE)) {
  messages = JSON.parse(fs.readFileSync(MESSAGE_FILE, "utf8"));
}

let passwords_dict = {}
if (fs.existsSync(IDENT_FILES)) {
  passwords_dict = JSON.parse(fs.readFileSync(IDENT_FILES, "utf8"));
}

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.static("public")); // Servir les fichiers statiques (HTML, CSS, JS)

// Endpoint pour obtenir les messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/passwords", (req, res) => {
  res.json(passwords_dict);
});

// Endpoint pour envoyer un message
app.post("/messages", (req, res) => {
  const { text, type, userName } = req.body;
  if (text && type) {
    const message = { text, type, userName, timestamp: new Date().toISOString() };
    messages.push(message);

    // Sauvegarder les messages dans un fichier JSON
    fs.writeFileSync(MESSAGE_FILE, JSON.stringify(messages, null, 2));

    res.status(201).json(message);
  } else {
    res.status(400).json({ error: "Texte ou type manquant." });
  }
});

app.post("/passwords", (req, res) => {
  const { username } = req.body;
  if (username) {
    const identifiants = { username };
    messages.push(identifiants);

    // Sauvegarder les messages dans un fichier JSON
    fs.writeFileSync(IDENT_FILES, JSON.stringify(identifiants, null, 2));

    res.status(201).json(identifiants);
  } else {
    res.status(400).json({ error: "Texte ou type manquant." });
  }
});
// Lancer le serveur
// const port = process.env.PORT || 3000;
app.listen(3000, '0.0.0.0', () => {
  console.log(`Serveur en cours d'exécution sur le port 3000`);
});

