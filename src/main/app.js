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
    require('angular-local-storage');
    const electron = require('electron');

    /**
     * Initialize angular app
     */
    let app = angular.module(
        'app', ['ngMaterial', 'ui.router', 'LocalStorageModule']
    );

    /**
     * Injectable service to facillitate interprocess communication with main process
     */
    app.service('ipc', function ipc() {
        return electron.ipcRenderer;
    });


})();