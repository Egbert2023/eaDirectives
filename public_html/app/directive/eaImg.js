'use strict';

var eaImg = function ( $rootScope ) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: "app/template/imgTemplate.html",
        
        // local scope
        scope: true,

        controller: function($scope) {
            $scope.scope_eaImgDirektive = $scope.url;    

            // Open the Modal
            $scope.openModal = function() {
                var opt = {
                    key: $scope.imgBoxKey,
                    imgArr: $scope.imgArr,
                    imgBodyArr: $scope.imgBodyArr,
                    imgBoxIdx: $scope.imgBoxIdx
                };
                $rootScope.$emit("openModalImgBox", opt);
            };
        },   // controller
        
        link: function (scope, ele, attrs) {      
            scope.imgBoxKey = attrs.imgBoxKey;
            if(scope.imgBoxKey === undefined) {
                scope.imgArr = [];
                scope.imgArr.push(attrs.img);
                scope.imgBodyArr = [];
                scope.imgBodyArr.push(attrs.alt);
                scope.imgBoxIdx = 1;
                scope.imgBoxImg = scope.imgArr[0];
                scope.imgBoxBody = "";
            } else {
                var obj = scope.imgBoxList.find(o => o.imgKey === scope.imgBoxKey); 
                scope.imgArr = obj.imgList;
                scope.imgBodyArr = obj.imgBodyList;
                scope.imgBoxIdx = attrs.imgBoxIdx;            
                scope.imgBoxImg = scope.imgArr[scope.imgBoxIdx-1];
                scope.imgBoxBody = scope.imgBodyArr[scope.imgBoxIdx-1];
            }
        }
    };  // return
};   // eaImgBox()

