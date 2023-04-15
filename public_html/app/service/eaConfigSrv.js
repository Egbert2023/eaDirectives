'use strict';

var eaNavConfig = function ($routeProvider) {
    $routeProvider
        .when('/:folder', {
            templateUrl: 'app/template/computed.html',
            controller: 'eaNaviController',
            resolve: 'folder'
        })    
        .when('/:folder/:id', {
            templateUrl: 'app/template/computed.html',
            controller: 'eaNaviController'
        })
        .when('/:folder/:id/:id2', {
            templateUrl: 'app/template/computed.html',
            controller: 'eaNaviController'
        })
        .otherwise({redirectTo: '/home',
            templateUrl: 'app/template/computed.html',
            controller: 'eaNaviController',
            resolve: 'home'
        })
    ;
    return $routeProvider;
};
