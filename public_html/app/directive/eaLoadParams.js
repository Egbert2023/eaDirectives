'use strict';

var eaLoadParams = function ( $rootScope, $http ) {
    return {
        restrict: 'E',
        replace: true,
        
        // local scope
        scope: true,

        controller: function($scope) {
            
            $scope.scope_eaLoadParams_Controller = $scope.url;    
            
            $scope.getParamObject = function(folder, paramName, rootScope, http) {
                var url = folder + "json/" + paramName + ".json";
                rootScope["isLoaded_" + paramName] = false;

                let callback = function(paramName, rootScope, json) {
                    const obj = json;
                    rootScope[paramName] = obj.entries;
                    rootScope["isLoaded_" + paramName] = true;
 
                    return obj.entries;
                };
                let newObject = rootScope[paramName];
                if(newObject === undefined 
                   || (newObject.constructor === Object && Object.entries(newObject).length === 0)) {

                    http({
                        url: url,
                        method: 'GET'
                    }).then(function(response){
                        newObject = callback(paramName, rootScope, response.data);
                        var opt = {
                            paramName: paramName,
                            paramObj: newObject
                        };
                        rootScope.$emit("LoadJsonFile-" + paramName, opt);

                    }, function(errResp){
                            console.log("Error in $http get.");
                            console.log(errResp);
                    });
                };
                
                return false;
            };
        }, // controller        
        
        link: function (scope, ele, attrs) {      
            $rootScope.contentFolder = attrs.contentFolder;
            scope.$parent.footerUrl = attrs.contentFolder + "html/footer.html";
            
            let folder = $rootScope.contentFolder;
            scope.getParamObject(folder, "naviList", $rootScope, $http);
            scope.getParamObject(folder, "objBg", $rootScope, $http);
            scope.getParamObject(folder, "imgBoxList", $rootScope, $http);
            scope.getParamObject(folder, "newsList", $rootScope, $http);
            scope.getParamObject(folder, "paramsApp", $rootScope, $http);
            
        }
    };  // return
};   // eaLoadParams()

