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
      get initiative() { return ((this.insight_rank + this.reflexes) + "K" + this.reflexes); },
      get current_tn() { return ((this.reflexes * 5 ) + 5); },
      insight       : 0, 
      insight_rank  : 1, 
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
      armor         : { rating:0 },
      get armor_tn() { return ( 5 * this.reflexes + 5 + this.armor.rating); },
      honor         : 0,
      glory         : 0,
      'status'      : 0,
      taint         : 0,
      skills        : [],
      spells        : [],
      spell_affinity: ['air','water'],
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
      //$scope.updateSkills(attr,'earth');
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
      //$scope.updateSkills(attr,'air');
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
      //$scope.updateSkills(attr,'water');
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
      //$scope.updateSkills(attr,'fire');
    };
    $scope.updateVoid = function(attr, value) {
      $scope.updateExp(attr,value);
      $scope.updateInsightRank();
      //$scope.updateSkills(attr,'void');
    };
     
    $scope.updateInsightRank = function() { 
      var skillRanks = 0;
      for(var i = 0; i < $scope.character.skills.length; i++) {
          skillRanks += $scope.character.skills[i].rank;
      }
      $scope.character.insight = skillRanks + (($scope.character.earth + $scope.character.air + $scope.character.water + $scope.character.fire + $scope.character.void) * 10);
    };

    //$scope.updateSkills = function(attr,ring) {
    //    for(var i = 0; i < $scope.character.skills.length; i++) {
    //      if ($scope.character.skills[i].trait == attr) {
    //        $scope.character.skills[i].roll = ( $scope.character.skills[i].rank + $scope.character[attr] ) + "K" + $scope.character[ring];
    //      }
    //    }
    //};

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
      // id:, level, type, subtype, trait, ring, rank, roll, emphasis, emphases{}, get mastery(), masteries{}, description
      { id:1000, level:'Debug', type:'Debug', sub_type:'debug', trait:'void', ring:'void', emphases:{0:'E Zero', 1:'E One', 2:'E Two'}, get mastery() { return mastery(this); }, masteries:{ 3:'M Three', 5:'M Five', 7:'M Seven'}, description:'debug description'},
      { id:0, level:'High', type:'Artisan', sub_type:'', trait:'awareness', ring:'air', emphases: {0:'Bonsai', 1:'Gardening', 2:'Ikebana', 3:'Painting', 4:'Poetry', 5:'Sculpture', 6:'Tattooing'}, description:'Pg. 135 Core Book'},
      { id:1, level:'High', type:'Artisan', sub_type:'Origami', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:2, level:'High', type:'Artisan', sub_type:'Bonsai', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:3, level:'High', type:'Artisan', sub_type:'Gardening', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:4, level:'High', type:'Artisan', sub_type:'Ikebana', trait:'awareness', ring:'air', description:'(flower aranging) Pg. 135 Core Book'},
      { id:5, level:'High', type:'Artisan', sub_type:'Painting', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:6, level:'High', type:'Artisan', sub_type:'Poetry', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:7, level:'High', type:'Artisan', sub_type:'Sculpture', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:8, level:'High', type:'Artisan', sub_type:'Tattooing', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:9, level:'High', type:'Acting', sub_type:'Social Skill', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:10, level:'High', type:'Caligraphy', sub_type:'', trait:'intelligence', ring:'fire', emphases:{0:'Cipher', 1:'High Rokugani'}, get mastery() { return mastery(this); }, masteries: { 5: "+10 to break a code or cipher"}, description:'Pg. 135 Core Book'},
      { id:11, level:'High', type:'Coutier', sub_type:'Social Skill', trait:'awareness', ring:'air', empasis:null, emphases:{0: "Gossip", 1: "Manipulation", 2:"Rhetoric" }, get mastery() { return mastery(this); }, masteries:{3:"+3 Insight Above Normal", 5:"1k0 bonus to all contested Courtier Rolls", 7:"+7 Insight Above normal (In addition to the bonus from rank 3)" }, description:'Pg. 135 Core Book'},
      { id:12, level:'High', type:'Divination', sub_type:'', trait:'intelligence', ring:'fire', emphases: {0:"Astrology", 1:"Kawaru"}, get mastery() { return mastery(this); }, masteries:{5:"A second roll may be made without spending a void point"}, description:'Pg. 135 Core Book'},
      { id:13, level:'High', type:'Etiquette', sub_type:'Social Skill', trait:'awareness', ring:'air', emphases: { 0:"Bureaucracy", 1:"Conversation", 2:"Courtesy"}, get mastery() { return mastery(this); }, masteries: {3:"+3 Insight above normal", 5:"+1k0 bonus to all contested Etiquette rols", 7:"+7 Insight Above normal (In addition to the bonus from rank 3)"}, description:'Pg. 136 Core Book'},
      { id:14, level:'High', type:'Games', sub_type:'Fortunes and Winds', trait:'awareness', ring:'air', description:'Pg. 136 Core Book'},
      { id:15, level:'High', type:'Games', sub_type:'Go', trait:'intelligence', ring:'fire', description:'Pg. 136 Core Book'},
      { id:16, level:'High', type:'Games', sub_type:'Kemari', trait:'agility', ring:'fire', description:'Pg. 136 Core Book'},
      { id:17, level:'High', type:'Games', sub_type:'Kemari', trait:'agility', ring:'fire', description:'Pg. 136 Core Book'},
      { id:18, level:'High', type:'Games', sub_type:'Letters', trait:'awareness', ring:'air', description:'Pg. 136 Core Book'},
      { id:19, level:'High', type:'Games', sub_type:'Sadane', trait:'awareness', ring:'air', description:'Pg. 136 Core Book'},
      { id:20, level:'High', type:'Games', sub_type:'Shoji', trait:'intelligence', ring:'fire', description:'Pg. 136 Core Book'},
      { id:21, level:'High', type:'Investigation', sub_type:'', trait:'perception', ring:'water', emphases:{0:'Interrogation', 1:'Notice', 2:'Search'}, get mastery() { return mastery(this); }, masteries:{3:'Second attempt without increase in TN',5:'+5 bonus to any contested roll unsing Investigation',7:'A third attempt to use Search emphasis even if second attempt fails may be made'}, description:'Pg. 136 Core Book'},
      { id:22, level:'High', type:'Lore', sub_type:'Anatomy', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:23, level:'High', type:'Lore', sub_type:'Architecture', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:24, level:'High', type:'Lore', sub_type:'Bushido', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:25, level:'High', type:'Lore', sub_type:'Great Clan (Choose One)', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:26, level:'High', type:'Lore', sub_type:'Elements', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:27, level:'High', type:'Lore', sub_type:'Gaijin Culture', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:28, level:'High', type:'Lore', sub_type:'Ghosts', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:30, level:'High', type:'Lore', sub_type:'Heraldry', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:31, level:'High', type:'Lore', sub_type:'History', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:32, level:'High', type:'Lore', sub_type:'Maho*', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:33, level:'High', type:'Lore', sub_type:'Nature', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:34, level:'High', type:'Lore', sub_type:'Non-Human Culture', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:35, level:'High', type:'Lore', sub_type:'Omens', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:36, level:'High', type:'Lore', sub_type:'Shadowslands*', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:37, level:'High', type:'Lore', sub_type:'Shugenja', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:38, level:'High', type:'Lore', sub_type:'Spirit Realms', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:39, level:'High', type:'Lore', sub_type:'Theology', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
      { id:40, level:'High', type:'Lore', sub_type:'Underworld*', trait:'intelligence', ring:'fire', description:'Low Skill, Pg. 137 Core Book'},
      { id:41, level:'High', type:'Lore', sub_type:'War*', trait:'intelligence', ring:'fire', description:'Low Skill, Pg. 137 Core Book'},
      { id:42, level:'High', type:'Medicine', sub_type:'', trait:'intelligence', ring:'fire', emphases:{0:'Antidotes', 1:'Disease', 2:'Herbalism', 3:'Non-Humans', 4:'Wound Treatment'}, description:'Pg. 137 Core Book'},
      { id:43, level:'High', type:'Meditation', sub_type:'', trait:'void', ring:'void', emphases:{0:'Fasting', 1:'Void Recovery'}, description:'Pg. 137 Core Book'},
      { id:44, level:'High', type:'Perform', sub_type:'Biwa', trait:'agility', ring:'fire', description:'Pg. 137 Core Book'},
      { id:45, level:'High', type:'Perform', sub_type:'Dance', trait:'agility', ring:'fire', description:'Pg. 137 Core Book'},
      { id:46, level:'High', type:'Perform', sub_type:'Drums', trait:'agility', ring:'fire', description:'Pg. 137 Core Book'},
      { id:47, level:'High', type:'Perform', sub_type:'Flute', trait:'agility', ring:'fire', description:'Pg. 137 Core Book'},
      { id:48, level:'High', type:'Perform', sub_type:'Oratory', trait:'awareness', ring:'air', description:'Pg. 137 Core Book'},
      { id:49, level:'High', type:'Perform', sub_type:'Puppeteer', trait:'agility', ring:'fire', description:'Pg. 137 Core Book'},
      { id:50, level:'High', type:'Perform', sub_type:'Samisen', trait:'agiltity', ring:'fire', description:'Pg. 137 Core Book'},
      { id:51, level:'High', type:'Perform', sub_type:'Song', trait:'awareness', ring:'air', description:'Pg. 137 Core Book'},
      { id:52, level:'High', type:'Perform', sub_type:'Story Telling', trait:'awareness', ring:'air', description:'Pg. 137 Core Book'},
      { id:53, level:'High', type:'Sincerity', sub_type:'Social Skill', trait:'awareness', ring:'air', emphases:{0:'Honesty', 1:'Deceit*'}, get mastery() { return mastery(this); }, masteries:{5:'+5 Bonus to all contested rolls using Sincerity'}, description:'Pg. 138 Core Book'},
      { id:54, level:'High', type:'Spellcraft', sub_type:'', trait:'intelligence', ring:'fire', emphases:{0:'Importune', 1:'Spell Research'}, get mastery() { return mastery(this); }, masteries:{5:'+1k0 on Spellcasting rolls'}, description:'Pg. 138 Core Book'},
      { id:55, level:'High', type:'Tea Ceremony', sub_type:'', trait:'void', ring:'void', emphases:{}, get mastery() { return mastery(this); }, masteries:{5:'All participants regain 2 void points'}, description:'Pg. 139 Core Book'},
      { id:56, level:'Bugei', type:'Athletics', sub_type:'', trait:'strength', ring:'water', emphases:{0:'Climbing', 1:'Running', 2:'Swimming', 3:'Throwing'}, get mastery() { return mastery(this); }, masteries:{ 3:'Moderate terrain no longer impedes movement, and difficult terrain reduces water ring my 1 instead of 2', 5:'Character no longer suffers movement penalties regarless of terrain', 7:'Add 5 feet to the total of one Move Action per round.'}, description:'Pg. 139 Core Book'},
      { id:57, level:'Bugei', type:'Battle', sub_type:'', trait:'perception', ring:'water', emphases:{0:'Mass Combat', 1:'Skirmish'}, get mastery() { return mastery(this); }, masteries:{5:'Character adds Battle Skill Rank to Initiative Score durring skirmishes'}, description:'Pg. 139 Core Book'},
      { id:58, level:'Bugei', type:'Defense', sub_type:'', trait:'reflexes', ring:'air', emphases:{}, get mastery() { return mastery(this); }, masteries:{3:'Character may retain result of previous Defense / Reflexes roll rather than make a new roll if the Full Defense Stance is being maintained in subsequent rounds', 5:'Characters Armor TN is considered 3 higher than in the Defense and Full Defense stances', 7:'One Simple Action may be taken while in the Full Defense Stance(no attacks may be made)'}, description:'Pg. 139 Core Book'},
      { id:59, level:'Bugei', type:'Horsemanship', sub_type:'', trait:'agility', ring:'fire', emphases:{0:'Gaijin Riding Horse', 1:'Rokugani Pony', 2:'Utaku Steed'}, get mastery() { return mastery(this); }, masteries:{3:'May utilize Full Attack Stance when on horseback', 5:'Mointing a horse is a Simple Action, Dismounting is a Free Action', 7:'Mounting a horse is a Free Action'}, description:'Pg. 139 Core Book'},
      { id:60, level:'Bugei', type:'Hunting', sub_type:'', trait:'perception', ring:'water', emphases:{0:'Survival', 1:'Tracking', 2:'Trailblazing'}, get mastery() { return mastery(this); }, masteries:{5:'1k0 Bonus to total of all Stealth Rolls made in wilderness environments'}, description:'Pg. 140 Core Book'},
      { id:61, level:'Bugei', type:'Iaijutsu', sub_type:'', trait:'reflexes', ring:'air', emphases:{0:'Assessment', 1:'Focus'}, get mastery() { return mastery(this); }, masteries:{3:'Readying a katana is a Free Action', 5:'During an Iaijutsu Duel, the character gains one Free Raise on his Iaijutsu(Focus) / Void roll during the Focus Stage', 7:'During the Assessment of an Iaijutsu Duel, the character gains a bonus of +2k2 to the total of all Focus Rolls if his Assessment roll exceeds his opponent\'s by 10 or more (instead of the normal +1k1)'}, description:'Pg. 139 Core Book'},
      { id:62, level:'Bugei', type:'Juijitsu', sub_type:'', trait:'agility', ring:'fire', emphases:{0:'Grappling', 1:'Improvised Weapons', 2:'Martial Arts'}, get mastery() { return mastery(this); }, masteries:{3:'Damage of all unarmed attacks is increases by +1k0', 5:'Use of Juijitsu confers a Free Raise toward initating Grapple', 7:'Damage of all unarmed attacks in increased by +0K1 (+1k1 total)'}, description:'Pg. 139 Core Book'},
      { id:63, level:'Bugei', type:'Weapons', sub_type:'', trait:'', ring:'', emphases:{1:'Special'}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 140 Core Book'},
      { id:64, level:'Bugei', type:'Chain Weapons', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Kusarigama', 1:'Kyoketsu-shogi', 2:'Manrikusari'}, get mastery() { return mastery(this); }, masteries:{3:'Chain weapons made be used to initiate grapple (See Book of Earth)', 5:'Wielding a chain weapon gains a 1k0 on Contested Rolls against opponents who are tangled or Grappled via their weapon', 7:'Use of chain weapon confers one Free Raise toward use of Disarm or Knockdown Maneuvers'}, description:'Pg. 141 Core Book'},
      { id:65, level:'Bugei', type:'Heavy Weapons', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Dai Tsuchi', 1:'Masakari', 2:'Ono', 3:'Tetsubo'}, get mastery() { return mastery(this); }, masteries:{3:'Opponents with a Reduction Rating have their rating reduced by 2 when attacked with heavy weapon', 5:'Use of Heavy Weapon confers on Free Raise toward use of Knockdown Maneuver', 7:'Damage dice explode on a result of 9 and 10 when using heavy weapons'}, description:'Pg. 141 Core Book'},
      { id:66, level:'Bugei', type:'Kenjustu', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Katana', 1:'Ninja-to', 2:'No-dachi', 3:'Parangu', 4:'Scimitar', 5:'Wakizashi'}, get mastery() { return mastery(this); }, masteries:{3:'Total damage rolls is increased by 1k0', 5:'Sword can be readied as a Free Action', 7:'Damage dice explode on a 9 and 10'}, description:'Pg. 141 Core Book'},
      { id:67, level:'Bugei', type:'Knives', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Aiguchi', 1:'Jitte', 2:'Kama', 3:'Sai', 4:'Tanto'}, get mastery() { return mastery(this); }, masteries:{3:'No Off-hand penalties', 5:'Use or a sai or jitte confers one Free Raise towards the Disarm Maneuver', 7:'Use of any knife confers a Free Raise towards use of the Extra Attack Maneuver'}, description:'(Tanojutsu) Pg. 141 Core Book'},
      { id:68, level:'Bugei', type:'Kyujutsu', sub_type:'Weapon Skill', trait:'reflexes', ring:'air', emphases:{0:'Dai-kyu', 1:'Han-kyu', 2:'Yumi'}, get mastery() { return mastery(this); }, masteries:{3:'Striging bow is a Simple Action', 5:'Max range of any bow increased by 50%', 7:'Strength of bow increased by 1'}, description:'Pg. 142 Core Book'},
      { id:69, level:'Bugei', type:'Ninjutsu* (agility)', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Blowgun*', 1:'Shuriken*', 2:'Tsubute*'}, get mastery() { return mastery(this); }, masteries:{3:'Damage increase by 1k1', 5:'Dice on Damage Rolls Exlode on 10 despite being Nijutsu Weapons', 7:'Damage on ninjutsu weapons increased by +0k1 (+1k1 total)'}, description:'Low Skill. Pg. 142 Core Book'},
      { id:70, level:'Bugei', type:'Ninjutsu* (reflexes)', sub_type:'Weapon Skill', trait:'reflexes', ring:'fire', emphases:{0:'Blowgun*', 1:'Shuriken*', 2:'Tsubute*'}, get mastery() { return mastery(this); }, masteries:{3:'Damage increase by 1k1', 5:'Dice on Damage Rolls Exlode on 10 despite being Nijutsu Weapons', 7:'Damage on ninjutsu weapons increased by +0k1 (+1k1 total)'}, description:'Low Skill. Pg. 142 Core Book'},
      { id:71, level:'Bugei', type:'Polearms', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Bisento', 1:'Nagamaki', 2:'Naginata', 3:'Sasumata', 4:'Sodegarami'}, get mastery() { return mastery(this); }, masteries:{3:'During 1st round of skirmish, polearm gains +5 bonus to Initiative Score', 5:'Damage rolls vs. mounted or significantly larger opponents increased by +1k0', 7:'Polearms readied as a free action'}, description:'Pg. 143 Core Book'},
      { id:72, level:'Bugei', type:'Spears', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Mai Chong', 1:'Kumade', 2:'Lance', 3:'Nage-yare', 4:'Yari'}, get mastery() { return mastery(this); }, masteries:{3:'', 5:'', 7:''}, description:'Pg. 143 Core Book'},
      { id:73, level:'Bugei', type:'', sub_type:'', trait:'', ring:'', emphases:{}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 143 Core Book'},
      { id:74, level:'Bugei', type:'', sub_type:'', trait:'', ring:'', emphases:{}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 143 Core Book'},
      { id:75, level:'Bugei', type:'', sub_type:'', trait:'', ring:'', emphases:{}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 143 Core Book'},
      { id:76, level:'Bugei', type:'', sub_type:'', trait:'', ring:'', emphases:{}, get mastery() { return mastery(this); }, masteries:{}, description:'Pg. 143 Core Book'},

    ];

    $scope.showSkillList = false;
    $scope.skillSearchText = "";
    $scope.toggleShowSkillsList = function() {
        $scope.showSkillsList = !$scope.showSkillsList;
    };

    $scope.emphasesList = ["One", "Two"];
    $scope.currentSkillIndex = null;
    $scope.currentSkillId = null;
    $scope.showEmphasesList = false;

    $scope.toggleShowEmphasesList = function(skill_id = 0) {
        //console.log("Skill Id : " + skill_id);
        $scope.currentSkillIndex = skill_id;
        //console.log("Current Skill Index : " + $scope.currentSkillIndex);
        $scope.emphasesList = [];
        var skill = getSkill(skill_id);
        for ( var i in skill.emphases ) {
            $scope.emphasesList.push( skill.emphases[i] ) ;
        }
        $scope.showEmphasesList = !$scope.showEmphasesList;
    };

    $scope.addEmphasis = function(emphasis_index) {
      var skill = getCharacterSkillById($scope.currentSkillIndex);
      skill.empasis = empasis_index;
      replaceCharacterSkillById($scope.currentSkillIndex, skill);
      $scope.toggleShowEmphasisList();
    };

    var getSkill = function(skill_id, attr=null) { 
      return $scope.getSkillFromMasterList(skill_id, attr); 
    };

    var getSkillRoll = function(skill_id, skill_rank) {
      var skill = $scope.getSkillFromMasterList(skill_id);
      var trait = skill.trait;
      var ring  = skill.ring;
      var roll =  ( skill_rank + $scope.character[trait] ) + "K" + $scope.character[ring];
      return roll;
    };

    $scope.addSkill = function(skill_id) {
      var skill = $scope.getSkillFromMasterList(skill_id);
      //var new_skill = { id: skill_id, rank: 0, emphasis:null, get roll() { return (getSkillRoll(this.id)); } , get skill() { return (getSkill(this.id)); } };
      var new_skill = { id: skill_id, rank: 0, rank_s: 0, emphasis:null, get roll() { return (getSkillRoll(this.id, this.rank)); } , get skill() { return (getSkill(this.id)); } };
      if ( getCharacterSkillById(skill_id) === null) {
        $scope.character.skills.push(new_skill);       
        $scope.toggleShowSkillsList();
      }
    };    

    $scope.getSkillFromMasterList = function(skill_id, attr=null) {
        for(var i=0; i < $scope.skillsMasterList.length; i++) {
            if ( $scope.skillsMasterList[i].id === skill_id ) {
                if (attr === null) {
                    return $scope.skillsMasterList[i];
                } else {
                    return $scope.skillsMasterList[i][attr];
                }
            }
        }
    };
   
    $scope.removeSkill = function(id) {
       replaceCharacterSkillById(id, null);
    };

    $scope.addEmphasis = function(index) {
      var skill = $scope.getSkillFromMasterList($scope.currentSkillIndex);
      //var emp = $scope.character.skills[$scope.currentSkillIndex].emphases[index];
      var emp = skill.emphases[index];
      skill.emphasis = emp;
      console.log("Add Emphasis Index : " + index + " to Skill Index : " + $scope.currentSkillIndex + "Emp: " + emp + " Emphasis: " + skill.emphasis );
      console.log(skill.emphasis);
      //$scope.character.skills[$scope.currentSkillIndex].emphasis = emp;
      replaceCharacterSkillById($scope.currentSkillIndex, skill);
      $scope.toggleShowEmphasesList();
    }
    
    var getCharacterSkillById = function(skill_id) {        
        for(var i = 0; i < $scope.character.skills.length; i++) {
            if ( $scope.character.skills[i].id === skill_id ) {
                return $scope.character.skills[i];
            }
        }
        return null;
    };

    var replaceCharacterSkillById = function(skill_id, skill) {
        for(var i = 0; i < $scope.character.skills.length; i++) {
            if ( $scope.character.skills[i].id === skill_id ) {
                console.log("i:" + i);
                if ( skill === null ) {
                  //console.log("Remove Skill");
                  $scope.character.skills.splice(i,1);
                } else {
                  //console.log("Replace Skill");
                  $scope.character.skills.splice(i,1,skill);
                }
            }
        }
    }

    $scope.updateSkillRank = function(id) {
      var skill = getCharacterSkillById(id);
      if ( skill.rank < skill.rank_s ) {
        var diff = $scope.character.skills[index].rank_s - $scope.character.skills[index].rank;
        $scope.character.experience_points += diff;
        $scope.character.insight -= diff;
      } else if ( skill.rank > skill.rank_s ) {
        var diff = skill.rank - skill.rank_s;
	    $scope.character.experience_points -= diff;
        $scope.character.insight += diff;
      }
      skill.rank_s = skill.rank;
      replaceCharacterSkillById(id, skill);
      $scope.updateInsightRank();
    };

  });

  app.controller('SpellsController', function($scope) {

    var spellRoll = function(obj) {
      var roll = '';
      var spell_ring = obj.ring;
      var insight_rank = $scope.character.insight_rank;
      var ring_val = "Ring"
      var affinity = "+Affinity+"; 
      if ( spell_ring != 'all' ) {
        ring_val = $scope.character[spell_ring];
      }
      if ( $scope.character.spell_affinity.indexOf( spell_ring ) >= 0 ) {
          affinity = 1;
      }
      roll = ring_val + ( affinity + insight_rank ) + 'K' + ring_val;
      //console.log("Spell Roll: " + roll);
      return roll;
    };

    $scope.spellsMasterList = [
      { id:0, name:'Sense', ring:'all', level: '1', range:'Personal', area_of_affect:'50\' radius from the caster', duration:'Instantaneous', raises: 'Range(+10\')', get roll() { return spellRoll(this); }, description:'This spell can be cast in any of the four standard elements. It allows for the caster to sense the presense, quantity, and rough location of the elemental spirits (not evil spirits known as <i>kansen</i> of that element within the range of the spell. This is most frequently applied when looking for spirits with which to Commune (See Commune), but can also can be useful as a crude basic location device. For example, a caster lost in the wilderness could cast Snese(Water) in hopes of locating the sourceof drinking water.' },
      { id:1, name:'Summon', ring:'all', level: '1', range:'30\'', area_of_affect:'1 cubic foot of summoned matterial', duration:'Permanent', raises: 'Range(+10\'), Quantity(+1 cubic foot), Composition of Material(1-4 raises as outlined below)', get roll() { return spellRoll(this); }, description:'This spell can be cast in any of the tour standard elements. It allows the caster to summon a modest quantity (one cubic foot) of the chosen element. The summoned matter appears (usually in a rough ball shape] in any open space within the spell\'s range. This cannot place the summoned material inside another physical object or living creature. The summoned element will behave in a normal and mundane matter ‚Äî earth falls to the ground, water soaks anything it lands on, air blows away, and Ô¨Åre winks out unless there is something present for it to burn. In general it is impossible to use this spell effectively in combat, although clever shugenja may find a few modest combat uses. such as using Summon [Fire] to ignite a foe soaked in cooking oil. More commonly, the Spell\‚Äôs value is in simpler functions. such as summoning Water while in a desert, or summoning Fire to light a campfire without flint and tinder. Raises may be used with this spell to summon a more speciÔ¨Åc type of the appropriate element, such as wood or iron with Earth, or tea with Water. The GM should choose how many Raises (generally anywhere from 1 to 4) this requires. However, these Raises cannot be used to create rare or precious materials (such as gold) or spiritually powerful substances (such as jade or crystal).' },
      { id:2, name:'Commune', ring:'all', level: '1', range:'20\'', area_of_affect:'self', duration:'Concentration', raises: 'See Desc.', get roll() { return spellRoll(this); }, description:'This spell can be cast in any element save Void. It allows the caster to speak with one of the local elemental kami, asking it a few questions, which is will answer honestly to the best of it\'s ability. ...' },
      { id:3, name:'Blessed Wind', ring:'air', level:'1', range:'Personal', area_of_affect:'10\' radius around the caster', duration:'Concentration', raises:'Special(you may target another spell with this spell with 3 raises)', get roll() { return spellRoll(this); }, description:'Pg 167 Core Book' },
      { id:4, name:'By the Light of the Moon', ring:'air', level:'1', range:'Touch', area_of_affect:'One Object', duration:'1 hour', raises:'Area (+5ë radius), Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'You call upon the kami to reveal that which has been hide den. All concealed objects within the area of effect appear as slightly luminous outlines to you. Any nonómagical conceale ment is revealed, including secret compartments, trap doors. concealed weapons, etc. Only you can see the presence of these objects. Pg 167 Core Book' },
      { id:5, name:'Cloak of Night', ring:'air', level:'1', range:'Touch', area_of_affect:'One Object', duration:'1 hour', raises:'Duration (+1 hour)', get roll() { return spellRoll(this); }, description:'You can call upon the kami to wrap an object in their embrace, hiding it from the sight of mortal beings. You may target any one nonelivingë object smaller than you. This object becomes invisible to the naked eye. Attempts to perceive it magically will automatically succeed if the Mastery Level of the spell used is higher than that of this spell. Spells of equal Mastery Level require a Contested Air Roll to detect the hidden object. The object is still physically present and can be touched, smelled, or sensed with any normal sense other than vision. Pg 167 Core Book' },
      { id:6, name:'Legacy of Kaze-No-Kame', ring:'air', level:'1', range:'School Rank x 10 Miles', area_of_affect:'One known individual within range', duration:'Special', raises:'Area (+1 individual), Range (+10 miles)', get roll() { return spellRoll(this); }, description:'You are able to call upon the spirits of the wind to take form as a bird and carry a message for you. The bird that is created by this spell appears perfectly normal in all regards. but if it takes any damage it dissipates into wind immediately, ending the spell. Upon creating the bird, you may speak to it, giving it a spoken message of up to one minute in length. The bird will then fly away to deliver the message to the person (or persons) specified when the spell is cast. The bird will fly to their location, deliver the message via a whisper (it can be overheard by others, but not easily), and then disappear. If the bird is unable to reach the individual, but they are within range (if they are within a building with no windows. for instance) it will remain outside waiting for up to one week before disappearing. If the person specified by the spell is not within range, the bird will fly away in a random direction and disappear when it is out of your line of sight. Pg 167 Core Book' },
      { id:7, name:'Nature\'s Touch', ring:'air', level:'1', range:'10\'', area_of_affect:'One Creature', duration:'Special', raises:'Range(+10\')', get roll() { return spellRoll(this); }, description:'You are able to use the spirits of the wind to speak to an animal and ensure that it understands what you are saying. This spell works only on natural animals, and will not work with Shadowlands creatures or creatures from other realms. It does not guarantee that the animal will regard you positively or that it will fulfill requests made of it, but the creature will understand anything you tell it (within its ability to do so. naturally political relationships will have no meaning to a horse, no matter how many times you explain them). This spell lasts as long as you maintain your full and undivided attention on the animal and continue speaking to it. Pg 167 Core Book' },
      { id:8, name:'Tempest of Air', ring:'air', level:'1', range:'Personal', area_of_affect:'A cone 75\' long and 15\' wide at its end', duration:'Instantaneous', raises:'Area (+5\' to the width of the cone), Damage (+lk0), Range (+5\' to the length of the cone), Special (+5 to Air TN against Knockdown per Raise)', get roll() { return spellRoll(this); }, description:'You summon a powcr?al gust of air emanating front your position that crashes into all in its path, knocking them to the ground. All targets within the area of effect suffer lkl Wounds and must make a Contested Roll using their Earth against your Air. Every target that fails suffers Knockdown. Pg 167 Core Book' },
      { id:9, name:'Token of Memory', ring:'air', level:'1', range:'10\'', area_of_affect:'One small (1 cubic foot or smaller) illusory object', duration:'1 hour', raises:'Area (+1 cubic foot in size of illusory object), Duration (+1 hour)', get roll() { return spellRoll(this); }, description:'You can create a flawless illusion of one object. The item ape pears real in every way up until the spell expires, at which point it disappears. If you are attempting to create a specifc, familiar object, such as another samuraiís katana, you must declare one Raise, and that individual may make a Contested Roll using his Perception against the total of your Spell Casting Roll to detect the forgery. Images created by this spell are completely stationary. and if placed in a situation where they must move [such as floating in water], disappear instantly. An image of a katana could be created sitting on a rack, for example, but not in a samurai\'s obi because it would not be able to move with the samurai. Objects created with this spell have no true physical substance and cannot hear weight or inflict damage.Pg 167 Core Book' },
      { id:10, name:'To Seek the Truth', ring:'air', level:'1', range:'Personal / Touch', area_of_affect:'One individual touched [may be the caster]', duration:'5 minutes', raises:'Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'You call upon the wind to purge the mind of your target, granting him clarity. This spell may negate temporary mental or social penalties suffered as a result of a mechanical effect, including Techniques, Wound Ranks, or other spells. The TN of the Spell Casting Roll made to cast this spell is increased by an amount equal to the Technique Rank, Wound Rankë or spell Mastery Level used to create the penalty in the first place. Disadvantages permanently possessed by an individual may not be countered using this spell. Pg 168 Core Book' },
      { id:11, name:'Way of Deception', ring:'air', level:'1', range:'20\'', area_of_affect:'One illusory duplicate of the caster', duration:'Concentration +5 minutes', raises:'Area [+1 duplicate per 2 Raises]. Range [+5 feet], Special [see below]', get roll() { return spellRoll(this); }, description:'You can entreat the capricious spirits of the wind to create a perfect duplicate image of you a short distance away. The illusion exactly refects your appearance at the time the spell is cast, including your clothing and any equipment. The illusion may appear anywhere within the spell\'s range, and will perform whatever actions you perform while it is in effect. (If you sit down, for instance, your duplicate will sit down as well, even if there is nothing to sit on.) Once you leave the normal range of the spell, the duplicate disappears. if you make two Raises on the Spell Casting Roll, you may leave the area of effect and the illusion will remain in whatever position it was in when you left for as long as you continue concentrating on maintaining the spell. Pg 168 Core Book' },
      { id:12, name:'Yari or Air', ring:'air', level:'1', range:'Personal or 20\'', area_of_affect:'One created weapon', duration:'5 minutes', raises:'Damage (+lk0). Duration (+5 minutes). Range (+5 feet)', get roll() { return spellRoll(this); }, description:'You summon a swirling weapon of pure air. only visible as a foggy outline. The weapon\'s default form is a yari. but one Raise can change its form to any other spear of your choosing. The weapon has DR lkl. if you do not possess the Spears Skill, you may instead use your School Rank in its place. If you do possess the Spears Skill, using this weapon grants you one Free Raise that can only he used on the Feint or Increased Damage Maneuvers. This weapon disappears if is lost from your hand. instead of summoning the yari for yourself, you may cause it to appear in the hands of an ally within 20 feet. He is treated as the caster for all purposes of the spell, but he does not gain the Free Raise bonus. Pg 168 Core Book' },
      { id:13, name:'Benten\s Touch', ring:'air', level:'2', range:'Personal / Touch', area_of_affect:'Target individual [may be the caster]', duration:'1 hour', raises:'Range (may increase range to 5\' with a single Raise)', get roll() { return spellRoll(this); }, description:'By calling upon the air kami [0 whisper suggestions to others, you may cause them to perceive the target of this spell more positively than they otherwise might. The target of this spell gains a bonus of +lkl. plus your Air Ring, to the total of all Social Skill rolls made for the duration of the spell. Pg 168 Core Book' },
      { id:14, name:'Call Upon the Wind', ring:'air', level:'2', range:'Personal or 20\'', area_of_affect:'Target individual [may he the caster]', duration:'1 minute', raises:'Duration (+1 minute), Range (+5í)', get roll() { return spellRoll(this); }, description:'The winds can lift and buoy, carrying even the heaviest burden into the skies for short periods. The target of this spell gains a limited form of ?ight. allowing him to move through the air unimpeded. The target of the spell may make Free Move Actions. but not Simple Move Actions, and may never move more than lO\' per round. Heavy winds can interfere with this movement or prevent it altogether. At the end of the spell\'s duration. the target drifts harmlessly to the ground. no matter how high he might be. Pg 168 Core Book' },
      { id:15, name:'Hidden Visage', ring:'air', level:'2', range:'Personal', area_of_affect:'Self', duration:'5 minutes', raises:'Area of Effect (another person in line of sight can be targeted by this spell by making three Raises), Duration (+5 minutes)', get roll() { return spellRoll(this); }, description:'Air kami are mischievous and capricious, and enjoy anything they perceive as a joke. You may call upon them to create a subtle illusion, altering your facial featuresjust enough that you appear to he a different person. This spell does not allow you to impersonate specific individuals, or even people radically different from you. You appear as a person of the same age. build, race. and gender. The differences are subtle, enough so that you could be mistaken for your own brother or cousin. Pg 168 Core Book' },
      { id:16, name:'The Kami\s Whisper', ring:'air', level:'2', range:'50\'', area_of_affect:'10\' radius', duration:'1 round', raises:'Area (+5\' radius), Duration (+1 round), Range (+5\')', get roll() { return spellRoll(this); }, description:'The kami of the wind can carry whispers for great distances. and can even create them if properly entreated. You can petition the kami to create a false sound, either a voice or a natural sound such as an animal\'s growl or runing water. for example. The sound can he no louder than a normal speaking voice, and cannot impersonate a specific person\'s voice. if used to create the sound of a voice. the spell is limited to twenty words. Pg 169 Core Book' },
      { id:17, name:'Mists of Illusion', ring:'air', level:'2', range:'20\'', area_of_affect:'10\' radius', duration:'1 minute', raises:'Area (+5\'). Duration (+1 minute). Range (+5\')', get roll() { return spellRoll(this); }, description:'With greater ?uency with the kami comes the ability to craft increasingly convincing images from the stuff of the wind itself. You may create illusions of any object, individual. or image that you can imagine. These images are stationary. and they must fit within the spellís area of effect, but they can he as simple or complex as desired. These illusions are visual only. with no auditory component. no odors. etc. Pg 169 Core Book' },
      { id:18, name:'Secrets on the Wind', ring:'air', level:'2', range:'10 miles', area_of_affect:'20\' radius', duration:'Concentration', raises:'Area (+5\' radius). Range (+5 miles)', get roll() { return spellRoll(this); }, description:'The kami can carry whispers across an Empire. if properly enrtreated to do so. This spell requires you to perform a preparation ritual in order to cast it effectively. The ritual requires ten minutes of uninterrupted meditation in the area designated as the spell\'s area of effect. Any time within the 48 hours immediatly following this ritual, you may cast this spell. and overhear anything being said in the prepared area. If your concentration is disrupted, the effect ends and may not be renewed without an additional preparation ritual. Only one area may be prepared via this ritual at one time. Pg 169 Core Book' },
      { id:19, name:'Whispering Wind', ring:'air', level:'2', range:'20\'', area_of_affect:'Target Individual', duration:'Instantaneous', raises:'Range (+5\')', get roll() { return spellRoll(this); }, description:'The air kami see very little difference between speech and thought. and can perceive both with relative ease. By compare ing the two, the kami can determine if what has been spoken is true or a lie. Unfortunately, they have notoriously short attention spans, and thus can only assess extremely recent conversations. By invoking this spell, you may determine if the last thing said by the target was true or false. The kami have no concept of personal opinion, however, and if the target truly believes what he said was true. the kami will believe it as well. Pg 169 Core Book' },
      { id:20, name:'Wolf\'s Proposal', ring:'air', level:'2', range:'Personal', area_of_affect:'Self', duration:'20 minutes', raises:'Area (may target another with 2 Raises), Duration (+5 minutes) Special (+1 Honor Rank per two Raises)', get roll() { return spellRoll(this); }, description:'This spell. crafted to facilitate initial relations between groups. is easily twisted to nefarious purposes. It calls the kami to ereate a subtle aura of suggestion around the caster, one that does not disguise the caster but rather causes others to perceive him as slightly more benevolent than perhaps he truly is. For the duration this spell. your Honor Rank is considered three ranks higher for the purposes of any Lore: Bushido rolls made to determine your Honor Rank. Pg 168 Core Book' },
      { id:21, name:'Essence of Air', ring:'air', level:'3', range:'Personal', area_of_affect:'Self', duration:'1 round', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'Air can be merged with the essence of a mortal, and doing so can impart tremendous abilities, albeit at great risk to the. caster. You mix with the wind itselfand become insubstantial. You may not interact with any physical objects while insubó stantial, although you do remain on the ground, and you may pass through solid objects at a rate of one foot per round. Your Water Ring is considered halved [rounded down] while you remain insubstantial, and you may not cast any other spells until you return to solidity. Pg 169 Core Book' },
      { id:22, name:'The Eye Shall Not See', ring:'air', level:'3', range:'Personal or Touch', area_of_affect:'Self or Target Individual', duration:'Concentration', raises:'none', get roll() { return spellRoll(this); }, description:'You call upon the kami to create an, area of distraction surrounding you. drawing all attention away from you and your actions. The kami whisper in the ears of those within 20\' of you [or of the target if you cast the spell on someone else], causing them to be conveniently distracted from your presence. You are not invisible. but those within 20\' of you will not see you as long as you do not make any loud noises or otherwise draw attention to yourself. Those outside that distance are not distracted, however, and will see you perfectly well regardless of your action or inaction.  Pg 168 Core Book' },
      { id:23, name:'Mask of Wind', ring:'air', level:'3', range:'Personal', area_of_affect:'Self', duration:'1 hour', raises:'Area (may target another with two Raises), Duration (+10 minutes)', get roll() { return spellRoll(this); }, description:'A skilled shugenja can petition the kami to create incredibly elaborate illusions to obscure oneës identity and appearance. You may use this spell to adopt the appearance of any humanoid creature of approximately the same size. up to one foot taller or shorter than you. You could use this spell to assume the guise of a kenku. for example. because they are roughly the same size as humans. A goblin or an ogre would be impossible, however, because they are too short and too large, respectively.  Pg 170 Core Book' },
      { id:24, name:'Striking the Storm', ring:'air', level:'3', range:'Personal', area_of_affect:'Self', duration:'3 rounds', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'The most powerful winds can turn aside not only arrows. but steel as well. You may summon a buffet of winds that surrounds you in an unrelenting cocoon of swirling air. Your Armor TN is increased by +20 against both melee and ranged attacks. The force of the winds surrounding you prevents you from hearing others ifthey speak to you, however. Pg 170 Core Book' },
      { id:25, name:'Summoning the Gale', ring:'air', level:'3', range:'50\'', area_of_affect:'Target individual (may be the caster)', duration:'Concentration', raises:'Range (+5\')', get roll() { return spellRoll(this); }, description:'Swirling winds can he commanded to circle a designated target, preventing ranged attacks being made in either direction. This spell affects an area thirty feet around the target in all directions. Everyone within the affected area gains at +15 bonus to their Armor TN against ranged attacks. However. everyone within the area also suffers a penalty of -3k3 to all ranged attack rolls. Pg 170 Core Book' },
      { id:26, name:'Summon Fog', ring:'air', level:'3', range:'100\'', area_of_affect:'50\' radius', duration:'1 minute', raises:'Area (+5\' radius), Duration (+1 minute), Range (+10)', get roll() { return spellRoll(this); }, description:'The kami can be petitioned to coalesce in an area as they do on the coast, creating a thick. obscuring fog. Within the area affected by your spell, the Visibility is decreased to a meager ?ve feet. Fabrics and other absorbent materials within the spell''s area of effect will become damp or even wet if they remain within it long enough. Small sources of open flame, such as candles, might be extinguished as well, at the GM\'s discretion. The moistness of fog is extremely damaging to rice paper. Pg 170 Core Book' },
      { id:27, name:'Your Heart\'s Enemy', ring:'air', level:'3', range:'25\'', area_of_affect:'One Target Individual', duration:'5 rounds', raises:'Duration (+1 round). Range (+5\')', get roll() { return spellRoll(this); }, description:'The kami can see into the hearts of mortals, and can use that information at a shugenja\'s request. You manifest the kami as an illusion of the thing your target fears most in the world. it may be an individual (the man who killed his father), or an item (a cursed blade that brought ruin to his family), or even a vista of some sort (an image of an enemy slaying his family). This effectively generates Fear 4 that the target must overcome (see the Book of Earth for rules regarding Fear). Only the target can see the specifics of the illusion; others see only a hazy outline that appears to he a small fog cloud. Pg 171 Core Book' },
      { id:28, name:'Call the Spirit', ring:'air', level:'4', range:'Special', area_of_affect:'Target Spirit', duration:'5 minutes', raises:'Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'Essentially an extremely powerful. specific form of the basic spell Summon. Call the Spirit allows a shugenja to summon any particular spirit, regardless ofits realm, to have a discussion. You may use this speil to summon any spirit from any of the spirit realms, although realm denizens that are not spirits (such as Fortunes) are immune. If you know something; specific about the spirit, either having seen it before or having intimate knowledge ofits actions [for example, "the spirit that killed my father"), you may summon that spirit in particular. The nature of the spell prevents the spirit from attacking you unless you attack first, but it will not necessarily be friendly. The spirit disappears as soon as the spell\'s duration expires. This spell can potentially summon extremely dangerous crear tures, such as oni, and should be used with caution. Pg 171 Core Book' },
      { id:29, name:'False Realm', ring:'air', level:'4', range:'250\'', area_of_affect:'100\' radius', duration:'1 hour', raises:'Area (+10í radius), Duration (+10 minutes)', get roll() { return spellRoll(this); }, description:'The greatest masters of the wind can create illusions of such beauty and clarity that those affected by them might truly believe they were somewhere else. You can completely a1ter the appearance of the terrain within the area of effect of this spell. You can make a miserable swamp look, sound, and smell like a beautiful garden, or vice versa. Although these illusions can be extraordinarily intricate and completely con~ vincing to all other senses, they still have no substance and cannot be touched. Pg 171 Core Book' },
      { id:30, name:'Gift of Wind', ring:'air', level:'4', range:'Personal', area_of_affect:'Self', duration:'5 minutes', raises:'Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'The ultimate gift of the wind spirits is to become like the wind itself: unseen. The wind kami surround you and render you completely invisible. No nonsmagical vision can detect your presence. You can still be touched, heard, and smelled, but unless you attack someone else, you remain invisible for the duration of the spell. The kami consider attacking someone to be ruining thejoke, and immediately end the spellís effect if you do so. Pg 171 Core Book' },
      { id:31, name:'Know the Mind', ring:'air', level:'4', range:'10\'', area_of_affect:'Target Individual', duration:'3 rounds', raises:'Duration (+1 round), Range (+5\')', get roll() { return spellRoll(this); }, description:'Although the ultimate secrets of the human mind are hidden even to the winds, air kami can pluck the most immediate thoughts from the minds of others and whisper them to those who carry their favor. For the duration of this spell, you essentially hear the surface thoughts of the spell\'s target. You only learn things they are actively thinking about. For example, if you asked the name of the target\'s daughter, that name would appear in their mind instantly even if they had no intention of speaking it aloud. A Contested Roll using your Perception against the target\'s Awareness will also allow you to assess their true emotional state, regardless of how they appear physically. Pg 171 Core Book' },
      { id:32, name:'Netsuke of Wind', ring:'air', level:'4', range:'Touch', area_of_affect:'One hand-held object', duration:'1 hour', raises:'Duration (+10 minutes)', get roll() { return spellRoll(this); }, description:'Although it requires great favor, the air kami are willing to coalesce into a solid form for a short period of time if they are fond enough of the priest asking them. You may create a small object out ofthe air itself, something that can be held in one or both hands and that does not weigh more than twenty pounds at the most. This creation is an illusion, but it can be used functionally, including inficting damage if it is a weapon. The object disappears completely at the end of the spellís duration. Pg 171 Core Book' },
      
      
      { id:31, name:'', ring:'air', level:'4', range:'', area_of_affect:'', duration:'', raises:'', get roll() { return spellRoll(this); }, description:'Pg 168 Core Book' },
      { id:13, name:'', ring:'air', level:'2', range:'', area_of_affect:'', duration:'', raises:'', get roll() { return spellRoll(this); }, description:'Pg 168 Core Book' },
      { id:5, name:'', ring:'earth', level:'1', range:'', area_of_affect:'', duration:'', raises:'', get roll() { return spellRoll(this); }, description:'Pg 167 Core Book' },
      { id:6, name:'', ring:'water', level:'1', range:'', area_of_affect:'', duration:'', raises:'', get roll() { return spellRoll(this); }, description:'Pg 167 Core Book' },
      { id:7, name:'', ring:'fire', level:'1', range:'', area_of_affect:'', duration:'', raises:'', get roll() { return spellRoll(this); }, description:'Pg 167 Core Book' },
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
