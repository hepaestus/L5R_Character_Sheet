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

  $scope.selectCharacterLoad = function(charId) {
    //console.log("Select CharacterLoad " + charId);
    $scope.selectedCharacterLoadId = charId;
  };

  $scope.removeSavedCharacter = function(date_string) {
    //console.log("Remove Index : " + date_string );
    LoadCharacterService.deleteSavedCharacter(date_string);
    $scope.characterLoadList = LoadCharacterService.loadCharacters();      
  };

  $scope.loadSavedCharacter = function(index) {
    //console.log("Load Saved Character : " + index);
    var loadChar = LoadCharacterService.getSavedCharacter(index);
    return DataService.updateCharacter(loadChar);    
  };
    
}]);
