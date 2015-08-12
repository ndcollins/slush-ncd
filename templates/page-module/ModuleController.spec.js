/*jshint expr: true*/

'use strict';

describe('<%= moduleName %>Controller', function() {

    var ctrl, scope;

    beforeEach(angular.mock.module('<%= scriptAppName %>'));

    beforeEach(function() {

        angular.mock.inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('<%= moduleName %>Ctrl', {
                $scope: scope
            });
        });

    });

    it('should exist', function() {
        expect(ctrl).to.not.be.undefined;
    });

});