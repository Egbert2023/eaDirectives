'use strict';

var eaMaskCode = function ($compile) {
  return {
    restrict: 'E',
    replace: true,
        
    // local scope
    scope: true,
    
    controller: function($scope) {

        // replace < > for all tags        
        $scope.myChange = function(code) {
            
            // select rows
            let rows = code.split("\n");
            let ret = "";
            for(let i=0; i<rows.length; i++) {
                // distance from left
                let pttrn = /^\s*/;
                let d = rows[i].match(pttrn)[0].length * 6;
                    
                // the function rowChange() is added by the included directive eaMask* (Html, Json, Js, Css)
                if($scope.rowChange) {
                    ret = ret + "<div style='padding-left: " + d + "px;'>" + $scope.rowChange(rows[i]) + "</div>";
                } 
            }
            return ret; 
        };
        
        $scope.copyToClipboard = function() {
            let code = $scope.iHtm.replaceAll("&lt;", "<");
            code = code.replaceAll("&gt;", ">");
            navigator.clipboard.writeText(code);
        };        
    },

    link: function (scope, ele, attrs) {
        let iHtml = ele[0].innerHTML;
        scope.iHtm = iHtml;
        iHtml = scope.myChange(iHtml);
        let bt = '<div class="eaContent">\n<div class="eaSwitch" style="cursor: pointer; width: fit-content; position: fixed; right: 2px; color: lightgray" ng-click="copyToClipboard()">#</div>';
        ele[0].innerHTML = bt + "\n" + iHtml + "\n</div>";
        $compile(ele.contents())(scope);
    }       
  };
};