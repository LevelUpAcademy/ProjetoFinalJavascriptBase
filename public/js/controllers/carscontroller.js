  var app = angular.module('garage')

  app.controller('CarsController', function($scope, $firebaseObject, $firebaseArray){

    $scope.cars = []
    $scope.message = "Carregando carros..."

    var ref = firebase.database().ref("cars")
    $scope.cars = $firebaseArray(ref)

    $scope.message = ""

    $scope.Delete = function(){
      firebase.database().ref('cars/' + this.car.$id).set(null);
      window.location.href = '/#!/carros'
    }
  })

  app.controller('CarsNewController', function($scope, $http, $firebaseObject, $firebaseArray){

    $scope.SaveCar = function(){

      var storageRef = firebase.storage().ref('garagem/' + $scope.obj.car.plate);
      debugger;
      var newCarRef = storageRef.child($scope.obj.car.foto.name);
      newCarRef.put($scope.obj.car.foto).then(function(data) {
        console.log(data)
        var ref = firebase.database().ref("cars")
        var cars = $firebaseArray(ref);
        cars.$add($scope.obj.car)
        window.location.href = '/#!/carros'
      });
    }
  })

  app.controller('CarsDetailsController', function($scope, $http, $routeParams, $firebaseArray){
    $scope.car = {}
    var ref = firebase.database().ref('cars/' + $routeParams.xpto)
      .once('value')
      .then(function(data){
        $scope.car = data.val()
        $scope.$apply();
      })
  })

  app.controller('CarsEditController', function($http, $scope, $routeParams, $firebaseArray){
    $scope.car = {}
    var ref = firebase.database().ref('cars/' + $routeParams.idcar).once('value').then(function(data){
      $scope.car = data.val()
      console.log($scope.car)
      $scope.$apply();
    })

    $scope.save = function(){
      firebase.database().ref('cars/' + $routeParams.idcar).set($scope.car);
      window.location.href = '/#!/carros'
    }

  })
