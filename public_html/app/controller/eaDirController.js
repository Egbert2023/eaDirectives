'use strict';

var eaDirController =  function($rootScope, $scope, navSrv) {
    $scope.navSrv = navSrv;
    $scope.scope_webInfoController = $scope.url;
        
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
    
    // Function for 'eaNavi' directive
    // +/- Toggle for close menu on select page when smal display is used
    $scope.toggleMenu = function() {
        let x = document.getElementById("myToogle");
        if(x.parentNode){
            if(x.parentNode.nextElementSibling){
                if(x.parentNode.nextElementSibling.classList){
                    if(x.parentNode.nextElementSibling.classList.length > 2){
                        x.click();
                    }
                }
            }            
        };        
    };
    
    // Download siteMap.xml and siteMapImages.xml to download folder on local;
    // is used on siteMap.html page only with url-param '?Admin'
    $scope.downloadSiteMaps = function() {        
        // init params
        let sm = {"siteMap":"", "siteMapImg": ""};
        sm = $scope.navSrv.computeSiteMaps($rootScope);
        
        // define a help function
        var dwn = function(fileName, xml) {
            //https://stackoverflow.com/questions/5143504/how-to-create-and-download-an-xml-file-on-the-fly-using-javascript
            let a = document.createElement('a');
            var bb = new Blob([xml], {type: 'text/plain'});
            
            a.setAttribute('href', window.URL.createObjectURL(bb));
            a.setAttribute('download', fileName);
            a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
            a.draggable = true; 
            a.classList.add('dragout');
            a.click();
        };
        
        // do action
        dwn("sitemap.xml", sm.siteMap);
        dwn("sitemapimages.xml", sm.siteMapImg);
    };        
    // Check if application is started with parameter - ?Admin
    // Used for download siteMap.xml and siteMapImages.xml on siteMap.html page
    $scope.getUrlParam = function() {
        let loc = window.location;
        let href = loc.href;
        let arr = href.split("?");
        let ret = (arr.length>0)? arr[1] : "";
        return ret;        
    };
    
    return false;
};
