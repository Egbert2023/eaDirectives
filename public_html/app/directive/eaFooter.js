'use strict';

//templateUrl: "app/template/footer.html",

var eaFooterDirective = function ($rootScope) {
  return {
    restrict: 'E',
    replace: false,
    transclude: true,
    template: '<div ea-add-html = "{{footerUrl}}"></div>',
    link: function (scope, ele, attrs) {
        
        scope.scope_eaFooterDirective = scope.url;    
       
    }       
  };
};

