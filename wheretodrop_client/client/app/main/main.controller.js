'use strict';
(function() {

  function MainController($scope, $http,socket) {


    $(".square").hide().css('height', '100px').css('width', '100px');


    $('.draggable').draggable({
      containment: $('.picture-container')
    });

    var socketId = null;

    socket.on('positionImage',function(data){
      console.log("I got drone image from drone "+data.socketId);
      socketId=data.socketId;
      $(".picture-container img").attr('src',data.url);

    })

    socket.on('rectanglePosition',function(data){
      var p1,p2;
      p1 = data.split(":")[0] + "px";
      p2 = data.split(":")[1] + "px";

     $('.square').css('left', p1).css('top', p2).show();

    });

    socket.emit('clientConnected');



    $('.btn_send').click(function() {
    console.log("get rectangle position to send to drone "+socketId);
    socket.emit('newRectanglePosition',{left:$('.square').position().left,top:$('.square').position().top,socketId:socketId});
      $('.left_pos').text($('.square').position().left);
      $('.top_pos').text($('.square').position().top);

      $('.suggestion div:first').hide();
      $('.result').removeClass('hidden');


    });
  }

angular.module('wheretodropClientApp')
  .controller('MainController', MainController);

})();
