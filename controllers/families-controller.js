angular.module('myApp').controller('FamiliesController', ['$scope', '$element', 'familiesMasterList', 'close', 'modalMessage', 'filterBy', function($scope, $element, familiesMasterList, close, modalMessage, filterBy) {

  $scope.familiesMasterList = familiesMasterList;
  $scope.modalMessage = modalMessage
  $scope.filterBy = filterBy;
  $scope.selectedFamilyId = null;

  $scope.done = function() {
    close($scope.selectedFamilyId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectFamily = function(familyId) {
    $scope.selectedFamilyId = familyId;
    console.log("Select Family " + $scope.selectedFamilyId);
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedFamilyId, 500);
  };

}]);
