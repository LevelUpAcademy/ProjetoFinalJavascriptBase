  var app = angular.module('garage')
  app.controller('CarsController', function($scope, $firebaseObject, $firebaseArray){

    $scope.cars = []
    $scope.message = "Carregando carros..."

    var ref = firebase.database().ref("cars")
    $scope.cars = $firebaseArray(ref)
    $scope.message = ""

    $scope.Delete = function(id){
      console.log(id)
      $scope.cars.$remove(id)

      $scope.cars = $firebaseObject(ref)
    }
  })

  app.controller('CarsNewController', function($scope, $http, $firebaseObject, $firebaseArray){

    $scope.SaveCar = function(){
      var ref = firebase.database().ref("cars")
      var cars = $firebaseArray(ref);
      cars.$add($scope.obj.car)
      window.location.href = '/#!/carros'
    }
  })

  app.controller('CarsDetailsController', function($scope, $http, $routeParams, $firebaseArray){
    $scope.car = {}
    var ref = firebase.database().ref('cars/' + $routeParams.xpto).once('value').then(function(data){
      $scope.car = data.val()
      console.log($scope.car)
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
