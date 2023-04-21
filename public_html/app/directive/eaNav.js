'use strict';

var eaNavDynDirektive = function($rootScope, $http, $location, $compile, eaNavSrv) {
    
    let tmplMenu ='<nav class="navbar navbar-expand-lg bg-light navbar-light sticky-top">' +
                  '\n\t<div class="container-fluid">' +
                  '\n\t\t<a class="navbar-brand"  href="#!/home">' +
                  '\n\t\t\t<img class="eaLogo" src="{{navLogo}}" alt=""/>' +
                  '\n\t\t</a>' +
                  '\n\t\t<button class="navbar-toggler" \n\t\t\t type="button" data-bs-toggle="collapse" \n\t\t\t data-bs-target="#navbarSupportedContent" ' +
                  '\n\t\t\t aria-controls="navbarSupportedContent" \n\t\t\t aria-expanded="false" ' +
                  '\n\t\t\t aria-label="Toggle navigation">' +
                  '\n\t\t<span id="myToogle" class="navbar-toggler-icon"></span>' +
                  '\n\t\t</button>' +
                  '\n\t\t<div class="collapse navbar-collapse" id="navbarSupportedContent">' +
                  '\n\t\t\t<ul class="navbar-nav">' +                  
                  '\n\t\t\t</ul>' +
                  '\n\t\t</div>' +
                  '\n\t</div>' +
                  '\n</nav>';
    let tmplSiteMap =   '\n<div>' + 
                        '\n\t<div class="container-fluid">' + 
                        '\n\t\t<div class="sitemap"></div>' +
                        '\n\t</div>' +
                        '\n</div>';
    return {
        restrict: 'E',
        controller: function($rootScope, $scope, $compile) {
            $scope.scope_eaNavDirektive_Controller = $scope.url;
            var html = '';
            
            $rootScope.$on("LoadJsonFile-naviList", function(evt, opt) {
                $scope.scope_eaNavDirektive_Controller = $scope.url;    
                $scope.naviList = $rootScope.naviList;
                
                $scope.url = $scope.navSrv.getHtml4Id($rootScope, $location.path(), eaNavSrv);
                $rootScope.$emit("ReadUrlIsReady", $scope.url);
                
                html = $scope.addMenu("nav", $scope.naviList, html);
                $scope.setMenuToTemplate('navbar-nav', html);                
            });
            
            $scope.getMenuItem = function(cls, naItem, addToogle) {
                let cl = (cls + '-link ' + addToogle).trim();
                //let cc = (addToogle==='')? ' ng-click="toggleMenu()"':'';
                let cc = ' ng-click="toggleMenu()"';
                return '\n\t<li class="' + cls + '-item"><a' + cc + ' class="' + cl + '" href="' + naItem.href + '">' + naItem.label + '</a>';
            };
            //eaInsertMenu
            $scope.setMenuToTemplate = function(id, htm) {
                //const doc = document.getElementById(id);
                const doc = document.getElementsByClassName(id);
                if(doc) {
                    let aDoc = angular.element(doc);
                    let html = $compile(htm)($scope);
                    aDoc.append(html);
                }
                return false;
            };
            
            $scope.addMenu = function(cls, naLi, htm) {
                // {"id":"navStart", "label": "Home", "href": "#!/home", "url": "content/aleks/html/home.html", "imgKey": "",
                //  "subm": []},
                let clss = cls;
                naLi.forEach(o => {
//                    htm = htm + $scope.getMenuItem(clss, o);
                    if(o.subm) {
                        if(o.subm.length>0) {
                            htm = htm + $scope.getMenuItem(clss, o, "dropdown-toggle");
                            cls = (cls==="sitemap")? "sitemap":"hoverdown";
                            htm = htm + '\n<ul class="' + cls + '-menu">';
                             htm = $scope.addMenu(cls, o.subm, htm);
                            htm = htm + '\n</ul>\n\t</li>';
                        } else {
                            htm = htm + $scope.getMenuItem(clss, o, "");
                            htm = htm + '\n\t</li>';
                        };
                    }  else {
                        htm = htm + $scope.getMenuItem(clss, o, "");
                        htm = htm + '\n\t</li>';
                    };
                }); 
                return htm;
            }; // addMenu()
            
        },     // controller 
        
        link: function (scope, element, attr) {
            // manage Logo
            let navLogo = attr.navLogo;
            if(navLogo) {
                navLogo = scope.$parent.contentFolder + "/" + navLogo;
            } else {
                navLogo = '';
            }
            
            // sitemap | menu
            let mo = attr.navMode;
            if(mo) {
                if(mo==='sitemap') {
                    element.append(tmplSiteMap);
                    let html = '';
                    html = scope.addMenu('sitemap', scope.naviList, html);
                    scope.setMenuToTemplate('sitemap', html);                    
                } else {
                    let htmLogo = tmplMenu.replace("{{navLogo}}", navLogo);
                    element.append(htmLogo);
                }
            }            
//            $rootScope.$on("$locationChangeSuccess", function(event, next, current) {            
//                scope.location = $location.path();
//            });
        }            
     };
};

