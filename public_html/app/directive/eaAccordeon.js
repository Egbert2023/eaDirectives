'use strict';

// see: https://stackoverflow.com/questions/27675321/angular-js-nesting-custom-directives

// call this directives
// <ea-acc-coat data-acc-title="Title of accordeon">
//      <ea-acc-key data-title="Sub title 1 of accordeon"
//                  data-txt-len="200">
//          --- Html code for the first section ---
//      </ea-acc-key>
//      <ea-acc-key data-title="Sub title 2 of accordeon"
//                  data-txt-len="200">
//          --- Html code for the second section ---
//      </ea-acc-key>
//      ...
//      <ea-acc-key data-title="Sub title n-th of accordeon"
//                  data-txt-len="200">
//          --- ... ---
//      </ea-acc-key>
// </ea-acc-coat>

var eaAccCoat = function ($rootScope) {
    return {
        restrict: 'E',
        transclude: true,
        template: '<div id="accId">' + 
                    '<h1>{{accTitle}}</h1>' + 
                    '<ng-transclude></ng-transclude>' +
                  '</div>',
        // local scope 
        scope: true,

        controller: function($scope, $rootScope) {
            $scope.accIdx = 0;
            $scope.vis_1 = true;
            $scope.scope_eaAccCoat_controller = 0;
            
            var getInnerFromTag = function(html, tag) {
                let htmlWork = html;
                let start = htmlWork.indexOf("<" + tag);
                let lenAdd = ("<" + tag + " ").length;
                htmlWork = htmlWork.substring(start + lenAdd);
                start = htmlWork.indexOf(">") + 1;
                let end = htmlWork.indexOf("</" + tag);
                let sub = htmlWork.substring(start, end);
                
                return sub;    
            };       
            
            let setTransclude = function(html) {
                let htmlAll = getInnerFromTag(html, "ea-acc-coat");
                let htmlKey = "";
                let len = 0;
                let end = 0;
                
            // Get all innerHtml's from the original Html code, 
            // push it into the $scope.accKeysHtm array
                do{
                    htmlKey = getInnerFromTag(htmlAll, "ea-acc-key");
                    len = htmlKey.length;
                    if(len > 0) {
                       $scope.accKeysHtm.push(htmlKey);
                       // '<ea-acc-key data-title="...">'.length + len + '</ea-acc-key>'.length
                       end = htmlAll.indexOf("</ea-acc-key") + 13;
                       htmlAll = htmlAll.substring(end);
                    }
                } while (len > 0);
                return false;
            };
            let htm = $scope.$parent.htm;
            $scope.accKeysHtm = [];
            setTransclude(htm);
 
        },   // controller
        
        link: function (scope, ele, attrs) {      
            scope.accTitle = attrs.accTitle;
        }  // link
    };  // return
};   // eaAccCoat()

var eaAccKey = function ($compile, $rootScope) {
    return {
        restrict: 'E',
        require : '^eaAccCoat',
        transclude: false,
        template: "<div>" +
                    "<a class='eaNoDeco' href='' ng-click='setVisible(this)'>" + 
                        "<h2>{{title}}" + 
                            "<span class='eaSwitch' ng-show='vis_{{accIdx}}'>-</span>" + 
                            "<span class='eaSwitch' ng-show='!vis_{{accIdx}}'>+</span>" + 
                        "</h2>" + 
                    "</a>" + 
                    "<div ng-show='!vis_{{accIdx}}'>{{txt}}</div>" + 
                    "<div ng-show='vis_{{accIdx}}'>" + 
                        "<ea-transclude>" + 
                        "</ea-transclude>" + 
                    "</div>" + 
                  "</div><hr />",
        scope: true,
        controller: function($scope, $rootScope) {
            let idx = $scope.$parent.$parent.accIdx + 1;
            $scope.$parent.$parent.accIdx = idx;
            $scope.accIdx = idx;
            if(idx===1) {
                $scope["vis_1"] = true;
            };            
            $scope.scope_eaAccKey_controller = idx;
            
            $rootScope.$on("setVisibleToNo", function(evt, opt) {
                if(opt!==idx) {
                    $scope["vis_" + idx.toString()] = false;
                }
            });
            
            $scope.setVisible = function(t) {
                let idx = t.accIdx;
                let varName = "vis_";
                if($scope[varName + idx.toString()]===true) {
                   $scope[varName + idx.toString()]=false; 
                } else {
                    $rootScope.$emit("setVisibleToNo", idx);
                    $scope[varName + idx.toString()] = true;
                };
                return false;
            };           
        },   // controller
        
        // scope,element,attrs,ctrl, transclude
        link: function (scope, ele, attrs) {      
            scope.title = attrs.title;
            scope.txtLen = attrs.txtLen;
            
            // put the code in the right place in the html document and run $compile()
            let newInnerHtml = scope.$parent.$parent.accKeysHtm[scope.accIdx - 1];
            let el = ele.find('ea-transclude');
            el.html(newInnerHtml);
            $compile(el.contents())(scope);
            
            if(scope.txtLen){
                let txt = el[0].innerText;
                if(txt) {
                    scope.txt = txt.substring(0, parseInt(scope.txtLen)) + " ...";
                }
            }
        }  // link
    };  // return
};   // eaAccKey()
