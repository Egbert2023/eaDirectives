'use strict';

var eaImgBox = function ($compile, $rootScope) {
    return {
        restrict: 'AE',
        replace: false,
        templateUrl: "app/template/imgBox.html",
        
        scope: true,

        controller: function($scope) {
            
            $scope.scope_eaImgBoxDirektive = $scope.url;    
            
            /* https://www.w3schools.com/howto/howto_js_lightbox.asp */
            
            // Initialisation
            $scope.slideIndex = 1;
            
            // listening to event "openModalImgBox" from directive "eaImg"
            $rootScope.$on("openModalImgBox", function(evt, opt) {
                // when opt.key is undefined then do not show scroll icons
                $scope.canScroll = (opt.key)? true : false;
                
                // compute modal inner HTML 
                let iHtml = $scope.getInnerHtml(opt);
                
                // init values
                $scope.imgArrLen = opt.imgArr.length;
                $scope.slideIndex = opt.imgBoxIdx;
                $scope.slideIndexOld = $scope.slideIndex;
                 
                // include iHtml into modal view
                let modalContentInner = document.getElementById("myModalContent");
                let ele = angular.element(modalContentInner);
                $scope.setInnerHtml(ele, iHtml, $scope, $scope.slideIndex);

                $scope.eleModalContent = ele;
              
                // open Modal
                $scope.openModal();
                $scope.currentSlide($scope.slideIndex);
                
                return false;
            });
            
            // Open the Modal
            $scope.openModal = function() {
                let docModal = document.getElementById("myModal");
                let ele = {};
                if(docModal !== null) {
                    docModal.style.display = "block";
                    
                    // Preparing to close the modal window with the ESC key    
                    ele = angular.element(docModal);
                    ele.bind("keydown keypress", function (event) {
                        if (event.which === 27) {
                            $scope.closeModal();  
                        }
                        event.preventDefault();
                    }); 
                };     
                
                // Set focus to docModal 
                // this is required for closing the modal window with the ESC key.
                let aDocModal = angular.element(docModal);
                aDocModal.ready(function() {
                    aDocModal[0].focus();
                });
                
                return false;
            };

            // Close the Modal
            $scope.closeModal = function () {
                let docModal = document.getElementById("myModal");
                if(docModal !== null) {
                    docModal.style.display = "none";
                }    
                return false;
            };

            // Next/previous controls
            $scope.plusSlides = function (n) {
                let sIdx = parseInt($scope.slideIndex);
                
                // Hide current picture
                let idNum = "imgNumber" + sIdx.toString();
                let idImg = "imgPicture" + sIdx.toString();
                let idImgBody = "imgBody" + sIdx.toString();
                let docNum = document.getElementById(idNum);
                let docImg = document.getElementById(idImg);
                let docImgBody = document.getElementById(idImgBody);
                if(docNum !== null) {docNum.style.display = "none";}
                if(docImg !== null) {docImg.style.display = "none";}
                if(docImgBody !== null) {docImgBody.style.display = "none";}

                // compute the new slideIndex
                let si = sIdx + parseInt(n);
                let len = parseInt($scope.imgArrLen);
                si = (si>len)? si-len : si;
                si = (si<1)? si+len : si;
                $scope.slideIndex = parseInt(si);
                
                // show new picture
                idNum = "imgNumber" + si.toString();
                idImg = "imgPicture" + si.toString();
                idImgBody = "imgBody" + si.toString();
                docNum = document.getElementById(idNum);
                docImg = document.getElementById(idImg);
                docImgBody = document.getElementById(idImgBody);
                if(docNum !== null) {docNum.style.display = "block";}
                if(docImg !== null) {docImg.style.display = "block";docImg.focus();}
                if(docImgBody !== null) {docImgBody.style.display = "block";}
                return false;
            };

            // Thumbnail image controls
            $scope.currentSlide = function (si) {
                $scope.slideIndex = si;
                
                let idNum = "imgNumber" + si.toString();
                let idImg = "imgPicture" + si.toString();
                let idImgBody = "imgBody" + si.toString();
                let docNum = document.getElementById(idNum);
                let docImg = document.getElementById(idImg);
                let docImgBody = document.getElementById(idImgBody);
                if(docNum !== null) {docNum.style.display = "block";}
                if(docImg !== null) {docImg.style.display = "block";}
                if(docImgBody !== null) {docImgBody.style.display = "block";}
                return docImg;
            };
  
            // compute the innerr HTML for modal picture viewer
            $scope.getInnerHtml = function(opt) {
                let imgArr = opt.imgArr;
                let imgBodyArr = opt.imgBodyArr;
                let len = imgArr.length;
                let iHtml = "";

                iHtml = '<div ><div class="mySlides" >' ;
                for(let i = 0; i<len; i++) {
                    let idx = i+1;
                    let ht = '<div id="imgNumber' + idx.toString() + '" class="numbertext eaImgBoxItem">' + idx.toString() + ' / ' + len.toString() + '</div>' + 
                            '<img id="imgPicture' + idx.toString() + '" ng-src="' + imgArr[i] + '" class="eaImgBoxItem img-fluid mx-auto" >';    
                    
                    let htt = "";
                    if(imgBodyArr[i]) {
                        htt = '<div id="imgBody' + idx.toString() + '" class="eaImgBody eaImgBoxItem">' + imgBodyArr[i] + '</div>';
                    }
                    
                    iHtml = iHtml + ht + htt;
                };
                iHtml = iHtml + '</div>';

                if($scope.canScroll){
                    iHtml = iHtml + '<!-- Next/previous controls -->' + 
                    '<a class="prev float-left" ng-click="plusSlides(-1)">&#10094;</a>' +
                    '<a class="next float-right" ng-click="plusSlides(1)">&#10095;</a>' ;
                };
                iHtml = iHtml + '</div>';
                
                return iHtml;
            };            
            
            $scope.setInnerHtml = function(ele, htm, scope,idx) {
                if(htm !== ""){
                    ele.html(htm);
                    
                    $compile(ele.contents())(scope);
                    scope.slideIndex = idx;
                }
                return false;
            };
        },   // controller
        
        link: function (scope, ele, attrs) {      
            scope.imgBoxKey = attrs.imgBoxKey;            
            if(scope.imgBoxKey !== undefined) {
                var obj = scope.imgBoxList.find(o => o.imgKey === scope.imgBoxKey); 
                scope.imgBoxArr = obj.imgList;
                scope.imgBodyArr = obj.imgBodyList;
                scope.imgBoxIdx = attrs.imgBoxIdx;
                scope.imgBoxImg = scope.imgBoxArr[scope.imgBoxIdx-1];
            } else {
                scope.imgBoxArr = [];
                scope.imgBoxArr.push(attrs.imgArr);
                scope.imgBoxIdx = 1;
                scope.imgBodyArr = [""];
                scope.imgBoxImg = scope.imgBoxArr[0];
            } // if(scope.imgBoxKey !== undefined)
        }  // link
    };  // return
};   // eaImgBox()

