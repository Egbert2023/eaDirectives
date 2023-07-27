'use strict';

// <ea-footer data-footer-url="content/html/footer.html"></ea-footer>

var eaFooterDirective = function ($rootScope) {
  return {
    restrict: 'E',
    scope: {
         footerUrl: '@'
      },
    template: '<div ng-include = "footerUrl"></div>',
    link: function (scope, ele, attrs) {
        scope.footerUrl = attrs.footerUrl;
    }       
  };
};

