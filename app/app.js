var app = angular.module('app', [
   'mapsApp',
   'signup',
   'ngRoute'
]);

app.controller('cafeListCtrl', ['$scope', '$http', function($scope, $http){
  $scope.newAppointment = {};

  $scope.selected = false;
  $scope.toggleCoffeeShopAppointments = function(){
    $scope.selected = !$scope.selected;
  };

  $scope.creatingAppointment = false;
  $scope.createNewAppointment = function(){
    if($scope.selected === true){
      $scope.selected = false;
    }
    $scope.creatingAppointment = !$scope.creatingAppointment;
  }

  $scope.addNewAppointment = function(shopId, time, day){
    $scope.newAppointment.id = shopId;
    // $scope.newAppointment.time = time;
    // $scope.newAppointment.day = day;
    console.log('++newAppointmentId: ', $scope.newAppointment.id);
    console.log('++newAppointment object: ', $scope.newAppointment);
    // shopId
    // day
    // time
    // host user
    // $http.post('/appointment', $scope.newAppointment).success(function(req, res){
    //   shopId
    // }))
  }

}]);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
  $routeProvider

  .when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'submitCtrl'
  })

  .when('/appointments', {
    templateUrl: 'templates/appointments.html',
    controller: 'submitCtrl',
    authenticate: true
  })

  .when('/signin', {
    templateUrl: 'templates/signin.html',
    controller: 'submitCtrl'
  })

  .when('/signup', {
    templateUrl: 'templates/signup.html',
    controller: 'submitCtrl'
  })

  .otherwise({
    redirectTo: '/home'
  });
}])

.factory('Auth', function ($http, $location, $window) {
  var isAuth = function () {
    return !!$window.localStorage.getItem('com.brewed');
  };

  return {
    isAuth: isAuth,
  };
})

.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
