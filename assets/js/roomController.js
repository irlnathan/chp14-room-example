angular.module('roomApp', []);
angular.module('roomApp').controller('roomController', ['$scope', '$http', function($scope, $http) {

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                  
                                                  
*/

  $scope.messages = [];

  // Handle socket events that are fired when a new chat message is sent.
  io.socket.on('message', function (e) {
    console.log("hi");

    $scope.messages.push(e.msg);

    // Because io.socket.on() is not an angular thing, we have to call $scope.$apply()
    // in this event handler in order for our changes to the scope to actually take effect.
    $scope.$apply();
  });

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.join = function() {

    io.socket.get('/room/join', function(data, jwr){

      if (jwr.statusCode !== 200) {
        console.error(JWR);
        return;
      }
    });
  };

  $scope.leave = function() {

    io.socket.get('/room/leave', function(data, jwr){

      if (jwr.statusCode !== 200) {
        console.error(JWR);
        return;
      }
    });
  };

  $scope.sendMessage = function() {

    io.socket.get('/room/sendMessage', function(data, jwr){

      if (jwr.statusCode !== 200) {
        console.error(JWR);
        return;
      }
    });
  };

}]);