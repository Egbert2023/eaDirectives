'use strict';

var eaRegTest = function () {
  return {
    restrict: 'E',
    scope: true,
    template: '<div class="row">' +
              ' <hr />' +
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
              '  <div class="col-lg-4 col-md-12 col-sm-12">' +
              '      <label for="result" class="bold">Result:</label>' +
              '      <span id="result" class="bold">    ' +
              '         {{regResult}}' +
              '      </span>' +
              '  </div>' +
              ' <hr />' +
              '</div>',
    
    controller: function($scope) {
        $scope.regModyfierArray = ["g", "i", "m"];
        $scope.regModyfier = "g";
        $scope.regResult = "";
        $scope.regTxt = "";
        $scope.regPattern = "";
        
        $scope.setResult = function() {
            let res = "";
            let regEx = RegExp($scope.regPattern, $scope.regModyfier);
            $scope.regResult = regEx.exec($scope.regTxt);
            $scope.regResult = ($scope.regResult)? $scope.regResult.toString() : "";
        };
    },
    
    link: function (scope, ele, attrs) {
        scope.regModyfier = attrs.modyfier;
        
    }       
  };
};