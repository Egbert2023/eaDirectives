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
        
        var distributeResult = function(regResult) {
            for(let idx = 0; idx < regResult.length; idx++) {
                let regGap = "";
                let regRest = "";
                let res = (regResult[idx])? regResult[idx] : "";
                let idxOff = $scope.regTxt.indexOf(res);
                regGap = (idxOff>0)? $scope.regTxt.substring(0, idxOff) : "";
                let idxRest = regGap.length + res.length;
                regRest = (idxRest < $scope.regTxt.length)? $scope.regTxt.substring(idxRest) : "";

                $scope.regGap.push(regGap);
                $scope.regRest.push(regRest);
            };      
        };        
        
        $scope.setResult = function() {
            $scope.regResult = [];
            $scope.regGap = [];
            $scope.regRest = [];
            let regEx = RegExp($scope.regPattern, $scope.regModyfier);
            let regResult = "";
            switch($scope.regFunction) {
                case "test()":
                    regResult = regEx.test($scope.regTxt);  // this is true or false
                    $scope.regResult.push(regResult);
                    break;
                case "exec()":
                    regResult = regEx.exec($scope.regTxt);  // this is an array
                    distributeResult(regResult);
                    $scope.regResult = regResult;
                    break;
                case "match()":
                    regResult = $scope.regTxt.match(regEx);  // this is an array
                    distributeResult(regResult);
                    $scope.regResult = regResult;
                    break;
                case "search()":
                    regResult = $scope.regTxt.search(regEx);  // Start position of the matched substring
                    $scope.regResult.push(regResult);
                    break;
            }
        };
    },
    
    link: function (scope, ele, attrs) {
        scope.regModyfier = attrs.modyfier;
        
    }       
  };
};