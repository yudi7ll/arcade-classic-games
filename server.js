const express = require('express');
const PORT = 3000;

const app = express();

app.use('/', express.static(__dirname));
app.use('/snake', express.static(__dirname + '/snake'));
app.use('/tetris', express.static(__dirname + '/tetris'));

app.get('/', (req, res, next) => {
  res.sendFile('/');
});

app.get('/snake', (req, res, next) => {
  res.sendFile('/snake');
});

app.get('/tetris', (req, res, next) => {
  res.sendFile('/tetris');
});

app.listen(PORT, () => console.log('server on port :', PORT));
