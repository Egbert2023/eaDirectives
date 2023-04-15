'use strict';

var eaAddHtmlDirective = function ($rootScope, $location, $compile, $http, navSrv) {
    
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {        
        
        scope.scope_eaAddHtmlDirective = scope.url;    

        let url = attrs.eaAddHtml;
        
        // https://stackoverflow.com/questions/42066311/how-to-use-callback-in-http-angular-js
        let callback = function($http, $compile, scope, ele, htm){
            scope.htm = htm; 
            if(htm !== ""){
                ele.html(htm);
                $compile(ele.contents())(scope);
            } else {console,log("Html is not available!");}
            return htm;
        };
        
        if(url!=="") {         
            scope.navSrv.getHtml($http, $compile, scope, ele, url, callback);
        } else {
            // event 'ReadUrlIsReady' is fired when url is readed.
            $rootScope.$on("ReadUrlIsReady", function(evt, opt) {
                scope.navSrv.getHtml($http, $compile, scope, ele, opt, callback);
            });
        }
    }
  };
};


