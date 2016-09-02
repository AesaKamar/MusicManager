((app) => {
    /**
     * MainController
     */
    app.controller('MainController', MainController);
    MainController.$inject = ['ipc'];

    function MainController(ipc) {
        console.log(ipc);
    }

})(angular.module('app'));