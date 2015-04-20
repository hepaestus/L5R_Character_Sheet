'use strict';
(function(){
    
angular.module('myApp', [ 'ngRoute', 'ngSanitize', 'ngStorage', 'ui.bootstrap', 'angularModalService' ]);

  angular.module('myApp').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: "templates/home.html",
      controller: 'CharacterController'
    })
    .when('/character', {
      templateUrl: "templates/character.html",
      controller: 'CharacterController'
    })
    .when('/spells', {
      templateUrl: "templates/spells.html",
      controller: 'SpellsController'
    })
    .when('/kihos', {
      templateUrl: "templates/kihos.html",
      controller: 'KihosController'
    })
    .otherwise({redirectTo: '/'});
  }]);//end routes

})();//end myApp
