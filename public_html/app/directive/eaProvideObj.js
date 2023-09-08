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
        
        // The function completely clones the passed object and notes the name 
        // of an existing array of objects within the object
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
            if(idx>0) {
                $scope.objNewArr.splice(idx, 1);            
                ($scope.objNewArr.length === 0)? $scope.objNewArr.push($scope.objZero) : "";
            } else {
                $scope.objNewArr.shift(); 
                ($scope.objNewArr.length === 0)? $scope.objNewArr.push($scope.objZero) : "";
            }
            return false;
        };
        
        // the changed object is written back
        // $scope.objNewArr --> $scope.provideObj[$scope.provideObjArrName]
        $scope.saveObj = function() {
            // Tickets have been deleted
            if($scope.objNewArr.length < $scope.provideObj[$scope.provideObjArrName].length) {
                for(let i=0; i<$scope.objNewArr.length; i++) {
                    if($scope.provideObj[$scope.provideObjArrName][i]) {
                        $scope.provideObj[$scope.provideObjArrName][i] = $scope.cloneObj($scope.objNewArr[i]);
                    }
                }    
                for(let i=$scope.objNewArr.length+1; i<$scope.provideObj[$scope.provideObjArrName].length; i++) {
                    $scope.provideObj[$scope.provideObjArrName].pop();
                }
            }
            
            // Existing tickets have been changed, the number has remained the same
            if($scope.objNewArr.length === $scope.provideObj[$scope.provideObjArrName].length) {
                for(let i=0; i<$scope.objNewArr.length; i++) {
                    if($scope.provideObj[$scope.provideObjArrName][i]) {
                        $scope.provideObj[$scope.provideObjArrName][i] = $scope.cloneObj($scope.objNewArr[i]);
                    }
                }    
            };
            
            // The number of tickets has increased
            if($scope.objNewArr.length > $scope.provideObj[$scope.provideObjArrName].length) {
                for(let i=0; i<$scope.provideObj[$scope.provideObjArrName].length; i++) {
                    if($scope.provideObj[$scope.provideObjArrName][i]) {
                        $scope.provideObj[$scope.provideObjArrName][i] = $scope.cloneObj($scope.objNewArr[i]);
                    }
                }    
                for(let i=$scope.provideObj[$scope.provideObjArrName].length+1; i<$scope.objNewArr.length; i++) {
                    $scope.provideObj[$scope.provideObjArrName].push($scope.objNewArr[i]);
                }
            }            
            //$scope.provideObj[$scope.provideObjArrName] = $scope.objNewArr;
            
            $scope.objNewArr = [];
            return false;
        };
        
        $scope.cloneObj = function(objSource) {
            const clO = Object.assign({}, objSource);
            return clO;
        };

        
        let getFull= function(txt, n) {
            let ret = txt.substring(txt.length-n);
            return ret;
        };            

        $scope.getDateString = function(d) {
            let ret = "";
            ret = getFull(d.getFullYear(d), 4) + "-" + getFull(d.getMonth(d), 2) + "-" + getFull(d.getDay(d), 2);
            return ret;
        };
        
        $scope.getTimeString = function(d) {
            let ret = "";
            ret = getFull(d.getHours(d), 2) + ":" + getFull(d.getMinutes(d), 2);
            return ret;
        };
        
    },
    
    link: function (scope, ele, attrs) {
        scope.provideObj = $rootScope[attrs.provideObj]; 
        scope.provideObjArrName = attrs.arrName; 
        scope.initObj(scope.provideObj, scope.provideObjArrName);
        
//        // Test EA
//        // objNewArr is a clone of $rootScope[newDeTicket] a reference by value!
//        scope.objNewArr[0].type="W";
//        console.log($rootScope[attrs.provideObj]);
//        scope.addObjRow();
//        scope.deleteObjRow(1);
//        scope.saveObj();
//        console.log("new");
//        console.log(scope.objNewArr);
//        console.log("alt");
//        console.log($rootScope[attrs.provideObj]);
    }       
    
    
  };
};

