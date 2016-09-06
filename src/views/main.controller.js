((app) => {
    /**
     * MainController
     */
    app.controller('MainController', MainController);
    MainController.$inject = ['ipc', '$state'];

    function MainController(ipc, $state) {
        let vm = this;
        init();

        function init() {

        };

        vm.goTo = (state) => {
            $state.go(state);
        };
    }

})(angular.module('app'));