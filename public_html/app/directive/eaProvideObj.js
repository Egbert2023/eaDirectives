'use strict';

// <ea-provide-obj data-provide-obj="newDeTicket"></ea-provide-obj>

var eaProvideObj = function ($rootScope) {
  return {
    restrict: 'E',
    replace: false,
    // local scope 
    scope: true,
    
    link: function (scope, ele, attrs) {
        scope.provideObj = $rootScope[attrs.provideObj]; 
    }       
  };
};

