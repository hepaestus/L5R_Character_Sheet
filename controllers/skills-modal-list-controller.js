angular.module('myApp').controller('SkillsModalListController', ['$scope', '$element', 'skillsMasterList', 'close', 'modalMessage', 'filterBy', 'skillSearchText', function($scope, $element, skillsMasterList, close, modalMessage, filterBy, rank, skillSearchText) {

  $scope.skillsMasterList = skillsMasterList;
  $scope.modalMessage = modalMessage;
  $scope.rank = rank;
  $scope.skillSearchText = skillSearchText;
  $scope.filterBy = filterBy;
  $scope.selectedSkillId = null;
  $scope.selectedSkillRank = null;

  console.log("SkillsModalListController Rank: " + rank + " Message: " + modalMessage + " FilterBy: " + filterBy + " skillSearchText:" + skillSearchText );

  $scope.done = function() {
    close($scope.selectedSkillId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectSkill = function(skillId, rank) {
    console.log("Select Skill :" + skillId + " Rank: " + rank);
    $scope.selectedSkillId = skillId;
    $scope.selectedSkillRank = rank;
    $element.modal('hide'); // Let bootstrap know we are done with the modal
    if ( $scope.selectedSkillRank == null ) {
      close($scope.selectedSkillId, 500);
    } else {
      close({id:$scope.selectedSkillId, rank:$scope.selectedSkillRank}, 500);
    }
  };

}]);
