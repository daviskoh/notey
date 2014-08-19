'use strict';

describe('MeowCtrl', function() {
    var $scope,
        things = ['hello', 'meow'];

    function doStuff() /* TODO: make this function take an argument */ {
        console.log('meow');
    }

    beforeEach(module('myMod.controllers'));

    beforeEach(inject(function(_$scope_, $controller) {
        $scope = _$scope_;

        ctrl = $controller('MeowCtrl', { // TODO: here is a todo
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
});
