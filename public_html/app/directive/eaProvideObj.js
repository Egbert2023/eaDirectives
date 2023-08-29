'use strict';

// <ea-provide-obj data-provide-obj="newDeTicket"></ea-provide-obj>

var eaProvideObj = function ($rootScope) {
  return {
    restrict: 'E',
    replace: false,
    // local scope 
    scope: true,
    
    controller: function($scope) {
        $scope.objZero = {};
        $scope.objNewArr = [];
        
        $scope.initObj = function(obj, arrName) {       
            const keys = Object.keys(obj[arrName][0]);
            let objRowZero = {};
            
            for(let i=0; i<keys.length; i++) {
                let o0 = {};
                o0[keys[i]] = "";
                Object.assign(objRowZero, o0);
            }
            $scope.objZero = objRowZero;
            
            for(let o of obj[arrName]) {
                let values = Object.values(o);
                let objRow = {};
                for(let i=0; i<keys.length; i++) {
                    let o = {};
                    o[keys[i]] = values[i];
                    Object.assign(objRow, o);
                }                
                $scope.objNewArr.push(objRow);
            }
            return false;
        };
        
        $scope.addObjRow = function() {
            $scope.objNewArr.push($scope.objZero);
        };
        
        $scope.deleteObjRow = function(idx) {
            delete $scope.objNewArr[idx];
            ($scope.objNewArr.length = 0)? $scope.objNewArr.push($scope.objZero) : "";
            return false;
        };
        
        $scope.saveObj = function() {
            $scope.provideObj[$scope.provideObjArrName] = $scope.objNewArr;
            return false;
        };
        
    },
    
    link: function (scope, ele, attrs) {
        scope.provideObj = $rootScope[attrs.provideObj]; 
        scope.provideObjArrName = attrs.arrName; 
        scope.initObj(scope.provideObj, scope.provideObjArrName);
        
        // Test EA
        // objNewArr is a clone of $rootScope[newDeTicket] a reference by value!
        scope.objNewArr[0].type="W";
        console.log($rootScope[attrs.provideObj]);
        scope.addObjRow();
        //scope.deleteObjRow(1);
        scope.saveObj();
        console.log("new");
        console.log(scope.objNewArr);
        console.log("alt");
        console.log($rootScope[attrs.provideObj]);
    }       
    
    
  };
};

