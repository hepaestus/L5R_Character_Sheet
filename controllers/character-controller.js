  angular.module('myApp').controller('CharacterController', ['$scope', 'DataService', function($scope, DataService) {

    $scope.test = "Character Controller";

    $scope.updateExp = function(attr, value) {
      var cost = 4;
      if ( attr == 'void') {
        cost = 6;
      }
      //console.log(attr + " : val: " + value + " Old Val: " + $scope.character[attr + "_s"]);
      if ( $scope.character[attr] > $scope.character[attr + "_s"] ) {
          $scope.character.experience_points -= ( value * cost );
          $scope.character[attr + "_s"] = $scope.character[attr];
           } else if ( $scope.character[attr] < $scope.character[attr + "_s"] ) {
          $scope.character.experience_points += ($scope.character[attr + "_s"] * cost );
          $scope.character[attr + "_s"] = $scope.character[attr];
      } else {
          //console.log("No Change to " + attr);
      }
      $scope.character = DataService.updateCharacter($scope.character);
    };
      
    $scope.updateEarth = function(attr, value) {
      $scope.updateExp(attr,value);
      if ( $scope.character.stamina === $scope.character.willpower) {
        $scope.character.earth = $scope.character.stamina;
      } else if ( $scope.character.willpower <  $scope.character.stamina ) {
        $scope.character.earth = $scope.character.willpower;
      } else if ( $scope.character.stamina < $scope.character.willpower ) {
        $scope.character.earth = $scope.character.stamina;
      }
      $scope.updateInsight();
      $scope.updateWeapons();
      $scope.character = DataService.updateCharacter($scope.character);
    };

    $scope.updateAir = function(attr, value) {
      $scope.updateExp(attr,value);
      if ( $scope.character.reflexes === $scope.character.awareness) {
        $scope.character.air = $scope.character.reflexes;
      } else if ( $scope.character.reflexes <  $scope.character.awareness ) {
        $scope.character.air = $scope.character.reflexes;
      } else if ( $scope.character.awareness < $scope.character.reflexes ) {
        $scope.character.air = $scope.character.awareness;
      }
      $scope.updateInsight();
      $scope.updateWeapons();
      $scope.character = DataService.updateCharacter($scope.character);
    };

    $scope.updateWater = function(attr, value) {
      $scope.updateExp(attr,value);
      if ( $scope.character.strength === $scope.character.perception) {
        $scope.character.water = $scope.character.strength;
      } else if ( $scope.character.strength <  $scope.character.perception ) {
        $scope.character.water = $scope.character.strength;
      } else if ( $scope.character.perception < $scope.character.strength ) {
        $scope.character.water = $scope.character.perception;
      }
      $scope.updateInsight();
      $scope.updateWeapons();
      $scope.character = DataService.updateCharacter($scope.character);
    };

    $scope.updateFire = function(attr, value) {
      $scope.updateExp(attr,value);
      if ( $scope.character.agility === $scope.character.intelligence) {
        $scope.character.fire = $scope.character.agility;
      } else if ( $scope.character.agility <  $scope.character.intelligence ) {
        $scope.character.fire = $scope.character.agility;
      } else if ( $scope.character.intelligence < $scope.character.agility ) {
        $scope.character.fire = $scope.character.intelligence;
      }
      $scope.updateInsight();
      $scope.updateWeapons();
      $scope.character = DataService.updateCharacter($scope.character);
    };
    
    $scope.updateVoid = function(attr, value) {
      $scope.updateExp(attr,value);
      $scope.updateInsight();
      $scope.updateWeapons();
      $scope.character = DataService.updateCharacter($scope.character);
    };

    $scope.updateInsight = function() {
      var skillRanks = 0;
      for(var i = 0; i < $scope.character.skills.length; i++) {
        if ( $scope.character.skills[i] != undefined ) {
          skillRanks += $scope.character.skills[i].rank;
        }
      }
      $scope.character.insight = skillRanks + (($scope.character.earth + $scope.character.air + $scope.character.water + $scope.character.fire + $scope.character.void) * 10);
      $scope.updateInsightRank();
      $scope.updateWeapons();
      $scope.character = DataService.updateCharacter($scope.character);
    };

    $scope.updateWeapons = function() {
      $scope.character.weapon_one.attack_roll = DataService.getWeaponFromMasterList( $scope.character.weapon_one.id, 'attack_roll');
      $scope.character.weapon_one.damage_roll = DataService.getWeaponFromMasterList( $scope.character.weapon_one.id, 'damage_roll');
      $scope.character.weapon_two.attack_roll = DataService.getWeaponFromMasterList( $scope.character.weapon_two.id, 'attack_roll');
      $scope.character.weapon_two.damage_roll = DataService.getWeaponFromMasterList( $scope.character.weapon_two.id, 'damage_roll');
      for (var i = 0; i < $scope.character.arrows; i++ ) {
        $scope.character.arrows[i].type = DataService.getArrowFromMasterList(arrowId, 'name');
        $scope.character.arrows[i].damage = DataService.getArrowFromMasterList(arrowId, 'damage_roll');
      }
      $scope.character = DataService.updateCharacter($scope.character);
    };

    $scope.updateInsightRank = function() {
      if( $scope.character.insight < 150 ) {
        $scope.character.insight_rank = 1;
      } else if ( $scope.character.insight >= 150 && $scope.character.insight < 175  ) {
        $scope.character.insight_rank = 2;
      } else if ( $scope.character.insight >= 175 && $scope.character.insight < 200  ) {
        $scope.character.insight_rank = 3;
      } else if ( $scope.character.insight >= 200 && $scope.character.insight < 225  ) {
        $scope.character.insight_rank = 4;
      } else if ( $scope.character.insight >= 225 && $scope.character.insight < 250  ) {
        $scope.character.insight_rank = 5;
      } else if ( $scope.character.insight >= 250 && $scope.character.insight < 275  ) {
        $scope.character.insight_rank = 6;
      } else if ( $scope.character.insight >= 275 && $scope.character.insight < 300  ) {
        $scope.character.insight_rank = 7;
      } else if ( $scope.character.insight >= 300 && $scope.character.insight < 325 ) {
        $scope.character.insight_rank = 8;
      } else if ( $scope.character.insight >= 325 && $scope.character.insight < 350 ) {
        $scope.character.insight_rank = 9;
      } else if ( $scope.character.insight >= 350 && $scope.character.insight < 375 ) {
        $scope.character.insight_rank = 10;
      } else if ( $scope.character.insight >= 375 && $scope.character.insight < 400 ) {
        $scope.character.insight_rank = 11;
      } else {
        $scope.character.insight_rank = 12;
      }
      $scope.character = DataService.updateCharacter($scope.character);
    }

    $scope.getWounds = function(current_level) {
      var wounds_per_lvl = $scope.character.points_per_wound_level;
      var wounds = $scope.character.wounds;
      var total_wounds = $scope.character.wound_levels * wounds;
      if ( current_level <= $scope.character.wound_levels ) {
        return ( total_wounds - ( (current_level - 1) * wounds )) + " to " + ( total_wounds - current_level * wounds );
      } else {
        return "Dead"; 
      }
    };

  }]);//end CharacterController
