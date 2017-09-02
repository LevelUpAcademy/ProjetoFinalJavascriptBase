var app = angular.module('garage')

app.controller('GarageController', function($scope, $http){
  $scope.car = {}
  $scope.cars = []
  $scope.parkedCars = []
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

  $scope.Park = function(){
    var carToPark = {
      car: $scope.car,
      in: new Date(),
      value: 0.0,
      hourValue: $scope.valueHour
    }


    $scope.parkedCars.push(carToPark)
    $scope.visible = false
  }

  $scope.CalcValue = function(){
    for (var i = 0; i < $scope.parkedCars.length; i++) {
      var hourValue = $scope.parkedCars[i].hourValue
      var inHour = $scope.parkedCars[i].in

      var totalValue = ((hourValue / 60) * millisToMinutesAndSeconds(inHour - new Date())) * -1
      console.log("valor" + totalValue)
      $scope.parkedCars[i].value = totalValue
    }
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    return minutes
  }
})
