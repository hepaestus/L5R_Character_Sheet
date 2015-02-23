'use strict';
(function(){

  // Declare app level module which depends on views, and components
  var app = angular.module('myApp', [ 'ngRoute', 'ngCookies', 'ngSanitize']);

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

  app.controller('MainController', ['$scope', '$cookieStore', function($scope, $cookieStore) {

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

  }]);
 
  app.controller('HomeController', ['$scope', '$cookieStore', function($scope, $cookieStore) {

  }]);

  app.controller('CharacterController', ['$scope', '$cookieStore', function($scope, $cookieStore) {
	  
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
      $scope.updateSkills(attr,'void');
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

    $scope.clickedSkillRank = null;

    var mastery = function(obj) {
      var text = '';
      for(var x in obj.masteries ) {
        if ( obj.rank >= x ) {
          text += "Level " + x + " : " + obj.masteries[x] + "<br />\n";
        }
      } 
      //console.log("Text: " + text);
      return text;
    };
    
    $scope.skillsMasterList = [
      // level, type, subtype, trait, ring, rank, roll, emphasis, emphases{}, get mastery(), masteries{}, description
      { level:'Debug', type:'Debug', sub_type:'debug', trait:'void', ring:'void', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'E Zero', 1:'E One', 2:'E Two'}, get mastery() { return mastery(this); }, masteries:{ 3:'M Three', 5:'M Five', 7:'M Seven'}, description:'debug description'},
      { level:'High', type:'Artisan', sub_type:'', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, emphases: {0:'Bonsai', 1:'Gardening', 2:'Ikebana', 3:'Painting', 4:'Poetry', 5:'Sculpture', 6:'Tattooing'}, description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Origami', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Bonsai', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Gardening', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 135 Core Book'},
      { id:6, level:'High', type:'Artisan', sub_type:'Ikebana', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'(flower aranging) Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Painting', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Poetry', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Sculpture', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 135 Core Book'},
      { level:'High', type:'Artisan', sub_type:'Tattooing', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 135 Core Book'},
      { level:'High', type:'Acting', sub_type:'Social Skill', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 135 Core Book'},
      { level:'High', type:'Caligraphy', sub_type:'', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Cipher', 1:'High Rokugani'}, get mastery() { return mastery(this); }, masteries: { 5: "+10 to break a code or cipher"}, description:'Pg. 135 Core Book'},
      { level:'High', type:'Coutier', sub_type:'Social Skill', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', empasis:null, emphases:{0: "Gossip", 1: "Manipulation", 2:"Rhetoric" }, get mastery() { return mastery(this); }, masteries:{3:"+3 Insight Above Normal", 5:"1k0 bonus to all contested Courtier Rolls", 7:"+7 Insight Above normal (In addition to the bonus from rank 3)" }, description:'Pg. 135 Core Book'},
      { level:'High', type:'Divination', sub_type:'', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases: {0:"Astrology", 1:"Kawaru"}, get mastery() { return mastery(this); }, masteries:{5:"A second roll may be made without spending a void point"}, description:'Pg. 135 Core Book'},
      { level:'High', type:'Etiquette', sub_type:'Social Skill', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, emphases: { 0:"Bureaucracy", 1:"Conversation", 2:"Courtesy"}, get mastery() { return mastery(this); }, masteries: {3:"+3 Insight above normal", 5:"+1k0 bonus to all contested Etiquette rols", 7:"+7 Insight Above normal (In addition to the bonus from rank 3)"}, description:'Pg. 136 Core Book'},
      { level:'High', type:'Games', sub_type:'Fortunes and Winds', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 136 Core Book'},
      { level:'High', type:'Games', sub_type:'Go', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 136 Core Book'},
      { level:'High', type:'Games', sub_type:'Kemari', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 136 Core Book'},
      { level:'High', type:'Games', sub_type:'Kemari', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 136 Core Book'},
      { level:'High', type:'Games', sub_type:'Letters', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 136 Core Book'},
      { level:'High', type:'Games', sub_type:'Sadane', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 136 Core Book'},
      { level:'High', type:'Games', sub_type:'Shoji', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 136 Core Book'},
      { level:'High', type:'Investigation', sub_type:'', trait:'perception', ring:'water', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Interrogation', 1:'Notice', 2:'Search'}, get mastery() { return mastery(this); }, masteries:{3:'Second attempt without increase in TN',5:'+5 bonus to any contested roll unsing Investigation',7:'A third attempt to use Search emphasis even if second attempt fails may be made'}, description:'Pg. 136 Core Book'},
      { level:'High', type:'Lore', sub_type:'Anatomy', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Architecture', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Bushido', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Great Clan (Choose One)', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Elements', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Gaijin Culture', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Ghosts', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Heraldry', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'History', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Maho*', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Nature', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Non-Human Culture', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Omens', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Shadowslands*', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Shugenja', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Spirit Realms', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Theology', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'Underworld*', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Low Skill, Pg. 137 Core Book'},
      { level:'High', type:'Lore', sub_type:'War*', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Low Skill, Pg. 137 Core Book'},
      { level:'High', type:'Medicine', sub_type:'', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Antidotes', 1:'Disease', 2:'Herbalism', 3:'Non-Humans', 4:'Wound Treatment'}, description:'Pg. 137 Core Book'},
      { level:'High', type:'Meditation', sub_type:'', trait:'void', ring:'void', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Fasting', 1:'Void Recovery'}, description:'Pg. 137 Core Book'},
      { level:'High', type:'Perform', sub_type:'Biwa', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Perform', sub_type:'Dance', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Perform', sub_type:'Drums', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Perform', sub_type:'Flute', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Perform', sub_type:'Oratory', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Perform', sub_type:'Puppeteer', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Perform', sub_type:'Samisen', trait:'agiltity', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Perform', sub_type:'Song', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Perform', sub_type:'Story Telling', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, description:'Pg. 137 Core Book'},
      { level:'High', type:'Sincerity', sub_type:'Social Skill', trait:'awareness', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Honesty', 1:'Deceit'}, get mastery() { return mastery(this); }, masteries:{5:'+5 Bonus to all contested rolls using Sincerity'}, description:'Pg. 138 Core Book'},
      { level:'High', type:'Spellcraft', sub_type:'', trait:'intelligence', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Importune', 1:'Spell Research'}, get mastery() { return mastery(this); }, masteries:{5:'+1k0 on Spellcasting rolls'}, description:'Pg. 138 Core Book'},
      { level:'High', type:'Tea Ceremony', sub_type:'', trait:'void', ring:'void', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{}, get mastery() { return mastery(this); }, masteries:{5:'All participants regain 2 void points'}, description:'Pg. 139 Core Book'},
      { level:'Bugei', type:'Athletics', sub_type:'', trait:'strength', ring:'water', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Climbing', 1:'Running', 2:'Swimming', 3:'Throwing'}, get mastery() { return mastery(this); }, masteries:{ 3:'Moderate terrain no longer impedes movement, and difficult terrain reduces water ring my 1 instead of 2', 5:'Character no longer suffers movement penalties regarless of terrain', 7:'Add 5 feet to the total of one Move Action per round.'}, description:'Pg. 139 Core Book'},
      { level:'Bugei', type:'Battle', sub_type:'', trait:'perception', ring:'water', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Mass Combat', 1:'Skirmish'}, get mastery() { return mastery(this); }, masteries:{5:'Character adds Battle Skill Rank to Initiative Score durring skirmishes'}, description:'Pg. 139 Core Book'},
      { level:'Bugei', type:'Defense', sub_type:'', trait:'reflexes', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{}, get mastery() { return mastery(this); }, masteries:{3:'Character may retain result of previous Defense / Reflexes roll rather than make a new roll if the Full Defense Stance is being maintained in subsequent rounds', 5:'Characters Armor TN is considered 3 higher than in the Defense and Full Defense stances', 7:'One Simple Action may be taken while in the Full Defense Stance(no attacks may be made)'}, description:'Pg. 139 Core Book'},
      { level:'Bugei', type:'Horsemanship', sub_type:'', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Gaijin Riding Horse', 1:'Rokugani Pony', 2:'Utaku Steed'}, get mastery() { return mastery(this); }, masteries:{3:'May utilize Full Attack Stance when on horseback', 5:'Mointing a horse is a Simple Action, Dismounting is a Free Action', 7:'Mounting a horse is a Free Action'}, description:'Pg. 139 Core Book'},
      { level:'Bugei', type:'Hunting', sub_type:'', trait:'perception', ring:'water', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Survival', 1:'Tracking', 2:'Trailblazing'}, get mastery() { return mastery(this); }, masteries:{5:'1k0 Bonus to total of all Stealth Rolls made in wilderness environments'}, description:'Pg. 140 Core Book'},
      { level:'Bugei', type:'Iaijutsu', sub_type:'', trait:'reflexes', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Assessment', 1:'Focus'}, get mastery() { return mastery(this); }, masteries:{3:'Readying a katana is a Free Action', 5:'During an Iaijutsu Duel, the character gains one Free Raise on his Iaijutsu(Focus) / Void roll during the Focus Stage', 7:'During the Assessment of an Iaijutsu Duel, the character gains a bonus of +2k2 to the total of all Focus Rolls if his Assessment roll exceeds his opponent\'s by 10 or more (instead of the normal +1k1)'}, description:'Pg. 139 Core Book'},
      { level:'Bugei', type:'Juijitsu', sub_type:'', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Grappling', 1:'Improvised Weapons', 2:'Martial Arts'}, get mastery() { return mastery(this); }, masteries:{3:'Damage of all unarmed attacks is increases by +1k0', 5:'Use of Juijitsu confers a Free Raise toward initating Grapple', 7:'Damage of all unarmed attacks in increased by +0K1 (+1k1 total)'}, description:'Pg. 139 Core Book'},
      { level:'Bugei', type:'Weapons', sub_type:'', trait:'', ring:'', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{1:'Special'}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 140 Core Book'},
      { level:'Bugei', type:'Chain Weapons', sub_type:'Weapon Skill', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Kusarigama', 1:'Kyoketsu-shogi', 2:'Manrikusari'}, get mastery() { return mastery(this); }, masteries:{3:'Chain weapons made be used to initiate grapple (See Book of Earth)', 5:'Wielding a chain weapon gains a 1k0 on Contested Rolls against opponents who are tangled or Grappled via their weapon', 7:'Use of chain weapon confers one Free Raise toward use of Disarm or Knockdown Maneuvers'}, description:'Pg. 141 Core Book'},
      { level:'Bugei', type:'Heavy Weapons', sub_type:'Weapon Skill', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Dai Tsuchi', 1:'Masakari', 2:'Ono', 3:'Tetsubo'}, get mastery() { return mastery(this); }, masteries:{3:'Opponents with a Reduction Rating have their rating reduced by 2 when attacked with heavy weapon', 5:'Use of Heavy Weapon confers on Free Raise toward use of Knockdown Maneuver', 7:'Damage dice explode on a result of 9 and 10 when using heavy weapons'}, description:'Pg. 141 Core Book'},
      { level:'Bugei', type:'Kenjustu', sub_type:'Weapon Skill', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Katana', 1:'Ninja-to', 2:'No-dachi', 3:'Parangu', 4:'Scimitar', 5:'Wakizashi'}, get mastery() { return mastery(this); }, masteries:{3:'Total damage rolls is increased by 1k0', 5:'Sword can be readied as a Free Action', 7:'Damage dice explode on a 9 and 10'}, description:'Pg. 141 Core Book'},
      { level:'Bugei', type:'Knives', sub_type:'Weapon Skill', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Aiguchi', 1:'Jitte', 2:'Kama', 3:'Sai', 4:'Tanto'}, get mastery() { return mastery(this); }, masteries:{3:'No Off-hand penalties', 5:'Use or a sai or jitte confers one Free Raise towards the Disarm Maneuver', 7:'Use of any knife confers a Free Raise towards use of the Extra Attack Maneuver'}, description:'(Tanojutsu) Pg. 141 Core Book'},
      { level:'Bugei', type:'Kyujutsu', sub_type:'Weapon Skill', trait:'reflexes', ring:'air', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Dai-kyu', 1:'Han-kyu', 2:'Yumi'}, get mastery() { return mastery(this); }, masteries:{3:'Striging bow is a Simple Action', 5:'Max range of any bow increased by 50%', 7:'Strength of bow increased by 1'}, description:'Pg. 142 Core Book'},
      { level:'Bugei', type:'Ninjutsu (agility)', sub_type:'Weapon Skill', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Blowgun', 1:'Shuriken', 2:'Tsubute'}, get mastery() { return mastery(this); }, masteries:{3:'Damage increase by 1k1', 5:'Dice on Damage Rolls Exlode on 10 despite being Nijutsu Weapons', 7:'Damage on ninjutsu weapons increased by +0k1 (+1k1 total)'}, description:'Low Skill. Pg. 142 Core Book'},
      { level:'Bugei', type:'Ninjutsu (reflexes)', sub_type:'Weapon Skill', trait:'reflexes', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Blowgun', 1:'Shuriken', 2:'Tsubute'}, get mastery() { return mastery(this); }, masteries:{3:'Damage increase by 1k1', 5:'Dice on Damage Rolls Exlode on 10 despite being Nijutsu Weapons', 7:'Damage on ninjutsu weapons increased by +0k1 (+1k1 total)'}, description:'Low Skill. Pg. 142 Core Book'},
      { level:'Bugei', type:'Polearms', sub_type:'Weapon Skill', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Bisento', 1:'Nagamaki', 2:'Naginata', 3:'Sasumata', 4:'Sodegarami'}, get mastery() { return mastery(this); }, masteries:{3:'During 1st round of skirmish, polearm gains +5 bonus to Initiative Score', 5:'Damage rolls vs. mounted or significantly larger opponents increased by +1k0', 7:'Polearms readied as a free action'}, description:'Pg. 143 Core Book'},
      { level:'Bugei', type:'Spears', sub_type:'Weapon Skill', trait:'agility', ring:'fire', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{0:'Mai Chong', 1:'Kumade', 2:'Lance', 3:'Nage-yare', 4:'Yari'}, get mastery() { return mastery(this); }, masteries:{3:'', 5:'', 7:''}, description:'Pg. 143 Core Book'},
      { level:'Bugei', type:'', sub_type:'', trait:'', ring:'', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 143 Core Book'},
      { level:'Bugei', type:'', sub_type:'', trait:'', ring:'', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 143 Core Book'},
      { level:'Bugei', type:'', sub_type:'', trait:'', ring:'', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 143 Core Book'},
      { level:'Bugei', type:'', sub_type:'', trait:'', ring:'', rank:0, rank_s:0, roll:'', emphasis:null, emphases:{}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 143 Core Book'},

    ];

    $scope.showSkillList = false;
    $scope.skillSearchText = "";
    $scope.toggleShowSkillsList = function() {
        $scope.showSkillsList = !$scope.showSkillsList;
    };

    $scope.emphasesList = ["One", "Two"];
    $scope.currentSkillIndex = null;
    $scope.showEmphasesList = false;
    $scope.toggleShowEmphasesList = function(skill_index = 0) {
        $scope.currentSkillIndex = skill_index;
        $scope.emphasesList = [];
        for ( var i in $scope.character.skills[skill_index].emphases ) {
            $scope.emphasesList.push( $scope.character.skills[skill_index].emphases[i] ) ;
        }
        //console.log("Emphases List : " + JSON.stringify($scope.emphasesList));
        //console.log("Show Emphases List : " + $scope.showEmphasesList);
        $scope.showEmphasesList = !$scope.showEmphasesList;
    };

    $scope.addEmphasis = function(emphasis_index) {
      //console.log("Skill : " + $scope.currentSkillIndex + " Emphasis : " + emphasis_index);
      $scope.character.skills[$scope.currentSkillIndex].emphasis = emphass_index;  
      $scope.showEmphasesList = !$scope.showEmphasesList;
    };

    $scope.addSkill = function(index) {
      var skill = $scope.skillsMasterList[index];
      skill.roll = $scope.character[skill.trait] + "K" + $scope.character[skill.ring];      
      $scope.character.skills.push(skill);       
      $scope.toggleShowSkillsList();
    };    

    $scope.removeSkill = function(index) {
      $scope.character.skills.splice(index,1);
    };

    $scope.addEmphasis = function(index) {
      var emp = $scope.character.skills[$scope.currentSkillIndex].emphases[index];
      //console.log("Add Emphasis Index : " + index + " to Skill Index : " + $scope.currentSkillIndex + " Emp: " + emp );
      $scope.character.skills[$scope.currentSkillIndex].emphasis = emp;
      $scope.toggleShowEmphasesList();
    }

    $scope.updateSkillRank = function(index) {
      if ( $scope.character.skills[index].rank < $scope.character.skills[index].rank_s ) {
        var diff = $scope.character.skills[index].rank_s - $scope.character.skills[index].rank;
        $scope.character.experience_points += diff;
        $scope.character.insight_rank -= diff;
      } else if ( $scope.character.skills[index].rank > $scope.character.skills[index].rank_s ) {
        var diff = $scope.character.skills[index].rank - $scope.character.skills[index].rank_s;
	    $scope.character.experience_points -= diff;
        $scope.character.insight_rank += diff;
      }
      $scope.character.skills[index].rank_s = $scope.character.skills[index].rank;
      $scope.updateSkills($scope.character.skills[index].trait, $scope.character.skills[index].ring);
    };

  });

  app.controller('SpellsController', function($scope) {

    $scope.spellsMasterList = [
      { id:0, name:'Sense', ring:'all', level: '1', range:'Personal', area_of_affect:'50\' radius from the caster', duration:'Instantaneous', raises: 'Range(+10\')', description:'This spell can be cast in any of the four standard elements. It allows for the caster to sense the presense, quantity, and rough location of the elemental spirits (not evil spirits known as <i>kansen</i> of that element within the range of the spell. This is most frequently applied when looking for spirits with which to Commune (See Commune), but can also can be useful as a crude basic location device. For example, a caster lost in the wilderness could cast Snese(Water) in hopes of locating the sourceof drinking water.' },
      { id:1, name:'Summon', ring:'all', level: '1', range:'30\'', area_of_affect:'1 cubic foot of summoned matterial', duration:'Permanent', raises: 'Range(+10\'), Quantity(+1 cubic foot), Composition of Material(1-4 raises as outlined below)', description:'This spell can be cast in any of the tour standard elements. It allows the caster to summon a modest quantity (one cubic foot) of the chosen element. The summoned matter appears (usually in a rough ball shape] in any open space within the spell\'s range. This cannot place the summoned material inside another physical object or living creature. The summoned element will behave in a normal and mundane matter — earth falls to the ground, water soaks anything it lands on, air blows away, and ﬁre winks out unless there is something present for it to burn. In general it is impossible to use this spell effectively in combat, although clever shugenja may find a few modest combat uses. such as using Summon [Fire] to ignite a foe soaked in cooking oil. More commonly, the Spell\’s value is in simpler functions. such as summoning Water while in a desert, or summoning Fire to light a campfire without flint and tinder. Raises may be used with this spell to summon a more speciﬁc type of the appropriate element, such as wood or iron with Earth, or tea with Water. The GM should choose how many Raises (generally anywhere from 1 to 4) this requires. However, these Raises cannot be used to create rare or precious materials (such as gold) or spiritually powerful substances (such as jade or crystal).' },
      { id:2, name:'Commune', ring:'all', level: '1', range:'20\'', area_of_affect:'self', duration:'Concentration', raises: 'See Desc.', description:'This spell can be cast in any element save Void. It allows the caster to speak with one of the local elemental kami, asking it a few questions, which is will answer honestly to the best of it\'s ability. ...' },
      { id:3, name:'Blessed Wind', ring:'air', level:'1', range:'Personal', area_of_affect:'10\' radius around the caster', duration:'Concentration', raises:'Special(you may target another spell with this spell with 3 raises)', description:'Pg 167 Core Book' },
    ];

    $scope.showSpellsList = false;
    $scope.toggleShowSpellsList = function() {
      $scope.showSpellsList = !$scope.showSpellsList;
    };

    $scope.addSpell = function(index) {      
      $scope.character.spells.push( $scope.spellsMasterList[index]) ;
      $scope.toggleShowSpellsList();
    };

  });

})();
