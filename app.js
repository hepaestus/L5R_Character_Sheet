'use strict';
(function(){
    
angular.module('myApp', [ 'ngRoute', 'ngCookies', 'ngSanitize', 'ui.bootstrap','angularModalService' ]);

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

})();//end myApp
