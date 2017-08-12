var app = angular.module('garage')

app.controller('CarsController', function($scope, $http){
  $scope.cars = []
  $scope.message = "Carregando carros..."
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
