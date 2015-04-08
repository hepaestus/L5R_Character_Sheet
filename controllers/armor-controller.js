angular.module('myApp').controller('ArmorController', ['$scope', '$element', 'armorMasterList', 'close', function($scope, $element, armorMasterList, close) {

  $scope.armorMasterList = armorMasterList;
  $scope.selectedArmorId = null;

  $scope.done = function() {
    close($scope.selectedArmorId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectArmor = function(armorId) {
    console.log("Select armor " + armorId);
    $scope.selectedArmorId = armorId;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    close($scope.selectedArmorId, 500);
  };

}]);
