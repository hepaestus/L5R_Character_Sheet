angular.module('myApp').controller('SkillsModalListController', ['$scope', '$element', 'skillsMasterList', 'close', 'modalMessage', 'filterBy', 'rank', 'skillSearchText', 'DataService', function($scope, $element, skillsMasterList, close, modalMessage, filterBy, rank, skillSearchText, DataService) {

  $scope.skillsMasterList = skillsMasterList;
  $scope.modalMessage = modalMessage;
  $scope.rank = rank;
  $scope.skillSearchText = skillSearchText;
  $scope.filterBy = filterBy;
  $scope.selectedSkillId = null;
  $scope.selectedSkillRank = null;

  $scope.done = function() {
    close($scope.selectedSkillId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectSkill = function(skillId, rank) {
    if ( ! DataService.doesCharacterHaveSkill( skillId) ) {    
      //console.log("Select Skill :" + skillId + " Rank: " + rank);
      $scope.selectedSkillId = skillId;
      $scope.selectedSkillRank = rank;
      $element.modal('hide'); // Let bootstrap know we are done with the modal
      if ( $scope.selectedSkillRank == null ) {
        //console.log("Rank is null Close as Skill id");
        close($scope.selectedSkillId, 500);
      } else {
        //console.log("Rank is NOT null Close with OBJECT");
        close({id:$scope.selectedSkillId, rank:$scope.selectedSkillRank}, 500);
      }
    } else {
      console.log("You already have that skill.");
    }
  };

}]);
