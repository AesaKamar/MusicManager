(() => {
    /**
     * Pull in application dependencies
     */
    require('jquery');
    require('angular');
    require('angular-animate');
    require('angular-aria');
    require('angular-material');
    require('angular-ui-router');

    /**
     * Initialize angular app
     */
    let app = angular.module(
        'app', 
        ['ngMaterial', 'ui.router']
    );


})();