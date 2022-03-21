'use strict'

const app = require('express')();
const serverHttp = require('http').Server(app);
const io = require('socket.io')(serverHttp, {
    cors: {
        origin: true,
        credentials: true,
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('send-message', (data) => {
        socket.broadcast.emit('new-message', data);
    })
})

serverHttp.listen(3000, () => {
    console.log('Servidor http corriendo en el puerto 3000');
})
