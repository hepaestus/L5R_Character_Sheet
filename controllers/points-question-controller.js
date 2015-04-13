angular.module('myApp').controller('PointsQuestionController', ['$scope', '$element', 'pointsMasterList', 'close', function($scope, $element, pointsMasterList, close) {

  $scope.pointsMasterList = pointsMasterList;
  $scope.selectedValue = null;

  $scope.done = function() {
    close($scope.selectedValue, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectPoints = function(value) {
    console.log("Select Value " + value);
    $scope.selectedValue = value;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedValue, 500);
  };

}]);
