const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: '*'
  }
};
const io = require("socket.io")(httpServer, options);

app.use(cors());

io.on("connection", socket => {
  console.log(`user connected with id ${socket.id}`)

  socket.on('entry', (payload) => {
    console.log(payload)
    io.emit('clientUser', payload)
    // socket.broadcast.emit('clientUser', payload)
  })

  socket.on('play', (payload, room) => {
    console.log(payload, room)
  })

  socket.on('joinRoom', (room) => {
    console.log(`user with id ${socket.id} has joined room ${room}`)
    socket.join(room)
  })


});

httpServer.listen(port, () => console.log(`app run on ${port}`));
