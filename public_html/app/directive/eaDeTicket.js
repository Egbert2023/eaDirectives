'use strict';

var eaDeTicket = function ($compile, $rootScope) {
    return {
        restrict: 'A',
        replace: false,
        scope: false,

        controller: function($scope) {
            
            // Open the Modal
            $scope.openModalTicket = function(idx) {
                
                $scope.ticket = $scope.objNewArr[idx];
                
                let docModal = document.getElementById("myModalTicket");
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
            $scope.closeModalTicket = function () {
                let docModal = document.getElementById("myModalTicket");
                if(docModal !== null) {
                    docModal.style.display = "none";
                }    
                return false;
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