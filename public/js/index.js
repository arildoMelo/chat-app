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

socket.on('newLocationMessage', function(msg){
    console.log('new Message received: ', msg);
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(msg.from + ': ');
    a.attr('href', msg.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = $('[name=message]')
    socket.emit('createMessage', {
        from:'client', 
        text:messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    });
});

var locationButton = $('#sendLocation');

locationButton.click(function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by Your Browser');
    }
    locationButton.attr('disable', 'disable').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disable').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function(data){
            console.log(data);
        });
    }, function(){
        locationButton.removeAttr('disable').text('Send Location');
        alert('Unable to fetch location');
    })
});