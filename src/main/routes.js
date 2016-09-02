((app) => {

    app.config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('/', {
                url: "/",
                template: "<h1>In Ui Router</h1>"
            });
    });
})(angular.module('app'));