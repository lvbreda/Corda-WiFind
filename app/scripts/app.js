'use strict';

angular.module('cordarrApp', ["leaflet-directive"])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
