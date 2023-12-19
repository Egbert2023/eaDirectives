'use strict';

var eaRegTest = function () {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: "app/template/regTest.html",
    
    controller: function($scope) {
        $scope.regModyfierArray = ["g", "i", "m", "gi"];
        $scope.regFunctionArray = ["test()", "exec()", "match()", "search()"];
        $scope.regModyfier = "g";
        $scope.regFunction = "test()";
        $scope.regResult = [];
        $scope.regGap = [];
        $scope.regTxt = "";
        $scope.regPattern = "";
        
        $scope.setResult = function() {
            $scope.regResult = [];
            $scope.regGap = [];
            let res = "";
            let regEx = RegExp($scope.regPattern, $scope.regModyfier);
            let regResult = regEx.exec($scope.regTxt);  // this is an array
            $scope.regResult = regResult;
            for(let idx = 0; idx < regResult.length; idx++) {
                let regGap = "";
                let res = (regResult[idx])? regResult[idx] : "";
                let idxOff = $scope.regTxt.indexOf(res);
                regGap = (idxOff>0)? $scope.regTxt.substring(0, idxOff) : "";
                $scope.regGap.push(regGap);
            };
            //$scope.regResult = ($scope.regResult)? $scope.regResult.toString() : "";
            //let idxOff = $scope.regTxt.indexOf($scope.regResult);
            //$scope.regGap = $scope.regTxt.substring(0, idxOff);
        };
    },
    
    link: function (scope, ele, attrs) {
        scope.regModyfier = attrs.modyfier;
        
    }       
  };
};