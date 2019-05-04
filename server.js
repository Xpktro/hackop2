const express = require('express');
const next = require('next');
const http = require('http');
const socket = require('socket.io');


const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const httpServer = http.Server(app);
  const io = socket(httpServer);

  app.get('*', (req, res) => {
    return handle(req, res);
  });

  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('join', room => socket.join(room));

    socket.on('sender', function (msg) {
      console.log('message: ' + msg);
      socket.to('receiver').emit('message', msg);
    });
  });

  httpServer.listen(port, '0.0.0.0', err => {
    if (err) { throw err }
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch(console.error);
