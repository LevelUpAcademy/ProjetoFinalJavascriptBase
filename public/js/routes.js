var app = angular.module('garage')

app.config(function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true).hashPrefix('*');
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
    .when('/carros/detalhe/:xpto', {
      templateUrl: 'templates/detailscar.html',
      controller: 'CarsDetailsController'
    })
    .when('/carros/editar/:idcar', {
      templateUrl: 'templates/editcar.html',
      controller: 'CarsEditController'
    })
    .when('/checkout/:id', {
      templateUrl: 'templates/checkout.html',
      controller: 'CheckoutController'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
    .otherwise({
      redirectTo: '/carros'
    });
});
