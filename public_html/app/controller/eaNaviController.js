'use strict';

var eaNaviController =  function($rootScope, $scope, $location, eaNavSrv) {
    
    // get the url from naviList by href (loc)
    var getUrlById = function(rootScope, loc, paramSrv){
        //var naviList = paramSrv.getNaviList();
        let naviList = rootScope.naviList;
        let ret = "";

        if(rootScope.isLoaded_naviList) {
            ret = getEntry("", naviList, "subm", "href", '#!' + loc, "url");
        } else {
            rootScope.$watch(rootScope.isLoaded_naviList, function() {
                ret = getEntry("", naviList, "subm", "href", '#!' + loc, "url");
            });
        }   
        if(!ret.startsWith("app")) {
            ret = rootScope.contentFolder + ret;
        }    
        return ret;
    };
    var getEntry = function(inRt, objArr, sub, key, val, ret) {
        // https://stackoverflow.com/questions/2641347/short-circuit-array-foreach-like-calling-break
        let rt = inRt;
        let BreakException = {};
        try{objArr.forEach(o => {
            if(rt !== "") {throw BreakException;};
            if(o[sub] !== undefined && o[sub].length>0) {
                rt = getEntry(rt, o[sub], sub, key, val, ret);
            };
            if(o[key] === val) {
                rt = o[ret];
                throw BreakException;
            }});
        } catch(e){
            if (e !== BreakException) throw e;
        };
        return rt;
    };
    
    // prepare navagation menu, site map and HTML call
    if($rootScope.isLoaded_naviList) {
        $scope.naviList = $rootScope.naviList;
        $scope.currLink = getCurrentLink($rootScope, $location.path());
        //$scope.url = $scope.navSrv.getUrlById($rootScope, $location.path(), eaNavSrv);
        $scope.url = getUrlById($rootScope, $location.path(), eaNavSrv);
    } else {  $scope.naviList = {};};
    $rootScope.$on("LoadJsonFile-naviList", function(evt, opt) {
        $scope.naviList = $rootScope.naviList;
        $scope.currLink = getCurrentLink($rootScope, $location.path());
        //$scope.url = $scope.navSrv.getUrlById($rootScope, $location.path(), eaNavSrv);
        $scope.url = getUrlById($rootScope, $location.path(), eaNavSrv);
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
                    ngView.style.backgroundImage = "url(" + $rootScope.contentFolder + bg + ")";
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

    //Test
    //console.log("eaNaviController-$scope");
    //console.log($scope);

    return false;
};
