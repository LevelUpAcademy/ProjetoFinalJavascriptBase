var app = angular.module('garage')

app.controller('GarageController', function($scope, $http, $firebaseArray, $firebaseObject){
  $scope.car = {}
  $scope.cars = []
  $scope.parkedCars = []
  $scope.visible = false

  var ref = firebase.database().ref("cars")
  $scope.cars = $firebaseArray(ref)

  $scope.Search = function(){
    $scope.car = {}
    var ref = firebase.database().ref('cars/' + $scope.selectedCar).once('value').then(function(data){
      $scope.car = data.val()
      console.log($scope.car)
      $scope.visible = true
      $scope.$apply();
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
