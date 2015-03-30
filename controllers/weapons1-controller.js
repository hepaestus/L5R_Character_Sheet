angular.module('myApp').controller('WeaponsOneController', ['$scope', '$element', 'weaponsOneMasterList', 'close', function($scope, $element, weaponsOneMasterList, close) {

  $scope.weaponsOneMasterList = weaponsOneMasterList;
  $scope.selectedWeaponOneId = null;

  $scope.done = function() {
    close($scope.selectedWeaponOneId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectWeaponOne = function(weaponOneId) {
    console.log("Select WeaponOne " + weaponOneId);
    $scope.selectedWeaponOneId = weaponOneId;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedWeaponOneId, 500);
  };

}]);
