window.$ = window.jQuery = require('jquery');
require('angular');
require('angular-route');
require('angular-resource');
require('angular-local-storage');
require("bootstrap-webpack");

angular.module('MovieManager', ['ngRoute', 'ngResource', 'LocalStorageModule'])
  .config(function($routeProvider, localStorageServiceProvider){
    localStorageServiceProvider
      .setPrefix('MovieManager')
      .setStorageType('sessionStorage')
      .setNotify(true, true);

});