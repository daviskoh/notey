'use strict';

angular.module('myMod')

.directive('myStuff', function ($log) {
    return {
        link: function(scope, element, attrs) {
            element.on('keyup', function(event) {
                $log.log(event);
            });
        }
    };
});
