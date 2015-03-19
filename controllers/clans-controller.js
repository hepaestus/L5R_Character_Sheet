angular.module('myApp').controller('ClansController', ['$scope', 'clansMasterList', 'close', function($scope, clansMasterList, close) {

  $scope.clansMasterList = clansMasterList;
  $scope.selectedClanId = null;

  $scope.done = function() {
    close($scope.selectedClanId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectClan = function(clanId) {
    $scope.selectedClanId = clanId;
  };

  

}]);