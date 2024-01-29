'use strict';

var eaDir = angular.module("eaDir", ["ngRoute", "ngCookies"]);

var navSrv = eaDir.service('eaNavSrv', [function () {
    var vm = this;
    vm.getCurrentLink = getCurrentLink;
    vm.computeSiteMaps = computeSiteMaps;
}]);
navSrv.$inject = ['$scope', '$rootScope'];

eaDir.directive('eaLoadJson', ['$rootScope', '$http', eaLoadJson]); 
eaDir.directive('eaNavi', ['$rootScope', '$http', '$location', '$compile', eaNavDynDirektive]); 
eaDir.directive('eaAddHtml', ['$rootScope', '$compile', '$http', eaAddHtmlDirective]); 
eaDir.directive('eaPathLink', ['$rootScope', '$location', 'eaNavSrv', eaPathLinkDirective]);
eaDir.directive('eaFooter', ['$rootScope', eaFooterDirective]); 
eaDir.directive('eaImgBox', ['$compile', '$rootScope', eaImgBox]);
eaDir.directive('eaImg', ['$rootScope', eaImg]); 
eaDir.directive('eaAccCoat', ['$rootScope', eaAccCoat]); 
eaDir.directive('eaAccKey', ['$compile', '$rootScope', eaAccKey]);
eaDir.directive('eaMaskCode', ['$compile', eaMaskCode]); 
eaDir.directive('eaMaskHtml', [eaMaskHtml]); 
eaDir.directive('eaMaskCss', [eaMaskCss]); 
eaDir.directive('eaMaskJs', [eaMaskJs]); 
eaDir.directive('eaMaskJson', [eaMaskJson]); 
eaDir.directive('eaMaskNo', [eaMaskNo]); 
eaDir.directive('eaVideo', ['$rootScope', eaVideo]); 
eaDir.directive('eaRegTest', [eaRegTest]); 

eaDir.directive('eaProvideObj', ['$rootScope', eaProvideObj]);
eaDir.directive('eaDeTicket',  [eaDeTicket]);
eaDir.directive('eaNews', ['$rootScope', eaNews]);
eaDir.directive('eaCookies', ['$rootScope', '$cookies', '$compile', eaCookiesDirektive]);

// eaConfigSrv.js is in eaNavConfig.js
eaDir.config(['$routeProvider', eaNavConfig]);

eaDir.controller('eaDirController', ['$rootScope', '$scope', 'eaNavSrv', eaDirController])
        .$inject = ['$scope'];
eaDir.controller('eaNaviController', ['$rootScope', '$scope', '$location', 'eaNavSrv', eaNaviController])
        .$inject = ['$scope'];
