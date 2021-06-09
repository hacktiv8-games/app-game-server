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
});

httpServer.listen(port, () => console.log(`app run on ${port}`));
