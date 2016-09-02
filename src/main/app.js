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
    const electron = require('electron');

    /**
     * Initialize angular app
     */
    let app = angular.module(
        'app', ['ngMaterial', 'ui.router']
    );

    /**
     * Injectable service to facillitate interprocess communication with main process
     */
    app.service('ipc', function ipc() {
        return electron.ipcRenderer;
    });


})();