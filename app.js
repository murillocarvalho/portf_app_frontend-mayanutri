const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/agendamento', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'agendamento.html'));
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});

app.get('/perguntas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'perguntas.html'));
});

app.listen(port, () => {
  console.log(`Site rodando em http://localhost:${port}`);
});
