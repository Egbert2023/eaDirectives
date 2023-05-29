'use strict';

var eaMaskJson = function () {
  return {
    restrict: 'A',
    // global scope, so will use the same $scope as the parent directive
    scope: false,
    
    controller: function($scope) {
        
        $scope.rowChange = function(code) {
            const spe = "</span>";
            let ret = code;
            
            // values in "" are green
            const tag1 = /"[\w \-,.:;#\+üöäß\/]+"*/g;
            ret = ret.replace(tag1, o => "<span style='color:green;'>" + o + spe);
            
            // Limiter and delimiter are strong
            const tag2 = /[{\[\]}]+/g;
            ret = ret.replace(tag2, o => "<span style='font-weight: bold;'>" + o + spe);
            return ret; 
        };
    }
  };
};