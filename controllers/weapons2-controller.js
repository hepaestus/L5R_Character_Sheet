angular.module('myApp').controller('WeaponsTwoController', ['$scope', '$element', 'weaponsMasterList', 'close', function($scope, $element, weaponsMasterList, close) {

  $scope.weaponsMasterList = weaponsMasterList;
  $scope.selectedWeaponTwoId = null;

  $scope.done = function() {
    close($scope.selectedWeaponTwoId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectWeapon = function(weaponTwoId) {
    console.log("Select WeaponTwo " + weaponTwoId);
    $scope.selectedWeaponTwoId = weaponTwoId;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedWeaponTwoId, 500);
  };

}]);
