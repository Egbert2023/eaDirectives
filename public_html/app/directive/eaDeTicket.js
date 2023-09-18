'use strict';

var eaDeTicket = function () {
    return {
        restrict: 'A',
        replace: false,
        scope: false,

        controller: function($scope) {
            // https://github.com/sweetalert2/sweetalert2/issues/374
            // Solve the problem with the editability of input fields
            // angular.element().fn.modal.Constructor.prototype.enforceFocus = function () {};
                        
            $scope.ticket = {};
            $scope.actIdx = -1;
            $scope.showEditLevel = "";
            $scope.settings = {};
            $scope.demoToday = new Date();
            $scope.defaultStartTime = "";
            $scope.defaultEndTime = "";
            
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
            
            var getLocalDatTime = function(sDate, sTime) {
                let dt = new Date(sDate + sTime);
                const myTimeOffset = dt.getTimezoneOffset();
                dt.setMinutes(dt.getMinutes() +  myTimeOffset);
                return dt;
            };
            
            var setDefaultingTicket = function(ticket) {
                // fill date from settings
                //ticket.type = $scope.provideObj.settings.defaultType;   
                ticket.type = $scope.settings.defaultType;   
                ticket.initType = ticket.type;  
                // get index for default ticket type and read the current price
                //let idx = $scope.provideObj.settings.types.map(function(o) {return o.key;}).indexOf(ticket.type);
                let idx = $scope.settings.types.map(function(o) {return o.key;}).indexOf(ticket.type);
                ticket.price = $scope.provideObj.settings.types[idx].price;
                
                // get all tickets from newTickets
                //let tickets = $scope.provideObj.tickets;
                let tickets = $scope.objNewArr;
                
                // compute max date 
                // max of all end dates + today + new start day
                //let forMaxDate = tickets.endDate.push($scope.demoToday);
                
                
                
                let maxDate = new Date(Math.max.apply(null, tickets.map(e => new Date(e.endDate + $scope.defaultEndTime))));
                const myTimeOffset = maxDate.getTimezoneOffset();
                maxDate.setMinutes(maxDate.getMinutes() +  myTimeOffset);
                ticket.startDate = $scope.getDateString(maxDate);
                                                
                // compute end date 
                let eDate = computeEndDateTime(maxDate, ticket.type);
                ticket.endDate = $scope.getDateString(eDate);
                                
                return ticket;
            };
            
            var computeEndDateTime = function(startDateTime, type) {
                let sDate = startDateTime; 
                let dif =  getPeriod(type);
                let eDate = new Date();
                eDate.setTime(sDate.getTime() + dif*60*60*1000);
                return eDate;
            };
            
            // Scope functions for using on html pages
            $scope.isEdit = function(sD) {
               let ret = false;
               let td = $scope.getDateString($scope.demoToday);
               if(sD==="" || sD >= td) {
                   ret = true;
               }                
               return ret;
            };            
            
            $scope.addObjRow = function() {
                let newTicket = $scope.cloneObj($scope.objZero);
                newTicket = setDefaultingTicket(newTicket);
                $scope.objNewArr.push(newTicket);
                $scope.saveObj();
                
                return false;
            };
            
            // Open the Modal
            $scope.openModalTicket = function(idx) {
                $scope.actIdx = idx;
                let docModal = document.getElementById("myModalTicket");
                let ele = {};
                if(docModal !== null) {
                    docModal.style.display = "block";
                            
                    // fill data
                    $scope.ticket = $scope.cloneObj($scope.objNewArr[idx]);                    
                    let sDate = getLocalDatTime($scope.ticket.startDate, $scope.defaultStartTime);
                    let eDate = getLocalDatTime($scope.ticket.endDate, $scope.defaultEndTime);
                    $scope.ticket.startDate = sDate;
                    $scope.ticket.endDate = eDate;                                        
                                        
                    // https://github.com/sweetalert2/sweetalert2/issues/374
                    // you can usually solve bootstrap modal focus issues by 
                    // disabling the focus enforcement
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
            
            // Save and close the modal 
            $scope.saveModalTicket = function() {
                // $scope.actIdx
                if($scope.actIdx>-1) {
                    //$scope.objNewArr[$scope.actIdx] = $scope.cloneObj($scope.ticket);
                    $scope.objNewArr[$scope.actIdx].type = $scope.ticket.type;
                    $scope.objNewArr[$scope.actIdx].initType = $scope.ticket.initType;
                    $scope.objNewArr[$scope.actIdx].startDate = $scope.getDateString($scope.ticket.startDate);
                                        
                    // compute endDate and endTime by type
                    if($scope.objNewArr[$scope.actIdx].startDate) {                        
                        let eDate = computeEndDateTime($scope.ticket.startDate, $scope.ticket.type);
                        $scope.objNewArr[$scope.actIdx].endDate = $scope.getDateString(eDate);
                    }        
                    $scope.settings.demoToday = $scope.demoToday.toISOString();
                }
                cleanTicket();
                $scope.closeModalTicket();
            };
        },
        
        link: function (scope, ele, attrs) {      
            scope.settings = scope.provideObj.settings;
            scope.demoToday = new Date(scope.settings.demoToday);          
            scope.defaultStartTime = scope.settings.defaultStartTime;
            scope.defaultEndTime = scope.settings.defaultEndTime;

                        
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