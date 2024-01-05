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
            //$scope.regTxt = $scope.regTxt.replaceAll(" ", "&nbsp;");
            $scope.regResult = [];
            $scope.regGap = [];
            $scope.regRest = [];
            let res = "";
            let regEx = RegExp($scope.regPattern, $scope.regModyfier);
            let regResult = regEx.exec($scope.regTxt);  // this is an array
            $scope.regResult = regResult;
            for(let idx = 0; idx < regResult.length; idx++) {
                let regGap = "";
                let regRest = "";
                let res = (regResult[idx])? regResult[idx] : "";
                let idxOff = $scope.regTxt.indexOf(res);
                regGap = (idxOff>0)? $scope.regTxt.substring(0, idxOff) : "";
                let idxRest = regGap.length + res.length;
                regRest = (idxRest < $scope.regTxt.length)? $scope.regTxt.substring(0, idxRest) : "";
                
                $scope.regGap.push(regGap);
                $scope.regRest.push(regRest);
            };
            //$scope.regResult = ($scope.regResult)? $scope.regResult.toString() : "";
            //let idxOff = $scope.regTxt.indexOf($scope.regResult);
            //$scope.regGap = $scope.regTxt.substring(0, idxOff);
        };
        
        $scope.encodeSpace = function(inStr) {
            let ret = inStr.replaceAll(" ", "&nbsp;");

            // Am Anfang und am Ende eines Strings werden die Spacec weggetrimmt.
            // Entweder muss dies gezählt werden und ein addGap Array eingefügt werden oder
            // Eine ander Darstellungsform (nicht übereinander schreiben) gewählt werden.

            ret =  inStr;
            
            return ret;
        };
        
    },
    
    link: function (scope, ele, attrs) {
        scope.regModyfier = attrs.modyfier;
        
    }       
  };
};