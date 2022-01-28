const express = require('express');
const path = require('path');

const app = express();
const clientDir = path.join(__dirname, 'client');
//const messages = [];

app.use(express.static(clientDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
