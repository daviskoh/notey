'use strict';

describe('MeowCtrl', function() {
    var $scope,
        // TODO: add more things
        things = ['hello', 'meow'];

    beforeEach(module('myMod.controllers'));

    beforeEach(inject(function(_$scope_, $controller) {
        $scope = _$scope_;

        ctrl = $controller('MeowCtrl', {
            $scope: $scope,
            apiResp: (function () {
                return {
                    data: {
                        stuff: things
                    }
                };
            })()
        });
    }));

    it('should exist', function () {
        expect(ctrl).toBeTruthy();
    });

    it('resolves api response', function() {
        expect($scope.stuff).toBe(things);
    });

    // look here @daviskoh TODO: add more specs
});
