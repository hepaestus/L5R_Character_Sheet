  angular.module('myApp').controller('CharacterController', ['$scope', '$cookieStore','DataService', function($scope, $cookieStore, DataService) {

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
      $scope.updateInsightRank();
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
      $scope.updateInsightRank();
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
      $scope.updateInsightRank();
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
      $scope.updateInsightRank();
      $scope.character = DataService.updateCharacter($scope.character);
    };
    $scope.updateVoid = function(attr, value) {
      $scope.updateExp(attr,value);
      $scope.updateInsightRank();
      $scope.character = DataService.updateCharacter($scope.character);
    };

    $scope.updateInsightRank = function() {
      var skillRanks = 0;
      for(var i = 0; i < $scope.character.skills.length; i++) {
        if ( $scope.character.skills[i] != undefined ) {
          skillRanks += $scope.character.skills[i].rank;
        }
      }
      $scope.character.insight = skillRanks + (($scope.character.earth + $scope.character.air + $scope.character.water + $scope.character.fire + $scope.character.void) * 10);
      $scope.character = DataService.updateCharacter($scope.character);
    };

  }]);//end CharacterController
