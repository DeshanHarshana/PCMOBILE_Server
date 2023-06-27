// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: '*' }
});

const port =process.env.PORT |  5000; // Change this to the desired port number


// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log(message)
    // Handle the received message and broadcast it to other connected clients
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
