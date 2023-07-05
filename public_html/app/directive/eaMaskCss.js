'use strict';

var eaMaskCss = function () {
  return {
    restrict: 'A',
    // global scope, so will use the same $scope as the parent directive
    scope: false,
    
    controller: function($scope) {
        
        let deliFlag = false;       // Global delimiter flag
        let bracketFlag = false;    // Global bracked flag

        $scope.rowChange = function(code) {
            // Rows with delimiter from /* to */are lightgrey
            const start = /[\s]{0,1}[/][\*]/g;
            const end = /[\*][/]/g;
            const endComma = /[,]$/g;
            let matchStart = code.match(start);
            let matchEnd = code.match(end);
            let reg = /\/\*/;
            
            let innerRowChangeCss = function(code) {
                const spe = "</span>";
                let ret = code;

                // All texts ended with , are green
                let matchEndComma = code.match(endComma);
                if(matchEndComma) {
                    ret = "<span style='color: green;'>" + code + spe;
                    return ret; 
                }
                
                // Words ended with ":" are blue
                const attri = /[\w-\*,]+:[,#.()\s]/g;
                ret = ret.replace(attri, o => "<span style='color: blue;'>" + o + spe);       
                                
                return ret; 
            };

            let innerRowSetCollor = function (code, collor) {
                const spe = "</span>";
                let ret = code;
                ret = "<span style='color: " + collor + ";'>" + code + spe;
                return ret; 
            };

            const spe = "</span>";
            let ret = code;            
                
            if(matchStart && matchEnd) {
                deliFlag = false;
                let row2 = code.split(reg);
                ret = "";
                if(row2[0]) {
                    if(row2[0].trim()!=="") {
                        ret = innerRowChangeCss(row2[0]);
                        
                        if(row2[1]) {
                            if(row2[1].trim()!=="") {
                                ret = ret + "<span style='color: lightgrey;'>" + "/*" + row2[1] + spe;
                                return ret;
                            }
                        }        
                    }
                }
                ret = ret + "<span style='color: lightgrey;'>" + code + spe;
                return ret; 
            }
            if(matchStart && !matchEnd) {
                deliFlag = true;                
                let row2 = code.split(reg);
                ret = "";
                if(row2[0]) {
                    if(row2[0].trim()!=="") {
                        ret = innerRowChangeCss(row2[0]);
                        
                        if(row2[1]) {
                            if(row2[1].trim()!=="") {
                                ret = ret + "<span style='color: lightgrey;'>" + "/*" + row2[1] + spe;
                                return ret;
                            }
                        }        
                    }
                }                
                //ret = "<span style='color: lightgrey;'>" + code + spe;
                return ret; 
            }
            if(!matchStart && matchEnd) {
                deliFlag = false;
                if(code.trim()!== "") {
                    ret = "<span style='color: lightgrey;'>" + code + spe;
                }
                return ret; 
            }
            if(deliFlag) {
                ret = "<span style='color: lightgrey;'>" + code + spe;
                return ret; 
            }
            
            // row is inner {}, code before '{' is blue
            const bracketStart = /[{]/g;
            const bracketEnd = /[}]/g;
            let matchStartBr = code.match(bracketStart);
            let matchEndBr = code.match(bracketEnd);
            const matchBetween = /(?<={)(.*?)(?=})/g;
            
            if(matchStartBr && matchEndBr) {
                let ln = code.split(matchStartBr);
                ret = innerRowSetCollor(ln[0], "green");
                //ret = "";
                let km = "";
                let tmp = code.match(matchBetween);
                if(tmp) {
                    ret = ret + "{";
                    for(let i=0;i<tmp.length;i++) {
                        ret = ret + km + innerRowChangeCss(tmp[i]);
                        km = "}{";
                    }
                    ret = ret + "}";
                }                
                return ret;
            }
            
            if(matchStartBr && !matchEndBr) {
                let row2 = code.split("{");
                if(row2[0]) {
                   ret = "<span style='color: green;'>" + row2[0] + "{" + spe;
                }
                bracketFlag = true;
                if(row2[1]) {
                   //ret = ret + "{" + innerRowChangeCss(row2[1]);
                   ret = ret + innerRowChangeCss(row2[1]);
                }
                return ret;
            }
            if(!matchStartBr && matchEndBr) {
                let row2 = code.split("}");
                if(row2[0]) {
                   if(row2[0].trim() !== "") {
                       ret = innerRowChangeCss(row2[0]) + "}";
                   } 
                }
                bracketFlag = false;
                if(row2[1]) {
                    if(row2[1].trim() !== "") {
                        ret = ret + innerRowChangeCss(row2[1]);
                    }                    
                }
                return ret;
            }
            if(bracketFlag) {
                ret = innerRowChangeCss(code);
                return ret; 
            }

            // All texts ended with , are green
            let matchEndComma = code.match(endComma);
            if(matchEndComma) {
                ret = "<span style='color: green;'>" + code + spe;
                return ret; 
            }

            // All texts outher {} are green
            if(code.trim()!=="") {
                ret = "<span style='color: green;'>" + code + spe;
            }
            return ret; 
        };        
        
    }
  };
};