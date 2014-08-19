'use strict';

angular.module('myMod.controllers', [])

/**
 * @ngdoc controller
 * @name capadmin.controllers.MeowCtrl
 * @description Does some interesting things
 *
 * @requires $scope
 */

.component('MeowCtrl', function ($scope, apiResp) {
    // set stuff to api resp TODO: make var more descriptive
    $scope.stuff = apiResp;
});
