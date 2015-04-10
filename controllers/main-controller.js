  angular.module('myApp').controller('MainController', ['$scope', '$cookieStore', 'ModalService', 'DataService', 'LoadCharacterService', function($scope, $cookieStore, ModalService, DataService, LoadCharacterService) {

    $scope.test = "Main Controller";
    $scope.characterSize = DataService.characterSize(); 
    
    $scope.character = DataService.character();
    
    $scope.close = function(result) {
      console.log("MainController Result: " + result);
      close(result, 500); 
    };


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


    $scope.showClansListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/clans_list.html",
        controller: "ClansController",
        inputs : {
          clansMasterList: DataService.clansMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(clanId) {
          //  If we have selected a clan, set it.
          if(clanId != null) {
            console.log("Show Clan Id: " + clanId);
            $scope.character.clan_id = clanId;
            $scope.calculateBonus( DataService.getClanFromMasterList(clanId).bonus );
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Clan Id");
          }
        });
      }); 
    };


    $scope.showWeaponsOneListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/weapons_list.html",
        controller: "WeaponsOneController",
        inputs : {
          weaponsMasterList: DataService.weaponsMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(weaponId) {
          //  If we have selected a weapon, set it.
          if(weaponId != null) {
            console.log("Show Weapon Id: " + weaponId);
            $scope.character.weapon_one.id = weaponId;
            $scope.character.weapon_one.name = DataService.getWeaponFromMasterList(weaponId, 'name');
            $scope.character.weapon_one.type = DataService.getWeaponFromMasterList(weaponId, 'type');
            $scope.character.weapon_one.attack_roll = DataService.getWeaponFromMasterList(weaponId, 'attack_roll');
            $scope.character.weapon_one.damage_roll = DataService.getWeaponFromMasterList(weaponId, 'dr');
            $scope.character.weapon_one.bonus = DataService.getWeaponFromMasterList(weaponId, 'bonus');
            $scope.character.weapon_one.notes = DataService.getWeaponFromMasterList(weaponId, 'notes');
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Weapon Id");
          }
        });
      }); 
    };


    $scope.showWeaponsTwoListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/weapons_list.html",
        controller: "WeaponsTwoController",
        inputs : {
          weaponsMasterList: DataService.weaponsMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(weaponId) {
          //  If we have selected a weapon, set it.
          if(weaponId != null) {
            console.log("Show Weapon Id: " + weaponId);
            $scope.character.weapon_two.id = weaponId;
            $scope.character.weapon_two.name = DataService.getWeaponFromMasterList(weaponId, 'name');
            $scope.character.weapon_two.type = DataService.getWeaponFromMasterList(weaponId, 'type');
            $scope.character.weapon_two.attack_roll = DataService.getWeaponFromMasterList(weaponId, 'attack_roll');
            $scope.character.weapon_two.damage_roll = DataService.getWeaponFromMasterList(weaponId, 'dr');
            $scope.character.weapon_two.bonus = DataService.getWeaponFromMasterList(weaponId, 'bonus');
            $scope.character.weapon_two.notes = DataService.getWeaponFromMasterList(weaponId, 'notes');
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Weapon Id");
          }
        });
      }); 
    };


    $scope.showFamiliesListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/family_list.html",
        controller: "FamiliesController",
        inputs: {
          familiesMasterList: DataService.familiesMasterList(),
          modalMessage : message,
          filterBy : filterBy, 
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(familyId) {
          if(familyId != null) {
            console.log("Show Family Id: " + familyId);
            $scope.character.family_id = familyId;
            $scope.calculateBonus( DataService.getFamilyFromMasterList(familyId).bonus );
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Family Id");
          }
        });
      }); 
    };
    

    $scope.showSchoolsListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/school_list.html",
        controller: "SchoolsController",
        inputs: {
          schoolsMasterList: DataService.schoolsMasterList(),
          modalMessage: message,
          filterBy: filterBy,
        }
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(schoolId) {
          if( schoolId != null ) {
            console.log("Show School Id: " + schoolId);
            $scope.character.school_id = schoolId;
            $scope.calculateBonus( DataService.getSchoolFromMasterList(schoolId).bonus );
            $scope.character = DataService.updateCharacter($scope.character);      
          } else {
            console.log("No School Id");
          }
        });
      }); 
    };


    $scope.showSkillsListModal = function(message, searchText, filterBy, rank) {
      ModalService.showModal({
        templateUrl: "templates/skill_list.html",
        controller: "SkillsModalListController",
        inputs : {
          skillsMasterList: DataService.skillsMasterList(),
          modalMessage : message,
          skillSearchText : searchText,          
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
          } else if ( skillId.id != null && skillId.rank != null ) {
            console.log("Show Skill Id: " + skillId.id + " Show Rank: " + skillId.rank );
            $scope.addASkill(skillId.id, skillId.rank);
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("Error No SKill Added");
            console.log("skillId Object: " + JSON.stringify(skillId));
          }
        });
      }); 
    };


    $scope.showArrowsListModal = function(num, message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/arrows_list.html",
        controller: "ArrowsController",
        inputs : {
          arrowsMasterList: DataService.arrowsMasterList(),
          num: num,
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(arrowId) {
          //  If we have selected a clan, set it.
          if(arrowId != null) {
            console.log("Show Arrow Num " + num + " Id: " + arrowId);
            $scope.character.arrows[num].id = arrowId;
            $scope.character.arrows[num].type = DataService.getArrowFromMasterList(arrowId, 'name');
            $scope.character.arrows[num].damage = DataService.getArrowFromMasterList(arrowId, 'damage_roll');
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Arrow Id");
          }
        });
      }); 
    };


    $scope.showArmorListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/armor_list.html",
        controller: "ArmorController",
        inputs : {
          armorMasterList: DataService.armorMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(armorId) {
          //  If we have selected a clan, set it.
          if(armorId != null) {
            console.log("Show Armor Id: " + armorId);
            $scope.character.armor = DataService.getArmorFromMasterList(armorId);
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Armor Id");
          }
        });
      }); 
    };


    $scope.showAdvantagesListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/advantages_list.html",
        controller: "AdvantagesController",
        inputs : {
          advantagesMasterList: DataService.advantagesMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(advantageId) {
          //  If we have selected a advantage, set it.
          if(advantageId != null) {
            console.log("Show Advantage Id: " + advantageId);
            $scope.character.advantages.push(DataService.getAdvantageFromMasterList(advantageId));
            $scope.calculateAdvantagesDisadvantagesCost(DataService.getAdvantageFromMasterList(advantageId));
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Advantage Id");
          }
        });
      }); 
    };


    $scope.showDisadvantagesListModal = function(message, filterBy) {
      ModalService.showModal({
        templateUrl: "templates/disadvantages_list.html",
        controller: "DisadvantagesController",
        inputs : {
          disadvantagesMasterList: DataService.disadvantagesMasterList(),
          modalMessage: message,
          filterby: filterBy,
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(disadvantageId) {
          //  If we have selected a disadvantage, set it.
          if(disadvantageId != null) {
            console.log("Show disadvantage Id: " + disadvantageId);
            $scope.character.disadvantages.push(DataService.getDisadvantageFromMasterList(disadvantageId));
            $scope.character = DataService.updateCharacter($scope.character);
          } else {
            console.log("No Disadvantage Id");
          }
        });
      }); 
    };
    

    $scope.loadCharacterModal = function(message, filterBy) {
      console.log("Loaded Characters : " + $scope.saved_characters_array);
      ModalService.showModal({
        templateUrl: "templates/character_load.html",
        controller: "CharacterLoadController",
        inputs: {
          modalMessage: message,
          filterBy: filterBy,
          characterLoadList: LoadCharacterService.loadCharacters(),
        },
      }).then(function(modal) {
        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("loadCharacterModal Result: " + result);          
          $scope.character = DataService.character();
        });
      }); 
    };


    $scope.saveCharacter = function() {
      console.log("Save Current Character");
      LoadCharacterService.saveCharacter($scope.character);
    };

    
    $scope.updateWoundPoints = function() {
        DataService.character($scope.character);
    };
    
   
    $scope.calculateAdvantagesDisadvantagesCost = function(obj) {
      var points = obj.points;
      console.log("Points : " + JSON.stringify(points));
      console.log("Clan : " + $scope.character.clan.name );
      console.log("Points Clan : " + points[$scope.character.clan.name.toLowerCase()]);
      if ( points.all && points.all != 'var' ) {
        $scope.character.experience_points -= points.all;
      } else if ( points[$scope.character.clan.name.toLowerCase()] ) {
        console.log("Found Clan Name");
        $scope.character.experience_points -= points[$scope.character.clan.name.toLowerCase()];   
      } else if ( points.else && points.else != 'var' ) {
        $scope.character.experience_points -= points['else'];
      }
      $scope.character = DataService.updateCharacter($scope.character);
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
            $scope.character.spell_affinity[ring] = true;
            break;
          case 'deficiency':
            var ring = obj[key];
            $scope.character.spell_deficiency[ring] = true;
            break;
          case 'key_words':
            
            break;
          case 'skills':
              for(var i=0; i < obj[key].length; i++ ) {
                console.log("Add this skill: " + obj[key][i] );
                var skill =  obj[key][i];
                if ( isFinite(skill) ) {
                  $scope.addASkill(skill, 1);
                } else if ( skill.match(/:/) ) {
                  var arr = skill.split(":");
                  var skill = parseInt(arr[0]);
                  var emp = (arr[1]) ? parseInt(arr[1]) : null;
                  var lvl = (arr[2]) ? parseInt(arr[2]) : 1;                  
                  $scope.addASkill(skill, lvl, emp);
                } else {
                  $scope.close(true,500);
                  //alert("You Also Get " + skill + " skill");
                  //$scope.showSkillsListModal = function(message, searchText, filterBy, rank) {
                  var message = "You also get a " + skill + " skill.";
                  var searchText = skill.replace(/\+. /, "");
                  var filter = null;
                  var rank = 1;
                  console.log("showSkillsListModal message:" + message + "  searchText:" + searchText + "  filter:" + filter + "  rank:" + rank);
                  $scope.showSkillsListModal(message, searchText, filter, rank);
                }
              }
            break;
          case 'techniques':
            // Add these to the character at each level and display them on the character sheet somewhere.
            break;
        }
      }
      $scope.character = DataService.updateCharacter($scope.character);
    };


    $scope.addASkill = function(skill_id, rank, emp) {
      console.log("Add A Skill:  id:" + skill_id + "  rank:" + rank + "  emp:" + emp);
      var skill = DataService.getSkillFromMasterList(skill_id);
      var lvl = ( rank )? rank : 0;
      var emph = ( emp != null || emp != undefined  ) ? emp : null;
      if ( emph != null ) {
        emph = skill.emphases[emph];
      }
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
