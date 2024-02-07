'use strict';

var eaCookiesDirektive = function($rootScope, $cookies, $compile) {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: "app/template/cookieBanner.html",
        scope: false,
        
        controller: function($scope) {
            // -----------------------------------------------
            // Cookie functions for cookie banner in HTML code
            // -----------------------------------------------
            $scope.cookiesAreSet = false;
            $scope.initCookiesComplete = false;
                        
            let doc = document.getElementById('modalCookies');
            $scope.modalCookiesDoc = angular.element(doc);
            
            $scope.initCookies = function() {
                
                // read from JSON parameters
                $scope.title = ($scope.title)? $scope.title : $rootScope.paramsApp.cookies.title;
                $scope.body = ($scope.body)? $scope.body : $rootScope.paramsApp.cookies.body;
                $scope.types = ($scope.types)? $scope.types : $rootScope.paramsApp.cookies.types;
                $scope.links = ($scope.links)? $scope.links : $rootScope.paramsApp.cookies.links;
                
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
                            
                            'data-bs-toggle="tooltip" data-bs-placement="top" ' + 
                            'title="' + $scope.types[i].body +
                            
                            '" ng-model="cookies[' + i.toString() + '].value"' +
                            '>';
                    htm = htm + '\n\t\t<label for="' + $scope.types[i].id + 
                            '" ' +   
                            
                            'data-bs-toggle="tooltip" data-bs-placement="top" ' + 
                            'title="' + $scope.types[i].body +
                            
                            '">' + 
                            $scope.types[i].title + '</label>' + htm02;
                }
                if(cookCounter===$scope.cookies.length) {
                    $scope.cookiesAreSet = true;
                }
                
                // init links by JSON parameters and write HTML
//                if(!$scope.initCookiesComplete) {
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
                    $rootScope.contentFolder + $scope.links[i].url + '"></div>\n\t</div>';
                }   

                // Edit case $scope.cookiesEdit===true
                // Init case !$scope.cookiesAreSet
                let doc = document.getElementById("eaInnerCookies");
                doc.innerHTML = "";
                let aDoc = angular.element(doc);
                let html = $compile(htm)($scope);
                aDoc.append(html);
//                }    
                    
                if(($scope.cookiesUsed) && !$scope.cookiesAreSet) {    
                    // now show modalCookies
                    openModalCookies(false);
                }  
                $scope.initCookiesComplete = true;
                return false;
            };

            $scope.showHtmFile = function(idx) {
                if($scope["visCook_" + idx.toString()]) {
                    hideHtmFiles();
                } else {
                    hideHtmFiles();
                    $scope["visCook_" + idx.toString()] = true;
                }
                return false;
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
                saveCookies();
                closeModalCookies();
            };
            
            // ---------------
            // local functions
            // ---------------
            let hideHtmFiles = function() {
                for(let i=0; i<$scope.links.length; i++) {
                    $scope["visCook_" + i.toString()] = false;
                }
                return false;
            };
                        
            // Save all cookies by type
            let saveCookies = function() {
                for(let i=0; i<$scope.cookies.length; i++) {
                    $cookies.put("WebInfo_Cookie_" + $scope.cookies[i].name, $scope.cookies[i].value.toString());
                }
            };
            
            let closeModalCookies = function(){
                if($scope.modalCookiesDoc) {
                    $scope.modalCookiesDoc.css('display','none');
                }
            };
            
            let openModalCookies = function(edit){
                if($scope.modalCookiesDoc) {
                    $scope.modalCookiesDoc.css('display','block');
                    if(edit) {
                        history.back();
                    }
                }
            };

            // ------------------------------------------
            // Cookie functions for Using in application
            // ------------------------------------------
            $scope.cookieGet = function(key) { 
                let cook = $cookies.get(key);
                return cook;         
            };
            $scope.cookiePut = function(key, o) { 
                return $cookies.put(key, o);                
            };
            $scope.cookieGetAll = function() { 
                return $cookies.getAll();
            };
            $scope.cookieRemove = function(key) { 
                return $cookies.remove(key);                
            };
            
        }, // controller

        link: function (scope, element, attr) {
            scope.scope_eaCookiesDirektive = scope.url;    
            scope.cookiesUsed = (scope.cookiesUsed || attr.cookiesUsed==="true") ? true:false;
            scope.cookiesEdit = (attr.cookiesEdit==="true") ? true:false;
            
            // call from application to change the cookie selection
            if(scope.cookiesEdit && scope.cookiesUsed) {
                openModalCookies(true);
            }            
            $rootScope.$on("LoadJsonFile-paramsApp", function(evt, opt) {
                scope.cookiesParam = $rootScope.paramsApp.cookies;
                
//                // Test
//                console.log("on.LoadJsonFile-paramsApp -  $scope");
//                console.log(scope);
//                
                if(scope.cookiesUsed) {
                    scope.initCookies();
                }
            });
        }
    };
};