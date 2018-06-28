
require('dotenv').config({ silent: true });

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New user Connected ');

    
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString)
            return callback('Name and Room name is required.');
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.adduser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage("Admin",'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin",`${params.name} has joined`));
        callback();
    })

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
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
        console.log('User was disconnected');
    });
});

var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server running on port: %d', port);
});

