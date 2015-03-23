angular.module('myApp').controller('SchoolsController', ['$scope', '$element', 'schoolsMasterList', 'close', 'modalMessage', 'filterBy', function($scope, $element, schoolsMasterList, close, modalMessage, filterBy) {

  $scope.schoolsMasterList = schoolsMasterList;
  $scope.modalMessage = modalMessage;
  $scope.filterBy = filterBy;
  $scope.selectedSchoolId = null;

  $scope.done = function() {
    close($scope.selectedSchoolId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectSchool = function(schoolId) {
    console.log("Select School " + schoolId);
    $scope.selectedSchoolId = schoolId;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedSchoolId, 500);
  };

}]);
