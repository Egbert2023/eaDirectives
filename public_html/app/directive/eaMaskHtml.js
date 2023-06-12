'use strict';

var eaMaskHtml = function () {
  return {
    restrict: 'A',
    // global scope, so will use the same $scope as the parent directive
    scope: false,
    
    controller: function($scope) {
        $scope.rowChange = function(htm) {
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
            const tag2 = /[\s][\w-]+=/g;
            //let test = ret.match(tag2);
            ret = ret.replace(tag2, o => "<span style='color:red;'>" + o + spe);

            // attribute values are green
            const tag3 = /"[\w:,;\-# //.()%]+"*/g;
            ret = ret.replace(tag3, o => "<span style='color:green;'>" + o + spe);

            // Tags are blue
            const tag1 = /&lt;[\w-]+|&gt;|&lt;[/][\w-]+&gt;/g;
            ret = spa + ret + spe;
            ret = ret.replace(tag1, o => spe + "<span style='color:blue;'>" + o + spe + spa);
            
            return ret;
        };
    }
  };
};