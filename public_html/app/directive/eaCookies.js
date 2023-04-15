'use strict';

var eaCookiesDirektive = function($rootScope, $cookies, $compile) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "app/template/cookieBanner.html",
        
//        // not local scope
//        scope: false,
        // local scope
        scope: true,
        
        controller: function($scope) {
            
            $scope.cookiesAreSet = false;
                        
            let doc = document.getElementById('modalCookies');
            $scope.modalCookiesDoc = angular.element(doc);
            
            $scope.initCookies = function(attr) {
                
                // read from JSON parameters
                $scope.title = $rootScope.paramsApp.cookies.title;
                $scope.body = $rootScope.paramsApp.cookies.body;
                $scope.types = $rootScope.paramsApp.cookies.types;
                $scope.links = $rootScope.paramsApp.cookies.links;
                
                // init cookies by JSON parameters and write HTML
                $scope.cookies = [];
                var htm01 = '\n\t<div class="col-lg-2 col-md-4 col-sm-12">';
                var htm = "";
                var htm02 = '\n\t</div>';
                var cookCounter = 0;
                for(let i=0; i<$scope.types.length; i++) {
                    let cook = $cookies.get("WebInfo_Cookie_" + $scope.types[i].id);
                    if(cook) {cookCounter++;};
                    let x = $scope.types[i].id;
                    let y = (cook)? cook : $scope.types[i].def;
                                        
                    let o = {};
                    o.name = x;
                    o.value = (y==="true")? true:false;
                    $scope.cookies.push(o);
                                        
                    let disab = ($scope.types[i].dis==='true')? " disabled='disabled' ":"";
                    htm = htm + htm01 + '\n\t\t<input type="checkbox" id="' + 
                            $scope.types[i].id + 
                            'Id" name="'  + $scope.types[i].id + '" ' +
                            disab + 
                            ' ng-model="cookies[' + i.toString() + '].value"' +
                            '>';
                    htm = htm + '\n\t\t<label for="' + $scope.types[i].id + '">' + $scope.types[i].title + '</label>' + htm02;
                }
                if(cookCounter===$scope.cookies.length) {
                    $scope.cookiesAreSet = true;
                }
                
                // init links by JSON parameters and write HTML
                htm01 = '\n\t<div>';
                htm02 = '\n\t</div>';
                for(let i=0; i<$scope.links.length; i++) {
                    htm = htm + htm01 + '<a class="eaNoDeco" href="" ng-click="showHtmFile(' + i.toString() + ')">' + 
                    "\n\t<h2>" + $scope.links[i].title + 
                    "\n\t\t<span class='eaSwitch' ng-show='visCook_" + i.toString() + "'>-</span>" +
                    "\n\t\t<span class='eaSwitch' ng-show='!visCook_" + i.toString() + "'>+</span>" +
                    '\n\t</h2></a>' + htm02;
                }  

                // include the linked pages for preview
                for(let i=0; i<$scope.links.length; i++) {
                    htm = htm + '\n\t<div id="link_' + $scope.links[i].key + 
                    '" class="eaContent" ng-show="visCook_' + i.toString() + '">\n\t\t<div ea-add-html = "' + 
                    $scope.links[i].url + '"></div>\n\t</div>';
                }   
                
                // read from Tag parameter for init checking of checkbox
                $scope.cookiesUsed = (attr.cookiesUsed==="true") ? true:false;
                $scope.cookiesEdit = (attr.cookiesEdit==="true") ? true:false;
                                
                // Edit case $scope.cookiesEdit===true
                // Init case !$scope.cookiesAreSet
                let doc = document.getElementById("eaInnerCookies");
                let aDoc = angular.element(doc);
                let html = $compile(htm)($scope);
                aDoc.append(html);
                    
                if(($scope.cookiesUsed) && !$scope.cookiesAreSet) {    
                    // now show modalCookies
                    $scope.openModalCookies(false);
                }   
                return false;
            };

            $scope.showHtmFile = function(idx) {
                if($scope["visCook_" + idx.toString()]) {
                    $scope.hideHtmFiles();
                } else {
                    $scope.hideHtmFiles();
                    $scope["visCook_" + idx.toString()] = true;
                }
                return false;
            };
                        
            $scope.hideHtmFiles = function() {
                for(let i=0; i<$scope.links.length; i++) {
                    $scope["visCook_" + i.toString()] = false;
                }
                return false;
            };
                        
            // Save all cookies by type
            $scope.saveCookies = function() {
                for(let i=0; i<$scope.cookies.length; i++) {
                    $cookies.put("WebInfo_Cookie_" + $scope.cookies[i].name, $scope.cookies[i].value.toString());
                }
            };
            
            $scope.closeModalCookies = function(){
                if($scope.modalCookiesDoc) {
                    $scope.modalCookiesDoc.css('display','none');
                }
            };
            
            $scope.openModalCookies = function(edit){
                if($scope.modalCookiesDoc) {
                    $scope.modalCookiesDoc.css('display','block');
                    if(edit) {
                        history.back();
                    }
                }
            };
                        
            $scope.saveCurrentCookies = function(x) {                
                switch(x) {
                    case "all":
                        for(let i=0; i<$scope.cookies.length; i++) {
                            $scope.cookies[i].value=true;
                        }
                        break;
                    case "current":
                        break;
                    default:
                        for(let i=0; i<$scope.cookies.length; i++) {
                            let defDis = ($scope.types[i].def==="true")? true:false;
                            $scope.cookies[i].value=($scope.types[i].dis==="true")? defDis : false;
                        }
                };                
                // Save Cookies and close modal window
                $scope.saveCookies();
                $scope.closeModalCookies();
            };            
        }, // controller

        link: function (scope, element, attr) {
            scope.scope_eaCookiesDirektive = scope.url;    
            scope.cookiesUsed = (attr.cookiesUsed==="true") ? true:false;
            scope.cookiesEdit = (attr.cookiesEdit==="true") ? true:false;
            
            if(scope.cookiesEdit && scope.cookiesUsed) {
                scope.openModalCookies(true);
            }            
            $rootScope.$on("LoadJsonFile-naviList", function(evt, opt) {
                if(scope.cookiesUsed) {
                    scope.initCookies(attr);
                }
            });
        }
    };
};

