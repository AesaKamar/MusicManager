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
                template: "<h1>Main</h1>"
            }).state('download', {
                url: "/download",
                templateUrl: "./download/download.view.html"
            }).state('library', {
                url: "/sync",
                templateUrl: "./library/library.view.html"
            }).state('sync', {
                url: "/sync",
                templateUrl: "./sync/sync.view.html"
            });
    });
})(angular.module('app'));