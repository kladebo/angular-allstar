'use strict';

angular.module('myApp')

.config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/view1', {
            template: '<view1></view1>'
        }).
        when('/view2', {
            template: '<view2></view2>'
        }).
        otherwise('/view1');
    }
    ]);

// You should call angular.bootstrap() after you've loaded or defined your modules.
//      You cannot add controllers, services, directives, etc after an application bootstraps.
//      https://docs.angularjs.org/guide/bootstrap
angular.element(document).ready(function() { // same as $(document).ready(function(){

    // init Angular App
    angular.bootstrap(document, ['myApp']);

    // init Foundation
    $(document).foundation();


});