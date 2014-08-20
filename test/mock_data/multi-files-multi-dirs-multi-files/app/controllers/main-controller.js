'use strict';

angular.module('myMod.controllers', [])

/**
 * @ngdoc controller
 * @name capadmin.controllers.MeowCtrl
 * @description Does some interesting things
 *
 * @requires $scope
 */

/* TODO: add more dependencies & stuff */
.component('MeowCtrl', function ($scope, apiResp) {
    // TODO: add some unnecessary vars
    $scope.things = apiResp;
});
