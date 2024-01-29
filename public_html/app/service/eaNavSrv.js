'use strict';

var getCurrentLink = function(rootScope, path) {
    //var naviList = getNaviList();
    //var naviList = rootScope.naviList;
    //let obj = {};
    let ret = [];
    let findLink = false;
    let naviList = rootScope.naviList;

    let computeLinkRec = function(naviList) {
        // unshift() instead of push() - add array element to start of array
        for (const o of naviList) {
            let obj = {label: o.label, href: o.href};

            if(!findLink) {
                if(o.href === '#!' + path) {
                    findLink = true;
                };
                if(o.subm !== undefined && !findLink) {
                    computeLinkRec(o.subm);
                }
            }            
            if(findLink) {
                ret.unshift(obj);
                break;
            }
        }
    };
    computeLinkRec(naviList);
    return ret;
};

// read the naviList.json file and creat a sitemap.xml into a variable siteMapXML.
// read the imgBoxList.json file and creat a sitemapimage.xml into a variable siteMapImageXML.
// exported to console.log().
// put this files to site root

var computeSiteMaps = function(rootScope) {
// Exampel of sitemap with images
//    <?xml version="1.0" encoding="UTF-8"?>
//    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
//      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
//      <url>
//        <loc>http://www.aleksander.de/index.html</loc>
//        <image:image>
//           <image:loc>http://www.aleksander.de/content/aleks/pictures/Mein-Apfelbaum.jpg</image:loc>
//           <image:title>Title of picture</image:title>
//        </image:image>
//        <lastmod>2023-03-04</lastmod>
//      </url>
//    </urlset>

// The function putUrlLoc fill out the array oImgKeyArray[] for use it 
// for generate SiteMapImage.xml
    var oImgKeyArray = [];
    var putUrlLoc = function(ob, sm) {
        ob.forEach(o => {
            let oImgKey = {};
            sm = sm + '\n\t<url>';
            sm = sm + '\n\t\t<loc>' + baseDoman + "/" + ((o.url==="" || o.url.startsWith("app"))? o.url : rootScope.contentFolder + o.url) + '</loc>';
            sm = sm + '\n\t\t<changefreq>weekly</changefreq>';
            sm = sm + '\n\t</url>';
            oImgKey.imgKey = o.imgKey;
            oImgKey.href = urlBase + o.href;
            oImgKeyArray.push(oImgKey);
            if(o.subm) {
                sm = putUrlLoc(o.subm, sm);
            };
        });
        return sm;
    }; // oImgKeyArray -->
    
    // before call the function putImgLoc(), call function putUrlLoc() 
    // for fill out the array oImgKeyArray[].
    var putImgLoc = function(oi, si) {
        let imgK = "";
        let href = "";
        oi.forEach(o => {
            imgK = o.imgKey.trim();
            if(imgK!=="") {
                href = "";
                let imgO = oImgKeyArray.find(h => h.imgKey===imgK);
                if(imgO) {
                    if(imgO.href){
                        href = imgO.href;            
                        for(let i=0; i<o.imgList.length; i++) {
                            si = si + '\n\t<url>';
                            si = si + '\n\t\t<loc>' + href + '</loc>';
                            si = si + '\n\t\t<image:image>';
                            si = si + '\n\t\t\t<image:loc>' + baseDoman + "/" + 
                                 rootScope.contentFolder +  o.imgList[i] +'</image:loc>';
                            if(o.imgBodyList[i]){
                                si = si + '\n\t\t\t<image:title>' + o.imgBodyList[i] +'</image:title>';
                            };
                            si = si + '\n\t\t</image:image>';
                            si = si + '\n\t</url>';
                        }
                    };      
                }
            }            
        });
        return si;
    };

    let addNewToNaviList = function(nw) {
        nw.forEach(o => {
            let oEntr = {};
            oEntr.url = o.href;
            oEntr.imgKey = o.imgKey;
            oEntr.href = newUrl;
            if(o.href !== "") {
                naviList.push(oEntr);
            }
        });        
    };

    let contentFolder = rootScope.contentFolder;
    
    let siteMaps = {"siteMap":"", "siteMapImg": ""};
    let naviList = rootScope.naviList;
    let newUrl = rootScope.paramsApp.newUrl;
    addNewToNaviList(rootScope.newsList);
    let imgBoxList = rootScope.imgBoxList;
    
    // get params from naviList
    let baseDoman = rootScope.paramsApp.baseDoman;
    let startFile = rootScope.paramsApp.startFile;
    let urlBase = baseDoman + "/" + startFile;
    
        
    let sm  = '<?xml version="1.0" encoding="UTF-8"?>';
    sm = sm + '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    sm = putUrlLoc(naviList, sm);
    sm = sm + '\n</urlset>';

    let smi  = '<?xml version="1.0" encoding="UTF-8"?>';
    smi = smi + '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    smi = smi + '\n\t\t xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';
    smi = putImgLoc(imgBoxList, smi);
    smi = smi + '\n</urlset>';
    
    siteMaps.siteMap = sm;
    siteMaps.siteMapImg = smi;
    return siteMaps;
};