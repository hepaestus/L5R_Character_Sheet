  angular.module('myApp').controller('MainController', ['$scope', '$cookieStore', 'ModalService', 'DataService', 'LoadCharacterService', function($scope, $cookieStore, ModalService, DataService, LoadCharacterService) {

    $scope.test = "Main Controller";
    
    $scope.character = {name:'test'};
    $scope.character = DataService.character();
    
    $scope.show = function() {
      ModalService.showModal({
        templateUrl: "templates/modal.html",
        controller: "ModalController",
        inputs : {
          dataOne: "Foo Bar",
          dataTwo: "Flim Flam",
          dataThree: ['Aaa', 'Bbb', 'Ccc'],
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
      console.log("MainController Result: " + result);
      close(result, 500); 
    };

    $scope.clansMasterList = DataService.clansMasterList();
    //console.log("Clans MasterList: " + $scope.clansMasterList);

    $scope.showClansListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/clans_list.html",
        controller: "MainController",
        inputs : {
          modalMessage: message,
          filterBy: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          $scope.selectClan(result); 
          console.log("Show Result: " + result);
        });
      }); 
    };

    $scope.selectClan = function(id) {
      console.log("Select Clan : " + id );
      $scope.character.clan_id = id;
      $scope.character = DataService.updateCharacter($scope.character);
      $scope.close(true, 500); 
    };

    $scope.familiesMasterList = DataService.familiesMasterList();
    //console.log("Families MasterList: " + $scope.familiesMasterList);

    $scope.showFamiliesListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/family_list.html",
        controller: "MainController",
        inputs: {
          modalMessage : message,
          filterBy : filterBy, 
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("Show Result: " + result);
        });
      }); 
    };
    
    $scope.selectFamily = function(id) {
      console.log("Select Family : " + id );
      $scope.character.family_id = id;
      $scope.calculateBonus( DataService.getFamilyFromMasterList(id).bonus );
      $scope.character = DataService.updateCharacter($scope.character);      
    };

    $scope.schoolsMasterList = DataService.schoolsMasterList();
    //console.log("Schools MasterList: " + $scope.schoolsMasterList);

    $scope.showSchoolsListModal = function() {
      ModalService.showModal({
        templateUrl: "templates/school_list.html",
        controller: "MainController",
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("Show Result: " + result);
        });
      }); 
    };

    $scope.selectSchool = function(id) {
      console.log("Select School : " + id );
      $scope.character.school_id = id;
      $scope.calculateBonus( DataService.getSchoolFromMasterList(id).bonus );
      $scope.character = DataService.updateCharacter($scope.character);
    };

    $scope.skillsMasterList = DataService.skillsMasterList();
    //console.log("Skills MasterList: " + $scope.skilllsMasterList);

    $scope.showSkillsListModal = function(message, searchText) {
      ModalService.showModal({
        templateUrl: "templates/skill_list.html",
        controller: "MainController",
        inputs : {
          modalMessage : message,
          skillSearchText : searchText,          
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("Show Result: " + result);
        });
      }); 
    };

    $scope.saved_characters_array = LoadCharacterService.loadCharacters();

    $scope.loadCharacterModal = function() {
      console.log("Loaded Characters : " + $scope.saved_characters_array);
      ModalService.showModal({
        templateUrl: "templates/character_load.html",
        controller: "MainController",
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("loadCharacterModal Result: " + result);
        });
      }); 
    };

    $scope.loadSavedCharacter = function(index) {
      //console.log("Old Character : " + JSON.stringify($scope.character));
      //console.log("Load Saved Character : " + index);
      var loadChar = LoadCharacterService.getSavedCharacter(index);
      console.log("Loaded Character : " + JSON.stringify(loadChar));
      $scope.character = DataService.updateCharacter(loadChar);
      console.log("New? Character : " + JSON.stringify($scope.character));
    };

    $scope.removeSavedCharacter = function(date_string) {
      console.log("Remove Index : " + date_string );
      LoadCharacterService.deleteSavedCharacter(date_string);
      $scope.saved_characters_array = LoadCharacterService.loadCharacters();      
    };

    $scope.saveCharacter = function() {
      console.log("Save Current Character");
      LoadCharacterService.saveCharacter($scope.character);
    };

    $scope.calculateBonus = function(obj) {
      var key;
      for( key in obj ) {
        console.log("KEY : " + key + "  VALUE: " + obj[key]);
        switch(key) {
          case 'stamina':
            $scope.character.stamina +=  obj[key];
            break;
          case 'willpower':
            $scope.character.willpower +=  obj[key];
            break;
          case 'reflexes':
            $scope.character.reflexes +=  obj[key];
            break;
          case 'awareness':
            $scope.character.awareness +=  obj[key];
            break;
          case 'agility':
            $scope.character.agility +=  obj[key];
            break;
          case 'intelligence':
            $scope.character.intelligence +=  obj[key];
            break;
          case 'strength':
            $scope.character.strength +=  obj[key];
            break;
          case 'perception':
            $scope.character.perception +=  obj[key];
            break;
          case 'honor':
            $scope.character.honor +=  obj[key];
            break;
          case 'affinity':
            var ring = obj[key];
            $scope.character.affinity.ring = true;
            break;
          case 'deficiency':
            var ring = obj[key];
            $scope.character.deficiency.ring = true;
            break;
          case 'skills':
              for(var i=0; i < obj[key].length; i++ ) {
                console.log("Add this skill: " + obj[key][i] );
                var skill =  obj[key][i];
                if ( isFinite(skill) ) {
                  $scope.addASkill(skill, 1);
                } else if ( skill.match(/:/) ) {
                  var arr = skill.split(":");
                  var skill = arr[0];
                  var emp = (arr[1]) ? arr[1] : null;
                  var lvl = (arr[2]) ? arr[2] : 1;
                  $scope.addASkill(skill, lvl, emp);
                } else {
                  $scope.close(true,500);
                  //alert("You Also Get " + skill + " skill");
                  $scope.showSkillsListModal("You also get a " + skill + " skill.", skill);
                }
              }
            break;
          case 'techniques':
            break;
        }
      }
      $scope.character = DataService.updateCharacter($scope.character);
    };

    $scope.addASkill = function(skill_id, rank, emp) {
      var skill = DataService.getSkillFromMasterList(skill_id);
      var lvl = ( rank )? rank : 0;
      var emph = ( emp ) ? emp : null;
      var new_skill = { id:skill_id, rank:lvl, rank_s:lvl, emphasis:emph, get roll() { return (getSkillRoll(this.id, this.rank)); }, get mastery() { return skillMastery(this); } };
      if ( $scope.getCharacterSkillById(skill_id) === null) {
        $scope.character.skills.push(new_skill);
      }
      $scope.character = DataService.updateCharacter($scope.character);
      $scope.close(true, 500);
    };

    $scope.getCharacterSkillById = function(skill_id) {
      for(var i = 0; i < $scope.character.skills.length; i++) {
        if ( $scope.character.skills[i] != undefined ) {
          if ( $scope.character.skills[i].id === skill_id ) {
            return $scope.character.skills[i];
          }
        }
      }
      return null;
    };

    var getSkillRoll = function(skill_id, skill_rank) {
      var skill = DataService.getSkillFromMasterList(skill_id);
      if ( skill ) {
        var trait = skill.trait;
        var ring  = skill.ring;
        var roll =  ( skill_rank + $scope.character[trait] ) + "K" + $scope.character[ring];
        return roll;
      } else {
        return '0K0';
      }
    };

    var skillMastery = function(obj) {
      var master_skill = DataService.getSkillFromMasterList(obj.id);
      if ( master_skill ) {
        var text = '';
        for(var x in master_skill.masteries ) {
          if ( obj.rank >= x ) {
            text += "Level " + x + " : " + master_skill.masteries[x] + "<br />\n";
          }
        }
        return text;
      } else {
        return 'none';
      }
    };

  }]);//end main controller
