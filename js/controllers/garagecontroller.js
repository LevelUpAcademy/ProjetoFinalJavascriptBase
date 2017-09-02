var app = angular.module('garage')

app.controller('GarageController', function($scope){
  $scope.cars = []
  $http.get('https://aulasjavascript.herokuapp.com/cars')
  .then(function(cars){
    $scope.cars = cars.data
    },
  function(err){
    console.log(err)
  })
});
