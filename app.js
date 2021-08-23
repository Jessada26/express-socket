const express = require('express');
const socketio = require('socket.io')
const cors = require('cors');
const app = express();

app.use(cors());
const server = app.listen(process.env.PORT || 3000, ()=>{
console.log("server is running at port:3000");
});
const io = socketio(server);
io.on("connection", (socketio)=>{
   console.log("new user connected")
});