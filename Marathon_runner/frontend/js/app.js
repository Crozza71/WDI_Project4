angular
  .module('runners', ['angular-jwt', 'ngResource', 'ui.router', 'ngMaterial', 'uiGmapgoogle-maps'])
  .constant('API', 'http://localhost:3000')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('teal')
      .primaryPalette('indigo')
      .accentPalette('yellow');
  })
  .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyBDIzPUL1nCjojuZMve2KoiAIq_xhjqW9k',
          v: '3.23', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  });

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html"
    })
    .state('runs', {
      url: "/runs",
      templateUrl: "./js/views/runs/index.html",
      controller: "runController as runs"
    })
    .state('run', {
      url: "/runs/:id",
      templateUrl: "./js/views/runs/show.html",
      controller: "MapsController as map"
    })
    .state('new-run', {
      url: "/run/new",
      templateUrl: "./js/views/runs/new.html",
      controller: "MapsController as map"
    });

  $urlRouterProvider.otherwise("/");
}
