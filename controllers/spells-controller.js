  angular.module('myApp').controller('SpellsController', ['$scope', 'DataService', 'ModalService', function($scope, DataService, ModalService) {

    $scope.test = "Spells Controller";
    $scope.spellSearchFilter;
    $scope.spellSearchText = "";
    $scope.character = DataService.character();

    $scope.spellsMasterList = DataService.spellsMasterList();

    $scope.showSpellsListModal = function(message, searchText) {
      ModalService.showModal({
        templateUrl: "templates/spell_list.html",
        controller: "SpellsController",
        inputs : {
          message: message,
          spellSearchFilter: searchText,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("Show Result: " + result);
        });
      }); 
    };

    $scope.close = function(result) {
      console.log("SpellsController Result: " + result);
      close(result, 550); 
    };

    $scope.showSpellsList = false;

    $scope.toggleShowSpellsList = function() {
      $scope.showSpellsList = !$scope.showSpellsList;
      $scope.spellSearchFilter = null;      
    };

    $scope.getSpell = function (spell_id,attr) {
        return DataService.getSpellFromMasterList(spell_id, attr);
    };

    $scope.addSpell = function(spell_id) {
      var master_spell = DataService.getSpellFromMasterList(spell_id);
      if( master_spell ) {
        var new_id = master_spell.id;
        //var new_roll = master_spell.roll;
        //var new_spell = {id:new_id, roll:new_roll};
        var new_spell = {id:new_id}; // roll:new_roll};
        //$scope.character.spells.push( $scope.spellsMasterList[index]) ;
        if ( getCharacterSpellById(spell_id) === null) {
          $scope.character.spells.push( new_spell ) ;
          close(true, 500); // ATTEMP! to close the modal window.
          $scope.character = DataService.updateCharacter($scope.character);
        }
      } else {
        console.log("Spell " + spell_id + " Not Found");
      }
    };

    $scope.removeSpell = function(spell_id) {
      for( var i=0; i < $scope.character.spells.length; i++) {
        if ( $scope.character.spells[i].id == spell_id ) {
          $scope.character.spells.splice(i,1);
          $scope.character = DataService.updateCharacter($scope.character);
        }
      }
    };

    var getCharacterSpellById = function(spell_id) {
      for(var i = 0; i < $scope.character.spells.length; i++) {
        if ( $scope.character.spells[i] != undefined ) {
          if ( $scope.character.spells[i].id === spell_id ) {
            return $scope.character.spells[i];
          }
        }
      }
      return null;
    };

    var rebuildSpells = function() {
      for ( var i = 0; i < $scope.character.spells.length; i++) {
        Object.defineProperty(scope.character.spells[i], 'roll', { get: function() { return spellRoll(this); }});
      }
    };
    $scope.$watch('$scope.character.spells', rebuildSpells);


  }]);//end SpellsController
