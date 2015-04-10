angular.module('myApp').controller('AdvantagesController', ['$scope', '$element', 'advantagesMasterList', 'close', function($scope, $element, advantagesMasterList, close) {

  $scope.advantagesMasterList = advantagesMasterList;
  $scope.selectedAdvantageId = null;

  $scope.done = function() {
    close($scope.selectedAdvantageId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectAdvantage = function(advantageId) {
    console.log("Select Advantage " + advantageId);
    $scope.selectedAdvantageId = advantageId;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedAdvantageId, 500);
  };

}]);
