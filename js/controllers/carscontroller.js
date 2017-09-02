var app = angular.module('garage')

app.controller('CarsController', function($scope, $http){
  $scope.cars = []
  $scope.message = "Carregando carros..."

  function Load(){
    $http({
      method: 'GET',
      url: 'https://aulasjavascript.herokuapp.com/cars'
    })
    .then(function(cars){
      $scope.cars = cars.data
      $scope.message = ""
    },
    function(err){
      alert('Ocorreu um erro!')
      console.log(err)
    })
  }

  Load()

  $scope.Delete = function(id){
    $http.delete('https://aulasjavascript.herokuapp.com/cars/' + id)
    .then(function(data){
      Load()
    },
    function(err){
      console.log(err)
    })
  }
})

app.controller('CarsNewController', function($scope, $http){
  $scope.SaveCar = function(){
    $http({
      method: 'POST',
      url: 'https://aulasjavascript.herokuapp.com/cars',
      data: $scope.obj
    })
    .then(function(data){
      console.log(data)
      window.location.href = '/#!/carros';
    },
    function(err){
      alert('Ocorreu um erro!')
      console.log(err)
    })
  }
})

app.controller('CarsDetailsController', function($scope, $http, $routeParams){
  $scope.car = {}

  $http({
    method: 'GET',
    url: 'https://aulasjavascript.herokuapp.com/cars/' + $routeParams.xpto
  })
  .then(function(data){
    console.log(data.data)
    $scope.car = data.data
  },
  function(err){
    alert('Ocorreu um erro!')
    console.log(err)
  })
})

app.controller('CarsEditController', function($http, $scope, $routeParams){
  $scope.car = {}

  $http({
    method: 'GET',
    url: 'https://aulasjavascript.herokuapp.com/cars/' + $routeParams.idcar
  })
  .then(function(data){
    $scope.car = data.data
  },
  function(erro){
    alert('Erro!')
    console.log(erro)
  })

  $scope.save = function(){
    console.log("entrou")
    $http({
      method: 'PUT',
      url: 'https://aulasjavascript.herokuapp.com/cars/' + $routeParams.idcar,
      data: $scope.car
    })
    .then(function(data){
      window.location.href = "/#!/carros"
    },
  function(erro){
    alert('Erro!')
    console.log(erro)
  })
  }

})
