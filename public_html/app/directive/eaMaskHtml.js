'use strict';

var eaMaskHtml = function () {
  return {
    restrict: 'E',
    replace: true,
    
    controller: function() {
        // replace < > for all tags
        
        
    },

    link: function (scope, ele, attrs) {
        
        scope.scope_eaFooterDirective = scope.url;    
       
    }       
  };
};