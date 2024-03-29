'use strict';

var eaNews = function ( $rootScope ) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: "app/template/news/newPart.html",
        
        // local scope
        scope: true,

        controller: function($scope) {
            $scope.scope_eaNewsDirektive = $scope.url;    

            // get al params
            $scope.newsAll = $rootScope.newsList;            
            
            var varName = "vis_";

            // Functions for 'eaNews' directive
            $scope.isNew = function(d) {
                var ret = false;
                let yourDate = new Date();
                let yy = yourDate.toISOString().split('T')[0];
                ret = (yy <= d.newTo)? true : false;   // to late
                ret = (yy >= d.newFrom)? ret : false;  // to early
                return ret;
            };
            $scope.isToEarly = function(d) {
                var ret = true;
                let yourDate = new Date();
                let yy = yourDate.toISOString().split('T')[0];
                ret = (yy < d.newFrom)? true : false;
                return ret;
            };   
            
            $scope.setVisible = function(t) {
                let idx = 0;   
                idx = t.$index + 1;   
                let av = $scope[varName + idx];
                
                for(let i=0; i<$scope.news.length; i++) {
                    $scope[varName + (i + 1).toString()]=false; 
                };                
                                
                $scope[varName + idx]=(av)? false: true; 

                return false;
            };           
        },   // controller
        
        // <ea-news data-news-title="News" 
        //          data-news-mode="all" | "new" | "arc"
        //          data-news-limit="0" | "1" | "2" ...
        //          data-news-init-idx = "0" | "1...n">
        //</ea-news>
        link: function (scope, ele, attrs) {      
            scope.title = attrs.newsTitle;
            let mode = attrs.newsMode;
            let limit = attrs.newsLimit;
            let initIdx = attrs.newsInitIdx;
            let txtLen = attrs.newsTxtLen;

            // compute current news
            // scope.mode==="all" then all without ToEarly
            // scope.mode==="new" then all by function isNew()
            // scope.mode==="arc" then all by function !isNew()
            switch(mode) {
                case "all": {
                   scope.news = scope.newsAll.filter(o => !scope.isToEarly(o));
                   break;
                }
                case "new": {
                   scope.news = scope.newsAll.filter(o => scope.isNew(o));
                   break;
                }
                case "arc": {
                   scope.news = scope.newsAll.filter(o => !scope.isNew(o));
                   break;
                }
                // default is mode==="new"
                default: {
                   scope.news = scope.newsAll.filter(o => {scope.isNew(o);});
                }
            }
            if(limit) {
                scope.news = scope.news.slice(0,limit);
            }
            if(initIdx) {
                let varName = "vis_";
                scope[varName + initIdx]=true; 
            }
           
            if(txtLen){
                scope.news.forEach(o => {
                    o.href = (o.href === "" || o.href.startsWith("app") || o.href.startsWith($rootScope.contentFolder))? o.href : $rootScope.contentFolder + o.href;
                    
                    o.txtShort = "";
                    let txt = "";
                    o.body.forEach(ob => {
                        o.txtShort = o.txtShort + ob.substring(0, parseInt(txtLen)) + " ";
                        txt = txt + ob;
                    });
                    o.txtShort = o.txtShort.trim();
                    let addTxt = (txt.length>parseInt(txtLen))? " ...":"";
                    o.txtShort = o.txtShort + addTxt;
                }); 
            }

        }
    };  // return
};   // eaNews()

