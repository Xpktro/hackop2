const express = require('express');
const next = require('next');
const http = require('http');
const socket = require('socket.io');
let controls = require('./config').map(control => ({ ...control, value: control.min }));


const port = parseInt(process.env.PORT, 10) || 3000;
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const nextRequestHandler = nextApp.getRequestHandler();

const updateValue = (control, type) => {
  const operations = {
    '+': v => v + control.increment,
    '-': v => v - control.increment,
    default: v => v,
  };

  const newValue = (operations[type] || operations.default)(control.value);
  return newValue >= control.min && newValue <= control.max
    ? newValue
    : control.value;
};

const handleSender = ({ control: controlIndex, type }) => controls.map((currentControl, index) =>
  index === controlIndex
    ? { ...currentControl, value: updateValue(currentControl, type) }
    : currentControl
);

let latestUpdate = new Date();

nextApp.prepare().then(() => {
  const app = express();
  const httpServer = http.Server(app);
  const io = socket(httpServer);

  app.get('*', (req, res) => {
    return nextRequestHandler(req, res);
  });

  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.emit('controls', controls);

    socket.on('sender', function (msg) {
      console.log('message:', msg);
      controls = handleSender(msg);
      socket.emit('controls', controls);
      const now = new Date();
      if(now - latestUpdate >= 200) {
        socket.broadcast.emit('controls', controls);
        latestUpdate = now;
      }
    });
  });

  httpServer.listen(port, '0.0.0.0', err => {
    if (err) { throw err }
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch(console.error);
