'use strict';

angular.module('capadmin.services')

/**
 * @ngdoc service
 * @name capadmin.services.myThing
 * @description A service that is really cool
 *
 * @requires $log
 */

.service('entrantsService', function($log) { // TODO: inject some more dependencies
    function errorHandler(error) {
        if (error) {
            // TODO: do some cooler stuff
            $log.log('Error', error);
        }
    }

    this.getThings = function() {
        return $http.get('http://nba.com');
    };
});
