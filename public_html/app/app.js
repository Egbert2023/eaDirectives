'use strict';

//var eaDemo = angular.module("eaDemo", ["ngRoute", "ngAnimate"]);
//var eaDir = angular.module("eaDir", ["ngRoute", "ngCookies"]);
var eaDir = angular.module("eaDir", ["ngRoute"]);

var configSrv = eaDir.service('eaConfigSrv', [function($routeProvider){
    this.eaNavConfig = eaNavConfig;      
}]);
configSrv.$inject = ['$scope'];

var navSrv = eaDir.service('eaNavSrv', ['$q', function () {
    var vm = this;
    vm.getHtml4Id = getHtml4Id;
    vm.getHtml = getHtml;
    vm.getCurrentLink = getCurrentLink;
    vm.computeSiteMaps = computeSiteMaps;
}]);
navSrv.$inject = ['$scope', '$rootScope'];

eaDir.directive('eaLoadJson', ['$rootScope', '$http', eaLoadJson]).$inject = ['$scope'];
eaDir.directive('eaNavi', ['$rootScope', '$http', '$location', '$compile', eaNavDynDirektive]).$inject = ['$scope'];

eaDir.directive('eaAddHtml', ['$rootScope', '$compile', '$http', eaAddHtmlDirective]).$inject = ['$scope'];
eaDir.directive('eaPathLink', ['$rootScope', '$location', 'eaNavSrv', eaPathLinkDirective]).$inject = ['$scope'];
//eaDir.directive('eaFooter', ['$rootScope', eaFooterDirective]).$inject = ['$scope'];
//eaDir.directive('eaImgBox', ['$compile', '$rootScope', eaImgBox]).$inject = ['$scope'];
//eaDir.directive('eaImg', ['$rootScope', eaImg]).$inject = ['$scope'];
eaDir.directive('eaAccCoat', ['$rootScope', eaAccCoat]).$inject = ['$scope'];
eaDir.directive('eaAccKey', ['$compile', '$rootScope', eaAccKey]).$inject = ['$scope'];
//eaDir.directive('eaNews', ['$rootScope', eaNews]).$inject = ['$scope'];
//eaDir.directive('eaVideo', ['$rootScope', eaVideo]).$inject = ['$scope'];
//eaDir.directive('eaCookies', ['$rootScope', '$cookies', '$compile', eaCookiesDirektive]).$inject = ['$scope'];

// $compile, $rootScope
eaDir.config(['$routeProvider', eaNavConfig]);

eaDir.controller('eaDirController', ['$rootScope', '$scope', 'eaNavSrv', eaDirController])
        .$inject = ['$scope'];
eaDir.controller('eaNaviController', ['$rootScope', '$scope', '$location', 'eaNavSrv', eaNaviController])
        .$inject = ['$scope'];
