var app = angular.module('garage')

app.controller('GarageController', function($scope, $http){
  $scope.car = {}
  $scope.cars = []
  $scope.visible = false

  $http.get('https://aulasjavascript.herokuapp.com/cars')
  .then(function(cars){
    $scope.cars = cars.data
    },
  function(err){
    console.log(err)
  })

  $scope.Search = function(){
    $http.get('https://aulasjavascript.herokuapp.com/cars/' + $scope.selectedCar)
    .then(function(car){
        $scope.car = car.data
        $scope.visible = true
      },
    function(err){
      console.log(err)
    })
  }
})
