  angular.module('myApp').controller('SkillsController', ['$scope', 'DataService', 'ModalService', '$timeout', function($scope, DataService, ModalService, $timeout) {

    $scope.test = "Skills Controller";

    $scope.emphasesList = ["One", "Two"];
    $scope.currentSkillId = null;
    $scope.showEmphasesList = false;

    $scope.showSkillsListModal = function(message, searchText, filterBy, rank) {
      ModalService.showModal({
        templateUrl: "templates/skill_list.html",
        controller: "SkillsModalListController",
        inputs : {
          skillsMasterList: DataService.skillsMasterList(),
          modalMessage: message,
          skillSearchText: searchText,          
          filterBy: filterBy,
          rank: rank,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(skillId) {
          if( skillId != null && ( skillId.rank == null || skillId.rank == undefined ) ) {
            console.log("Show Skill Id: " + skillId);
            $scope.addASkill(skillId);
            $scope.character = DataService.updateCharacter($scope.character);
          } else if ( skillId.Id != null && skillId.rank != null ) {
            console.log("Show Skill Id: " + skillId.id + " Show Rank: " + skillId.rank );
            $scope.addASkill(skillId.id, skillId.rank);
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("ERROR! No SKill Added");
          }
        });
      }); 
    };

    $scope.showEmphasesListModal = function(skill_id, message, filterBy) {
      console.log("Show Emphases List");
      ModalService.showModal({
        templateUrl: "templates/emphases_list.html",
        controller: "EmphasesController",
        inputs : {
          modalMessage: message,
          filterBy: filterBy,          
          emphasesList: $scope.getEmphasesList(skill_id),
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(emphasisId) {
          if ( emphasisId != null ) {
            console.log("Show Emphsis Id: " + emphasisId);
            $scope.addEmphasis(emphasisId);
            $scope.character = DataService.updateCharacter($scope.character);
            $scope.currentSkillId = null;
          }
        });
      }); 
    };   

    $scope.getEmphasesList = function(skill_id) {
      $scope.currentSkillId = skill_id;
      $scope.emphasesList = [];
      var skill = DataService.getSkillFromMasterList(skill_id);
      if ( skill ) {
        for ( var i in skill.emphases ) {
          $scope.emphasesList.push( skill.emphases[i] ) ;
        }
      }
      return $scope.emphasesList;
    };

    var getSkillRoll = function(skill_id, skill_rank) {
      var skill = DataService.getSkillFromMasterList(skill_id);
      //console.log("get Roll of skill : " + skill_id + " with rank of " + skill_rank);
      if ( skill ) {
        //console.log("found skill : " + skill + " :: " + JSON.stringify(skill_rank));
        var trait = skill.trait;
        var ring  = skill.ring;
        var roll =  ( skill_rank + $scope.character[trait] ) + "K" + $scope.character[ring];
        return roll;
      } else {
        return '0K0';
      }
    };

    var skillMastery = function(obj) {
      //console.log("get Mastery of skill : " + obj.id + " with rank of " + obj.rank);
      var master_skill = DataService.getSkillFromMasterList(obj.id);
      if ( master_skill ) {
        //console.log("Master Skill: " + JSON.stringify(master_skill));
        //console.log("Master Skill Masteries: " + JSON.stringify(master_skill.masteries));
        var text = '';
        for(var x in master_skill.masteries ) {
          if ( obj.rank >= x ) {
            text += "Level " + x + " : " + master_skill.masteries[x] + "<br />\n";
          }
        }
        //console.log("Text: " + text);
        return text;
      } else {
        return 'none';
      }
    };

    var rebuildSkills = function() {
      for ( var i = 0; i < $scope.character.skills.length; i++) {
        Object.defineProperty(scope.character.skills[i], 'roll', { get: function() {return (getSkillRoll(this.id, this.rank)); }});
        Object.defineProperty(scope.character.skills[i], 'mastery', { get: function() { return (skillMastery(this)); }});
      }
    };
    $scope.$watch('$scope.character.skills', rebuildSkills);


    $scope.getSkill = function(skill_id, attr) {
        return DataService.getSkillFromMasterList(skill_id, attr);
    };

    $scope.removeSkill = function(id) {
       // ADD METHOD OF GIVING BACK ALL EXP PTS WHEN SKILL IS Removed!
       replaceCharacterSkillById(id, null);
    };

    $scope.addEmphasis = function(emp_index) {
      var master_skill = DataService.getSkillFromMasterList($scope.currentSkillId);
      var emp = master_skill.emphases[emp_index];
      var skill = getCharacterSkillById($scope.currentSkillId);
      skill.emphasis = emp;
      replaceCharacterSkillById($scope.currentSkillId, skill);
      $scope.character.experience_points -= 2;
      $scope.character = DataService.updateCharacter($scope.character);
    }

    var getCharacterSkillById = function(skill_id) {
      //console.log("Before Skills : " + JSON.stringify($scope.character.skills) + " (getCharacterSkillById)");
      for(var i = 0; i < $scope.character.skills.length; i++) {
        //console.log("Each Skill " + JSON.stringify($scope.character.skills[i]));
        if ( $scope.character.skills[i] != undefined ) {
          if ( $scope.character.skills[i].id === skill_id ) {
            //console.log("Afterr Skills : " + JSON.stringify($scope.character.skills) + " (getCharacterSkillById)");
            //console.log("Skill " + skill_id + " FOUND (getcharacterskillbyid)");
            return $scope.character.skills[i];
          }
        }
      }
      //console.log("Skill " + skill_id + " Not Found (getcharacterskillbyid)");
      return null;
    };

    var replaceCharacterSkillById = function(skill_id, skill) {
      for(var i = 0; i < $scope.character.skills.length; i++) {
        if ( $scope.character.skills[i] != undefined ) {
          //console.log("Skill : " + JSON.stringify($scope.character.skills[i]) + "  Skill Id : " + $scope.character.skills[i].id + "  i:" + i + "(replaceCharacterSkillById)");
          if ( $scope.character.skills[i].id === skill_id ) {
            if ( skill === null ) {
              //console.log("Remove Skill");
              $scope.character.skills.splice(i,1);
              return;
            } else {
              //console.log("Replace Skill");
              $scope.character.skills.splice(i,1,skill);
              //console.log("Before Skills : " + JSON.stringify($scope.character.skills) + " (replaceCharacterSkillById)");
              //$scope.character.skills.push(skill);
              //console.log("After Skills : " + JSON.stringify($scope.character.skills) + " (replaceCharacterSkillById)");
              return;
            }
          }
        }
      }
    }

    $scope.updateSkillRank = function(id) {
      //console.log("Before Skills : " + JSON.stringify($scope.character.skills) + " (updateSkillRank)");
      var skill = getCharacterSkillById(id);
      if ( skill != null && skill.id >= 0 ) {
        if ( skill.rank < skill.rank_s ) {
          var diff = skill.rank_s - skill.rank;
          $scope.character.experience_points += skill.rank_s;
          $scope.character.insight -= diff;
        } else if ( skill.rank > skill.rank_s ) {
          var diff = skill.rank - skill.rank_s;
          $scope.character.experience_points -= skill.rank;
          $scope.character.insight += diff;
        }
        skill.rank_s = skill.rank;
        replaceCharacterSkillById(id, skill);
        $scope.updateInsightRank();
        $scope.updateWeapons();
      } else {
        //console.log("Skill Not Found (updateskillrank)");
      }
    };

  }]);//end SkillsController
