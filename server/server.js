
require('dotenv').config({ silent: true });

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');

var publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New user Connected ');

    socket.emit('newMessage', generateMessage("Admin",'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage("Admin",'New User joined'));

    socket.on('createMessage', (msg, callback) => {
        console.log('create msg', msg);
        io.emit('newMessage', generateMessage(msg.from,msg.text));
        callback('This is an ack from the server');
    });

    socket.on('createLocationMessage', (coords, callback) => {
        console.log('create location msg', coords);
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
        callback('This is an ack from the server');
    });
    
    socket.on('disconnect', function(){
        console.log('User was disconnected');
    });
});

var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server running on port: %d', port);
});

