'use strict';
// Home View
module.exports = angular.module('<%= scriptAppName %>', [])
    .directive('<%= moduleName %>View', require('./<%= moduleName %>Directive'))
    .controller('<%= moduleName %>Ctrl', require('./<%= moduleName %>Controller'))
    .config(require('./<%= moduleName %>Routes'));