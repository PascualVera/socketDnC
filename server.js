
// Puerto express
let puertoSocket = process.env.PORT || 3000;

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
    });
    socket.on('send-escribiendo', (data) => {
        socket.emit('new-escribiendo', data);
        socket.broadcast.emit('new-escribiendo', data);
    });
})

serverHttp.listen(puertoSocket, () => {
    console.log(`Servidor http corriendo en el puerto ${puertoSocket}`);
})
