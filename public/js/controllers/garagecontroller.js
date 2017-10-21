var app = angular.module('garage')

app.controller('GarageController', function($scope, $firebaseArray, $firebaseObject){
  $scope.car = {}
  $scope.cars = []
  $scope.parkedCars = []
  $scope.visible = false

  var ref = firebase.database().ref("cars")
  $scope.cars = $firebaseArray(ref)

  var refParkedCars = firebase.database().ref("parkedCars")
  $scope.parkedCars = $firebaseArray(refParkedCars)

  $scope.Search = function(){
    $scope.car = {}
    var ref = firebase.database().ref('cars/' + $scope.selectedCar).once('value').then(function(data){
      $scope.car = data.val()
      $scope.visible = true
      $scope.$apply();
    })
  }

  $scope.Park = function(){
    var d = new Date()
    var carToPark = {
      car: $scope.car,
      value: 0.0,
      hourValue: $scope.valueHour,
      inTime: d.toLocaleString(),
      user_id: firebase.auth().currentUser.uid
    }

    var refParked = firebase.database().ref("parkedCars")
    var parkedCars = $firebaseArray(refParked);
    parkedCars.$add(carToPark)
    $scope.visible = false
  }

  $scope.Leave = function(){
    console.log(this.pc.$id)
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

app.controller('CheckoutController', function($scope, $routeParams, $firebaseArray, $firebaseObject){

  $scope.parkedCar = {}
  var ref = firebase.database().ref('parkedCars/' + $routeParams.id)
    .once('value')
    .then(function(data){
      $scope.parkedCar = data.val()
      $scope.leaveTime = new Date().toLocaleString()

      $scope.totalValue = 0

      var valorHora = $scope.parkedCar.hourValue
      var diffMs = (new Date() - new Date($scope.parkedCar.inTime));
      //var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
      var diffMins = Math.floor((diffMs/1000)/60);
      var minValue = valorHora / 60


      $scope.totalValue = (diffMins * minValue).toFixed(2)

      $scope.$apply();
    })

    $scope.Leave = function(){
      firebase.database().ref('parkedCars/' + $routeParams.id).set(null);
      window.location.href = '/#!/garagem'
    }
})
