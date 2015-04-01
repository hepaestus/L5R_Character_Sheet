angular.module('myApp').controller('ArrowsController', ['$scope', '$element', 'arrowsMasterList', 'num', 'close', function($scope, $element, arrowsMasterList, num, close) {

  $scope.arrowsMasterList = arrowsMasterList;
  $scope.selectedArrowId = null;

  $scope.done = function() {
    close($scope.selectedArrowId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectArrow = function(arrowId) {
    console.log("Select Arrow " + arrowId);
    $scope.selectedArrowId = arrowId;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedArrowId, 500);
  };

}]);
