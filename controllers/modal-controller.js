  angular.module('myApp').controller('ModalController', ['$scope', 'close', 'dataOne', 'dataTwo', 'dataThree', function($scope, close, dataOne, dataTwo, dataThree) {
    // when you need to close the modal, call close
    
    $scope.dataOne = dataOne;
    $scope.dataTwo = dataTwo;
    $scope.dataThree = dataThree;
    
    $scope.close = function(result) {
      console.log("ModalController Result: " + result);
      close(result, 550); 
    };

  }]);//end ModalController
