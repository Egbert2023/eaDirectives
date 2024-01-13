'use strict';

var eaMaskNo = function () {
  return {
    restrict: 'A',
    // global scope, so will use the same $scope as the parent directive
    scope: false,
    
    controller: function($scope) {
        $scope.rowChange = function(code) {
            let ret = code;            
            return ret; 
        };
    }
  };
};