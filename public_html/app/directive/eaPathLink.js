'use strict';

var eaPathLinkDirective = function ($rootScope, $location, navSrv) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "app/template/pathLink.html",
    controller: function($scope) {
        
        $scope.scope_eaPathLinkDirective_Controller = $scope.url;    
        
        if($rootScope.isLoaded_naviList) {
            $scope.naviList = $rootScope.naviList;
            $scope.currLink = getCurrentLink($rootScope, $location.path());
            $scope.url = navSrv.getHtml4Id($rootScope, $location.path(), navSrv);
        } else {  $scope.naviList = {};};
        $rootScope.$on("LoadJsonFile-naviList", function(evt, opt) {
            
//    // Test
//    console.log("10 - Directive-eaPathLink-Controller-$on('LoadJsonFile-naviList')($scope)");
//    console.log($scope);                    
//            
            $scope.naviList = $rootScope.naviList;
            $scope.currLink = getCurrentLink($rootScope, $location.path());
            $scope.url = navSrv.getHtml4Id($rootScope, $location.path(), navSrv);
        });
        
//        // Test
//        console.log("8 - Directive-eaPathLink-Controller($scope)");
//        console.log($scope);        
        
    },

    link: function (scope, ele, attrs) {        

        // The last operation for include HTML home page 
        // for the first call of application
        ele.ready(function(){
            scope.$parent.$apply();
        });
    }
  };
};