'use strict';

var eaMaskCode = function () {
  return {
    restrict: 'E',
    replace: false,
    
    // local scope
    scope: true,
    
    controller: function($scope) {
        // replace < > for all tags
        $scope.myChange = function(htm) {
            const lt = "<";
            const gt = ">";
            const bl = " ";
            const nl = "\n";
            const spa = "<span>";
            const spe = "</span>";
            let ret = htm.replaceAll(lt, '&lt;');
            ret = ret.replaceAll(gt, '&gt;');

            // attribute values are green
            const tag3 = /\s\w+=/g;

            // attributes are red
            const tag2 = /\s\w+=/g;
            //let test = ret.match(tag2);
            ret = ret.replace(tag2, o => "<span style='color:red;'>" + o + spe);

            // Tags are blue
            const tag1 = /&lt;\w+|&gt;|&lt;[/]\w+&gt;/g;
            ret = spa + ret + spe;
            ret = ret.replace(tag1, o => spe + "<span style='color:blue;'>" + o + spe + spa);

            
            
            
            
            
            
            //ret = ret.replaceAll(bl, '&nbsp;');
            ret = ret.replaceAll(nl, '<br />');
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