
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

    socket.emit('newMessage', {
        from: "Admin",
        text: 'Welcome to the chat app',
        createAt:new Date()
    });

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: 'New User joined',
        createAt:new Date()
    });

    socket.on('createMessage', (msg) => {
        console.log('create msg', msg);
        io.emit('newMessage', {
            from:msg.from,
            text:msg.text,
            createAt:new Date()
        });
        //socket.broadcast.emit('newMessage', {
        //    from:msg.from,
        //    text:msg.text,
        //    createAt:new Date()
        //});
    });
    
    socket.on('disconnect', function(){
        console.log('User was disconnected');
    });
});

var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server running on port: %d', port);
});

