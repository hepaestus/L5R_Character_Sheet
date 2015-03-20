angular.module('myApp').controller('CharacterLoadController', ['$scope', 'characterLoadList', 'close', 'modalMessage', 'filterBy', 'LoadCharacterService', 'DataService', function($scope, characterLoadList, close, modalMessage, filterBy, LoadCharacterService, DataService) {

  $scope.test = "CharacterLoadController";
  $scope.characterLoadList = characterLoadList;
  $scope.modalMessage = modalMessage;
  $scope.filterBy = filterBy;
  $scope.selectedCharacterLoadId = null;

  $scope.done = function() {
    close($scope.selectedCharacterLoadId, 500); 
  };

  $scope.cancel = function() {
    close(null, 500); 
  };

  $scope.selectCharacterLoad = function(schoolId) {
    console.log("Select CharacterLoad " + schoolId);
    $scope.selectedCharacterLoadId = schoolId;
  };

  $scope.removeSavedCharacter = function(date_string) {
    console.log("Remove Index : " + date_string );
    LoadCharacterService.deleteSavedCharacter(date_string);
    $scope.characterLoadList = LoadCharacterService.loadCharacters();      
  };

  $scope.loadSavedCharacter = function(index) {
    //console.log("Old Character : " + JSON.stringify($scope.character));
    console.log("Load Saved Character : " + index);
    var loadChar = LoadCharacterService.getSavedCharacter(index);
    console.log("Loaded Character : " + JSON.stringify(loadChar));
    DataService.updateCharacter(loadChar);
    console.log("New? Character : " + JSON.stringify($scope.character));
  };
    
}]);
