'use strict';

var eaMaskCode = function () {
  return {
    restrict: 'E',
    replace: false,
    
    // local scope
    scope: true,
    
    controller: function($scope) {
        let rowChange = function(htm) {
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
        
        // replace < > for all tags        
        $scope.myChange = function(htm) {
            
            // select rows
            let rows = htm.split("\n");
            let ret = "";
            for(let i=0; i<rows.length; i++) {
                // distance from left
                let pttrn = /^\s*/;
                let d = rows[i].match(pttrn)[0].length * 6;
                
                ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChange(rows[i]) + "</div>";
            }
            return ret; 
        };
        $scope.changeInnerHtml = function(el, nh) {
            el.innerHTML = nh;
            return false;
        };        
    },

    link: function (scope, ele, attrs) {
        let iHtml = ele[0].innerHTML;
        iHtml = scope.myChange(iHtml);
        ele[0].innerHTML = iHtml;
        
    }       
  };
};