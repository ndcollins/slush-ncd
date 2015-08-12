'use strict';

module.exports = function <%= nameLower %>Directive() {
    return {
        controller: '<%= moduleName %>Ctrl', // Called from HomeController.js
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./<%= nameLower %>-View.html')
    };
};