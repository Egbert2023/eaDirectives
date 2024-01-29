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
        } else {  $scope.naviList = {};};
        $rootScope.$on("LoadJsonFile-naviList", function(evt, opt) {
            $scope.naviList = $rootScope.naviList;
            $scope.currLink = getCurrentLink($rootScope, $location.path());
        });
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