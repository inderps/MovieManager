window.$ = window.jQuery = require('jquery');
window._ = require('underscore');
require('angular');
require('angular-route');
require('angular-resource');
require('angular-local-storage');
require("bootstrap-webpack");
require("./templates/main.scss");

angular.module('MovieManager', ['ngRoute', 'ngResource', 'LocalStorageModule'])
  .config(function($routeProvider, localStorageServiceProvider){
    localStorageServiceProvider
      .setPrefix('MovieManager')
      .setStorageType('sessionStorage')
      .setNotify(true, true);

    $routeProvider
      .when('/', {
        template: require('./templates/main.html')
      });
});

// Services
var services = require.context('./services', true, /.js$/);
services.keys().forEach(services);

// Controllers
var controllers = require.context('./controllers', true, /.js$/);
controllers.keys().forEach(controllers);