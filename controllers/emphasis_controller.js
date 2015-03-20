angular.module('myApp').controller('EmphasisController', ['$scope', 'emphasisList', 'close', 'modalMessage', 'filterBy', function($scope, emphasisMasterList, close, modalMessage, filterBy) {

  $scope.emphasisList = emphasisList;
  $scope.modalMessage = modalMessage;
  $scope.filterBy = filterBy;
  $scope.selectedEmphasisId = null;

  $scope.done = function() {
    close($scope.selectedEmphasisId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectEmphasis = function(emphasisId) {
    console.log("Select Emphasis " + emphasisId);
    $scope.selectedEmphasisId = emphasisId;
  };

}]);
