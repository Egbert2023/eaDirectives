'use strict';

var eaVideo = function ( $rootScope ) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "app/template/video.html",
        
        // local scope
        scope: true,

        controller: function($scope) {
            $scope.scope_eaVideoDirektive = $scope.url;    

            // get parameter vdoNo
            $scope.vdoNo = $rootScope.paramsApp.vdoNo;
        },   // controller
        
        link: function (scope, ele, attrs) {      
            scope.vdoSrc = attrs.vdoSrc;
            scope.vdoBody = attrs.vdoBody;
        }
    };  // return
};   // eaVideo()

