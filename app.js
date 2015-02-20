'use strict';
(function(){

  // Declare app level module which depends on views, and components
  var app = angular.module('myApp', [ 'ngRoute','ngCookies']);


  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: "templates/home.html",
      controller: 'HomeController'
    })
    .when('/character', {
      templateUrl: "templates/character.html",
      controller: 'CharacterController'
    })
    .when('/spells', {
      templateUrl: "templates/spells.html",
      controller: 'SpellsController'
    })
    .otherwise({redirectTo: '/'});
  }]);

  app.controller('HomeController', ['$scope', '$cookieStore', function($scope, $cookieStore) {

  }]);

  app.controller('CharacterController', ['$scope', '$cookieStore', function($scope, $cookieStore) {
    $scope.character = { 
      name: "",      
      clan: "",
      school: "",
      experience_points: 0,
      experience_points_earned: 0,
      insight_rank  : 0, 
      earth         : 0,
      air           : 0,
      water         : 0,
      fire          : 0,
      void          : 0,
      void_s        : 0,
      stamina       : 0,
      stamina_s     : 0,
      willpower     : 0,
      willpower_s   : 0,
      reflexes      : 0,
      reflexes_s    : 0,
      awareness     : 0,
      awareness_s   : 0,
      strength      : 0,
      strength_s    : 0,
      perception    : 0,
      perception_s  : 0,
      agility       : 0,
      agility_s     : 0,
      intelligence  : 0,      
      intelligence_s: 0,      
      armor_tn      : 0,
      honor         : 0,
      glory         : 0,
      'status'      : 0,
      taint         : 0,
      skills        : [],
      spells        : [],
    };        

    $scope.loadCharacter = function() {
      console.log("Load Character");
      $scope.character = $cookieStore.get('character');      
    }

    $scope.saveCharacter = function() {
      console.log("Save Character");
      $cookieStore.put('character', $scope.character);
    };

    $scope.updateExp = function(attr, value) {
      var cost = 5;
      if ( attr == 'void') {
        cost = 6;
      }
      console.log(attr + " : val: " + value + " Old Val: " + $scope.character[attr + "_s"]);
      if ( $scope.character[attr] > $scope.character[attr + "_s"] ) {
          $scope.character.experience_points -= ( value * cost );
          $scope.character[attr + "_s"] = $scope.character[attr];
      } else if ( $scope.character[attr] < $scope.character[attr + "_s"] ) {
          $scope.character.experience_points += ($scope.character[attr + "_s"] * cost );
          $scope.character[attr + "_s"] = $scope.character[attr];
      } else {
          console.log("No Change to " + attr);
      }
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
      $scope.updateSkills(attr,'earth');
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
      $scope.updateSkills(attr,'air');
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
      $scope.updateSkills(attr,'water');
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
      $scope.updateSkills(attr,'fire');
    };
    $scope.updateVoid = function(attr, value) {
      $scope.updateExp(attr,value);
      $scope.updateInsightRank();
    };
     
    $scope.updateInsightRank = function() { 
      $scope.character.insight_rank = (($scope.character.earth + $scope.character.air + $scope.character.water + $scope.character.fire + $scope.character.void) * 10)
    };

    $scope.updateSkills = function(attr,ring) {
        for(var i = 0; i < $scope.character.skills.length; i++) {
          if ($scope.character.skills[i].trait == attr) {
            $scope.character.skills[i].roll = ( $scope.character.skills[i].rank + $scope.character[attr] ) + "K" + $scope.character[ring];
          }
        }
    };

  }]);

  app.controller('SkillsController', function($scope) {
    $scope.skillsMasterList = [
      // level, type, subtype, trait, ring, rank, roll, emphasis, description
      { level:'High', type:'Artisan', sub_type:'Origami', trait:'awareness', ring:'air', rank:0, roll:'', emphasis:'', description:'(paper folding) Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Bonsai', trait:'awareness', ring:'air', rank:0, roll:'', emphasis:'', description:'(the tending of tiny trees and plants) Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Gardening', trait:'awareness', ring:'air', rank:0, roll:'', emphasis:'', description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Ikebana', trait:'awareness', ring:'air', rank:0, roll:'', emphasis:'', description:'(flower aranging) Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Painting', trait:'awareness', ring:'air', rank:0, roll:'', emphasis:'', description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Poetry', trait:'awareness', ring:'air', rank:0, roll:'', emphasis:'', description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Sculpture', trait:'awareness', ring:'air', rank:0, roll:'', emphasis:'', description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Tattooing', trait:'awareness', ring:'air', rank:0, roll:'', emphasis:'', description:'Pg. 135 Core Book'},
      { level:'High', type:'Acting', sub_type:'Social Skill', trait:'awareness', ring:'air', rank:0, roll:'', emphasis:'', description:'Pg. 135 Core Book'},
    ];

    $scope.showSkillList = false;
    $scope.toggleShowSkillsList = function() {
        $scope.showSkillsList = !$scope.showSkillsList;
    }

    $scope.addSkill = function(index) {
      console.log("Skill Index: " + index);
      var skill = $scope.skillsMasterList[index];
      skill.roll = $scope.character[skill.trait] + "K" + $scope.character[skill.ring];      
      $scope.character.skills.push(skill);       
    };    

    $scope.updateSkillRank = function(skill_index,val) {
      console.log("Update Skill Index: " + skill_index + " Val: " + val );

    };

  });

  app.controller('SpellsController', function($scope) {

    function Spell(name,level,ring,range,area_of_affect,duration,raises,description) {
      this.name = name;
      this.level = level;
      this.ring = ring;
      this.range = range;
      this.area_of_affect = area_of_affect;      
      this.duration = duration;
      this.raises = raises;
      this.description = description;
    }

    $scope.spellsMasterList = {
      'universal': {
        'one': [
          { 'name':'Sense', 'ring':'all', 'level': '1', 'range':'Personal', 'area_of_affect':'50\' radius from the caster', 'duration':'Instantaneous', 'raises': 'Range(+10\')', 'description':"This spell can be cast in any of the four standard elements. It allows for the caster to sense the presense, quantity, and rough location of the elemental spirits (not evil spirits known as <i>kansen</i> of that element within the range of the spell. This is most frequently applied when looking for spirits with which to Commune (See Commune), but can also can be useful as a crude basic location device. For example, a caster lost in the wilderness could cast Snese(Water) in hopes of locating the sourceof drinking water." },
          { 'name':'Summon', 'ring':'all', 'level': '1', 'range':'30\'', 'area_of_affect':'1 cubic foot of summoned matterial', 'duration':'Permanent', 'raises': 'Range(+10\'), Quantity(+1 cubic foot), Composition of Material(1-4 raises as outlined below)', 'description':"s spell can be cast in any of the tour standard elements. It allows the caster to summon a modest quantity (one cubic foot) of the chosen element. The summoned matter appears (usually in a rough ball shape] in any open space within the spell\'s range. This cannot place the summoned material inside another physical object or living creature. The summoned element will behave in a normal and mundane matter — earth falls to the ground, water soaks anything it lands on, air blows away, and ﬁre winks out unless there is something present for it to burn. In general it is impossible to use this spell effectively in combat, although clever shugenja may find a few modest combat uses. such as using Summon [Fire] to ignite a foe soaked in cooking oil. More commonly, the Spell’s value is in simpler functions. such as summoning Water while in a desert, or summoning Fire to light a campfire without flint and tinder. Raises may be used with this spell to summon a more speciﬁc type of the appropriate element, such as wood or iron with Earth, or tea with Water. The GM should choose how many Raises (generally anywhere from 1 to 4) this requires. However, these Raises cannot be used to create rare or precious materials (such as gold) or spiritually powerful substances (such as jade or crystal)." },
          { 'name':'Commune', 'ring':'all', 'level': '1', 'range':'20\'', 'area_of_affect':'self', 'duration':'Concentration', 'raises': 'See Desc.', 'description':"This spell can be cast in any element save Void. It allows the caster to speak with one of the local elemental kami, asking it a few questions, which is will answer honestly to the best of it's ability. ..." },
         ],
      },
      'air': { 
        'one': [
          { 'name':'Blessed Wind', 'ring':'air', 'level':'1', 'range':'Personal', 'area_of_affect':'10\' radius around the caster', 'duration':'Concentration', 'raises': 'Special(you may target another spell with this spell with 3 raises)', 'description':"Pg 167 Core Book" },
        ],
        'two': [],
        'three': [],
        'four': [],
        'five': [],
        'six': [],
      },
      'water': {
        'one': [],
        'two': [],
        'three': [],
        'four': [],
        'five': [],
        'six': [],
      },
      'fire': {
        'one': [],
        'two': [],
        'three': [],
        'four': [],
        'five': [],
        'six': [],
      },
      'earth': {
        'one': [],
        'two': [],
        'three': [],
        'four': [],
        'five': [],
        'six': [],
       }
    };

  });

})();
