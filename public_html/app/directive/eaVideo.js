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
        
        // <ea-news data-news-title="News" 
        //          data-news-mode="all" | "new" | "arc"
        //          data-news-limit="0" | "1" | "2" ...
        //          data-news-init-idx = "0" | "1...n">
        //</ea-news>
        link: function (scope, ele, attrs) {      
            scope.vdoSrc = attrs.vdoSrc;
            scope.vdoBody = attrs.vdoBody;
        }
    };  // return
};   // eaVideo()

