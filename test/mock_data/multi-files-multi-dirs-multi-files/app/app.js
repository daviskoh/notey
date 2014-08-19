'use strict';

// TODO: rename main module
angular.module('myMod', [
    'myMod.controllers'
])



.config(function($httpProvider) {
    /**
     * Modify HTTP Headers
     * TODO: add more headers and stuff
     */
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.config(function($routeProvider) {
    /**
     * Route Configs
     */

    $routeProvider
        // TODO: change route to '/'
        .when('/main', {
            templateUrl: 'html/main.html',
            controller: 'MeowCtrl',
            resolve: {
                apiResp: function($http) {
                    // TODO: make call to useful url
                    return $http.get('http://nba.com').then(function(resp) {
                        return resp.data;
                    });
                }
            }
        });

    // Fallback
    .otherwise({
        redirectTo: '/main'
    });
});
