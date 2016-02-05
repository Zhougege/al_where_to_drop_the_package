/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var fs = require('fs');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
var io = require('socket.io')(server);
var ss = require('socket.io-stream');


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


server.listen(8999, "localhost", function () {
  console.log('Express server listening on %d, in %s mode', 8999, app.get('env'));
});

/*
io.on('connection', function (socket) {

  socket.emit('postionImage', {url:"http://localhost:9000/assets/images/drone-picture.jpg"});


});*/

var socket_serve = null;
var sockets_drone = [];
var sockets_client = [];
var socket_drone_Id = 0;
var socket_client_Id = 0;

io.on('connection', function (socket) {
 /*
 data:{droneId,latitude,longitude}
 */
  socket.on('getPosition',function(data){
      console.log("Send address coordinate to drone "+data.socketId+" : ",data);
      sockets_drone[data.socketId].emit('sendPosition', data);
  });

  socket.on('clientConnected',function(){
    console.log("Client "+socket_client_Id+" is connected");
    sockets_client[socket_client_Id++]=socket;
  })

/*
 data:{droneId}
 */
  socket.on('droneConnected',function(){
      console.log("Drone "+socket_drone_Id+" is connected");
      sockets_drone[socket_drone_Id++]=socket;
      socket_serve.emit('newDroneConnected');
  })


  
  socket.on('serveConnected',function(){
    socket_serve = socket;
  })


/*  socket.on('zoneChoosed',function(data){
 
    console.log("Image recieved and stored in the server")
    fs.writeFile("./client/assets/images/drone-picture.jpg", new Buffer(data, "base64"), function(err) {})

    socket_client.emit('positionImage', {url:"http://localhost:9000/assets/images/drone-picture.jpg"});
     socket.on('rectanglePosition',function(data){
       console.log(data);

      socket.on('socketDroneId',function(socketId){
          datsockets_clienta.socketId = socketId;
          sockets_client[socketId].emit('rectanglePosition',data);
      })

   
      });

  })*/

  socket.on('socketDroneId',function(socketId){
    socket.on('zoneChoosed',function(data){
          console.log("Image from drone " +socketId+ " recieved and stored in the server")
          fs.writeFile("./client/assets/images/drone-picture-"+socketId+".jpg", new Buffer(data, "base64"), function(err) {})
          sockets_client[socketId].emit('positionImage',{url:"http://localhost:9000/assets/images/drone-picture-"+socketId+".jpg",socketId:socketId})
          socket.on('rectanglePosition',function(data){
               sockets_client[socketId].emit('rectanglePosition',data);
          })

    })
  })


  socket.on('newRectanglePosition',function(data){
    console.log("newposition of rectangle from client "+data.socketId+":", data);
    sockets_drone[data.socketId].emit('newRectanglePosition',data);
  });


 

 
});


// Expose app
exports = module.exports = app;
