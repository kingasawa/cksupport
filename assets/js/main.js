$(function() {
  var socket = io.sails.connect();
  socket.on('add/show', function(data){
    console.log(data.msg);
  });
  socket.on('client/disconnect',function(data) {
    console.log('client vừa disconnect')
  });
});
