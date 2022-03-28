
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
    // Eventos mensajes chat
    socket.on('send-message', (data) => {
        socket.broadcast.emit('new-message', data);
    });
    socket.on('send-escribiendo', (data) => {
        socket.emit('new-escribiendo', data);
        socket.broadcast.emit('new-escribiendo', data);
    });
    // Evento cambio mapa desde master
    socket.on('send-map', (data) => {
        socket.broadcast.emit('new-map', data);
    });
    // Evento puntos de vida modificados en master para actualizarlos por el player correspondiente
    socket.on('send-hitpoints', (data) => {
        socket.broadcast.emit('new-hitpoints', data);
    });
    // Evento finalizar campaña desde master para devolver a los players a perfil
    socket.on('send-finalizar', (data) => {
        socket.broadcast.emit('new-finalizar', data);
    });
    // Evento para controlar si un usuario está en estado playing
    socket.on('send-playing', (data) => {
        socket.broadcast.emit('new-playing', data);
    });
    // Evento para refrescar numPlayers y array players chat cuando se unen o abandonan
    socket.on('send-masmenosplayer', (data) => {
        socket.broadcast.emit('new-masmenosplayer', data);
    });
})

serverHttp.listen(puertoSocket, () => {
    console.log(`Servidor http corriendo en el puerto ${puertoSocket}`);
})
