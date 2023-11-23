'use strict';

var eaRegTest = function () {
  return {
    restrict: 'E',
    scope: true,
    template: '<div class="row">' +
              '<style>' +
              '.eaMark {opacity: 0.5; font-weight:  bold; background-color: lightblue; display: inline-flex; position: relativ} ' +
              '.eaNoMark {opacity: 0.5; font-weight:  bold; display: inline-flex; position: absolute;} ' +
              '.eaGap {opacity: 0.5; font-weight: bold; display: inline-flex; position: absolute;} ' +
              '</style>' +
              ' <hr style="width: 95%" />' +
              '  <div class="col-lg-4 col-md-6 col-sm-12">' +
              '      <label for="inputRegPattern" class="bold">regEx:</label>' +
              '      /<input type="text" ' +
              '              id = "inputRegPattern"' +
              '              ng-change="setResult()"' +
              '              ng-model="regPattern"/>/{{regModyfier}}' +
              '  </div>' +
              '  <div class="col-lg-4 col-md-6 col-sm-12">' +
              '      <label for="inputRegText" class="bold">Text:</label>' +
              '      <input type="text" ' +
              '              id = "inputRegText"' +
              '              ng-change="setResult()"' +
              '              ng-model="regTxt"/>' +
              '  </div>' +
              '  <div class="col-lg-4 col-md-12 col-sm-12"  >' +
              '     <div ng-repeat="res in regResult">' +
              '       <span class="eaNoMark">{{regTxt}}</span>' +
              '       <span class="eaGap" >{{regGap[$index]}}</span><span class="eaMark">{{res}}</span>' +
              '     </div>' +
              '  </div>' +
              ' <hr style="width: 95%"/>' +
              '</div>',
    
    controller: function($scope) {
        $scope.regModyfierArray = ["g", "i", "m"];
        $scope.regModyfier = "g";
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