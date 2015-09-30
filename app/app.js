// Vendors
window.$ = window.jQuery = require('jquery');
require('angular');
require('angular-route');
require('angular-resource');
require("bootstrap-webpack");


//Angular Module Definitions and Config including routes
angular.module('MovieManager', ['ngRoute', 'ngResource']).config(function($routeProvider){

});