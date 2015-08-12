'use strict';

function <%= moduleName %>Routes($stateProvider) {

    var home = {
        name: '<%= nameLower %>', // state name
        url: '/<%= moduleNameDashed%>', // url path that activates this state
        template: '<div <%= moduleNameDashed%> ></div>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: '<%= moduleNameDashed%>', // assign a page-specific class to the <body> tag
            pageTitle: '<%= module %>', // set the title in the <head> section of the index.html file
            pageDescription: 'Meta Description goes here' // meta description in <head>
        }
    };

    $stateProvider.state(home);

}

<%= moduleName %>Routes.$inject = ['$stateProvider'];
module.exports = <%= moduleName %>Routes;