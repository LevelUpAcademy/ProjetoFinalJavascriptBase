var app = angular.module('garage')

app.config(function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/garagem', {
      templateUrl: 'templates/garage.html',
      controller: 'GarageController'
    })
    .when('/carros', {
      templateUrl: 'templates/cars.html',
      controller: 'CarsController'
    })
    .when('/carros/novo', {
      templateUrl: 'templates/newcar.html',
      controller: 'CarsNewController'
    })
    .otherwise({
      redirectTo: '/carros'
    });
});
