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
            
            var cleanTicket = function() {
                $scope.ticket = {};
                $scope.actIdx = -1;
            };
            
            // Open the Modal
            $scope.openModalTicket = function(idx) {
                $scope.actIdx = idx;
                let docModal = document.getElementById("myModalTicket");
                let ele = {};
                if(docModal !== null) {
                    docModal.style.display = "block";
                            
                    // fill data
                    //$scope.ticket = $scope.objNewArr[idx];
                    $scope.ticket = $scope.cloneObj($scope.objNewArr[idx]);
                    $scope.ticket.startDate = new Date($scope.ticket.startDate);
                    $scope.ticket.endDate = new Date($scope.ticket.endDate);
                    $scope.ticket.startTime = new Date("2000-0101T"+$scope.ticket.startTime);
                    $scope.ticket.endTime = new Date("2000-0101T"+$scope.ticket.endTime);
                            
                    // Preparing to close the modal window with the ESC key    
                    ele = angular.element(docModal);
                    
                    // https://github.com/sweetalert2/sweetalert2/issues/374
                    // you can usually solve bootstrap modal focus issues by disabling the focus enforcement
                    if(ele) {
                        if(ele.fn) {
                            ele.fn.modal.Constructor.prototype.enforceFocus = function () {}; 
                        }                        
                    }    
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
                    $scope.objNewArr[$scope.actIdx] = $scope.cloneObj($scope.ticket);
                    $scope.objNewArr[$scope.actIdx].startDate = $scope.getDateString($scope.objNewArr[$scope.actIdx].startDate);
                    $scope.objNewArr[$scope.actIdx].endDate = $scope.getDateString($scope.objNewArr[$scope.actIdx].endDate);
                    $scope.objNewArr[$scope.actIdx].startTime = $scope.getTimeString($scope.objNewArr[$scope.actIdx].startTime);
                    $scope.objNewArr[$scope.actIdx].endTime = $scope.getTimeString($scope.objNewArr[$scope.actIdx].endTime);
                }
                cleanTicket();
                $scope.closeModalTicket();
            };
        },
        
        link: function (scope, ele, attrs) {      
            let temp = attrs;
                        
            // Test EA
            console.log("scope");
            console.log(scope);
            console.log("ele");
            console.log(ele);
            console.log("attrs");
            console.log(attrs);
        }
    };
};