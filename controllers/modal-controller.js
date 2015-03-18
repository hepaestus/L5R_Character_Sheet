  angular.module('myApp').controller('ModalController', ['$scope', 'close', function($scope, close) {
    // when you need to close the modal, call close
    $scope.close = function(result) {
      console.log("ModalController Result: " + result);
      close(result, 550); 
    };
  }]);//end ModalController
