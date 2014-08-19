'use strict';

angular.module('coolModBro')

/**
 * @ngdoc service
 * @name coolModBro.datFactory
 * @description A factory that does nothing useful
 *
 * @requires $http
 */

// TODO: have factory do something
.factory('datFactory', function ($http) {
    return {
        doStuff: function() {
            // TODO: change call to use https
            return $http.get('http://nba.com');
        }
    };
})

/**
 * @ngdoc directive
 * @name coolModBro.datDirective
 * @description A directive that does nothing useful
 */

.directive('dataDirective', function () {
    return {
        // TODO: use isolate scope
        link: function(scope, element, attrs) {
            element.on('keydown', function(e) {
                // TODO: write some logic
            });
        }
    };
});
