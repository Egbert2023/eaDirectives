'use strict';

var eaNaviController =  function($rootScope, $scope, $location, eaNavSrv) {
    
    // prepare navagation menu, site map and HTML call
    if($rootScope.isLoaded_naviList) {
        $scope.naviList = $rootScope.naviList;
        $scope.currLink = getCurrentLink($rootScope, $location.path());
        $scope.url = $scope.navSrv.getHtml4Id($rootScope, $location.path(), eaNavSrv);
    } else {  $scope.naviList = {};};
    $rootScope.$on("LoadJsonFile-naviList", function(evt, opt) {
        $scope.naviList = $rootScope.naviList;
        $scope.currLink = getCurrentLink($rootScope, $location.path());
        $scope.url = $scope.navSrv.getHtml4Id($rootScope, $location.path(), eaNavSrv);
    });
    
    // prepare the news list
    //$scope.newsList = $scope.$parent.newsList;
    if($rootScope.isLoaded_newsList) {
        $scope.newsList = $rootScope.newsList;
    } else {  $scope.newsList = {};};
    $rootScope.$on("LoadJsonFile-newsList", function(evt, opt) {
        $scope.newsList = $rootScope.newsList;
    });

    // prepare background pictures
    var setBg = function(objBg) {
        let pathArr = $location.path().split("/");
        let bg = ($scope.objBg[pathArr[1]] !== null)? 
            $scope.objBg.find(o => o.key === pathArr[1]).pic : "";
        let ngView = document.getElementById("ng-view");
        if(ngView!==null) {
            if(ngView.style!==null) {
                if(bg.substring(0,1) === '#') {
                    ngView.style.backgroundColor = bg;
                    ngView.style.backgroundImage = "";
                } else {
                    ngView.style.backgroundImage = bg;
                }
            }
        }
    };
    if($rootScope.isLoaded_objBg) {
        $scope.objBg = $rootScope.objBg;
        setBg($scope.objBg);
    } else { $scope.objBg = {};}
    $rootScope.$on("LoadJsonFile-objBg", function(evt, opt) {
        $scope.objBg = $rootScope.objBg;
        setBg($scope.objBg);
    });
    
    // prepare the Image box handlingw
    if($rootScope.isLoaded_imgBoxList) {
        $scope.imgBoxList = $rootScope.imgBoxList;
    } else { $scope.imgBoxList = {};}
    $rootScope.$on("LoadJsonFile-imgBoxList", function(evt, opt) {
        $scope.imgBoxList = $rootScope.imgBoxList;
    });

    $scope.htm = "";
    $scope.scope_eaNaviController = $scope.url;

    return false;
};

