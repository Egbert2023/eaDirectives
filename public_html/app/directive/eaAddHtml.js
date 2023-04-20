'use strict';

// When this directive is used for menu generation, it is necessary to wait for 
// the menu data to be read successfully. That's why the directive for reading 
// the navigation fires the "ReadUrlIsReady" event at the end. Then the process 
// can be continued.
// That's why this call is made:
// $rootScope.$on("ReadUrlIsReady", function(evt, opt) {...}

var eaAddHtmlDirective = function ($rootScope, $compile, $http) {    
    return {
        restrict: 'A',
        replace: true,
        
        controller: function($scope, $http, $compile) {
            var getHtml = function($http, $compile, scope, ele, url, callback) {
                let htm = "";
                $http({
                    url: url,
                    method: 'GET'
                }).then( function(response, status, headers, config) {
                    htm = callback($http, $compile, scope, ele, response.data);
                }),
                function(errResp) {
                    console.log("Error in $http get.");
                };
                return htm;
            };  
        },
        
        link: function (scope, ele, attrs) {        
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
                getHtml($http, $compile, scope, ele, url, callback);
            } else {
                // event 'ReadUrlIsReady' is fired when url is ready.
                $rootScope.$on("ReadUrlIsReady", function(evt, opt) {
                    getHtml($http, $compile, scope, ele, opt, callback);
                });
            }
        }
    };
};


