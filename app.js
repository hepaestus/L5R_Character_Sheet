'use strict';
(function(){

  // Declare app level module which depends on views, and components
angular.module('myApp', [ 'ngRoute', 'ngCookies', 'ngSanitize', 'ui.bootstrap']);

  angular.module('myApp').config(['$routeProvider', function($routeProvider) {
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
  }]);//end routes

  angular.module('myApp').controller('MainController', ['$scope', '$cookieStore', '$modal', function($scope, $cookieStore, $modal) {

    $scope.test = "Main Controller";

    $scope.character = {
      name: "",
      clan: null,
      family: null,
      school: null,
      experience_points: 0,
      experience_points_earned: 0,
      get initiative() { return ((this.insight_rank + this.reflexes) + "K" + this.reflexes); },
      get current_tn() { return ((this.reflexes * 5 ) + 5); },
      insight       : 100,
      insight_rank  : 1,
      earth         : 2,
      air           : 2,
      water         : 2,
      fire          : 2,
      void          : 2,
      void_s        : 2,
      stamina       : 2,
      stamina_s     : 2,
      willpower     : 2,
      willpower_s   : 2,
      reflexes      : 2,
      reflexes_s    : 2,
      awareness     : 2,
      awareness_s   : 2,
      strength      : 2,
      strength_s    : 2,
      perception    : 2,
      perception_s  : 2,
      agility       : 2,
      agility_s     : 2,
      intelligence  : 2,
      intelligence_s: 2,
      armor         : { rating:0, bonus:0, notes:""},
      get armor_tn() { return ( 5 * this.reflexes + 5 + this.armor.rating + this.armor.bonus ); },
      honor         : 0,
      glory         : 0,
      'status'      : 0,
      taint         : 0,
      skills        : [],
      spells        : [],
      key_word_bonus: '',
      spell_affinity: {air:false, earth:false, fire:false, water:false, void:false },
      spell_deficiency: {air:false, earth:false, fire:false, water:false, void:false },
      get wounds() { return ( ((this.earth * 2) * this.insight_rank) + " : " + (this.earth * 5)); },
      get healing() { return ( this.stamina * 2 + this.insight_rank ); },
      healing_modifiers:0,
      get current_heal_rate() { return ( (this.stamina * 2) + this.insight_rank + this.healing_modifiers + " per day" ); },
      weapon_one    : { type:null, attack_roll:null, damage_roll:null, bonus:null, notes:null },
      weapon_two    : { type:null, attack_roll:null, damage_roll:null, bonus:null, notes:null },
    };
    
    $scope.clansMasterList = [
      {id:0, name:'Crab', bonus:''},	    
      {id:1, name:'Crane', bonus:''},	    
      {id:2, name:'Dragon', bonus:''},	    
      {id:3, name:'Lion', bonus:''},	    
      {id:4, name:'Mantis', bonus:''},	    
      {id:5, name:'Phoenix', bonus:''},	    
      {id:6, name:'Scorpion', bonus:''},	    
      {id:7, name:'Unicorn', bonus:''},	    
      //{id:8, name:'Badger', bonus:''},	    
      //{id:9, name:'Bat', bonus:''},	    
      //{id:10, name:'Bear', bonus:''},	    
      //{id:11, name:'Dragonfly', bonus:''},	    
      //{id:12, name:'Hare', bonus:''},	    
      //{id:13, name:'Tortoise', bonus:''},	    
      //{id:14, name:'Monkey', bonus:''},	    
      //{id:15, name:'Oriole', bonus:''},	    
      //{id:16, name:'Ox', bonus:''},	    
      //{id:17, name:'Sparrow', bonus:''},	    
      //{id:18, name:'Firefly', bonus:''},	    
    ];
    
    $scope.familiesMasterList = [
      {id:0, name:'Hida', clan:'Crab', bonus:{ strength:1 }, },
      {id:1, name:'Hiruma', clan:'Crab', bonus:{ agility:1 } },
      {id:2, name:'Kaiu', clan:'Crab', bonus:{ intelligence:1 } },
      {id:3, name:'Kuni', clan:'Crab', bonus:{ intelligence:1 } },
      {id:4, name:'Toritaki', clan:'Crab', bonus:{ perception:1 } },
      {id:5, name:'Yasuki', clan:'Crab', bonus:{ awareness:1 } },
      {id:6, name:'Asahina', clan:'Crane', bonus:{ intelligence:1} },
      {id:7, name:'Doji', clan:'Crane', bonus:{ attr:1 } },
      {id:8, name:'Daidoji', clan:'Crane', bonus:{ attr:1 } },
      {id:9, name:'Kakita', clan:'Crane', bonus:{ attr:1 } },
      {id:10, name:'Yasuki', clan:'Crane', bonus:{ attr:1 } },
      {id:11, name:'Kitsu', clan:'Lion', bonus:{ stamina:1 } },
    ];

    $scope.schoolsMasterList = [
      {id:0, name:'Hida Bushi', clan:'Crab', bonus:{ stamina:1, honor:3.5, skills:[56, 58, 65, 90, 66, 36, '+1 bugei'], techniques:{1:'The Way of the Crab Pg. 106', 2:'The Mountain Does Not Move. Pg. 106', 3:'Two Pincers, One Mind. Pg. 106', 4:'Devastating Blow. Pg. 106', 5:'The Mountain Does Not Fall. Pg. 107' } } },
      {id:1, name:'Kuni Shugenja', clan:'Crab', bonus:{ willpower:1, honor:2.5, skills:['10:1','36::2',39,54,'+1 weapon skill'], affinity:'earth', deficiency:'air', techniques:{1:'Gaze Into Shadow. Pg. 107'} } },
      {id:2, name:'Yasuki Courtier', clan:'Crab', bonus:{ perception:1, honor:2.5, skills:['76:0',11,58,13,90,'53:1','+1 merchant skill'], techniques:{1:'The Way of the Carp. pg. 107', 2:'Do As We Say. pg. 108', 3:'Treasures of the Carp. pg 108', 4:'Wiles of the Carp. pg 108', 5:'What is Yours is Mine. pg 108'} } },
      {id:3, name:'Hirumi Bushi', clan:'Crab', bonus:{ willpower:1, honor:4.5, skills:[56,60,'66:0',68,36,92,'+1 skill'], techniques:{1:'Torch Flame Flickers. pg 108', 2:'Wolf\'s Little Lesson. pg 108', 3:'Hummingbird Wings. pg 108', 4:'Shark Smells Blood. pg 108', 5:'Daylight Wastes No Movement. pg 108'} } },
      {id:5, name:'', clan:'Crane', bonus:{ attr:1, honor:0, affinity:'', deficiency:'', skills:[], techniques:{} } },
      {id:6, name:'', clan:'Dragon', bonus:{ attr:1, honor:0, affinity:'', deficiency:'', skills:[], techniques:{} } },
      {id:7, name:'', clan:'Lion', bonus:{ attr:1, honor:0, affinity:'', deficiency:'', skills:[], techniques:{} } },
      {id:8, name:'', clan:'Mantis', bonus:{ attr:1, honor:0, affinity:'', deficiency:'', skills:[], techniques:{} } },
      {id:9, name:'', clan:'Phoenix', bonus:{ attr:1, honor:0, affinity:'', deficiency:'', skills:[], techniques:{} } },
      {id:10, name:'', clan:'Scorpion', bonus:{ attr:1, honor:0, affinity:'', deficiency:'', skills:[], techniques:{} } },
      {id:11, name:'', clan:'Unicorn', bonus:{ attr:1, honor:0, affinity:'', deficiency:'', skills:[], techniques:{} } },
      {id:12, name:'Kitsu Shugenja', clan:'Lion', bonus:{ perception:1, honor:6.5, skills:[57,'10:1',13,31,39,54,'1 high or bugie skill'], affinity:['water'], deficiency:['fire'], techniques:{1:'Eyes of the Ancestors. pg 118'}} },
    ];

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
                  alert("You Also Get " + skill + " skill");
                  $scope.skillSearchText = "bugei";
                  $scope.toggleShowSkillsList();
                }
              }
            break;
          case 'techniques':
            break;
        }
      }
    };

    $scope.addASkill = function(skill_id, rank, emp) {
      var skill = $scope.getSkillFromMasterList(skill_id);
      var lvl = ( rank )? rank : 0;
      var emph = ( emp ) ? emp : null;
      var new_skill = { id:skill_id, rank:lvl, rank_s:lvl, emphasis:emph, get roll() { return (getSkillRoll(this.id, this.rank)); }, get mastery() { return skillMastery(this); } };
      if ( $scope.getCharacterSkillById(skill_id) === null) {
        $scope.character.skills.push(new_skill);
      }
      if (emp) {
      
      }
    };

    $scope.getSkillFromMasterList = function(skill_id, attr) {
      for(var i=0; i < $scope.skillsMasterList.length; i++) {
        if ( $scope.skillsMasterList[i].id === skill_id ) {
          if (attr === null || attr === undefined) {
            return $scope.skillsMasterList[i];
          } else if ( attr === 'mastery') {
            return $scope.skillsMasterList[i].mastery;
          } else {
            return $scope.skillsMasterList[i][attr];
          }
        }
      }
      return "(error)";
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
      var skill = $scope.getSkillFromMasterList(skill_id);
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
      var master_skill = $scope.getSkillFromMasterList(obj.id);
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

    var mastery = function(obj) {
      var text = '';
      for(var x in obj.masteries ) {
        if ( obj.rank >= x ) {
          text += "Level " + x + " : " + obj.masteries[x] + "<br />\n";
        }
      }
      // console.log("Text: " + text);
      return text;
    };

    $scope.skillsMasterList = [
      // id:, level, type, subtype, trait, ring, rank, roll, emphasis, emphases{}, get mastery(), masteries{}, description
      { id:1000, level:'Debug', type:'Debug', sub_type:'debug', trait:'void', ring:'void', emphases:{0:'E Zero', 1:'E One', 2:'E Two'}, get mastery() { return mastery(this); }, masteries:{ 3:'M Three', 5:'M Five', 7:'M Seven'}, description:'debug description'},
      { id:0, level:'High', type:'Artisan', sub_type:'', trait:'awareness', ring:'air', emphases: {0:'Bonsai', 1:'Gardening', 2:'Ikebana', 3:'Origami', 4:'Painting', 5:'Poetry', 6:'Sculpture', 7:'Tattooing'}, description:'Pg. 135 Core Book'},
      { id:1, level:'High', type:'Artisan', sub_type:'Origami', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:2, level:'High', type:'Artisan', sub_type:'Bonsai', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:3, level:'High', type:'Artisan', sub_type:'Gardening', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:4, level:'High', type:'Artisan', sub_type:'Ikebana', trait:'awareness', ring:'air', description:'(flower aranging) Pg. 135 Core Book'},
      { id:5, level:'High', type:'Artisan', sub_type:'Painting', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:6, level:'High', type:'Artisan', sub_type:'Poetry', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:7, level:'High', type:'Artisan', sub_type:'Sculpture', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:8, level:'High', type:'Artisan', sub_type:'Tattooing', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:9, level:'High', type:'Acting', sub_type:'Social Skill', trait:'awareness', ring:'air', description:'Pg. 135 Core Book'},
      { id:10, level:'High', type:'Calligraphy', sub_type:'', trait:'intelligence', ring:'fire', emphases:{0:'Cipher', 1:'High Rokugani'}, get mastery() { return mastery(this); }, masteries: { 5: "+10 to break a code or cipher"}, description:'Pg. 135 Core Book'},
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
      { id:36, level:'High', type:'Lore', sub_type:'Shadowlands*', trait:'intelligence', ring:'fire', description:'Pg. 137 Core Book'},
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
      { id:66, level:'Bugei', type:'Kenjutsu', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Katana', 1:'Ninja-to', 2:'No-dachi', 3:'Parangu', 4:'Scimitar', 5:'Wakizashi'}, get mastery() { return mastery(this); }, masteries:{3:'Total damage rolls is increased by 1k0', 5:'Sword can be readied as a Free Action', 7:'Damage dice explode on a 9 and 10'}, description:'Pg. 141 Core Book'},
      { id:67, level:'Bugei', type:'Knives', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Aiguchi', 1:'Jitte', 2:'Kama', 3:'Sai', 4:'Tanto'}, get mastery() { return mastery(this); }, masteries:{3:'No Off-hand penalties', 5:'Use or a sai or jitte confers one Free Raise towards the Disarm Maneuver', 7:'Use of any knife confers a Free Raise towards use of the Extra Attack Maneuver'}, description:'(Tanojutsu) Pg. 141 Core Book'},
      { id:68, level:'Bugei', type:'Kyujutsu', sub_type:'Weapon Skill', trait:'reflexes', ring:'air', emphases:{0:'Dai-kyu', 1:'Han-kyu', 2:'Yumi'}, get mastery() { return mastery(this); }, masteries:{3:'Striging bow is a Simple Action', 5:'Max range of any bow increased by 50%', 7:'Strength of bow increased by 1'}, description:'Pg. 142 Core Book'},
      { id:69, level:'Bugei', type:'Ninjutsu* (agility)', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Blowgun*', 1:'Shuriken*', 2:'Tsubute*'}, get mastery() { return mastery(this); }, masteries:{3:'Damage increase by 1k1', 5:'Dice on Damage Rolls Exlode on 10 despite being Nijutsu Weapons', 7:'Damage on ninjutsu weapons increased by +0k1 (+1k1 total)'}, description:'Low Skill. Pg. 142 Core Book'},
      { id:70, level:'Bugei', type:'Ninjutsu* (reflexes)', sub_type:'Weapon Skill', trait:'reflexes', ring:'fire', emphases:{0:'Blowgun*', 1:'Shuriken*', 2:'Tsubute*'}, get mastery() { return mastery(this); }, masteries:{3:'Damage increase by 1k1', 5:'Dice on Damage Rolls Exlode on 10 despite being Nijutsu Weapons', 7:'Damage on ninjutsu weapons increased by +0k1 (+1k1 total)'}, description:'Low Skill. Pg. 142 Core Book'},
      { id:71, level:'Bugei', type:'Polearms', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Bisento', 1:'Nagamaki', 2:'Naginata', 3:'Sasumata', 4:'Sodegarami'}, get mastery() { return mastery(this); }, masteries:{3:'During 1st round of skirmish, polearm gains +5 bonus to Initiative Score', 5:'Damage rolls vs. mounted or significantly larger opponents increased by +1k0', 7:'Polearms readied as a free action'}, description:'Pg. 143 Core Book'},
      { id:72, level:'Bugei', type:'Spears', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Mai Chong', 1:'Kumade', 2:'Lance', 3:'Nage-yare', 4:'Yari'}, get mastery() { return mastery(this); }, masteries:{3:'During the first round of a skirmish, a character wielding a spear may ignore 3 points of Reduction when making melee attacks against her opponent.', 5:'Ranged attacks made using a spear increase their maximum range by 5\'', 7:'Spears may be readied as a free action.'}, description:'Pg. 142 Core Book'},
      { id:73, level:'Bugei', type:'Staves', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{0:'Bo', 1:'Machi-kanshisha', 2:'Nunchaku', 3:'Sang Kauw', 4:'Tonfa'}, get mastery() { return mastery(this); }, masteries:{3:'Opponents\' armor bonuses are no longer doubled against staff attacks.', 5:'Use of a staff confers one Free Raise toward use of Knowdown Manuever', 7:'Staves that are large may be readied as a Free Action instead of a Simple Action. Staves that are small gain a bonus to damage rolls equal to +1K0.'}, description:'Pg. 142 Core Book'},
      { id:74, level:'Bugei', type:'War Fan', sub_type:'Weapon Skill', trait:'agility', ring:'fire', emphases:{}, get mastery() { return mastery(this); }, masteries:{3:'Off-hand Penalties do not apply when using war fan.', 5:'When using war fan Armor TN is increased by +1', 7:'Armor TN is increased by +3.'}, description:'Pg. 142 Core Book'},
      { id:75, level:'Merchant', type:'Animal Handling', sub_type:'', trait:'awareness', ring:'air', emphases:{0:'Dogs', 1:'Horses', 2:'Falcon'}, get mastery() { return mastery(this); }, masteries:{3:'Commonly domesticated animals such as dogs, horses, and falcons may be trained for use by others.', 5:'Trained animals may be commanded to attack a target of her choosing. The animal will flee for its life if badly wouded.', 7:'Animals trained by the character may be issued commands non-verbally.'}, description:'Pg. 143 Core Book'},
      { id:76, level:'Merchant', type:'Commerce', sub_type:'', trait:'intelligence', ring:'fire', emphases:{0:'Appraisal', 1:'Mathematics'}, get mastery() { return mastery(this); }, masteries:{5:'The character may increase or decrease the price of an item he is buying or selling by a maximum or 20%'}, description:'Pg. 143 Core Book'},
      { id:77, level:'Merchant', type:'Craft', sub_type:'(awareness)', trait:'awareness', ring:'air', emphases:{0:'Armorsmithing^', 1:'Blacksmithing', 2:'Boyer^', 3:'Brewing', 4:'Carpentry', 5:'Cartography', 6:'Cobling', 7:'Cooking', 8:'Farming', 9:'Fishing', 10:'Masonry', 11:'Mining', 12:'Poison*', 13:'Pottery', 14:'Shipbuilding', 15:'Tailoring', 16:'Weaponsmithing^', 17:'Weaving', 18:'Other'}, get mastery() { return mastery(this); }, masteries:{}, description:'(^ high skill)(* low skill)Pg. 143 Core Book'},
      { id:78, level:'Merchant', type:'Craft', sub_type:'(reflexes)', trait:'reflexes', ring:'air', emphases:{0:'Armorsmithing^', 1:'Blacksmithing', 2:'Boyer^', 3:'Brewing', 4:'Carpentry', 5:'Cartography', 6:'Cobling', 7:'Cooking', 8:'Farming', 9:'Fishing', 10:'Masonry', 11:'Mining', 12:'Poison*', 13:'Pottery', 14:'Shipbuilding', 15:'Tailoring', 16:'Weaponsmithing^', 17:'Weaving', 18:'Other'}, get mastery() { return mastery(this); }, masteries:{}, description:'(^ high skill)(* low skill)Pg. 143 Core Book'},
      { id:79, level:'Merchant', type:'Craft', sub_type:'(intelligence)', trait:'intelligence', ring:'fire', emphases:{0:'Armorsmithing^', 1:'Blacksmithing', 2:'Boyer^', 3:'Brewing', 4:'Carpentry', 5:'Cartography', 6:'Cobling', 7:'Cooking', 8:'Farming', 9:'Fishing', 10:'Masonry', 11:'Mining', 12:'Poison*', 13:'Pottery', 14:'Shipbuilding', 15:'Tailoring', 16:'Weaponsmithing^', 17:'Weaving', 18:'Other'}, get mastery() { return mastery(this); }, masteries:{}, description:'(^ high skill)(* low skill)Pg. 143 Core Book'},
      { id:80, level:'Merchant', type:'Craft', sub_type:'(agility)', trait:'agility', ring:'fire', emphases:{0:'Armorsmithing^', 1:'Blacksmithing', 2:'Boyer^', 3:'Brewing', 4:'Carpentry', 5:'Cartography', 6:'Cobling', 7:'Cooking', 8:'Farming', 9:'Fishing', 10:'Masonry', 11:'Mining', 12:'Poison*', 13:'Pottery', 14:'Shipbuilding', 15:'Tailoring', 16:'Weaponsmithing^', 17:'Weaving', 18:'Other'}, get mastery() { return mastery(this); }, masteries:{}, description:'(^ high skill)(* low skill)Pg. 143 Core Book'},
      { id:81, level:'Merchant', type:'Craft', sub_type:'(strength)', trait:'strength', ring:'water', emphases:{0:'Armorsmithing^', 1:'Blacksmithing', 2:'Boyer^', 3:'Brewing', 4:'Carpentry', 5:'Cartography', 6:'Cobling', 7:'Cooking', 8:'Farming', 9:'Fishing', 10:'Masonry', 11:'Mining', 12:'Poison*', 13:'Pottery', 14:'Shipbuilding', 15:'Tailoring', 16:'Weaponsmithing^', 17:'Weaving', 18:'Other'}, get mastery() { return mastery(this); }, masteries:{}, description:'(^ high skill)(* low skill)Pg. 143 Core Book'},
      { id:82, level:'Merchant', type:'Craft', sub_type:'(perception)', trait:'perception', ring:'water', emphases:{0:'Armorsmithing^', 1:'Blacksmithing', 2:'Boyer^', 3:'Brewing', 4:'Carpentry', 5:'Cartography', 6:'Cobling', 7:'Cooking', 8:'Farming', 9:'Fishing', 10:'Masonry', 11:'Mining', 12:'Poison*', 13:'Pottery', 14:'Shipbuilding', 15:'Tailoring', 16:'Weaponsmithing^', 17:'Weaving', 18:'Other'}, get mastery() { return mastery(this); }, masteries:{}, description:'(^ high skill)(* low skill)Pg. 143 Core Book'},
      { id:83, level:'Merchant', type:'Craft', sub_type:'(willpower)', trait:'willpower', ring:'earth', emphases:{0:'Armorsmithing^', 1:'Blacksmithing', 2:'Boyer^', 3:'Brewing', 4:'Carpentry', 5:'Cartography', 6:'Cobling', 7:'Cooking', 8:'Farming', 9:'Fishing', 10:'Masonry', 11:'Mining', 12:'Poison*', 13:'Pottery', 14:'Shipbuilding', 15:'Tailoring', 16:'Weaponsmithing^', 17:'Weaving', 18:'Other'}, get mastery() { return mastery(this); }, masteries:{}, description:'(^ high skill)(* low skill)Pg. 143 Core Book'},
      { id:84, level:'Merchant', type:'Craft', sub_type:'(stamina)', trait:'stamina', ring:'earth', emphases:{0:'Armorsmithing^', 1:'Blacksmithing', 2:'Boyer^', 3:'Brewing', 4:'Carpentry', 5:'Cartography', 6:'Cobling', 7:'Cooking', 8:'Farming', 9:'Fishing', 10:'Masonry', 11:'Mining', 12:'Poison*', 13:'Pottery', 14:'Shipbuilding', 15:'Tailoring', 16:'Weaponsmithing^', 17:'Weaving', 18:'Other'}, get mastery() { return mastery(this); }, masteries:{}, description:'(^ high skill)(* low skill)Pg. 143 Core Book'},
      { id:86, level:'Merchant', type:'Engineering', sub_type:'Craftl', trait:'intelligence', ring:'fire', emphases:{0:'Construction', 1:'Seige'}, get mastery() { return mastery(this); }, masteries:{5:'Gain +5 bonus to the total of any Engineering Skill Roll made as part of a Cooperative or Cumulative Skill Roll.'}, description:'Pg. 143 Core Book'},
      { id:87, level:'Merchant', type:'Sailing', sub_type:'(agility)', trait:'agility', ring:'fire', emphases:{0:'Knot Work', 1:'Navigation'}, get mastery() { return mastery(this); }, masteries:{5:'+5 bonus to the total of any Sailing Skill Roll made as part of a Cooperative or Cumulative Skill Roll.'}, description:'Pg. 144 Core Book'},
      { id:88, level:'Merchant', type:'Sailing', sub_type:'(intelligence)', trait:'intelligence', ring:'fire', emphases:{0:'Knot Work', 1:'Navigation'}, get mastery() { return mastery(this); }, masteries:{5:'+5 bonus to the total of any Sailing Skill Roll made as part of a Cooperative or Cumulative Skill Roll.'}, description:'Pg. 144 Core Book'},
      { id:89, level:'Low', type:'Forgery*', sub_type:'Craft', trait:'agility', ring:'fire', emphases:{0:'Artwork', 1:'Documents', 2:'Personal Seals'}, get mastery() { return mastery(this); }, masteries:{3:'+1K0 Bonus to Forgery Skill Roll result for the purposes of establishing the TN of and Investigation/Perception Skill Roll to detect it.', 5:'1K0 Bonus on any roll to detect a forgery made by someone else', 7:'0K1 Bonus (for a total of 1K1) to Forgery Skill Roll for the purposes of establishing the TN of and Investigation/Perception Skill Roll to detect it.'}, description:'Pg. 144 Core Book'},
      { id:90, level:'Low', type:'Intimidation*', sub_type:'Social Skill', trait:'awareness', ring:'air', emphases:{0:'Bullying', 1:'Control', 2:'Torture'}, get mastery() { return mastery(this); }, masteries:{5:'+5 Bonus to the total of any Contested Roll using Intimidation.'}, description:'Pg. 145 Core Book'},
      { id:91, level:'Low', type:'Sleight of Hand*', sub_type:'', trait:'agility', ring:'fire', emphases:{0:'Conceal', 1:'Escape', 2:'Pick Pocket', 3:'Prestidigitation'}, get mastery() { return mastery(this); }, masteries:{5:'May use Conceal Emphasis to conceal small weapons.'}, description:'Pg. 145 Core Book'},
      { id:92, level:'Low', type:'Stealth*', sub_type:'', trait:'agility', ring:'fire', emphases:{0:'Ambush', 1:'Shadowing', 2:'Sneaking', 3:'Spell Casting'}, get mastery() { return mastery(this); }, masteries:{3:'Simple Move Actions while using Stealth allow character to move a distance equal to her Water x5.', 5:'Simple Move Actions while using Stealth allow character to move a distance equal to her Water x10.', 7:'A character using stealth may make Free Move Actions as normal.'}, description:'Pg. 143 Core Book'},
      { id:93, level:'Low', type:'Temptation*', sub_type:'Social Skill', trait:'awareness', ring:'air', emphases:{0:'Bribery', 1:'Seduction'}, get mastery() { return mastery(this); }, masteries:{5:'Character gains +5 Bonus to the total of any contested Roll using Temptation.'}, description:'Pg. 143 Core Book'},
    ];


  }]);//end main controller

  angular.module('myApp').controller('HomeController', ['$scope', '$cookieStore', function($scope, $cookieStore) {

    $scope.test = "Home Controller";

    $scope.loadSavedCharacter = function(index) {
      $scope.character = $scope.saved_character_array[index];
      console.log("HC: Load Saved Character :" + $scope.character);
    };

  }]);//end HomeController

  angular.module('myApp').controller('CharacterController', ['$scope', '$cookieStore', function($scope, $cookieStore ) {

    $scope.test = "Character Controller";

    $scope.loadSavedCharacter = function(index) {
      $scope.character = $scope.saved_character_array[index];
      console.log("CC: Load Saved Character :" + $scope.character);
    };

    $scope.loadCharacter = function() {
      var saved_character_cookie_array = $cookieStore.get('characters');
      $scope.saved_characters_array = [];
      if ( saved_character_cookie_array ) {
        for ( var i = 0; i < saved_character_cookie_array.length; i++) {
          console.log("Getting Character " +i+ " : " + saved_character_cookie_array[i]);
          var character = $cookieStore.get(saved_character_cookie_array[i]);
          if ( character ) {
            console.log("Pushing Character Into Array : " + character.name);
            $scope.saved_characters_array.push(character);
          }
        }
      }
      console.log("Saved Characters Array : " + $scope.saved_characters_array);
      console.log("Saved Characters Array : " + $scope.saved_characters_array.length );
      $scope.open();
    }

    $scope.saveCharacter = function() {
      var d = new Date();
      var date_string = d.toString().replace(/ /g, "_");
      var date_string = d.toString().replace(/:/g, "-");
      console.log("Date : " + date_string );

      var stored_chars = $cookieStore.get('characters');
      if ( stored_chars != null ) {
        for( var i=0; i < stored_chars.length; i++ ) {
          $scope.saved_characters_date_array.push(stored_chars[i]);
        }
      }
      $scope.saved_characters_date_array.push('character_' + date_string);
      console.log("Saved Character Dates: " + $scope.saved_characters_date_array);
      $cookieStore.put('characters', $scope.saved_characters_date_array  );
      $cookieStore.put('character_' + date_string, $scope.character);
    };

    $scope.deleteSavedCharacter = function(character_date_string) {
      $cookieStore.remove(character_date_string);
      var stored_char_strings = $cookieStore.get('characters');
      var idx = stored_char_strings(character_date_string);
      stored_char_strings.splice(idx,1);
      $cookieStore.put('characters', stored_char_strings);
    };


    $scope.updateExp = function(attr, value) {
      var cost = 4;
      if ( attr == 'void') {
        cost = 6;
      }
      //console.log(attr + " : val: " + value + " Old Val: " + $scope.character[attr + "_s"]);
      if ( $scope.character[attr] > $scope.character[attr + "_s"] ) {
          $scope.character.experience_points -= ( value * cost );
           } else if ( $scope.character[attr] < $scope.character[attr + "_s"] ) {
          $scope.character.experience_points += ($scope.character[attr + "_s"] * cost );
          $scope.character[attr + "_s"] = $scope.character[attr];
      } else {
          //console.log("No Change to " + attr);
      } };
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
        if ( $scope.character.skills[i] != undefined ) {
          skillRanks += $scope.character.skills[i].rank;
        }
      }
      $scope.character.insight = skillRanks + (($scope.character.earth + $scope.character.air + $scope.character.water + $scope.character.fire + $scope.character.void) * 10);
    };

    $scope.showClansList = false;
    $scope.toggleShowClansList = function() {
        $scope.showClansList = !$scope.showClansList;
    };

    //$scope.selectClan = function(id) {
    //  console.log("Select Clan : " + id );
    //  $scope.character.clan = $scope.clansMasterList[id];
    //  $scope.toggleShowClansList();
    //};

    $scope.showFamiliesList = false;
    $scope.toggleShowFamiliesList = function() {
        $scope.showFamiliesList = !$scope.showFamiliesList;        
    };

    $scope.selectFamily = function(id) {
      $scope.character.family = $scope.familiesMasterList[id];
      $scope.toggleShowFamiliesList();
      $scope.calculateBonus( $scope.familiesMasterList[id].bonus );
    };

    $scope.showSchoolsList = false;
    $scope.toggleShowSchoolsList = function() {
      $scope.showSchoolsList = !$scope.showSchoolsList;
    };

    $scope.selectSchool = function(id) {
      $scope.character.school = $scope.schoolsMasterList[id];
      $scope.toggleShowSchoolsList();
      $scope.calculateBonus( $scope.schoolsMasterList[id].bonus );
    };

  }]);//end CharacterController

  angular.module('myApp').controller('SkillsController', function($scope) {

    $scope.test = "Skills Controller";

    $scope.clickedSkillRank = null;
    $scope.showSkillList = false;
    $scope.skillSearchText = "";
    $scope.skillSearchFilterHigh = "type = 'high'";
    $scope.skillSearchFilterLow = "type = 'low'";
    $scope.skillSearchFilterBugei = "type = 'bugei'";
    $scope.skillSearchFilterMerchant = "type = 'merchant'";
    $scope.skillSearchFilterLow = "type = 'low'";

    $scope.toggleShowSkillsList = function() {
        $scope.showSkillsList = !$scope.showSkillsList;
        $scope.skillSearchText = ""
    };

    $scope.emphasesList = ["One", "Two"];
    $scope.currentSkillId = null;
    $scope.showEmphasesList = false;

    $scope.toggleShowEmphasesList = function(skill_id) {
        //console.log("Skill Id : " + skill_id);
        $scope.currentSkillId = skill_id;
        //console.log("Current Skill Id : " + $scope.currentSkillId);
        $scope.emphasesList = [];
        var skill = $scope.getSkillFromMasterList(skill_id);
    if ( skill ) {
        //console.log("FOUND skill : " + skill_id);
          for ( var i in skill.emphases ) {
            $scope.emphasesList.push( skill.emphases[i] ) ;
          }
    }
        $scope.showEmphasesList = !$scope.showEmphasesList;
    };

    var getSkillRoll = function(skill_id, skill_rank) {
      var skill = $scope.getSkillFromMasterList(skill_id);
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
      var master_skill = $scope.getSkillFromMasterList(obj.id);
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

    $scope.addSkill = function(skill_id) {
      //console.log("Before Skills1 : " + JSON.stringify($scope.character.skills) + " (addSkill)");
      var skill = $scope.getSkillFromMasterList(skill_id);
      var new_skill = { id:skill_id, rank:0, rank_s:0, emphasis:null, get roll() { return (getSkillRoll(this.id, this.rank)); }, get mastery() { return skillMastery(this); } };
      //console.log("Make Sure Skill " + skill_id + " does not exist");
      if ( getCharacterSkillById(skill_id) === null) {
        //console.log("Add Skill " + skill_id );
        //console.log("Before Skills2 : " + JSON.stringify($scope.character.skills) + " (addSkill)");
        $scope.character.skills.push(new_skill);
        //console.log("After Skills1 : " + JSON.stringify($scope.character.skills) + " (addSkill)");
        $scope.toggleShowSkillsList();
      } else {
        //console.log("skill " + skill_id + " already exists");
      }
        //console.log("After Skills2 : " + JSON.stringify($scope.character.skills) + " (addSkill)");
    };

    $scope.getSkill = function(skill_id, attr) {
        //console.log("Get : " + attr);
        return $scope.getSkillFromMasterList(skill_id, attr);
    };

    $scope.getSkillFromMasterList = function(skill_id, attr) {
    //console.log("getSkillFromMasterList(" + skill_id + "," + attr + ")");
      for(var i=0; i < $scope.skillsMasterList.length; i++) {
        if ( $scope.skillsMasterList[i].id === skill_id ) {
          if (attr === null || attr === undefined) {
            //console.log("Return skill: " + JSON.stringify($scope.skillsMasterList[i]) );
            return $scope.skillsMasterList[i];
          } else if ( attr === 'mastery') {
            //console.log("Get Mastery FOO: ");
            return $scope.skillsMasterList[i].mastery;
          } else {
            //console.log("Return attr: " + $scope.skillsMasterList[i][attr] );
            return $scope.skillsMasterList[i][attr];
          }
        }
      }
      return "(error)";
    };

    $scope.removeSkill = function(id) {
       // METHOD OF GIVING BACK ALL EXP PTS WHEN SKILL IS Removed!
       replaceCharacterSkillById(id, null);
    };

    $scope.addEmphasis = function(emp_index) {
      console.log("ADD EMPHASIS TWO");
      var master_skill = $scope.getSkillFromMasterList($scope.currentSkillId);
      var emp = master_skill.emphases[emp_index];
      var skill = getCharacterSkillById($scope.currentSkillId);
      skill.emphasis = emp;
      //console.log("Add Emphasis Index : " + emp_index + " to Character Skill Id : " + $scope.currentSkillId + " Emp: " + emp + " Emphasis: " + skill.emphasis );
      replaceCharacterSkillById($scope.currentSkillId, skill);
      $scope.character.experience_points -= 2;
      $scope.toggleShowEmphasesList();
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
      } else {
        //console.log("Skill Not Found (updateskillrank)");
      }
    };

  });//end SkillsController

  angular.module('myApp').controller('SpellsController', function($scope) {

    $scope.test = "Spells Controller";
    $scope.spellSearchFilter;
    $scope.spellSearchText = "";

    var spellRoll = function(obj) {
      var roll = '';
      var spell_ring = obj.ring;
      var insight_rank = $scope.character.insight_rank;
      var ring_val = "R"
      var affinity = "+AD+";
      var bonus = '';
      if ( doesCharacterHaveSpellcraftBonus() && spell_ring != 'all' ) {
          bonus = 1;
      } else if ( doesCharacterHaveSpellcraftBonus() && spell_ring == 'all' ) {
          bonus = "+1";
      } 
      if ( spell_ring != 'all' ) {
        ring_val = $scope.character[spell_ring];
        affinity = 0;
      }
      if ( $scope.character.spell_affinity[spell_ring] == true ) {
          affinity = 1;
      }
      if ( $scope.character.spell_deficiency[spell_ring] == true ) {
          affinity = -1;
      }
      roll = ring_val + ( bonus ) + ( affinity + insight_rank ) + 'K' + ring_val;
      return roll;
    };

    var doesCharacterHaveSpellcraftBonus = function() {
      for(var i=0; i < $scope.character.skills.length; i++) {
        if( $scope.character.skills[i].id == 54 ) { // 54 is the spellcraft skill id in the skillsMasterList
          if(  $scope.character.skills[i].rank >= 5 ) {
            return true;
          }
        }
      }
    };

    $scope.spellsMasterList = [
      { id:0, name:'Sense', type:'', ring:'all', level: '1', range:'Personal', area_of_affect:'50\' radius from the caster', duration:'Instantaneous', raises: 'Range(+10\')', get roll() { return spellRoll(this); }, description:'This spell can be cast in any of the four standard elements. It allows for the caster to sense the presense, quantity, and rough location of the elemental spirits (not evil spirits known as <i>kansen</i> of that element within the range of the spell. This is most frequently applied when looking for spirits with which to Commune (See Commune), but can also can be useful as a crude basic location device. For example, a caster lost in the wilderness could cast Snese(Water) in hopes of locating the sourceof drinking water. Pg 166 Core Book' },
      { id:1, name:'Summon', type:'', ring:'all', level: '1', range:'30\'', area_of_affect:'1 cubic foot of summoned matterial', duration:'Permanent', raises: 'Range(+10\'), Quantity(+1 cubic foot), Composition of Material(1-4 raises as outlined below)', get roll() { return spellRoll(this); }, description:'This spell can be cast in any of the tour standard elements. It allows the caster to summon a modest quantity (one cubic foot) of the chosen element. The summoned matter appears (usually in a rough ball shape] in any open space within the spell\'s range. This cannot place the summoned material inside another physical object or living creature. The summoned element will behave in a normal and mundane matter; earth falls to the ground, water soaks anything it lands on, air blows away, and fire winks out unless there is something present for it to burn. In general it is impossible to use this spell effectively in combat, although clever shugenja may find a few modest combat uses. such as using Summon [Fire] to ignite a foe soaked in cooking oil. More commonly, the Spell\'s value is in simpler functions. such as summoning Water while in a desert, or summoning Fire to light a campfire without flint and tinder. Raises may be used with this spell to summon a more specfic type of the appropriate element, such as wood or iron with Earth, or tea with Water. The GM should choose how many Raises (generally anywhere from 1 to 4) this requires. However, these Raises <strong>cannot</strong> be used to create rare or precious materials (such as gold) or spiritually powerful substances (such as jade or crystal). Pg 166 Core Book' },
      { id:2, name:'Commune', type:'', ring:'all', level: '1', range:'20\'', area_of_affect:'self', duration:'Concentration', raises: 'See Desc.', get roll() { return spellRoll(this); }, description:'This spell can be cast in any element save Void. It allows the caster to speak with one of the local elemental kami, asking it a few questions, which is will answer honestly to the best of it\'s ability. Typically this spell will invoke the most active and energetic spirit of the chosen element in the area of effect, if all of the local spirits are quiescent, the GM may require the caster to call 1 or 2 Raises to "wake up" a local spirit enough to answer questions. A Spirit reached with Commune will answer two questions. The caster may Raise to get more questions (one per Raise). The caster may also Raise for clarity, to get a more accurate and informative answer to the questions. (Kami are notorious for their inabiiity to fully comprehend human behavior, and asking questions without Raises for clarity can often result in confusing, enigmatic, or incomplete answers.) Spirits do not forget anything, so theoretically a shugenja can ask a spirit about something that happened decades ago, however, they also do not experience time in the same way as mortals, so trying to ask about something from long ago will usually require Raises in order to make the caster\'s wishes clear to the spirit. The nature of the information which spirits can impart varies by element. Air spirits tend to be playful and easily distracted, conveying information as emotions or as riddles and jokes. Since they are more interested in feelings than in facts, and enjoy playing games with those who speak with them, commuting with an Air spirit can sometimes be very frustrating. Earth spirits are straightforward and matter of fact, often blunt, but are also often rather uninterested in the behavior of mortals, have a poor understanding of human emotion, and tend to be overly focused on obscure details such as the color of a piece of clothing or the weight of a horse. Fire spirits are irritable and tempermental, and are often angry at being summoned unless they are propitiated with an offering of something to burn. 0n the other hand, if a shugenja can please them they tend to offer the clearest and most accurate information. Water spirits communicate their knowledge through soundless visual images. This can be very helpful to a shugenja trying to investigate a past incident, but since the spirits cannot convey scent, sound, or emotion, the information they provide can often be incomplete or misleading. Pg 166 Core Book' },
      { id:3, name:'Blessed Wind', type:'Defense', ring:'air', level:'1', range:'Personal', area_of_affect:'10\' radius around the caster', duration:'Concentration', raises:'Special(you may target another spell with this spell with 3 raises)', get roll() { return spellRoll(this); }, description:'You summon a swirling aura of winds to protect you from ranged attacks. The buffeting winds deflect arrows and other projectiles. While you maintain your concentration, this spell adds +15 to your Armor TN versus all non-magical ranged attacks. Pg 167 Core Book' },
      { id:4, name:'By the Light of the Moon', type:'', ring:'air', level:'1', range:'Touch', area_of_affect:'One Object', duration:'1 hour', raises:'Area (+5 radius), Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'You call upon the kami to reveal that which has been hide den. All concealed objects within the area of effect appear as slightly luminous outlines to you. Any non-magical conceale ment is revealed, including secret compartments, trap doors. concealed weapons, etc. Only you can see the presence of these objects. Pg 167 Core Book' },
      { id:5, name:'Cloak of Night', type:'Illusion', ring:'air', level:'1', range:'Touch', area_of_affect:'One Object', duration:'1 hour', raises:'Duration (+1 hour)', get roll() { return spellRoll(this); }, description:'You can call upon the kami to wrap an object in their embrace, hiding it from the sight of mortal beings. You may target any one noneliving object smaller than you. This object becomes invisible to the naked eye. Attempts to perceive it magically will automatically succeed if the Mastery Level of the spell used is higher than that of this spell. Spells of equal Mastery Level require a Contested Air Roll to detect the hidden object. The object is still physically present and can be touched, smelled, or sensed with any normal sense other than vision. Pg 167 Core Book' },
      { id:6, name:'Legacy of Kaze-No-Kame', type:'Craft', ring:'air', level:'1', range:'School Rank x 10 Miles', area_of_affect:'One known individual within range', duration:'Special', raises:'Area (+1 individual), Range (+10 miles)', get roll() { return spellRoll(this); }, description:'You are able to call upon the spirits of the wind to take form as a bird and carry a message for you. The bird that is created by this spell appears perfectly normal in all regards. but if it takes any damage it dissipates into wind immediately, ending the spell. Upon creating the bird, you may speak to it, giving it a spoken message of up to one minute in length. The bird will then fly away to deliver the message to the person (or persons) specified when the spell is cast. The bird will fly to their location, deliver the message via a whisper (it can be overheard by others, but not easily), and then disappear. If the bird is unable to reach the individual, but they are within range (if they are within a building with no windows. for instance) it will remain outside waiting for up to one week before disappearing. If the person specified by the spell is not within range, the bird will fly away in a random direction and disappear when it is out of your line of sight. Pg 167 Core Book' },
      { id:7, name:'Nature\'s Touch', type:'', ring:'air', level:'1', range:'10\'', area_of_affect:'One Creature', duration:'Special', raises:'Range(+10\')', get roll() { return spellRoll(this); }, description:'You are able to use the spirits of the wind to speak to an animal and ensure that it understands what you are saying. This spell works only on natural animals, and will not work with Shadowlands creatures or creatures from other realms. It does not guarantee that the animal will regard you positively or that it will fulfill requests made of it, but the creature will understand anything you tell it (within its ability to do so. naturally political relationships will have no meaning to a horse, no matter how many times you explain them). This spell lasts as long as you maintain your full and undivided attention on the animal and continue speaking to it. Pg 167 Core Book' },
      { id:8, name:'Tempest of Air', type:'Thunder', ring:'air', level:'1', range:'Personal', area_of_affect:'A cone 75\' long and 15\' wide at its end', duration:'Instantaneous', raises:'Area (+5\' to the width of the cone), Damage (+lk0), Range (+5\' to the length of the cone), Special (+5 to Air TN against Knockdown per Raise)', get roll() { return spellRoll(this); }, description:'You summon a powcr?al gust of air emanating front your position that crashes into all in its path, knocking them to the ground. All targets within the area of effect suffer lkl Wounds and must make a Contested Roll using their Earth against your Air. Every target that fails suffers Knockdown. Pg 167 Core Book' },
      { id:9, name:'Token of Memory', type:'Craft, Illusion', ring:'air', level:'1', range:'10\'', area_of_affect:'One small (1 cubic foot or smaller) illusory object', duration:'1 hour', raises:'Area (+1 cubic foot in size of illusory object), Duration (+1 hour)', get roll() { return spellRoll(this); }, description:'You can create a flawless illusion of one object. The item ape pears real in every way up until the spell expires, at which point it disappears. If you are attempting to create a specifc, familiar object, such as another samurai\'s katana, you must declare one Raise, and that individual may make a Contested Roll using his Perception against the total of your Spell Casting Roll to detect the forgery. Images created by this spell are completely stationary. and if placed in a situation where they must move [such as floating in water], disappear instantly. An image of a katana could be created sitting on a rack, for example, but not in a samurai\'s obi because it would not be able to move with the samurai. Objects created with this spell have no true physical substance and cannot hear weight or inflict damage.Pg 167 Core Book' },
      { id:10, name:'To Seek the Truth', type:'', ring:'air', level:'1', range:'Personal / Touch', area_of_affect:'One individual touched [may be the caster]', duration:'5 minutes', raises:'Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'You call upon the wind to purge the mind of your target, granting him clarity. This spell may negate temporary mental or social penalties suffered as a result of a mechanical effect, including Techniques, Wound Ranks, or other spells. The TN of the Spell Casting Roll made to cast this spell is increased by an amount equal to the Technique Rank, Wound Rank or spell Mastery Level used to create the penalty in the first place. Disadvantages permanently possessed by an individual may not be countered using this spell. Pg 168 Core Book' },
      { id:11, name:'Way of Deception', type:'Illusion', ring:'air', level:'1', range:'20\'', area_of_affect:'One illusory duplicate of the caster', duration:'Concentration +5 minutes', raises:'Area [+1 duplicate per 2 Raises]. Range [+5 feet], Special [see below]', get roll() { return spellRoll(this); }, description:'You can entreat the capricious spirits of the wind to create a perfect duplicate image of you a short distance away. The illusion exactly refects your appearance at the time the spell is cast, including your clothing and any equipment. The illusion may appear anywhere within the spell\'s range, and will perform whatever actions you perform while it is in effect. (If you sit down, for instance, your duplicate will sit down as well, even if there is nothing to sit on.) Once you leave the normal range of the spell, the duplicate disappears. if you make two Raises on the Spell Casting Roll, you may leave the area of effect and the illusion will remain in whatever position it was in when you left for as long as you continue concentrating on maintaining the spell. Pg 168 Core Book' },
      { id:12, name:'Yari or Air', type:'Craft, Thunder', ring:'air', level:'1', range:'Personal or 20\'', area_of_affect:'One created weapon', duration:'5 minutes', raises:'Damage (+lk0). Duration (+5 minutes). Range (+5 feet)', get roll() { return spellRoll(this); }, description:'You summon a swirling weapon of pure air. only visible as a foggy outline. The weapon\'s default form is a yari. but one Raise can change its form to any other spear of your choosing. The weapon has DR lkl. if you do not possess the Spears Skill, you may instead use your School Rank in its place. If you do possess the Spears Skill, using this weapon grants you one Free Raise that can only he used on the Feint or Increased Damage Maneuvers. This weapon disappears if is lost from your hand. instead of summoning the yari for yourself, you may cause it to appear in the hands of an ally within 20 feet. He is treated as the caster for all purposes of the spell, but he does not gain the Free Raise bonus. Pg 168 Core Book' },
      { id:13, name:'Benten\'s Touch', type:'', ring:'air', level:'2', range:'Personal / Touch', area_of_affect:'Target individual [may be the caster]', duration:'1 hour', raises:'Range (may increase range to 5\' with a single Raise)', get roll() { return spellRoll(this); }, description:'By calling upon the air kami [0 whisper suggestions to others, you may cause them to perceive the target of this spell more positively than they otherwise might. The target of this spell gains a bonus of +lkl. plus your Air Ring, to the total of all Social Skill rolls made for the duration of the spell. Pg 168 Core Book' },
      { id:14, name:'Call Upon the Wind', type:'Travel', ring:'air', level:'2', range:'Personal or 20\'', area_of_affect:'Target individual [may he the caster]', duration:'1 minute', raises:'Duration (+1 minute), Range (+5)', get roll() { return spellRoll(this); }, description:'The winds can lift and buoy, carrying even the heaviest burden into the skies for short periods. The target of this spell gains a limited form of ?ight. allowing him to move through the air unimpeded. The target of the spell may make Free Move Actions. but not Simple Move Actions, and may never move more than lO\' per round. Heavy winds can interfere with this movement or prevent it altogether. At the end of the spell\'s duration. the target drifts harmlessly to the ground. no matter how high he might be. Pg 168 Core Book' },
      { id:15, name:'Hidden Visage', type:'Illusion', ring:'air', level:'2', range:'Personal', area_of_affect:'Self', duration:'5 minutes', raises:'Area of Effect (another person in line of sight can be targeted by this spell by making three Raises), Duration (+5 minutes)', get roll() { return spellRoll(this); }, description:'Air kami are mischievous and capricious, and enjoy anything they perceive as a joke. You may call upon them to create a subtle illusion, altering your facial featuresjust enough that you appear to he a different person. This spell does not allow you to impersonate specific individuals, or even people radically different from you. You appear as a person of the same age. build, race. and gender. The differences are subtle, enough so that you could be mistaken for your own brother or cousin. Pg 168 Core Book' },
      { id:16, name:'The Kami\'s Whisper', type:'Illusion', ring:'air', level:'2', range:'50\'', area_of_affect:'10\' radius', duration:'1 round', raises:'Area (+5\' radius), Duration (+1 round), Range (+5\')', get roll() { return spellRoll(this); }, description:'The kami of the wind can carry whispers for great distances. and can even create them if properly entreated. You can petition the kami to create a false sound, either a voice or a natural sound such as an animal\'s growl or runing water. for example. The sound can he no louder than a normal speaking voice, and cannot impersonate a specific person\'s voice. if used to create the sound of a voice. the spell is limited to twenty words. Pg 169 Core Book' },
      { id:17, name:'Mists of Illusion', type:'Craft, Illusion', ring:'air', level:'2', range:'20\'', area_of_affect:'10\' radius', duration:'1 minute', raises:'Area (+5\'). Duration (+1 minute). Range (+5\')', get roll() { return spellRoll(this); }, description:'With greater ?uency with the kami comes the ability to craft increasingly convincing images from the stuff of the wind itself. You may create illusions of any object, individual. or image that you can imagine. These images are stationary. and they must fit within the spell\'s area of effect, but they can he as simple or complex as desired. These illusions are visual only. with no auditory component. no odors. etc. Pg 169 Core Book' },
      { id:18, name:'Secrets on the Wind', type:'', ring:'air', level:'2', range:'10 miles', area_of_affect:'20\' radius', duration:'Concentration', raises:'Area (+5\' radius). Range (+5 miles)', get roll() { return spellRoll(this); }, description:'The kami can carry whispers across an Empire. if properly enrtreated to do so. This spell requires you to perform a preparation ritual in order to cast it effectively. The ritual requires ten minutes of uninterrupted meditation in the area designated as the spell\'s area of effect. Any time within the 48 hours immediatly following this ritual, you may cast this spell. and overhear anything being said in the prepared area. If your concentration is disrupted, the effect ends and may not be renewed without an additional preparation ritual. Only one area may be prepared via this ritual at one time. Pg 169 Core Book' },
      { id:19, name:'Whispering Wind', type:'Divination', ring:'air', level:'2', range:'20\'', area_of_affect:'Target Individual', duration:'Instantaneous', raises:'Range (+5\')', get roll() { return spellRoll(this); }, description:'The air kami see very little difference between speech and thought. and can perceive both with relative ease. By compare ing the two, the kami can determine if what has been spoken is true or a lie. Unfortunately, they have notoriously short attention spans, and thus can only assess extremely recent conversations. By invoking this spell, you may determine if the last thing said by the target was true or false. The kami have no concept of personal opinion, however, and if the target truly believes what he said was true. the kami will believe it as well. Pg 169 Core Book' },
      { id:20, name:'Wolf\'s Proposal', type:'Illusion', ring:'air', level:'2', range:'Personal', area_of_affect:'Self', duration:'20 minutes', raises:'Area (may target another with 2 Raises), Duration (+5 minutes) Special (+1 Honor Rank per two Raises)', get roll() { return spellRoll(this); }, description:'This spell. crafted to facilitate initial relations between groups. is easily twisted to nefarious purposes. It calls the kami to ereate a subtle aura of suggestion around the caster, one that does not disguise the caster but rather causes others to perceive him as slightly more benevolent than perhaps he truly is. For the duration this spell. your Honor Rank is considered three ranks higher for the purposes of any Lore: Bushido rolls made to determine your Honor Rank. Pg 168 Core Book' },
      { id:21, name:'Essence of Air', type:'Defense', ring:'air', level:'3', range:'Personal', area_of_affect:'Self', duration:'1 round', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'Air can be merged with the essence of a mortal, and doing so can impart tremendous abilities, albeit at great risk to the. caster. You mix with the wind itselfand become insubstantial. You may not interact with any physical objects while insubstantial, although you do remain on the ground, and you may pass through solid objects at a rate of one foot per round. Your Water Ring is considered halved [rounded down] while you remain insubstantial, and you may not cast any other spells until you return to solidity. Pg 169 Core Book' },
      { id:22, name:'The Eye Shall Not See', type:'Defense', ring:'air', level:'3', range:'Personal or Touch', area_of_affect:'Self or Target Individual', duration:'Concentration', raises:'none', get roll() { return spellRoll(this); }, description:'You call upon the kami to create an, area of distraction surrounding you. drawing all attention away from you and your actions. The kami whisper in the ears of those within 20\' of you [or of the target if you cast the spell on someone else], causing them to be conveniently distracted from your presence. You are not invisible. but those within 20\' of you will not see you as long as you do not make any loud noises or otherwise draw attention to yourself. Those outside that distance are not distracted, however, and will see you perfectly well regardless of your action or inaction.  Pg 168 Core Book' },
      { id:23, name:'Mask of Wind', type:'Illusion', ring:'air', level:'3', range:'Personal', area_of_affect:'Self', duration:'1 hour', raises:'Area (may target another with two Raises), Duration (+10 minutes)', get roll() { return spellRoll(this); }, description:'A skilled shugenja can petition the kami to create incredibly elaborate illusions to obscure one\'s identity and appearance. You may use this spell to adopt the appearance of any humanoid creature of approximately the same size. up to one foot taller or shorter than you. You could use this spell to assume the guise of a kenku. for example. because they are roughly the same size as humans. A goblin or an ogre would be impossible, however, because they are too short and too large, respectively.  Pg 170 Core Book' },
      { id:24, name:'Striking the Storm', type:'Defense', ring:'air', level:'3', range:'Personal', area_of_affect:'Self', duration:'3 rounds', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'The most powerful winds can turn aside not only arrows. but steel as well. You may summon a buffet of winds that surrounds you in an unrelenting cocoon of swirling air. Your Armor TN is increased by +20 against both melee and ranged attacks. The force of the winds surrounding you prevents you from hearing others ifthey speak to you, however. Pg 170 Core Book' },
      { id:25, name:'Summoning the Gale', type:'Defense', ring:'air', level:'3', range:'50\'', area_of_affect:'Target individual (may be the caster)', duration:'Concentration', raises:'Range (+5\')', get roll() { return spellRoll(this); }, description:'Swirling winds can he commanded to circle a designated target, preventing ranged attacks being made in either direction. This spell affects an area thirty feet around the target in all directions. Everyone within the affected area gains at +15 bonus to their Armor TN against ranged attacks. However. everyone within the area also suffers a penalty of -3k3 to all ranged attack rolls. Pg 170 Core Book' },
      { id:26, name:'Summon Fog', type:'', ring:'air', level:'3', range:'100\'', area_of_affect:'50\' radius', duration:'1 minute', raises:'Area (+5\' radius), Duration (+1 minute), Range (+10)', get roll() { return spellRoll(this); }, description:'The kami can be petitioned to coalesce in an area as they do on the coast, creating a thick. obscuring fog. Within the area affected by your spell, the Visibility is decreased to a meager ?ve feet. Fabrics and other absorbent materials within the spell\'s area of effect will become damp or even wet if they remain within it long enough. Small sources of open flame, such as candles, might be extinguished as well, at the GM\'s discretion. The moistness of fog is extremely damaging to rice paper. Pg 170 Core Book' },
      { id:27, name:'Your Heart\'s Enemy', type:'Illusion', ring:'air', level:'3', range:'25\'', area_of_affect:'One Target Individual', duration:'5 rounds', raises:'Duration (+1 round). Range (+5\')', get roll() { return spellRoll(this); }, description:'The kami can see into the hearts of mortals, and can use that information at a shugenja\'s request. You manifest the kami as an illusion of the thing your target fears most in the world. it may be an individual (the man who killed his father), or an item (a cursed blade that brought ruin to his family), or even a vista of some sort (an image of an enemy slaying his family). This effectively generates Fear 4 that the target must overcome (see the Book of Earth for rules regarding Fear). Only the target can see the specifics of the illusion; others see only a hazy outline that appears to he a small fog cloud. Pg 171 Core Book' },
      { id:28, name:'Call the Spirit', type:'', ring:'air', level:'4', range:'Special', area_of_affect:'Target Spirit', duration:'5 minutes', raises:'Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'Essentially an extremely powerful. specific form of the basic spell Summon. Call the Spirit allows a shugenja to summon any particular spirit, regardless ofits realm, to have a discussion. You may use this speil to summon any spirit from any of the spirit realms, although realm denizens that are not spirits (such as Fortunes) are immune. If you know something; specific about the spirit, either having seen it before or having intimate knowledge ofits actions [for example, "the spirit that killed my father"), you may summon that spirit in particular. The nature of the spell prevents the spirit from attacking you unless you attack first, but it will not necessarily be friendly. The spirit disappears as soon as the spell\'s duration expires. This spell can potentially summon extremely dangerous crear tures, such as oni, and should be used with caution. Pg 171 Core Book' },
      { id:29, name:'False Realm', type:'Battle, Illusion', ring:'air', level:'4', range:'250\'', area_of_affect:'100\' radius', duration:'1 hour', raises:'Area (+10\' radius), Duration (+10 minutes)', get roll() { return spellRoll(this); }, description:'The greatest masters of the wind can create illusions of such beauty and clarity that those affected by them might truly believe they were somewhere else. You can completely a1ter the appearance of the terrain within the area of effect of this spell. You can make a miserable swamp look, sound, and smell like a beautiful garden, or vice versa. Although these illusions can be extraordinarily intricate and completely con~ vincing to all other senses, they still have no substance and cannot be touched. Pg 171 Core Book' },
      { id:30, name:'Gift of Wind', type:'Illusion', ring:'air', level:'4', range:'Personal', area_of_affect:'Self', duration:'5 minutes', raises:'Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'The ultimate gift of the wind spirits is to become like the wind itself: unseen. The wind kami surround you and render you completely invisible. No nonsmagical vision can detect your presence. You can still be touched, heard, and smelled, but unless you attack someone else, you remain invisible for the duration of the spell. The kami consider attacking someone to be ruining thejoke, and immediately end the spell\'s effect if you do so. Pg 171 Core Book' },
      { id:31, name:'Know the Mind', type:'', ring:'air', level:'4', range:'10\'', area_of_affect:'Target Individual', duration:'3 rounds', raises:'Duration (+1 round), Range (+5\')', get roll() { return spellRoll(this); }, description:'Although the ultimate secrets of the human mind are hidden even to the winds, air kami can pluck the most immediate thoughts from the minds of others and whisper them to those who carry their favor. For the duration of this spell, you essentially hear the surface thoughts of the spell\'s target. You only learn things they are actively thinking about. For example, if you asked the name of the target\'s daughter, that name would appear in their mind instantly even if they had no intention of speaking it aloud. A Contested Roll using your Perception against the target\'s Awareness will also allow you to assess their true emotional state, regardless of how they appear physically. Pg 171 Core Book' },
      { id:32, name:'Netsuke of Wind', type:'Craft, Illusion', ring:'air', level:'4', range:'Touch', area_of_affect:'One hand-held object', duration:'1 hour', raises:'Duration (+10 minutes)', get roll() { return spellRoll(this); }, description:'Although it requires great favor, the air kami are willing to coalesce into a solid form for a short period of time if they are fond enough of the priest asking them. You may create a small object out ofthe air itself, something that can be held in one or both hands and that does not weigh more than twenty pounds at the most. This creation is an illusion, but it can be used functionally, including inficting damage if it is a weapon. The object disappears completely at the end of the spell\'s duration. Pg 171 Core Book' },
      { id:33, name:'Symbol of Air', type:'Ward', ring:'air', level:'4', range:'Touch', area_of_affect:'Special', duration:'Permanent', raises:'none', get roll() { return spellRoll(this); }, description:'Priests of the kami are capable of inscribing powerful wards that invoke the power of the elements against all who attempt to pass them. A Symbol of Air must be inscribed on a solid object, most often a door, window, gate, or other passageway. Anyone attempting to pass through this passageway or otherwise pass by the area protected by the Symbol is affected by the protective ward. Such persons must succeed at a Contested Roll using their Earth against the caster\'s Air. Those who fail are affected by a powerful drowsiness, and must succeed at a Willpower Roll against the total of the Spell Casting Roll used to create the ward or fall into a deep sleep for one hour. Those affected by the spell cannot be woken by normal means, but will awaken instantly if subjected to any attack or form of harm, as the kami will not be party to such humorless tactics. You may only have one Symbol of Air in existence at any time, and Symbol spells of different elements may never affect the same area. This spell may be dispelled by another casting of Symbol of Air from any shugcnja, or by destroying the surface where the Symbol was etched. Pg 172 Core Book' },
      { id:34, name:'Cloud the Mind', type:'', ring:'air', level:'5', range:'Touch', area_of_affect:'One Target Individual', duration:'Permanent', raises:'Special (+1day of effect)', get roll() { return spellRoll(this); }, description:'This extremely invasive spell is considered blasphemous by most honorable shugenja, and many respectable shugenja orders would find its use reason for excomniunication if not outright execution. This spell calls upon the air kami to befuddle and dismay a target, invading their mind and infuencing their ability to recall exactly what happened to them over a certain length of time. When this spell is successfully cast against a target, you must succeed at a Contested Roll using your Air versus the target\'s Earth. If successful, the target\'s memories are disrupted, and they forget what has happened to them over the course of the past week (five days). This information is completely lost to the target. What\'s more, the spell renders them extremely susceptible to suggestion, and you can tell them what happened to them over the course of the missing time. This allows unscrupulous shugenja to exploit others and essentially give them false memories, although certain individuals are highly resistant to this manner of manipulation. It is possible to determine that an individual was the target of this spell through use of the Commune spell, but it requires that the kami be specifically asked if they can detect any such manipulation. Pg 172 Core Book' },
      { id:35, name:'Draw Back the Shadow', type:'', ring:'air', level:'5', range:'100\'', area_of_affect:'30\' radius', duration:'Instantaneous', raises:'Area (+5\' radius), Range (+10\')', get roll() { return spellRoll(this); }, description:'Just as the kami craft illusions, they can cast them aside. Within the area affected by this spell, any illusions created by spells of Mastery Level 4 or lower are automatically dispelled. Spells of Mastery Level 5 or 6 require a Contested Air Roll between you and the shugenja who created those spells; if you are successful, those illusions are dispelled as well. Ongoing magical effects that are not illusions may also be dispelled by this spell, but require a Contested Ring Roll between you and their creator, using your Air versus his appropriate Ring. Pg 172 Core Book' },
      { id:36, name:'Echoes On the Breeze', type:'', ring:'air', level:'5', range:'Personal', area_of_affect:'One Target Individual', duration:'Concentration', raises:'none', get roll() { return spellRoll(this); }, description:'No one destination is beyond the reach of the wind. With a simple prayer to the kami, you can send your words across the span ofthe Empire, whispering into the ear of anyone you need to send a message. The person must be someone you know, and the spell will establish a link between the two of you only as long as you concentrate. You may communicate with one another, although you only hear each other\'s voices as whispers. Both participants are instantly aware when the connection is forged, and either can end it at any point. Pg 172 Core Book' },
      { id:37, name:'Legion of the Moon', type:'Illusion', ring:'air', level:'5', range:'Personal', area_of_affect:'10\' Radius', duration:'5 minutes', raises:'Area (+5\'), Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'The Moon can reveal what is hidden. but also conceal those who receive its blessings. You may summon the greater blessing of the Moon and envelop a large group of people within it, completely obscuring them from sight. Every individual you choose within the area of effect of this spell is rendered invisible to all normal senses for the duration of the spell. Those within the area that you choose to exclude are not affected. Anyone affected by the spell who performs any action that physically interacts with an unaffected individual is immediately excluded from the spell effect. Pg 172 Core Book' },
      { id:38, name:'Slayer\'s Knives', type:'Thunder', ring:'air', level:'5', range:'30\'', area_of_affect:'Corridor of air 10\' wide', duration:'Instantaneous', raises:'Area (+3\' wide). Damage (+lk0 per three Raises)', get roll() { return spellRoll(this); }, description:'The wind can be deadly to those unprepared for its fury. You summon a powerful wind that tears through anything in its path. At your behest, the kami create a corridor of air filled with a cutting wind that inflicts damage with a DR equal to your Air Ring +2K0 to everything in its path. (For example, a shugenja with Air 4 would inflict 6K4 damage with this spell). Paper and light cloth are destroyed instantly, although heavier cloth may only be damaged. Anyone damaged by these winds must succeed at an Earth Ring Roll (TN 20) or be Knocked Down. Pg 172 Core Book' },
      { id:39, name:'Rise, Air', type:'', ring:'air', level:'6', range:'30\'', area_of_affect:'One Summoned Spirit', duration:'Concentration', raises:'none', get roll() { return spellRoll(this); }, description:'The wind itself will take form to defend you. The ultimate actualization of the Summon spell, this spell summons a massive kami of pure air to serve you. It takes the form of a vaguely humanoid shape, roughly ten feet in height. with an indistinct outline visible only because of small debris caught up in its body. The kami may move up to 10\' x your Air per round. and generates powerful winds in a twenty foot radius around it that hinder movement. preventing anyone from making Simple Move Actions within its area of effect. The manifest kami is treated as if it has all Physical Traits equal to your Air Ring, and attacks with a Jiujitsu Skill Rank equal to half your Air Ring. Damage from these attacks has 3 DR equal to your Air Ring (for example, a spirit summoned by a shugenja with Air 6 would inflict 6k6 damage with its attacks). For purposes of taking damage, the spirit is considered to have Wounds as though it Were a human with Earth equal to your Air Ring, but suffers no Wound penalties. It is invulnerable (see the creature rules in the Book of Void for details of this ability). If it is successfully reduced to zero Wounds, it is dispelled. Pg 173 Core Book' },
      { id:40, name:'The False Legion', type:'Battle, Illusion', ring:'air', level:'6', range:'Personal', area_of_affect:'Within 100\' of caster', duration:'Concentration', raises:'Area (+10\'), Special (+5 illusory figures per Raise)', get roll() { return spellRoll(this); }, description:'The greatest illusory gift of the wind is legion. Within the area of effect of this spell, you can create a number of illusory figures up to your Air Ring x 10. These figures may he as detailed or as vague as you prefer (such as "Crane bushi versus "heavy infantry of the fourth Daidoji legion"), although you must be familiar with their appearance in order for this spell to take effect (you could not. for example, replicate a family mon you have never seen). The figures are fully mobile and will take whatever actions you desire as long as they do not leave the spell\'s area of effect. They can be seen, heard, or even smelled. but as with most illusions, they cannot physically interact with objects or individuals, in any way. Pg 173 Core Book' },
      { id:41, name:'Wrath of Kaze-No-Kami (Hurricane)', ring:'air', type:'Thunder', level:'6', range:'Personal', area_of_affect:'1 mile radius centered on the caster', duration:'Concentration', raises:'none', get roll() { return spellRoll(this); }, description:'The wrath of the air kami, and of the Fortune of the Wind, is truly dreadful to behold. ln casting this spell, you unleash the full force of a hurricane upon your enemies. When the spell takes effect. you are standing in the eye of the storm, 3 zone radiating twenty feet in every direction from you, and in which no ill effects of the spell are suffered. Outside the eye, however, the brutal effects of the storm tear at everything in its path. Objects weighing less than five hundred pounds are lifted by the wind and tossed into the storm. Individuals in this area must hold on to something immobile or be cast into the winds to their certain death. Everyone within the affected region who does not have sturdy shelter suffers lkt Wounds per minute from the winds and minor debris. There is a one in ten chance each minute that an exposed individual will instead suffer SkS Wounds due to being struck by a wind borne object. This spell lasts for a maximum of one hour, although it can last for shorter times if you are disrupted while maintaining the spell. This spell may not be cast in a given area more than once per month, as it completely exhausts the favors of the air kami to perform it. Pg 173 Core Book' },

      { id:42, name:'Armor of Earth', ring:'earth', type:'Battle, Defense', level:'1', range:'Personal', area_of_affect:'Self', duration:'10 rounds', raises:'Duration (+2 rounds)', get roll() { return spellRoll(this); }, description:'This spell infuses the caster\'s body with the strength of Earth, weakening the force of any physical or magical attack which strikes him. For the duration of the spell. you gain Reduction in an amount equal to your Earth Ring + School Rank. However, this infusion of Earth slows your movements, your Water is considered 1 Rank lower for purposes of movement while you are under the effects of this spell. Pg 173 Core Book' },
      { id:43, name:'Courage of the Seven Thunders', ring:'earth', type:'Battle', level:'1', range:'30\'', area_of_affect:'Targets up to caster\'s Shugenja School Rank', duration:'10 minutes', raises:'Duration (+1 minute), Targets (+1)', get roll() { return spellRoll(this); }, description:'This spell infuses the targets (who may include the caster) with firm and unyielding courage, bolstered by the eternal power of the Earth. For the duration of the spell, all the targets gain +5K0 to resist any kind of Fear effect, whether magical or natural. However, this spell is associated with the memory of the legendary Seven Thunders, and those whose connection to the Thunders is tenuous do not receive the same degree of blessing from the Earth kami. Samurai who are not of the original Seven Great Clans receive only +3k0 to their rolls to resist Fear. Anyone who has at least a full Rank of Shadowlands Taint cannot benefit from this spell, although this will not actually reveal that they are Tainted. This spell may be cast as a combined ritual by two or more shugenja who know the spell, in which case they may add their highest single Earth Rank to their combined total School Ranks to determine how many targets the spell can affect. Pg 173 Core Book' },
      { id:44, name:'Earth\'s Stagnation', ring:'earth', type:'', level:'1', range:'50\'', area_of_affect:'One Target', duration:'6 rounds', raises:'Duration (+2 rounds), Range (+10\'), Targets (+1, to a maximum of 4 total targets)', get roll() { return spellRoll(this); }, description:'This spell calls on the Earth in the target\'s body to weigh him down, impeding his movements. The target suffers a -2K0 penalty to all rolls using the Agility trait, and his Water Ring is considered 1 Rank lower for the purpose of how far he can move. Pg 174 Core Book' },
      { id:45, name:'Earth\'s Touch', ring:'earth', type:'Defense', level:'1', range:'Touch', area_of_affect:'One Target', duration:'1 hour', raises:'Duration (+1/2 hour), Targets (+1 per 2 raises, maximum of 3 total targets)', get roll() { return spellRoll(this); }, description:'With this spell, the shugenja calls forth the Earth of the target (which may he himself), invoking the kami to strengthen his health and mental fortitude. For the duration of the spell, one of the target\'s Earth Traits (chosen by the caster) is increased by 1. This does not increase the Ring itself, but it can enhance the target\'s ability to withstand temptation, resist poisons. or dominate others. Pg 174 Core Book' },
      { id:46, name:'Elemental Ward', ring:'earth', type:'Ward', level:'1', range:'Touch', area_of_affect:'One Target', duration:'1 hour', raises:'Duration (+1/2 hour), Targets (+1 per two Raises)', get roll() { return spellRoll(this); }, description:'This spell uses the power of Earth to enhance resistance to hostile magic. The spirits of Earth armor the target\'s body and soul, rejecting other kami when they try to affect the target. When the shugenja casts this spell, he chooses one Element (which cannot be Void or Maho). Spells of that element suffer a TN penalty equal to the caster\'s School Rank X 5 when they are cast on anyone under the protection of this spell. (Unfortunately, this includes friendly magic such as healing.) Pg 174 Core Book' },
      { id:47, name:'Jade Strike', ring:'earth', type:'Jade, Thunder', level:'1', range:'100\'', area_of_affect:'One Target', duration:'Instantaneous', raises:'Damage (+1K0) Range (+10\'), Targets (+1 target, maximum of 5 total targets)', get roll() { return spellRoll(this); }, description:'This spell summons forth the purest of Earth kami. those of jade, in the form of a blast of iridescent green energy. The jade power flies out and unerringly strikes the chosen target it cannot be intercepted or deflected, although Magic Resistance or other forms of magical defense can thwart it. if the target has at least one Rank of "taint, the Jade Strike will inflict damage with a DR of 3K3, burning and blackening the Tainted flesh. However, a target who does not have at least a full Rank of Taint will not suffer any damage from the spell. Casting Jade Strike on a non-Tainted target is generally regarded as a grave insult - except perhaps among the more paranoid ranks of the Kuni family, where it is seen as merely a sensible precaution. Pg 174 Core Book' },
      { id:48, name:'Jurojin\'s Balm', ring:'earth', type:'', level:'1', range:'Touch', area_of_affect:'One Target', duration:'1 hour', raises:'Duration (+1/2 hour), Targets (+1 per 2 Raises, maximum of 5 total targets)', get roll() { return spellRoll(this); }, description:'This spell fills the target\'s body with the purity and vigor of Earth, driving out poisons and impurities. If the target suffers the effects of any poison or toxin within the duration of the spell, or is already under the effects of a poison when the spell targets him, he may reroll any failed Stamina roll to resist the poison, with a bonus of +2kO to the second roll. (However, if the second roll is also failed. the poison has full effect.) An interesting side-effect of this spell is that it also cures drunkenness and other such effects, and it is impossible for the target to become intoxicated during the spell\'s duration. Pg 174 Core Book' },
      { id:49, name:'Minor Binding', ring:'earth', type:'Craft', level:'1', range:'60\'', area_of_affect:'One Target', duration:'2 hours', raises:'Duration (+1 hour), Range (+20\')', get roll() { return spellRoll(this); }, description:'This spell was pioneered by the Kuni family but has come into use among other shugenja who battle the forces of the Shadowlands, such as the Scorpion and the Phoenix, it is used to safely imprison minor Shadowlands creatures, typically For purposes of interrogation. Any Shadowlands creature with an Earth of 3 or less can be targeted with this spell. It cannot affect the Lost, Oni Lords or their spawn, or creatures with an Earth of 4 or higher, nor can it affect creatures who are not Tainted. If the spell is cast successfully, it calls forth manacles of iron, formed from pure Earth spirits. which trap and bind the target creature, rendering it physically helpless for the duration of the spell. When the spell expires, the manacles instantly crumble away into dust. Pg 174 Core Book' },
      { id:50, name:'Soul of Stone', ring:'earth', type:'Defense', level:'1', range:'Touch', area_of_affect:'One Target', duration:'1 hour', raises:'Duration (+1/2 hour)', get roll() { return spellRoll(this); }, description:'This spell fills the target\'s soul with the firm and unyielding strength of stone. For the duration of the spell, the target\'s feelings are immovable, and any attempt to divert or distract him will be resisted with supernatural determination. He gains a +3K0 bonus to any rolls made to resist Emotional manipulation or the distractions of desire. including Courtier (Manipulation) rolls, Temptation rolls, Compulsions, and any similar effects which the GM judges to be appropriate. However, this stony self control also makes it diffcult for the target to read and affect the emotions of others, and for the duration of the spell he suffers a 1k0 penalty to all Awareness Trait rolls and Awareness-related Skill Rolls made for the purpose of influencing others. Pg 174 Core Book' },
      { id:51, name:'Tetsubo of Earth', ring:'earth', type:'Craft, Jade', level:'1', range:'Self, or 20\'', area_of_affect:'One Created Weapon', duration:'5 minutes', raises:'Damage (+1k0), Duration (+5 minutes). Range (+5\')', get roll() { return spellRoll(this); }, description:'You summon a tetsubo of pure earth, studded with all manner of stones. The weapon\'s default form is a tetsubo, but one Raise can change its form to any other heavy weapon of your choosing. The tetsubo has a DR of 2K2. When wielding this weapon, you may use your School Rank in place of your Heavy Weapons Skill if you wish. If you do have the Heavy Weapon skill, the tetsubo grants you a Free Raise for the Knockdown maneuver (this bonus does not apply if you grant the Tetsubo to another person instead of wielding it yourself). The tetsubo disappears if it is lost from your hand. Instead of summoning the tetsubo for yourself, you may cause it to appear in the hands of an ally within 20 feet. He is treated as the caster for all purposes of the spell, but does not gain the Free Raise bonus. Pg 175 Core Book' },
      { id:52, name:'Be the Moountain', ring:'earth', type:'Defense', level:'2', range:'30\'', area_of_affect:'One target creature', duration:'4 rounds', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'A variant of the spell Armor of Earth, designed to protect allies, this prayer causes the Earth kami to envelop the target with their embrace, covering his skin with a stony barrier that repels physical blows. The target gains Reduction of a value equal to 5X the caster\'s School Rank, to a maximum of 20, but cannot take Simple Move Actions for the duration of the spell (Free Move Actions are still allowed). Only a willing ally can be targeted with this spell. Pg 175 Core Book' },
      { id:53, name:'Earth Becomes Sky', ring:'earth', type:'Jade, Thunder', level:'2', range:'100\'', area_of_affect:'Target creature', duration:'Instantaneous', raises:'Damage (+1k0). Targets (+1 target), Special (make boulders Jade with 2 Raises)', get roll() { return spellRoll(this); }, description:'This spell summons up several huge boulders from the earth, and hurls them through the air to unerringly strike one (or more) target creatures. The target struck by these boulders suffers damage with a DR equal to the caster\'s Earth rank. If the caster strikes multiple targets, the DR is reduced by lK1 for each additional target, to a minimum of 1k1 damage per target. These boulders are made of normal, mundane stone, and thus cannot normally bypass Reduction or Invulnerability, but a powerful caster can infuse the boulders with the power of Jade. Pg 175 Core Book' },
      { id:54, name:'Embrace of Kenro-Ji-Jin', ring:'earth', type:'Travel', level:'2', range:'Personal or Touch', area_of_affect:'One target creature', duration:'1 hour', raises:'Duration (+1/2 hour)', get roll() { return spellRoll(this); }, description:'This spell allows the target (who can he the caster or one other person) to literally dive into the ground, which becomes as clear and easy to traverse as water for him. He can see for a distance of 100 yards through the earth, and can move through it in any direction as easily as though he were in normal air. The target can see through the edge of the earth into the normal world, but he cannot attack, cast spells, speak, hear, or otherwise interact with those outside the earth unless he emerges from the ground (at which point the spell immediately ends. if the spell ends while the target is still underground, the Earth spirits are offended by the target\'s continued presence, and immediately expell him into the nearest open air, wherever that might be. Pg 176 Core Book' },
      { id:55, name:'Force of Will', ring:'earth', type:'Battle', level:'2', range:'50\'', area_of_affect:'One Target', duration:'2 rounds', raises:'Duration (+1 round. maximum 4 Rounds duration)', get roll() { return spellRoll(this); }, description:'This spell infuses the target with an intense resistance to pain and death, as the Earth kami bolster his will to live to super human levels. He is able to shrug off the pain and shock of his wounds, even continuing in the face of lethal injuries for a short time. For the duration of this spell, the target is immune to all Wound Rank penalties and effects including the effect of being dead if the Out rank is completely filled. When the spell expires, however, the full effects of any Wounds apply immediately, thus, this spell typically affords either a brief chance to be healed before it is too late, or the chance to wage a final battle in the face of certain death. Pg 176 Core Book' },
      { id:56, name:'Grasp of Earth', ring:'earth', type:'', level:'2', range:'50\'', area_of_affect:'One Target', duration:'5 rounds', raises:' Duration (+1 Round), Range (+5\'), Targets (+1 Target per 2 Raises)', get roll() { return spellRoll(this); }, description:'This spell causes the Earth kami to reach up and seize hold of the target, often taking the form of a massive hand or claw which grips the unfortunate creature in stony digits. The target is rendered near immobile, able to move only 3\' per round as a Simple Move Action. and unable to move at all with a Free Move Action. The target may break free by spending a Complex Action and rolling Raw Strength at a TN equal to 5x the caster\'s earth. Pg 176 Core Book' },
      { id:57, name:'Hands of Clay', ring:'earth', type:'Travel', level:'2', range:'Personal', area_of_affect:'Self', duration:'10 minutes', raises:'Duration (+5 minutes)', get roll() { return spellRoll(this); }, description:'This spell infuses Earth spirits into the hands and feet of the caster, allowing them to merge with the Earth found in wood, earth, and stone. This allows the caster to walk and climb along sheer surfaces, including walls, and cliffs, at half his normal movement speed (rounded up). He can even hang from ceilings and move along them, although in that case he can only move 3\' with a Simple Action. When the spell ends, the effect concludes without warning, possibly leading to a painful fall. Pg 176 Core Book' },
      { id:58, name:'The Mountain\'s Feet', ring:'earth', type:'Defense', level:'2', range:'Personal or 20\'', area_of_affect:'1 Target', duration:'1 hour', raises:'Duration (+1/2 hour). Targets (+1 per two Raises)', get roll() { return spellRoll(this); }, description:'This spell fortifies the target by rooting his feet to the stone and soil beneath, allowing him to shrug off anything that might separate him from the touch of Earth. The target gains +3k0 to resist all Knockdown maneuvers, and any spell which seeks to knock down the target, lift him into the air, or otherwise break his connection to the Earth must win a Contested roll of the spell\'s Element against the caster\'s Earth. Pg 176 Core Book' },
      { id:59, name:'Wholeness of the Earth', ring:'earth', type:'Defense', level:'2', range:'Personal or 20\'', area_of_affect:'One Target Creature', duration:'10 minutes', raises:'Duration (+1 minute), Range (+5\'), Targets (+1 per two Raises)', get roll() { return spellRoll(this); }, description:'This spell infuses the target with the strength of Earth to such a degree that his Rings and Traits become wholly resistant to any effort to change them. Any physical or magical effect which would raise or lower his Traits or Rings is completely ineffective for the duration of this spell, as the Earth kami firmly rebuff any such efforts to alter the target\'s Elemental balance. Pg 176 Core Book' },
      { id:60, name:'Bonds of Ningen-Do', ring:'earth', type:'Wards', level:'3', range:'500\'', area_of_affect:'One target spirit creature', duration:'30 days', raises:'Duration (+1 day), Range (+10\') Targets (+1 per 2 Raises)', get roll() { return spellRoll(this); }, description:'This spell, a more powerful and specialized form of Minor Binding, is a ritual designed to bind or dispel troublesome creatures from the various spirit realms. Any creature from the realms of Sakkaku, Chikushudo, GakieDo. Toshigolcu, or YumeADo can be affected by this spell. Casting it requires 10 minutes, although if additional shugenja who know the spell assist in the ritual, the time is reduced by 1 minute per additional shugenja, to a minimum of 1 minute. If the targeted creature is within range of the casters when the spell is successfully completed, the creature can be either bound or dispelled. If it is bound, it must obey the caster\'s commands for the duration of the spell, although suicidal commands will break the spell - this is how the Kuni have forced mujina spirits to labor for them in their iron mines (It should be noted that this use of the spell is considered controversial and even blasphemous by many in Rokugan). If the creature is dispelled, it immediately leaves Ningen-Do for its native spirit realm, and cannot return until the spell\'s duration ends. Either way, the spirit creature will regard the caster as an enemy thereafter, and is likely to seek vengeance if it can. Pg 176 Core Book' },
      { id:61, name:'Earth Kami\'s Blessing', ring:'earth', type:'Battle', level:'3', range:'Personal or 20\'', area_of_affect:'Caster or one target creature', duration:'10 minutes', raises:'Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'This spell infuses the target (which may be the caster or one of his allies) with the strength and resilience of the Earth. making him tougher and more firm-minded. For the duration of the spell, the target gains +2 Wounds per Wound Rank, and gains +lK1 on all rolls involving the Earth Ring and its associated Traits. When the spell expires, any Wounds the target has suffered still remain, and this may drive him into a lower Wound Rank or even kill him. Pg 177 Core Book' },
      { id:62, name:'Earth\'s Protection', ring:'earth', type:'Defense, Wards', level:'3', range:'Personal', area_of_affect:'10\' Radius', duration:'Concentration', raises:'Area (+5\' radius per 2 Raises, to maximum of 30\' radius), Special (damage reduced by an additional +lK1 for 2 Raises)', get roll() { return spellRoll(this); }, description:'This spell calls on the spirits of Earth to protect the area around the caster from the effects of the other three Elements (Air, Fire, and Water) for a short time. While the caster concentrates on maintaining the favor of the Earth spirits, the effects of spells which call on those other three elements are mitigated. Any hostile Air, Fire, or Water spell cast within the area of Earth\'s Protection, or extending its effects into that area, will suffer a +10 TN penalty to the Spell Casting roll. In addition, any damage which those spells inflict on creatures within Earth\'s Protection will be reduced by lKl (to a minimum of lKl). Pg 177 Core Book' },
      { id:63, name:'Purge the Taint', ring:'earth', type:'Jade', level:'3', range:'Personal', area_of_affect:'50\' radius', duration:'Permanent', raises:'Area (+lO\' radius)', get roll() { return spellRoll(this); }, description:'This spell was originally created by the Kuni family and is still primarily practiced by them, although knowledge of its prayers has spread to other Clans. It is an elaborate ritual spell, requireing an hour to cast, that calls on the powers of Earth to purge the land of the Shadowlands Taint, driving out all the evil <em>kansen</em> in the area. The spell will remove all the Taint from the land, plant life, and inanimate objects within the area of effect. It will not remove Taint from living creatures, nor will it affect powerful Tainted artifacts or objects made of obsidian. The removal of the Taint, however, is not without price. The elemental itami in the area of effect are also weakened and purged by the spell, especially the Earth spirits whose efforts are called upon to power it. In the aftermath of casting this spell, the local spirits will be scattered and weakened, inflicting a +15 TN penalty on all Spell Casting rolls within the area. This negative effect will sometimes fade with time, especially if it was cast in a single location surrounded by normal lands. But if the spell is cast over a wide area, such as the Kuni Wastes, the elemental kami will usually permanently leave the area, reducing it to a gray, lifeless wasteland. Pg 177 Core Book' },
      { id:64, name:'Sharing the Strength or Many', ring:'earth', type:'', level:'3', range:'30\'', area_of_affect:'One to six targets in range', duration:'5 rounds', raises:'Duration (+1 round), Range (+5\')', get roll() { return spellRoll(this); }, description:'This spell infuses its targets, up to six people (who can include the caster), with the power of Earth, allowing them each to call upon the Earth of their comrades to bolster their efforts. For the duration of the spell, the lowest Earth Ring Rank among all the targets is added to the total of all Ring, Trait, and Skill rolls (but not Spell Casting rolls) they make. Pg 177 Core Book' },
      { id:65, name:'Strength of the Crow', ring:'earth', type:'Jade', level:'3', range:'Touch', area_of_affect:'One Target', duration:'Hours equal to the Shugenja\'s school rank', raises:'Duration (+1 hour), Targets (+1)', get roll() { return spellRoll(this); }, description:'This spell infuses the target (who can be the caster) with a powerful resistance to the Shadowlands Taint, repelling the dark <em>kansen</em> of the Taint with the pure power of Earth. For the duration of the spell, the targets gain a +5k5 bonus to all rolls made to resist gaining the Shadowlands Taint, and any Maho spells suffer a +10 TN penalty to affect them. This bonus does not apply to any rolls made to resist an increase in Taint the target already possesses it only applies to new Taint gained from outside sources. Likewise it cannot protect the target from gaining Taint by casting Maho. Pg 177 Core Book' },
      { id:66, name:'The Wolf\'s Mercy', ring:'earth', type:'', level:'3', range:'50\'', area_of_affect:'One target creature', duration:'10 rounds', raises:'Range (+10\'), Targets (+1)', get roll() { return spellRoll(this); }, description:'This spell has existed in Rokugan for centuries, but is best known for its extensive use by Toturi Sezaru, "The Wolf," who employed it during his hunts for Bloodspeakers. It calls on the power of the Earth to aflict the target, weighing down his body and impeding his muscles, leaving him weak and vulnerable. The target\'s Earth Ring is lowered by 1 Rank, and his Wound Ranks are reduced correspondingly for the duration of the spell. (This can potentially kill him immediately if he has already suffered Wounds.) In addition, his Strength Rank is also lowered by l for the same duration. If the target has at least one full Rank of Shadowlands Taint. the Earth spirits will be filled with wrath, and punish him more severely, lowering his Earth Ring by 2 Ranks (to a minimum of 1). Pg 178 Core Book' },
      { id:67, name:'Armor of the Emporer', ring:'earth', type:'Defense', level:'4', range:'Personal', area_of_affect:'Self', duration:'5 rounds', raises:'Duration (+2 rounds)', get roll() { return spellRoll(this); }, description:'This spell covers the caster in a thick layer of tough, resilient Earth Spirits who repel all damage, whether physical blows or magical effects. Any time the caster suffers damage from an enemy physical or magical attack, each individual damage the has its total Reduced by the caster\'s Shugenja School Rank. This cannot reduce a die\'s total below 0. Pg 178 Core Book' },
      { id:68, name:'Essence of Earth', ring:'earth', type:'Battle', level:'4', range:'Personal or 20\'', area_of_affect:'One target creature (self or another)', duration:'10 rounds', raises:' Duration (+1 round}, Range (+5\'). Targets (+1 per 2 Raises), Special (+1 Rank of Earth per 2 Raises, maximum increase 3 Ranks of Earth)', get roll() { return spellRoll(this); }, description:'This spell infuses the target with the true strength of Earth. allowing him to shrug off blows which might otherwise take his life. For the duration of the spell. the target\'s Earth Ring is considered to be 1 Rank higher, and his Wounds are increased correspondingly. However. when the spell ends the Earth spirits immediately depart and the targets Wounds return to normal - possibly resulting in death, if he suffered sufficient injury. Pg 178 Core Book' },
      { id:69, name:'Symbol or Earth', ring:'earth', type:'Wards', level:'4', range:'Touch', area_of_affect:'Special', duration:'Permanent', raises:'Damage (+1K0)', get roll() { return spellRoll(this); }, description:'Priests of the kami are capable of inscribing powerful wards that invoke the power of the elements against all who attemp to pass them. A symbol of Earth can he inscribed on a solid object. most often a door, window. gate, or any other passageway. Anyone attempting to pass through this passageway or otherwise pass by the ward is affected by its power, and must succeed at a Contested Roll using their Air against the easter\'s Earth. Those who fail are struck with a powerful shockwave, and must succeed at a Strength roll against the total of the Spell Casting Roll used to create the ward or be knocked Prone and Stunned. If they have at least one Rank of Taint, they also suffer 2k2 Wounds. You may only have one Symbol of Earth in existence at any time, and Symbol spells of different elements may never affect the same area. This spell may be dispelled by another casting of Symbol of Earth from any shugenja, Or by destroying the surface where the Symbol was etched. Pg 178 Core Book' },
      { id:70, name:'Tomb of Jade', ring:'earth', type:'Jade', level:'4', range:'50\'', area_of_affect:'One target creature', duration:'Concentration', raises:'Range (+10\'), Special (Contested Roll, +lKl to caster for each Raise)', get roll() { return spellRoll(this); }, description:'Considered by many shugenja to he the ultimate spell for opposing the creatures of the Shadowlands, this spell calls on the purest of Earth spirits, those of jade, to consume the very Taint within the target. The spell can only affect a target who has at least one full Rank of Shadowlands Taint, but if the spell fails, the caster will not automatically know that the target is Taint free there is always the possibility that the target was able to resist the spell. When Tomb of Jade is cast, the target is momentarily immobilized as the Earth spirits enter his body. Each round, starting with the first round, the caster must make a Contested Earth roll against the target, if the target wins, the spell ends. If the caster wins, the target takes 2K2 Wounds as the spirits begin to transform his body into jade. This continues each round until the target successfully resists, the caster stops concentrating, or the target dies. Those killed by this spell are transformed into statues of pure jade, which crumbles away into mundane dust in 24 hours. Pg 178 Core Book' },
      { id:71, name:'Wall of Earth', ring:'earth', type:'Defense', level:'4', range:'100\'', area_of_affect:'Wall measuring a maximum of 10\' high and 100\' wide', duration:'10 minutes', raises:' Area (increase height by 1\' or width by 10\' per Raise). Duration (+1 minute), Range (+10\')', get roll() { return spellRoll(this); }, description:'This spell coaxes the spirits of Earth into rising up and fortifying a thick, powerful barrier to protect the caster. The wall of rockrhard earth which this spell creates can be shaped as the caster desires, and can be curved, placed on the side of a hill, or even formed in a circle. It is extremely tough, requiring a Strength roll against a TN of the caster\'s (Earth + School Rank) x 5 in order to break through. It is strong enough to hold back a raging flood, a lava flow. or hurricane winds, at least as long as the spell lasts. When the spell expires, however, the earthen barrier crumbles away in moments. Pg 178 Core Book' },
      { id:72, name:'Earthquake', ring:'earth', type:'', level:'5', range:'Personal', area_of_affect:'1 mile radius', duration:'1 minute', raises:'Area (+500 yards), Duration (+1 minute per 2 Raises)', get roll() { return spellRoll(this); }, description:'This spell unleashes a terrible, ground wracking earthquake, centered on the caster, who alone is unaffected. The earthquake utterly destroys all wooden buildings within the radius of effect, and inflicts severe damage on stone structures. All persons within the area of the earthquake are thrown to the ground, and remain Prone and Stunned for the duration of the spell, as well as suffering 2K1 Wounds. Individuals who are inside buildings (including the caster) will suffer 6K6 damage from falling debris, collapsing roofs, etc. Casting this spell within range of a major inhabited area is generally considered an act of war. Pg 179 Core Book' },
      { id:73, name:'Major Binding', ring:'earth', type:'Jade, Wards', level:'5', range:'100\'', area_of_affect:'One target Shadow Creature', duration:'12 hours', raises:'Duration (+1 hour), Range (+50\')', get roll() { return spellRoll(this); }, description:'The more powerful counterpart to the Kuni family\'s Minor Binding spell, this spell has also been employed by other clan Shugenja, especially those of the Phoenix Clan. It is used to imprison more powerful Shadowlands creatures and members of the Lost, typically for purposes of interrogation. Any Lost and any Shadowlands creature can be targeted with this spell. It can also target other spirit creatures who are Tainted. It cannot affect any other creatures. The spell is a ritual, and requires ten minutes to east (making it quite hazardous when dealing with a rampaging oni), but if additional shugenja join in casting the spell the casting time is reduced by 1 minute per shugenja, to a minimum of 1 minute. If it is cast successfully, the casters make a Contested Roll of their combined Earth Rings against the Earth of the target. If the casters win. the spell calls forth manacles of pure elemental jade, which imprison the creature and render it helpless with the pain of its searing bonds for the duration of the spell. When the spell expires, however, the manacles instantly crumble into dust, and the creature is liable to seek immediate and bloody vengeance on its captors. Pg 179 Core Book' },
      { id:74, name:'Strike at the Roots', ring:'earth', type:'', level:'5', range:'50\'', area_of_affect:'One target creature', duration:'3 rounds', raises:'Duration (+1 Round), Range (+10\'), Targets (+1 target per 2 Raises), Special (Contested Roll, +lKl to the caster for each Raise)', get roll() { return spellRoll(this); }, description:'A more powerful and devastating form of The Wolf\'s Mercy, this spell brings the true wrath of the Earth onto the target, draining all favor of the Earth from his body and leaving him a weak, trembling, helpless victim. After casting this spell, the caster must succeed in a Contested Earth roll against the targets of the spell (rolling separately if he is targeting mule tiple people). If the target loses the roll, his Earth Ring is immediately reduced to 1 for the duration of the spell. This also reduces his Wound Ranks and may result in his immediate death if he has already suffered injuries. Pg 179 Core Book' },
      { id:75, name:'The Kami\'s Strength', ring:'earth', type:'Battle', level:'5', range:'30\'', area_of_affect:'One target creature', duration:'5 rounds', raises:'Duration (+1 round). Range (+10\')', get roll() { return spellRoll(this); }, description:'This spell allows the caster to fortify one person with the power of Earth, greatly enhancing their physical capabilities and their resistance to damage. The target of this spell gains Reduction of 20 and increases his Strength and one other physical Trait by an amount equal to the caster\'s Earth Ring. In return, however, the target is weighed down by the burden of Earth and cannot take Simple Move Actions (she can still take a Free Move Action).  Pg 179 Core Book' },
      { id:76, name:'The Kami\'s Will', ring:'earth', type:'Defense', level:'5', range:'30\'', area_of_affect:'One Target Creature', duration:'10 rounds', raises:'Duration (+1 round), Range (+10\')', get roll() { return spellRoll(this); }, description:'The counterpoint to The Kami\'s Strength, this spell infuses one person with the stubbornness and determination of Earth. greatly enhancing their willpower and making them all but immune to the effects of elemental magic. The target of this spell increases his Willpower by an amount equal to the caster\'s Earth Ring, and any spells (friendly or hostile, but not including Maho spells) which target him suffer a penalty of xKx to their Spell Casting roll, where x is the caster\'s Earth Ring. In return, however, the target is made so stubborn and willful that he cannot function properly in a social environment, and suffers a penalty to all Social Skill rolls of xK0, where X is the Earth Ring of the caster. Pg 179 Core Book' },
      { id:77, name:'Essence of Jade', ring:'earth', type:'Defense, Jade', level:'6', range:'30\'', area_of_affect:'One Target Creature', duration:'10 rounds', raises:' Duration (+1 round), Range (+5\'), Targets (+1 target for 2 Raises, maximum of 3 total targets)', get roll() { return spellRoll(this); }, description:'This spell calls on the purity of jade to protect its targets against the power of Jigoku, whether manifested as Taint or as the dreaded magic known as maho. The target radiates the sacred green light of jade, and while the spell lasts, he cannot gain the Shadowlands Taint and is completely immune to the effects of all maho spells. This spell cannot be cast on anyone who possesses at least one full Rank of Taint, for the pure jade spirits will recoil from such a corrupt individual, immediately alerting the caster to this individuals Tainted nature. Pg 180 Core Book' },
      { id:78, name:'Power of the Earth Dragon', ring:'earth', type:'Defense', level:'6', range:'50\'', area_of_affect:'One Target Creature', duration:'10 minutes', raises:'Duration (+1 minute), Range (+10\'), Targets (+1), Special (Damage absorption +10 Wounds per Raise)', get roll() { return spellRoll(this); }, description:'This spell is the most powerful of the physically protective Earth spells, calling on the favor ofthe Dragon of Earth to enshroud the targets with protection against all forms of harm. The Earth spirits absorb all damage which the targets suffer while the spell lasts. However, there are limits to even Earth\'s endurance, Nemuranai can bypass the protection. Further, if the Earth spirits protecting a specific target absorb a total of 100 Wounds of damage, they will be exhausted and the spell\'s effects on that target come to an end. Pg 180 Core Book' },
      { id:79, name:'Prison of Earth', ring:'earth', type:'Wards', level:'6', range:'30\'', area_of_affect:'One Target Creature', duration:'Permanent', raises:'Range (+5\'), Special (Contested Roll, +1Kl to the caster for each Raise)', get roll() { return spellRoll(this); }, description:'The most powerful of the binding spells which Earth shugenja use to deal with dangerous creatures, this spell can literally imprison the essence of such a creature for as long as the caster desires. Casting this spell requires that the caster posesess a gem or pearl in which to imprison the creature (the GM may, discretionally, allow other rare or precious items to be used, such as a beautifully inlaid puzzlerhox or a crystal pendant). The spell can target any creature native to the realms of Jigoku, Gold-Do, or Toshigoku, and any other non-human creature with at least 1 full Rank of Taint. After casting the spell, the caster must make a Contested Willpower roll against the target. if the caster wins, the createture\'s physical body vanishes and its essence is imprisoned within the item. It will remain there indefinitely unless the item is physically destroyed. If that happens, the released creature immediately resumes its physical form, and will most likely seelc vengeance against the caster or his descendants. Pg 180 Core Book' },
      { id:80, name:'Rise Earth', ring:'earth', type:'', level:'6', range:'30\'', area_of_affect:'One Summoned Spirit', duration:'Concentration', raises:'none', get roll() { return spellRoll(this); }, description:'The Earth itself arises and takes form to defend you. The ultimate realization of the Summon spell, this prayer summons a massive kami of pure Earth to serve you. It takes the form of a vaguely humanoid shape, roughly ten feet in height, with a broad body and thick limbs all formed from earth and stone. This mighty Earth kami may move up to 5x your Earth per round, and its footsteps shake the earth in a twenty foot radius around it, preventing anyone from making Simple Move Actions within its area of effect. This Earth spirit is treated as if it has all Physical Traits equal to your Earth Ring, and attacks with a Jiujitsu Skill Rank equal to half your Earth Rank. The DR from these attacks is equal to your Earth Ring. The kami can carry up to 1,000 pounds of weight if so commanded, and its blows are strong enough to destroy any wooden structure and to shatter stone walls of one foot thickness. For purposes of taking damage. the spirit is considered to have Wounds as though it were a human with Earth equal to your Earth Ring, but suffers no Wound penalties, it is invulnerable (see the creature rules in the Book of Void for details of this ability). If it is successfully reduced to zero Wounds. it is dispelled. Pg 180 Core Book' },

      { id:81, name:'Biting Steel', ring:'fire', type:'Craft', level:'1', range:'touch', area_of_affect:'1 bladed weapon', duration:'1 minute', raises:'Duration (+1 minute)', get roll() { return spellRoll(this); }, description:'ire spirits can infuse metal with their own fury, turning a sharp edge into a supremely perfect one. This spell entrances the damage of steel bladed weapons. such as swords, knives, nagiuata, etc. Biting Steel cannot affect weapons which are not metal blades, which are nemuranai, or which have all ready been enhanced by magical effects. The weapon\'s DR is increased by 1K1 for the duration of the spell. Pg 180 Core Book' },
      { id:82, name:'Burning Kiss of Steel', ring:'fire', type:'Battle', level:'1', range:'touch', area_of_affect:'One melee weapon in caster\'s hand', duration:'5 minutes', raises:'Duration (+2 minutes)', get roll() { return spellRoll(this); }, description:'This spell embraces a weapon with fire, causing it to be larger and more effective. When the spell is cast, a tendril of fire extends from your hands to engulf your weapon. (if you drop or lose the weapon, the spell effect ends.) This weapon gains a +1k1 bonus to melee attack rolls. The bonus is +2K2 when making attacks against mounted opponents or opponents of larger than human size Pg 180 Core Book' },
      { id:83, name:'Flames', ring:'fire', type:'', level:'1', range:'30\'', area_of_affect:'One target', duration:'Intantaneous', raises:'', get roll() { return spellRoll(this); }, description:'Fire\'s most basic power is destruction, and summoned Fire spirits can easily be unleashed on one\'s enemies. This spell invokes a single fire kami, which lances toward the target, hitting uneringly so long as the target is within range. The spell deals 2k2 Wounds. The burns this spell inﬂicts are quite painful, and if the spell targets a shugenja who is casting a spell, his Willpower roll has a TN of 20 plus the damage dealt, instead ofthe normal 10 plus damage dealt. Pg 181 Core Book' },
      { id:84, name:'Extinguish', ring:'fire', type:'', level:'1', range:'Personal', area_of_affect:'100\' radius', duration:'Intantaneous', raises:'Area (+20\')', get roll() { return spellRoll(this); }, description:'Fire spirits can be driven away by the proper invocation, a very useful ability in Rokugani towns and cities where the construction is all wood and paper. This spell dismisses the active Fire kami in the area. All non-magical ﬁre in the area of effect is immediately snuffed out, and any damage dealt by fire (magical or not) reduces its DR by ??? until the start of the next Round. Pg 181 Core Book' },
      { id:85, name:'Fires of Purity', ring:'fire', type:'Defense', level:'1', range:'20\'', area_of_affect:'One target', duration:'1 minute', raises:'Damage (1k0 per 2 raises)', get roll() { return spellRoll(this); }, description:'This spell, one of the few directly protective prayers involving the Fire kami, asks the kami to protect one person, enveloping the target in a shroud of bright ﬂames. Neither the target nor anything he ??? takes damage From the spell, but anyone who comes into contact with him or strikes him with a melee attack takes 2k2 Wounds. Anyone the target strikes in melee with an unarmed attack or a weapon he carried when the spell was cast also takes an extra 2K2 Wounds. Anything the target puts down, however, cannot be picked back up with out subjecting, it to the damage from the spell. Ranged weapons such as arrows bypass this barrier of fire, dealing Wounds as normal. Pg 181 Core Book' },
      { id:86, name:'The Fires That Cleanse', ring:'fire', type:'', level:'1', range:'Self', area_of_affect:'30\' radius', duration:'Instantaneous', raises:'Area of Effect (+5\' per 2 raises)', get roll() { return spellRoll(this); }, description:'Destruction is one of the basic impulses ofFire, and this spell calls on that urge to spread destruction in the caster\'s Suroundings. The Spell whips the kami into a frenetic chaos, destroying everything around you. Everyone in the area of effect. including you, suffers damage with DR equal to your Fire Ring. This result is rolled once and applied to everyone within the area, however, you take only half damage (rounded up), since the kami do make some effort to avoid you. Pg 181 Core Book' },
      { id:87, name:'Fury of Osana-Wo', ring:'fire', type:'Thunder', level:'1', range:'300\'', area_of_affect:'One target', duration:'Instantaneous', raises:'Damage (1K0 per 2 raises)', get roll() { return spellRoll(this); }, description:'This spell is actually a prayer to the Fortune of Fire and Thunder, inviting his wrath upon your enemy. It can only be cast outdoors, and summons a bolt of lightning from the sky, striking the target for 5K2 Wounds. Everyone within 10\' of the target must make a Stamina roll versus it TN of 15 to avoid being deafened for 2 Rounds. If this spell is cast during a thunderstorm, the damage is increased to 6K2 for a moderate storm and 6K3 for a disastrous storm or hurricane. Pg 181 Core Book' },
      { id:88, name:'Katana of Fire', ring:'fire', type:'Battle, Craft', level:'1', range:'Personal or 20\'', area_of_affect:'One created weapon', duration:'5 minutes', raises:'Damage (+lK0), Duration (+5 minutes), Range (+5 feet)', get roll() { return spellRoll(this); }, description:'You summon a blade of pure fire, blazing like the soul of an honorable warrior. The weapon\'s default form is a katana, but one Raise can change its form to any other sword of your choosing. The katana has a DR of 2K2. When wielding this weapon, you may use your School Rank in place of your Kenjutsu Skill if you wish. If you do possess the Kenjutsu Skill, you add your Honor Rank to all damage rolls made with this weapon. The katana of fire disappears if it is lost from your hand. Instead of summoning the katana for yourself, you may cause it to appear in the hands of an ally within 20 feet. He is treated as the caster for all purposes of the spell, but does not gain the Honor boost to damage. Pg 181 Core Book' },
      { id:89, name:'Never Alone', ring:'fire', type:'', level:'1', range:'Touch', area_of_affect:'One target', duration:'5 rounds', raises:'Targets (+1)', get roll() { return spellRoll(this); }, description:'This spell invokes Fire‘s element of knowledge and under standing, strengthening the spirit of one of your allies by opening his eyes to the courage of his ancestors. The target of the spell receives a bonus to all attack rolls, Skill rolls, and Trait Rolls equal to your Fire Ring. This effect lasts until either the spell expires, or until the target fails an attack roll or Skill Roll, or until the target suffers Wounds from any source, whichever comes first. Pg 182 Core Book' },
      { id:90, name:'The Raging Forge', ring:'fire', type:'Craft', level:'1', range:'Touch', area_of_affect:'One weapon or armor', duration:'Instantaneous', raises:'', get roll() { return spellRoll(this); }, description:'Fire is the element of creation as well as destruction, and a skilled shugenja can use this to great effect. This spell invokes the powers of the forge, mighty and merciless, to remake a material item, such as a weapon or suit of armor, into its perfect form. The target item loses all blemishes. including cracks or nicks. This spell cannot repair an item which has actually been broken or destroyed, however, and it can only affect items that are of ordinary quality. Pg 182 Core Book' },
      { id:91, name:'Disrupt the Aura', ring:'fire', type:'', level:'2', range:'50\'', area_of_affect:'Target person or creature', duration:'24 hours', raises:'Duration (+12 hours per raise)', get roll() { return spellRoll(this); }, description:'Anyone whose elements are out of balance will feel the effects, and this spell creates this condition deliberately by aggravating the Fire present in the target\'s body. While the spell is in effect, the target cannot be healed by magical means. Magical spells, items, or Techniques that attempt to restore Wounds to the target automatically fail. (Mundane wound treatment with the Medicine skill will still be effective.) The target may realize something is physically wrong with him but cannot find out what is happening without the help of a shugenja — casting Sense Fire will show the presence of many excited Fire spirits within the target. Pg 182 Core Book' },
      { id:92, name:'Enticing Dance of the Flame', ring:'fire', type:'', level:'2', range:'50\'', area_of_affect:'20\' radius', duration:'2 rounds', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'A more potent version of The Fires That Cleanse, this spell keeps the Fire kami under tighter control and persuades them to remain present for longer. If the spell is cast successfully, Fire kanii erupt into a violent, ferocious dance at a location of your choice, igniting that area into ﬂames. Every target in the area takes 3K2 Wounds on the Round the spell takes effect. At the beginning of each subsequent Round, if the spell is still active, every target still in the affected area takes an additional 2K1 Wounds. Pg 182 Core Book' },
      { id:93, name:'The Fires From Within', ring:'fire', type:'', level:'2', range:'100\'', area_of_affect:'One target', duration:'Instantaneous', raises:'Target (+1 target per 2 raises)', get roll() { return spellRoll(this); }, description:'Probably the most widely known and recognized offensive spell in the element of Fire, this prayer has been in use by Rokugani shugenja since the very earliest days ofthe Empire. You summon Fire kami to form an orb of ﬂame that hovers in your palm for a moment before streaking toward the target. The sphere gains momentum and size until it hits its target, making it quite spectacular visually. The spell has a DR equal to your Fire Ring. Pg 182 Core Book' },
      { id:94, name:'Hurried Steps', ring:'fire', type:'', level:'2', range:'Personal', area_of_affect:'Self', duration:'2 rounds (see below)', raises:'', get roll() { return spellRoll(this); }, description:'Fire is the element of thought, and thought is swift indeed. You draw upon the speed of the Fire kami to aid you in the next spell you cast. The casting time of the next <strong>Fire</strong> spell you cast is reduced by 4 Rounds. If the next spell is Mastery Level 3 or lower, it casts instantaneously as a Simple Action. If you do not begin casting the new spell within the next 2 Rounds, however. the beneﬁt of Hurried Steps lapses. Pg 182 Core Book' },
      { id:95, name:'Mental Quickness', ring:'fire', type:'', level:'2', range:'Touch', area_of_affect:'One item', duration:'10 minutes', raises:'', get roll() { return spellRoll(this); }, description:'Fire kami can be imbued into physical objects, allowing them to remain present for longer periods of time. Shugenja have devised many ways to use this technique to aid themselves and others. This spell, one of the most basic of this kind, imbues a material item with the cleverness and wit of fire. Any one who carries that item has their Intelligence Trait increased by 3 for the duration of the spell. Pg 182 Core Book' },
      { id:96, name:'Relentless Heat', ring:'fire', type:'Defense', level:'2', range:'Touch', area_of_affect:'One armor', duration:'10 rounds', raises:'Duration (+2 rounds)', get roll() { return spellRoll(this); }, description:'This spell is designed to protect bushi by infusing a Fire kami into their armor. The spell targets one suit of armor, which glows with the strength of the merciless desert sun. Any opponent who attempts to Strike the person wearing the armor, whether or not the attack hits is immediately considered to be Fatigued until the beginning of their next turn. The penalties apply to the attack roll that triggered the spell, and any attackers in the Full Attack posture immediately assume the Attack Posture instead. This spell has no effect on ranged attacks or spells that target the wearer of the armor. Pg 183 Core Book' },
      { id:97, name:'Tail of the Fire Dragon', ring:'fire', type:'', level:'2', range:'Personal', area_of_affect:'Self', duration:'4 rounds', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'This Spell invokes several Fire kami to form a whipelike tendril that extends from the caster\'s hand. The tendril of ﬂame will not burn you. since the kami are grateful for the opportunity to burn others at your command. You may use this tendril to Strike enemies as far as 30\' away. extending it out and back with blinding speed. Your attack roll with the tendril is equal to your Agility + (twice your School Rank) keeping your Agility. The tendril has a DR equal to your Fire Ring. Pg 183 Core Book' },
      { id:98, name:'Ward of Purity', ring:'fire', type:'Ward', level:'2', range:'Touch', area_of_affect:'15\' radius from the touched object', duration:'1 day', raises:'', get roll() { return spellRoll(this); }, description:'Although Earth is the traditional method of opposing evil forces like the Shadowlands Taint, the spirits of Fire can also be invoked to purge and destroy such spiritual abominations. This spell binds a Fire kami into a specific location which it protects against the forces of evil. Casting the spell requires inscribing elaborate kanji on a ﬂat surface in chalk or ink, and takes one minute of concentrated effort, after which the Spell Casting Roll must be made. Once the Ward of Purity is activated and the power of the kami is fully engaged, however, the kami within the inscription protects the area against the influence of the Shadowlands or the Lying Darkness. Persons or creatures with at least 1 Shadowlands Taint Rank, or who are under the control of the Lying Darkness, must make a successful Contested Willpower Roll against you in order to enter the Ward\'s area of effect: you gain a +5 bonus to this roll, in addition, those creatures who successfully enter the area suffer extreme pain, as the power of the ward burns their very essence. Their bodies ignite and they suffer Wounds equal to the total of your Fire Ring + Insight Rank each Round they remain within the area of effect. Spells and missiles are unaffected by Ward of Purity. The object upon which the ward is inscribed must remain immobile and the inscription must remain clearly visible at all times, or else the Ward is dispelled. If overlapping Wards of Purity are present, their effects do not stack. Pg 183 Core Book' },
      { id:99, name:'Breath of the Fire Dragon', ring:'fire', type:'', level:'3', range:'Personal', area_of_affect:'15\' long 5\' wide blast', duration:'4 Rounds', raises:'', get roll() { return spellRoll(this); }, description:'This spell is a prayer to the Dragon of Fire, one ofthe mightiest of celestial beings, entreating him for a bit of his power. If the spell is Successful, you gain the ability to breathe a bolt of flames from your open mouth once per Round as a Simple Action. The bolt has a DR equal to your Fire Ring and strikes every target in front of you within the area of effect. You may choose to take actions other than breathing fire while under the effects of this spell, but you cannot speak or cast spells. The spell expires after four Rounds, but you may choose to end this spell during the Reactions Stage of any earlier Round. Pg 183 Core Book' },
      { id:100, name:'Fiery Wrath', ring:'fire', type:'', level:'3', range:'100\'', area_of_affect:'One free standing structure, or 50\'x50\' area', duration:'', raises:'Instantaneous', get roll() { return spellRoll(this); }, description:'Fiery Wrath was originally created to clear brush for farming and to demolish wooden structures with a minimum of work and no hazard; it is also used to start bonfires for rituals and celebrations. The spell allows you to destroy a building or other structure by appealing to the excitable Fire kami within the target\'s materials. All flammable materials within the area of effect immediately catch fire and burn until nothing but ash is left. The fire cannot be extinguished except by magical means: mundane water, sand, and other retardants will have no effect. Only one structure may be targeted by the spell, and the fire will not spread out to adjoining structures, as your prayers keep the Fire kami under tight control. Living beings and materials that are not ﬂammable are not affected; in fact, while clothes worn by people caught within the area of effect will burn, their flesh will not so much as singe. Pg 183 Core Book' },
      { id:101, name:'The Fist of Osano-Wo', ring:'fire', type:'Thunder', level:'3', range:'50\'', area_of_affect:'20\' radius', duration:'1 round', raises:'Area of Effect (+10\' radius)', get roll() { return spellRoll(this); }, description:'A more powerfull prayer to the Fortune of Thunder, this spell invokes his anger to devastate a targeted area. Massive lightning strikes and vaguely fist shaped bolts of flame streak from the skies, smiting the area of effect. Weak structures and those easily set on fire (such as most Rokugani homes) are destroyed by the spell\'s furr, or catch fire and are consumed. The spell has a DR equal to your Fire Ring, inﬂicting this damage on anyone caught within the area of effect. Using this spell in populated areas is generally considered a criminal act, unless the shugenja can cite extreme circumstances, since fires are terribly dangerous to Rokugani cities. Pg 184 Core Book' },
      { id:102, name:'Haze of Battle', ring:'fire', type:'Battle', level:'3', range:'10\'', area_of_affect:'One target', duration:'5 rounds or 1 hour out of combar', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'Fire spirits are known for their erratic and temperamental nature, and shugenja can badly disrupt their foes in battle by imbuing them with this aspect of the element. The target of this spell is filled with the unfocused fury of Fire, enraging him and forcing him to lose perspective. The target immediately assumes the Full Attack Stance and cannot switch front that Stance for the duration of the spell. If the spell is cast out of battle, the target gains the Brash and Contrary Disadvanetages for the duration of the spell. This spell\'s effects can be overcome by those of strong will. The target can attempt to resist with an opposed Wilipower roll, but you add your Fire to the total of your roll. If the spell is cast in battle, this roll occurs during the Reactions Stage (and may be attempted each Round). If the spell is cast out of battle, the roll occurs once every 10 minutes. Pg 184 Core Book' },
      { id:103, name:'Hungry Blade', ring:'fire', type:'Craft', level:'3', range:'50\'', area_of_affect:'One weapon', duration:'5 rounds', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'This spell is a more potent version of Biting Steel, designed to enhance any weapon rather than merely a sword. The spell strengthens the Fire spirits in a single target weapon, causing them to come forth and form a faint sheath of fire around it. The weapon\'s wielder adds +1KO to all attack rolls and all of his damage dice explode on a reusult of 8or better. Each die can on an 8 or 9 once per roll, however, even if the weilder had no other effects that allow the die to explode on 9s. Pg 184 Core Book' },
      { id:104, name:'Ravenous Swarms', ring:'fire', type:'', level:'3', range:'30\'', area_of_affect:'One target person', duration:'5 rounds', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'A more powerful and sophisticated form of the prayer which invokes the Fires From Within, this spell not only damages the target but also disrupts his own attempts to invoke the Fire kami, making it a very effective weapon against a rival Fire shugenja. You summon forth a bolt of ﬂames that streaks toward the target with wild abandon. The flames deal 4K3 Wounds on impact and then encircle the opponent for the duration of the spell, waiting for him to make a mistake. If the target casts any Fire Spell during that time, the Fire kami instantly strike, dealing 3K3 extra Wounds and causing the Spell Casting Roll to automatically fail. (The target loses the appropriate spell slot as usual.) Pg 184 Core Book' },
      { id:105, name:'Shining Light', ring:'fire', type:'Defense', level:'3', range:'30\'', area_of_affect:'One target armor', duration:'10 rounds', raises:'Damage (+1K0 per two Raises), Duration (+2 Rounds)', get roll() { return spellRoll(this); }, description:'Another example of spells which can imbue Fire kami into items. This spell temporarily binds a Fire kami into a piece of armor (such as a helmet or chest plate). The armor emits a bright light that becomes blinding whenever the wearer is attacked. Any time the armors wearer is attacked in melee, immediately afterward the opponent takes 2K2 Wounds and is Blinded until the Reactions Stage of the same Round. The spell has no effect on ranged attacks. Pg 184 Core Book' },
      { id:106, name:'Death of Flame', ring:'fire', type:'', level:'4', range:'100\'', area_of_affect:'One target', duration:'5 rounds', raises:'', get roll() { return spellRoll(this); }, description:'This spell brings the anger of Fire on the target, suppressing his elemental Fire and lowering both his Agility and his Intelligence Ranks by an amount equal to your Fire Ring, to a minimum of one. If you maintain Concentration for the duration of the spell\'s effect, the target cannot escape its effects. If you do not maintain Concentration, each Round, at the start of her Turn the target may make a contested Fire roll against you (using her original, unmodified Fire Ring) to end the spell\'s effect. Pg 184 Core Book' },
      { id:107, name:'Defense of the Firestorm', ring:'fire', type:'Defense', level:'4', range:'Touch', area_of_affect:'One target armor', duration:'5 rounds', raises:'Duration (+1 round)', get roll() { return spellRoll(this); }, description:'A more potent form of Spells like Shining Light, this prayer summons forth an aura of magical flames from a suit of armor, surrounding and protecting the armor\'s wearer. These ﬂames do not harm the armor\'s wearer and do not harm living thing\'s. However, all wooden weapons (including arrows and many polearms) burn instantly before they reach the target, doing no damage. The Flames also impede sight to the target, increasing his Armor TN by 20. Pg 184 Core Book' },
      { id:108, name:'The Mending Forge', ring:'fire', type:'Craft', level:'4', range:'Touch', area_of_affect:'One target item', duration:'Instantaneous', raises:'', get roll() { return spellRoll(this); }, description:'This simple and powerful spell has only one function: to call on the creative power of Fire to bring back what has been destroyed. Any damaged or destroyed material item can be restored with this spell, provided all of its pieces are gathered in front of the caster. (If some pieces are missing. the spell will automatically fail.) The spell takes 1 minute to cast, and you must concentrate during that minute. If successful, the spell restores the item to a whole and undamaged state. It should be noted that the Fire kami must work harder to repair items of unusual quality — if you use this spell to repair a nemuranai or an item of Fine quality or better, you must offer the Fire kami a gift (another item for them to burn and destroy) appropriate to the worth of the item. Pg 185 Core Book' },
      { id:109, name:'Symbol of Fire', ring:'fire', type:'Ward', level:'4', range:'100\'', area_of_affect:'10\' radius', duration:'Permanent', raises:'', get roll() { return spellRoll(this); }, description:'Priests of the kami are capable of inscribing powerful wards that invoke the power of the elements against all who attempt to pass them. A symbol of Fire can be inscribed on a solid object, most often a door, window, gate, or any other passage way. Anyone attempting to pass through this passageway or otherwise pass by the ward is affected by its power, and must succeed at a Contested Roll using their Water against the caster\'s Fire. Those who fail are Dazed, and Blinded for one Round, and take 3K6 Wounds. This spell may be dispelled by another casting of Symbol of Fire from any shugenja, or by destroying the surface where the Symbol was etched. You may only have one Symbol of Fire in existence at any time, and Symbol spells of different elements may never affect the same area. Pg 185 Core Book' },
      { id:110, name:'Wall of Fire', ring:'fire', type:'', level:'4', range:'100\'', area_of_affect:'Special', duration:'1 hour', raises:'Area of Effect (+1 increment, see below)', get roll() { return spellRoll(this); }, description:'You invoke the Fire kami to spring up and form a wall of flames, barring passage to all. The wall is a 10\' tall, 1\' wide. and 25\' long, and causes eke Wounds to anyone who touches it. This wall may be made shorter or thinner as desired, within the total speciﬁcations, but all of the mass of flames must be used somehow. The wall may be created in an area where people or creatures are standing. forcing them to make a Reﬂexes Trait Roll against a TN of 20 to avoid taking Wounds from the fire. You may Raise to increase one of the specifications (height, width. or length) by its base incretnent (10\', 1\', or 25\' respectively). Pg 185 Core Book' },
      { id:111, name:'Ward of Thunder', ring:'fire', type:'Defense, Ward, Thunder', level:'4', range:'Touch', area_of_affect:'15\' radius from the armor', duration:'1 hour', raises:'', get roll() { return spellRoll(this); }, description:'Osanoe-Wo\'s protection can be temporarily invoked for a suit of armor by casting this spell and inscribing the kanji for thunder on the armor. Those within 15\' of the armor are under Osano—Wo\'s care, and are completely protected from non-magical fire and thunder for the duration of the spell. Additionally, any Fire spell cast by a shugenja other than yourself which targets something within the area of effect has its Spell Casting TN increased by 20. Pg 185 Core Book' },
      { id:112, name:'Destructive Wave', ring:'fire', type:'', level:'5', range:'Personal', area_of_affect:'25\' radius', duration:'Instantaneous', raises:'Damage (+1K1 per 2 Raises)', get roll() { return spellRoll(this); }, description:'A highly potent offensive spell, originally devised by the Isawa Elemental Masters, this prayer summons up a great mass of Fire kami, which roll outward from the caster in a wave of searing ﬂames. Every target within the area of effect, whether friendly or hostile takes 7k7 Wounds, for the raging flames make no distinction between ally and enemy. You alone do not take damage from the spell. Pg 185 Core Book' },
      { id:113, name:'Everburing Rage', ring:'fire', type:'', level:'5', range:'25\'', area_of_affect:'One target', duration:'1 round', raises:'Duration (+1 round), Targets (+1)', get roll() { return spellRoll(this); }, description:'A powerful curse that infuses the target\'s body with angry Fire spirits, wracking him with pain as the kami sear his nerves and ligaments. For the duration of the spell, the victim is considered to be at the Down Wound Level and suffers all associated penalties and conditions, although he takes no actual Wounds from the spell. When the spell expires, the pain instantly ceases and the target may stand up as if nothing had happened. This spell is somewhat controversial with some shugenja schools, particularly the more peaceful ones, since it amounts to little more than the deliberate infliction of pain. A few shugenja have even noted certain disturbing similarities between this spell\'s effects and those of certain maho curses. Pg 185 Core Book' },
      { id:114, name:'Follow the Flame', ring:'fire', type:'', level:'5', range:'Personal', area_of_affect:'See Below', duration:'5 rounds', raises:'Damage (+1K0 per Raise)', get roll() { return spellRoll(this); }, description:'This spell grants you exceptional control of the nearby Fire kami, allowing you to coax them into a very unusual and terrifying attack. On the Round this spell is cast and every Round thereafter, you may declare a line of sight target within 300\' and send a stream of fire toward it that snakes along the ground. (On later Rounds, designating a target in this manner is a Simple Action) The stream of fire moves at a rate of 75‘ each Rountd and moves around impassable (or inﬂammable) barriers in order to reach its target. Once the ﬁre reaches its destination, the target bursts into ﬂames, suffering 6K5 Wounds. The subject catches fire and takes half that many Wounds (rounded down) every subsequent Round until the fire is doused normally or the spell\'s duration expires. Pg 186 Core Book' },
      { id:115, name:'Light of the Sun', ring:'fire', type:'Jade', level:'5', range:'100\'', area_of_affect:'30\' radius', duration:'10 rounds', raises:'', get roll() { return spellRoll(this); }, description:'This prayer invokes the power of the Sun. worshipped and venerated throughout Rokugan. and is an especial favorite among the Moshi family. although shugenja all across the Empire have learned it. The spell calls down a concentrated beam of pure sunlight to punish the unworthy. Everyone caught in the area effect takes 2k2 Wounds per Round from the intense heat. Human targets (only) take and additional 2K1 Wounds for every honor rank they are below 4, and an additional 2K2 wounds if they posses as least one Ranks the Shadowlands Taint or are controlled by the Lying Darkness. Human targets with a Honor Rank of 0 are blinded for the number of rounds equal to your Fire Ring. Pg 186 Core Book' },
      { id:116, name:'Wings of the Phoenix', ring:'fire', type:'Travel', level:'5', range:'Personal', area_of_affect:'Self', duration:'10 rounds', raises:'', get roll() { return spellRoll(this); }, description:'The Phoenix is one of the most powerful symbols of Fire known to the Rokugani, and this spell calls on the essence of that being to grant its caster the power of flight. When this Spell is cast, you summon clouds of Fire kami who take the form of giant wings sprouting from your back. You gain the ability to ﬂy for the duration of the spell, moving at a speed of Water x 10 for a Free Action or Water x 20 for a Simple Action. If you are airborne when the spell expires, the Fire hand will bring you down to earth before departing. Pg 186 Core Book' },
      { id:117, name:'Beam of the Inferno', ring:'fire', type:'', level:'6', range:'200\'', area_of_affect:'One target', duration:'Instantaneous', raises:'', get roll() { return spellRoll(this); }, description:'This is perhaps the deadliest single spell available to a shugenja, and one of the most fearsome spells ever developed in the Empire. The prayer invokes a tremendous blast of fire against the chosen target. who takes 10K10 Wounds. The spell puts all the Fire kami in the area into a state of agitation, and normal fires within range will burn hotter and more violently for many minutes after this spell is cast. Pg 186 Core Book' },
      { id:118, name:'Globe of the Everlasting Sun', ring:'fire', type:'Defense', level:'6', range:'500\'', area_of_affect:'1 mile', duration:'1 day', raises:'', get roll() { return spellRoll(this); }, description:'This mighty prayer calls on all the Fire kami in the area to remain quiet and calm, soothing the agitation which so often afflicts them. It is often invoked during major festivals, such as the crowning of a new Emperor. For the duration of the spell, all buildings within the area of effect are immune to the effects of magical fire, and all Fire spells cast within that area have the TN of thier Spell Casting Rolls increased by 15. Normal fires still ignite and burn but do so sluggishly and so not spread easily. Pg 186 Core Book' },
      { id:119, name:'The Soul\'s Blade', ring:'fire', type:'Craft', level:'6', range:'Touch', area_of_affect:'One target weapon', duration:'5 rounds', raises:'Duration(+1 round per 3 Raises)', get roll() { return spellRoll(this); }, description:'This spell imbues powerful Fire kami into a weapon, grantin the fill fury of a raging firestorm. A bushi armed with this weapon is a terrible opponent, for the fire spirits shock and daze his enemies with every blow. For the duration of the spell, the weapon will overcome Invulnerability, and every target his is automatically stunned.  Pg 186 Core Book' },

      { id:120, name:'', ring:'water', type:'', level:'1', range:'', area_of_affect:'', duration:'', raises:'', get roll() { return spellRoll(this); }, description:' Pg 182 Core Book' },
      { id:121, name:'', ring:'water', type:'', level:'1', range:'', area_of_affect:'', duration:'', raises:'', get roll() { return spellRoll(this); }, description:' Pg 182 Core Book' },

      { id:160, name:'', ring:'void', type:'', level:'1', range:'', area_of_affect:'', duration:'', raises:'', get roll() { return spellRoll(this); }, description:' Pg 185 Core Book' },
      { id:189, name:'', ring:'void', type:'', level:'1', range:'', area_of_affect:'', duration:'', raises:'', get roll() { return spellRoll(this); }, description:' Pg 185 Core Book' },
    ];

    $scope.showSpellsList = false;

    $scope.toggleShowSpellsList = function() {
      $scope.showSpellsList = !$scope.showSpellsList;
      $scope.spellSearchFilter = null;      
    };

    $scope.getSpell = function (spell_id,attr) {
        return $scope.getSpellFromMasterList(spell_id, attr);
    };

    $scope.getSpellFromMasterList = function(spell_id, attr) {
      for(var i=0; i < $scope.spellsMasterList.length; i++) {
        if ( $scope.spellsMasterList[i].id === spell_id ) {
          if (attr === null || attr === undefined ) {
            return $scope.spellsMasterList[i];
          } else {
            return $scope.spellsMasterList[i][attr];
          }
        }
      }
      return "(error)";
    };

    $scope.addSpell = function(spell_id) {
      var master_spell = $scope.getSpellFromMasterList(spell_id);
      if( master_spell ) {
        var new_id = master_spell.id;
        //var new_roll = master_spell.roll;
        //var new_spell = {id:new_id, roll:new_roll};
        var new_spell = {id:new_id}; // roll:new_roll};
        //$scope.character.spells.push( $scope.spellsMasterList[index]) ;
        if ( getCharacterSpellById(spell_id) === null) {
          $scope.character.spells.push( new_spell ) ;
          $scope.toggleShowSpellsList();
        }
      } else {
        console.log("Spell " + spell_id + " Not Found");
      }
    };

    $scope.removeSpell = function(spell_id) {
      for( var i=0; i < $scope.character.spells.length; i++) {
        if ( $scope.character.spells[i].id == spell_id ) {
          $scope.character.spells.splice(i,1);
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

  });//end SpellsController

})();//end myApp
