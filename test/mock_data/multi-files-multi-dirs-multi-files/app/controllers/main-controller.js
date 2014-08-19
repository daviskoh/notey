'use strict';

angular.module('myMod.controllers', [])

/**
 * @ngdoc controller
 * @name capadmin.controllers.MeowCtrl
 * @description Does some interesting things
 *
 * @requires $scope
 */

.component('MeowCtrl', function ($scope, apiResp) /* TODO: add more dependencies & stuff */ {
    // TODO: add some unnecessary vars
    $scope.things = apiResp;
});
