'use strict';

angular.module('whtodropApp')
  .controller('MainCtrl', function ($scope, $http,GeoCoder,NgMap,socket) {


    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });


    socket.emit('serveConnected');

    var droneConnected = -1;
    var socketId = 0;
    socket.on('newDroneConnected', function () {
   
      droneConnected++;
    });

    socket.on('zoneChoosed',function(data){
      alert(data);
    })

   var init = false;

  $scope.commandes = [];

    $http.get('/api/commandes').success(function(commandes) {
      $scope.commandes = commandes;

    });
    $scope.commandeindex = 5;
    $scope.getAdresse = function(){
          $scope.commandeindex++;

    };


    $scope.getCoordiante = function(){


      var cntr = 0;

      function next() {
        if (cntr < $scope.commandes.length) {

          GeoCoder.geocode({address: $scope.commandes[cntr].adresse}).then(function(result) {

            //console.log($scope.commandes[0]);
            console.log(result);
            $scope.commandes[cntr].lat= result[0]['geometry'].location.lat();
            $scope.commandes[cntr].lng=result[0]['geometry'].location.lng();

           // $scope.commandes[cntr].
            cntr++;

            if(droneConnected>=0)
            {
           
              socket.emit('getPosition',{latitude:result[0]['geometry'].location.lat().toString(),longitude:result[0]['geometry'].location.lng().toString(),socketId:socketId})
              droneConnected--;
              socketId++;
            }

            next();
          },function(error){
            $scope.commandes[cntr].error = true;
            $scope.commandes[cntr].lat = "error";
            $scope.commandes[cntr].lng = "error";
            cntr++;
            next();

          });
        }
      }
      if(init!=true) {
        init = true;
        next();
      }
    };

  });
