var socket = io();
socket.on('connect', function () {
    console.log('Connected to Server');
    
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function(msg){
    console.log('new Message received: ', msg);
    var li = $('<li></li>');
    li.text(msg.from + ': ' + msg.text);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from:'client', 
        text:$('[name=message]').val()
    }, function(data){
        console.log(data);
    });
})