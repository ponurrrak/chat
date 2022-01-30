const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const clientDir = path.join(__dirname, 'client');
const messages = [];
const users = [];
const bot = 'Chat Bot';
const botMessages = {
  join: ' has joined the conversation!',
  leave: ' has left the conversation... :(',
};

app.use(express.static(clientDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', socket => {

  socket.on('join', username => {
    socket.broadcast.emit('message', {
      author: bot,
      content: username + botMessages.join,
    });
    users.push({
      name: username,
      id: socket.id,
    });
  });

  socket.on('message', message => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    const index = users.findIndex(item => item.id === socket.id);
    if (index !== -1) {
      const userLeft = users[index].name;
      users.splice(index, 1);
      socket.broadcast.emit('message', {
        author: bot,
        content: userLeft + botMessages.leave,
      });
    }
  });

});
