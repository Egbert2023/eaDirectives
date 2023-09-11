'use strict';

var eaDeTicket = function ($compile, $rootScope) {
    return {
        restrict: 'A',
        replace: false,
        scope: false,

        controller: function($scope) {
            // https://github.com/sweetalert2/sweetalert2/issues/374
            //angular.element().fn.modal.Constructor.prototype.enforceFocus = function () {};
                        
            $scope.ticket = {};
            $scope.actIdx = -1;
            $scope.showEditLevel = "";
            $scope.settings = {};
            $scope.demoToday = new Date();
            
            // new Date($scope.ticket.startDate+"T"+$scope.ticket.startTime);
            
            // local functions
            var cleanTicket = function() {
                $scope.ticket = {};
                $scope.actIdx = -1;
            };
            var getPeriod = function(type) {
                let ret = "T";
                let types = $scope.provideObj.settings.types;
                
                for(let i=0; i<types.length; i++) {
                    if(types[i]) {
                        if(types[i].key === type) {
                            ret = types[i].period; // have add as houers
                        }
                    }
                }                
                return ret;
            };
            
            // Scope functions for using on html page
            // Open the Modal
            $scope.openModalTicket = function(idx) {
                $scope.actIdx = idx;
                let docModal = document.getElementById("myModalTicket");
                let ele = {};
                if(docModal !== null) {
                    docModal.style.display = "block";
                            
                    // fill data
                    $scope.ticket = $scope.cloneObj($scope.objNewArr[idx]);
                    let sDate = new Date($scope.ticket.startDate+"T"+$scope.ticket.startTime);
                    let eDate = new Date($scope.ticket.endDate+"T"+$scope.ticket.endTime);
                    $scope.ticket.startDate = sDate;
                    $scope.ticket.startTime = sDate;
                    
                    // https://github.com/sweetalert2/sweetalert2/issues/374
                    // you can usually solve bootstrap modal focus issues by disabling the focus enforcement
                    ele = angular.element(docModal);
                    if(ele) {
                        if(ele.fn) {
                            ele.fn.modal.Constructor.prototype.enforceFocus = function () {}; 
                        }                        
                    }    
                };     
                
                // Set focus to docModal 
                let aDocModal = angular.element(docModal);
                aDocModal.ready(function() {
                    aDocModal[0].focus();
                });
                
                return false;
            };
            
            // Close the Modal
            $scope.closeModalTicket = function () {
                let docModal = document.getElementById("myModalTicket");
                if(docModal !== null) {
                    docModal.style.display = "none";
                }    
                return false;
            };
            
            $scope.saveModalTicket = function() {
                // $scope.actIdx
                if($scope.actIdx>-1) {
                    //$scope.objNewArr[$scope.actIdx] = $scope.cloneObj($scope.ticket);
                    $scope.objNewArr[$scope.actIdx].startDate = $scope.getDateString($scope.ticket.startDate);
                    $scope.objNewArr[$scope.actIdx].startTime = $scope.getTimeString($scope.ticket.startTime);
                    
                    // compute endDate and endTime by type
                    if($scope.objNewArr[$scope.actIdx].startTime) {
                        let eDate = $scope.ticket.startTime; 
                        let dif =  getPeriod($scope.ticket.type);
                        eDate.setTime(eDate.getTime() + dif*60*60*1000);
                        $scope.objNewArr[$scope.actIdx].endDate = $scope.getDateString(eDate);
                        $scope.objNewArr[$scope.actIdx].endTime = $scope.getTimeString(eDate);
                    }        
                    
                    //$scope.demoToday = new Date($scope.settings.demoToday+"T"+$scope.ticket.startTime);
                    $scope.settings.demoToday = $scope.getDateString($scope.demoToday);
                }
                cleanTicket();
                $scope.closeModalTicket();
            };
        },
        
        link: function (scope, ele, attrs) {      
            scope.settings = scope.provideObj.settings;
            scope.demoToday = new Date(scope.settings.demoToday+"T08:00:00");          
            
                        
//            // Test EA
//            console.log("scope");
//            console.log(scope);
//            console.log("ele");
//            console.log(ele);
//            console.log("attrs");
//            console.log(attrs);
        }
    };
};