const express = require('express');
const socketio = require('socket.io')
const cors = require('cors');
const app = express();

app.use(cors());
const server = app.listen(process.env.PORT || 3000, ()=>{
console.log("server is running at port:3000");
});
const io = socketio(server, {
   cors: {
     origin: "*",
     methods: ["GET", "POST"],
   }
 });

io.on("connection", (socketio)=> {
   console.log("new user connected")

   socketio.username = "Anonymous";

   socketio.on("change_username", data => {
     socketio.username = data.username;
   });

   socketio.on("new_message", data => {
      console.log('new message')
      io.sockets.emit("receive_message", { message: data.message, username: socketio.username })

    });

    socketio.on("typing", ()=>{
       socketio.broadcast.emit('typing', { username: socketio.username })
    })

});

