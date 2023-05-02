'use strict';

var eaMaskCode = function ($compile) {
  return {
    restrict: 'E',
    replace: true,
        
    // local scope
    scope: true,
    
    controller: function($scope) {
        let rowChangeHtml = function(htm) {
            const lt = "<";
            const gt = ">";
            const bl = " ";
            const nl = "\n";
            const spa = "<span>";
            const spe = "</span>";
            let ret = htm.replaceAll(lt, '&lt;');
            ret = ret.replaceAll(gt, '&gt;');
            
            // change all ' to "
            const tag0 = /[']/g;
            ret = ret.replace(tag0, o => '"');
            
            // attributes are red
            const tag2 = /\s\w+=/g;
            //let test = ret.match(tag2);
            ret = ret.replace(tag2, o => "<span style='color:red;'>" + o + spe);

            // attribute values are green
            const tag3 = /"[\w: ]+"*/g;
            ret = ret.replace(tag3, o => "<span style='color:green;'>" + o + spe);

            // Tags are blue
            const tag1 = /&lt;\w+|&gt;|&lt;[/]\w+&gt;/g;
            ret = spa + ret + spe;
            ret = ret.replace(tag1, o => spe + "<span style='color:blue;'>" + o + spe + spa);
            
            return ret;
        };
        
        let rowChangeJs = function(code) {
            
        };
        
        let rowChangeJson = function(code) {
            
        };
        
        // replace < > for all tags        
        $scope.myChange = function(code, codeType) {
            
            // select rows
            let rows = code.split("\n");
            let ret = "";
            for(let i=0; i<rows.length; i++) {
                // distance from left
                let pttrn = /^\s*/;
                let d = rows[i].match(pttrn)[0].length * 6;
                    
                switch(codeType) {
                    case "html":
                        ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChangeHtml(rows[i]) + "</div>";
                        break;
                    case "js":
                        ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChangeJs(rows[i]) + "</div>";
                        break;
                    case "json":
                        ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChangeJson(rows[i]) + "</div>";
                        break;
                    default:
                        ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChangeHtml(rows[i]) + "</div>";
                }                
            }
            return ret; 
        };
        
        $scope.copyToClipboard = function() {
             navigator.clipboard.writeText($scope.iHtm);
             //alert("Code is copy to Clipboard.");
        };
        
    },

    link: function (scope, ele, attrs) {
        let iHtml = ele[0].innerHTML;
        scope.iHtm = iHtml;
        let codeType = attrs.codeType;
        iHtml = scope.myChange(iHtml, codeType);
        let bt = '<div class="eaContent">\n<div class="eaSwitch" style="cursor: pointer; width: fit-content; position: fixed; right: 2px; color: lightgray" ng-click="copyToClipboard()">#</div>';
        ele[0].innerHTML = bt + "\n" + iHtml + "\n</div>";
        $compile(ele.contents())(scope);
    }       
  };
};