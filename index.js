const express = require('express');
const crypto = require('crypto');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//var path = require('path');
const port = process.env.PORT || 5000;

const db = require("./serverCode/database.js");
const wg = require("./serverCode/wanderersGuide.js")

const characters = db.getCharactersIDs();
const mailsDictionary = db.getMailsDictionary();
const wgTokens = db.getTokens();
//const wgApiKey = FROM .env
//const frontEndUrl = FROM .env

const addingCodes = [];


app.get('/', (req, res) => {
  res.send("Hello, this is Let's Roll One backend. Nothing to do here.")
});

app.get('/new-char-code', (req, res) => {
  const newCode = crypto.randomBytes(16).toString('hex');
  addingCodes.push(newCode);
  res.send(newCode);
})

app.get('/new-character', async (req, res) => wg.addNewCharacter(req, res, db, addingCodes, wgTokens));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

io.on('connection', (socket) => {

  socket.on('disconnect', () => {})
  socket.on('chat-message', message => {})
})