var socket = io();

function scrollToBottom(){
    var messages = $('#messages');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');

    var newMessage = messages.children('li:last-child');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();


    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err){
            alert(err)
            window.location.href = '/'
        }else{
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function(msg){
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text:msg.text,
        from: msg.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(msg){
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url:msg.url,
        from: msg.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('updateUserList', function(users){
    var ol = $('<ol></ol>');
    users.forEach(function(user){
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
})

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = $('[name=message]')
    socket.emit('createMessage', {
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