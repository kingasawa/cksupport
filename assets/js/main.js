$(function() {
  // function openNav() {
  //   document.getElementById("mySidenav").style.width = "250px";
  //   document.getElementById("main").style.marginLeft = "250px";
  // }
  //
  // function closeNav() {
  //   document.getElementById("mySidenav").style.width = "50px";
  //   document.getElementById("main").style.marginLeft= "50px";
  // }
  $('#leftSidenav a.close-btn').click(function(){
    $('#leftSidenav').css('width','50px');
    $('#mainSidenav').css('margin-left','50px');
    $(this).addClass('sr-only');
    $('#leftSidenav a.open-btn').removeClass('sr-only')
  });

  $('#leftSidenav a.open-btn').click(function(){
    $('#leftSidenav').css('width','250px');
    $('#mainSidenav').css('margin-left','250px');
    $(this).addClass('sr-only');
    $('#leftSidenav a.close-btn').removeClass('sr-only')
  });

  var socket = io.sails.connect();
  socket.on('add/show', function(data){
    console.log(data.msg);
    $('#guest-info-table tbody').append('<tr class="guest'+data.msg.name+'"><td class="guest-name">Guest'+data.msg.name+'</td>' +
      '<td class="guest-ip">'+data.msg.ip+'</td>' +
      '<td class="guest-title"><a href="'+data.msg.url+'">'+data.msg.title+'</a></td>' +
      '<td class="guest-browser">browser</td>' +
      '<td class="guest-status">'+data.msg.status+'</td>' +
      '</tr>')
  });
  socket.on('update/url',function(data) {
    $('#guest-info-table tbody tr.guest'+data.msg.name).find('td.guest-title').html('<a href="'+data.msg.url+'">'+data.msg.title+'</a>');
    $('#guest-info-table tbody tr.guest'+data.msg.name).find('td.guest-status').text(data.msg.status)
  });
  socket.on('update/stt',function(data) {
    $('#guest-info-table tbody tr.guest'+data.msg.name).find('td.guest-status').text(data.msg.status)
  });
  socket.on('client/disconnect',function(data) {
    console.log('client vừa disconnect')
  });

});
