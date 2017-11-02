var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`)
  $('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

  socket.on('newLocationMessage', function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
  })


$('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'user',
      text: $('[name=message]').val()
    }, function(){

    })
})

var locationButton = $('#send-location');

locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('incompatible browser, upgrade!');
  }

  navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function(){
    alert('unable to fetch location');
  })

})



// $('#message-form').on('submit', function (e) {
//   e.preventDefault();
//
//   socket.emit('createMessage', {
//     from: 'User',
//     text: $('[name=message]').val()
//   }, function () {
//
//   });
// });