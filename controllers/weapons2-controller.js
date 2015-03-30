angular.module('myApp').controller('WeaponsTwoController', ['$scope', '$element', 'weaponsTwoMasterList', 'close', function($scope, $element, weaponsTwoMasterList, close) {

  $scope.weaponsTwoMasterList = weaponsTwoMasterList;
  $scope.selectedWeaponTwoId = null;

  $scope.done = function() {
    close($scope.selectedWeaponTwoId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectWeaponTwo = function(weaponTwoId) {
    console.log("Select WeaponTwo " + weaponTwoId);
    $scope.selectedWeaponTwoId = weaponTwoId;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedWeaponTwoId, 500);
  };

}]);
