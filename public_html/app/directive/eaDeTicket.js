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
            $scope.ticketsSuggestion = [];
            $scope.actIdx = -1;
            $scope.showEditLevel = "";
            $scope.settings = {};
            $scope.demoToday = new Date();
            $scope.defaultStartTime = "";
            $scope.defaultEndTime = "";
            
            // local functions
            var cleanTicket = function() {
                $scope.ticket = {};
                $scope.ticketsSuggestion = [];
                $scope.actIdx = -1;
            };
            
            var getPeriodByType = function(type) {
                let ret = "d";
                let types = $scope.provideObj.settings.types;
                
                for(let i=0; i<types.length; i++) {
                    if(types[i]) {
                        if(types[i].type === type) {
                            ret = types[i].period; // have add as houers
                        }
                    }
                }                
                return ret;
            };
            
            var getPriceByType = function(type) {
                let ret = 0.0;
                let types = $scope.provideObj.settings.types;
                for(let i=0; i<types.length; i++) {
                    if(types[i]) {
                        if(types[i].type === type) {
                            ret = parseFloat(types[i].price); 
                        }
                    }
                }   
                return ret;
            };
            
            var getLocalDateTime = function(sDate, sTime) {
                let dt = new Date(sDate + sTime);
                const myTimeOffset = dt.getTimezoneOffset();
                dt.setMinutes(dt.getMinutes() + myTimeOffset);
                return dt;
            };
            
            var dateToStrDateObj = function(dateObj) {
                let strDateObj = {  initType  : dateObj.initType,
                                    type      : dateObj.type,
                                    startDate : dateObj.startDate.toISOString().substring(0,10),
                                    endDate   : dateObj.endDate.toISOString().substring(0,10),
                                    price     : dateObj.price,
                                    paid      : dateObj.paid};
                return strDateObj;
            };            
            
            var setDefaultingTicket = function(ticket) {
                // fill date from settings
                ticket.type = $scope.settings.defaultType;   
                
                // get all tickets from newTickets
                let tickets = $scope.objNewArr;
                
                // reads the last type used
                let lastType = tickets[tickets.length - 1].type;
                if(lastType) {
                    ticket.type = lastType;
                }
                ticket.initType = ticket.type;  
                ticket.paid = "false";
                                 
                // get index for default ticket type and read the current price
                //let idx = $scope.provideObj.settings.types.map(function(o) {return o.type;}).indexOf(ticket.type);
                let idx = $scope.settings.types.map(function(o) {return o.type;}).indexOf(ticket.type);
                ticket.price = $scope.provideObj.settings.types[idx].price;
                                
                // compute max date 
                // max of all end dates + today 
                //let forMaxDate = tickets.endDate.push($scope.demoToday);
                let forMaxDate = [];
                for(let i=0; i<tickets.length; i++) {
                    forMaxDate.push(tickets[i].endDate);
                }
                let td = $scope.getDateString($scope.demoToday);
                forMaxDate.push(td);
                
                //let maxDate = new Date(Math.max.apply(null, tickets.map(e => new Date(e.endDate + $scope.defaultEndTime))));
                let maxDate = new Date(Math.max.apply(null, forMaxDate.map(e => new Date(e + $scope.defaultEndTime))));
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
                let dif =  getPeriodByType(type);
                let eDate = new Date();
                eDate.setTime(sDate.getTime() + dif*60*60*1000);
                return eDate;
            };
            
            var checkForTickets = function(ticket) {
                // 1. get periods of all ticket type more than given ticket type
                // 2. find out all the tickets you have already paid for 
                //      (for every object in checkArr by data range)
                // 3. compute the total price of this tickets by type
                // 4. compare this total with the price of the next ticket type
                // 5. Present the results of the comparison if the next ticket type 
                //    were cheaper or valid for longer
                                
                // 1. --> checkArr[] all relevant types with period
                let types = $scope.settings.types;
                let actType = ticket.type;
                let actPeriod = getPeriodByType(actType);
                let checkArr = [];
                let ticketsSuggestion = [];
                let strTicket = dateToStrDateObj(ticket);
                ticketsSuggestion.push(strTicket);
                types.forEach(o => {
                    if(parseInt(o.period) > parseInt(actPeriod)) {
                        checkArr.push(o);
                    }                    
                });

                // 2. find out all the tickets you have already paid for 
                //    (for every object in checkArr inner the data range)
                let startDate = new Date();
                let totalPrice = 0;
                let getDateRange = function(lastStartDate, ck, retObj) {
                    let tickets = $scope.objNewArr;
                    let firstStartDate = new Date();
                    let period = ck.period;
                    let type = ck.type;
                    let ret = false;
                    firstStartDate.setTime(lastStartDate.getTime() - parseInt(period)*60*60*1000);
                    
                    // 3. compute the total price of this tickets by type
                    // fictional start date for the new ticket type  
                    for(let idx=0; idx<tickets.length; idx++) {
                        let localDateTime = getLocalDateTime(tickets[idx].startDate, $scope.defaultStartTime);
                        if(localDateTime >= firstStartDate) {
                            if(tickets[idx].paid === "true") {
                                if(!ret) {
                                    startDate = tickets[idx].startDate;
                                    //startDate = ticket.startDate.toISOString().substring(0,10);
                                }
                                totalPrice = totalPrice + parseFloat(tickets[idx].price);
                                ret = true;
                            }
                        }                        
                    }    
                    // 4. compare this total with the price of the next ticket type
                    if(ret) {
                        retObj.initType = ticket.initType;
                        retObj.type = type;
                        retObj.startDate = startDate;
                        
                        let startDateTime = new Date(startDate + $scope.defaultStartTime);                        
                        retObj.endDate = computeEndDateTime(startDateTime, type).toISOString().substring(0,10);
                        retObj.price = ticket.price;
                        
                        retObj.paid = "true";
                        return retObj;
                    }                    
                    return undefined;
                };
                // 5. Present the results of the comparison if the next ticket type 
                //    were cheaper or valid for longer -> ticketsSuggestion
                for(let idx=0; idx<checkArr.length; idx++) {
                    // startDate, totalPrice in the range
                    // {"initType": "d", "type": "d", "startDate": "2023-08-26", "endDate": "2023-08-27", "price": "3,00", "paid" : "true"}
                    let retObj = {"initType": "", "type": "", "startDate": "", "endDate": "", "price": "", "paid" : "false"};
                    let lastStartDate = new Date();
                    lastStartDate = getLocalDateTime(ticket.startDate.toISOString().substring(0,10), $scope.defaultStartTime);
                    retObj = getDateRange(ticket.startDate, checkArr[idx], retObj);
                    if(retObj) {
                        if(totalPrice > parseFloat(checkArr[idx].price)) {
                            let newObj = $scope.cloneObj(retObj);
                            ticketsSuggestion.push(newObj);
                        }
                    }
                }                
                return ticketsSuggestion;
            };
            
            var payTicket = function(ticket) {
                let pay = function(t,f) {
                    // wrapper for pay
                    f(t);
                };
                let callBack = function(ticket){
                    ticket.paid = "true";
                    return false;
                };
                pay(ticket, callBack);
                return false;
            };
            
            
            // Scope functions for using on html pages
            $scope.setPriceByType = function(type) {
                $scope.ticket.price = getPriceByType(type).toString();
                return false;
            };            
            
            $scope.addDays = function(d, n) {
                let dt = new Date(d);
                dt.setTime(dt.getTime() + (n*24*60*60*1000));
                return dt;
            };
            
            $scope.isEdit = function(sD) {
               let ret = false;
               let td = $scope.getDateString($scope.demoToday);
               if(sD==="" || sD >= td) {
                   ret = true;
               }                
               return ret;
            };      
            
            $scope.isPaid = function(idx) {
                let ret = false;
                if($scope.objNewArr[idx].paid === "true") {
                    ret = true;
                }                
                return ret;
            };
            
            $scope.addObjRow = function() {
                let newTicket = $scope.cloneObj($scope.objZero);
                newTicket = setDefaultingTicket(newTicket);
                $scope.objNewArr.push(newTicket);
                //$scope.saveObj();
                
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
                    let sDate = getLocalDateTime($scope.ticket.startDate, $scope.defaultStartTime);
                    let eDate = getLocalDateTime($scope.ticket.endDate, $scope.defaultEndTime);
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
            
            // Save and close the modal or call $scope.selectModalTicket()
            $scope.saveModalTicket = function() {
                let initStartDateStr = $scope.objNewArr[$scope.objNewArr.length - 1].startDate;
                if($scope.actIdx>-1) {
                    $scope.objNewArr[$scope.actIdx].type = $scope.ticket.type;
                    $scope.objNewArr[$scope.actIdx].initType = $scope.ticket.initType;
                    $scope.objNewArr[$scope.actIdx].startDate = $scope.getDateString($scope.ticket.startDate);
                    $scope.objNewArr[$scope.actIdx].paid = "true";     
                    
                    // compute endDate and endTime by type
                    if($scope.objNewArr[$scope.actIdx].startDate) {                        
                        let eDate = computeEndDateTime($scope.ticket.startDate, $scope.ticket.type);
                        $scope.objNewArr[$scope.actIdx].endDate = $scope.getDateString(eDate);
                    }        
                    $scope.settings.demoToday = $scope.demoToday.toISOString();
                    
                    // This is a simulation for pay the ticket.
                    $scope.ticket.paid = "true";
                    $scope.ticketsSuggestion = checkForTickets($scope.ticket);
                }
                
                // If there is more than one return value in the 
                // array $scope.ticketsSuggestion, then the modal window will not close.
                // Then select a ticket in the modal window and function 
                // $scope.selectModalTicket() is used. 
                // The user decides whether he wants to book the initially 
                // selected ticket or choose the next ticket type
                if($scope.ticketsSuggestion) {
                    for(let idx=0; idx<$scope.ticketsSuggestion.length; idx++) {
                        $scope.ticketsSuggestion[idx].startDate = initStartDateStr;
                    }
                    if($scope.ticketsSuggestion.length <= 1) {
                        cleanTicket();
                        $scope.closeModalTicket();        
                    }
                } else {
                    cleanTicket();
                    $scope.closeModalTicket();    
                }
            };
            
            // selects a ticket if more than one is possible            
            $scope.selectModalTicket = function(idx) {
                let startDateStr = $scope.ticketsSuggestion[0].startDate;
                let ticket = $scope.ticketsSuggestion[idx];
                $scope.objNewArr[$scope.actIdx].type = ticket.type;
                $scope.objNewArr[$scope.actIdx].initType = ticket.initType;
                $scope.objNewArr[$scope.actIdx].startDate = ticket.startDate;
                                
                // compute endDate and endTime by type
                if($scope.objNewArr[$scope.actIdx].startDate) {   
                    let startDateTime = new Date(ticket.startDate + $scope.defaultStartTime);
                    let eDate = computeEndDateTime(startDateTime, ticket.type);
                    
                    // paying is open now
                    $scope.objNewArr[$scope.actIdx].paid = "false";
                    
                    $scope.objNewArr[$scope.actIdx].endDate = $scope.getDateString(eDate);
                    $scope.objNewArr[$scope.actIdx].startDate = startDateStr;
                    
                    payTicket($scope.objNewArr[$scope.actIdx]);
                }                   
                cleanTicket();
                $scope.closeModalTicket();    
            };      
            
            $scope.deleteUnPaid = function(f) {
                let ar = [];
                for(let idx = 0; idx<$scope.objNewArr.length; idx++) {
                    if($scope.objNewArr[idx].paid === "false") {
                        //$scope.objNewArr.splice(idx, 1);
                        ar.push(idx);
                    }                    
                }
                for(let idx=ar.length-1; idx>=0; idx--) {
                    $scope.objNewArr.splice(ar[idx], 1);
                }                
                f();
                return false;
            };
        },
        
        link: function (scope, ele, attrs) {      
            scope.settings = scope.provideObj.settings;
            scope.demoToday = new Date(scope.settings.demoToday);          
            scope.defaultStartTime = scope.settings.defaultStartTime;
            scope.defaultEndTime = scope.settings.defaultEndTime;

                        
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