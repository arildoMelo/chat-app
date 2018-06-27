var socket = io();
socket.on('connect', function () {
    console.log('Connected to Server');
    socket.emit('createMessage', {
        from:'Client',
        text:'Hi from client'
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function(msg){
    console.log('new Message received: ', msg);
})