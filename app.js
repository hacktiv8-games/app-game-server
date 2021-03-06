const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

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
    io.emit('clientUser', payload)
    // socket.broadcast.emit('clientUser', payload)
  })

  socket.on('createRoom', (payload) => {
    io.emit('clientRoom', payload)
  })

  socket.on('playRoom', (payload, room) => {
    if (!room) socket.broadcast.emit('clientPlay', payload);
    else socket.to(room).emit('clientPlay', payload);
  })

  socket.on('joinRoom', (payload) => {
    console.log(`User ${socket.id} sudah join ke room ${payload.toJoin}`)
    if (payload.toLeave) socket.leave(payload.toLeave)
    socket.join(payload.toJoin)
    io.emit('clientJoin', payload.username)
  })

  socket.on('createWord', (payload, room) => {
    if (!room) socket.broadcast.emit('clientWord', payload)
    else socket.to(room).emit('clientWord', payload)
  })

  socket.on('setScore', (payload, room) => {
    if (!room) socket.broadcast.emit('clientScore', payload)
    else socket.to(room).emit('clientScore', payload)
  })

  socket.on('serverTimer', (payload, room) => {
    if (!room) socket.broadcast.emit('clientTimer', payload)
    else socket.to(room).emit('clientTimer', payload)
  })

});

httpServer.listen(port, () => console.log(`app run on ${port}`));
