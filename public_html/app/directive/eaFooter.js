'use strict';

var eaFooterDirective = function ($rootScope) {
  return {
    restrict: 'E',
    scope: false,
    template: '<div ng-include = "footerUrl"></div>',
    link: function (scope, ele, attrs) {
        let inputFooterUrl = attrs.footerUrl;
        let contentFolder = scope.$root.contentFolder;
        scope.footerUrl = contentFolder + inputFooterUrl;
    }       
  };
};

