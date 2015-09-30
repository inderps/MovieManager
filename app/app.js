window.$ = window.jQuery = require('jquery');
window._ = require('underscore');
require('angular');
require('angular-route');
require('angular-resource');
require('angular-local-storage');
require("bootstrap-webpack");
require("angular-base64-upload");
require("./templates/main.scss");

angular.module('MovieManager', ['ngRoute', 'ngResource', 'LocalStorageModule', 'naif.base64'])
  .config(function($routeProvider, localStorageServiceProvider){
    localStorageServiceProvider
      .setPrefix('MovieManager')
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