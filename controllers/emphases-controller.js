angular.module('myApp').controller('EmphasesController', ['$scope', '$element', 'emphasesList', 'close', 'modalMessage', 'filterBy', function($scope, $element, emphasesList, close, modalMessage, filterBy) {

  $scope.emphasesList = emphasesList;
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
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedEmphasisId, 500);
  };

}]);
