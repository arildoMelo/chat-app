
require('dotenv').config({ silent: true });

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New user Connected ');
    socket.on('disconnect', function(){
        console.log('User was disconnected');
    });

    socket.emit('newMessage', {
        from:'Server',
        text:'Hi from server',
        createAt: new Date()
    });

    socket.on('createMessage', (msg) => {
        console.log('create msg', msg);
    })
});

var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server running on port: %d', port);
});

