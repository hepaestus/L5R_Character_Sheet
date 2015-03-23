angular.module('myApp').controller('ClansController', ['$scope', '$element', 'clansMasterList', 'close', function($scope, $element, clansMasterList, close) {

  $scope.clansMasterList = clansMasterList;
  $scope.selectedClanId = null;

  $scope.done = function() {
    close($scope.selectedClanId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectClan = function(clanId) {
    console.log("Select Clan " + clanId);
    $scope.selectedClanId = clanId;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedClanId, 500);
  };

}]);
