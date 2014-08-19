'use strict';

angular.module('myMod', [
    // TODO: need more mods dude
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
        .when('/', {
            templateUrl: 'html/main.html',
            controller: 'MeowCtrl',
            resolve: {
                // TODO: add some useless resolves
                apiResp: function($http) {
                    return $http.get('http://nba.com').then(function(resp) {
                        return resp.data;
                    });
                }
            }
        });

    // Fallback
    .otherwise({
        redirectTo: '/' // TODO: fallback to something dumb
    });
});
