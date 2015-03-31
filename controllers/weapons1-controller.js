angular.module('myApp').controller('WeaponsOneController', ['$scope', '$element', 'weaponsMasterList', 'close', function($scope, $element, weaponsMasterList, close) {

  $scope.weaponsMasterList = weaponsMasterList;
  $scope.selectedWeaponOneId = null;

  $scope.done = function() {
    close($scope.selectedWeaponOneId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectWeapon = function(weaponOneId) {
    console.log("Select WeaponOne " + weaponOneId);
    $scope.selectedWeaponOneId = weaponOneId;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedWeaponOneId, 500);
  };

}]);
