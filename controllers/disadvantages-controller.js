angular.module('myApp').controller('DisadvantagesController', ['$scope', '$element', 'disadvantagesMasterList', 'close', 'DataService', function($scope, $element, disadvantagesMasterList, close, DataService) {

  $scope.disadvantagesMasterList = disadvantagesMasterList;
  $scope.selectedDisadvantageId = null;

  $scope.done = function() {
    close($scope.selectedDisadvantageId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectDisadvantage = function(disadvantageId) {
    if ( ! DataService.doesCharacterHaveDisadvantage( disadvantageId) ) {    
      console.log("Select Disadvantage " + disadvantageId);
      $scope.selectedDisadvantageId = disadvantageId;
      $element.modal('hide'); // Let bootstrap know we are done with the modal
      close($scope.selectedDisadvantageId, 500);
    } else {
      console.log("You already have that disadvantage.");
    }
  };

}]);
