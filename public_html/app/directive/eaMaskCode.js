'use strict';

var eaMaskCode = function ($compile) {
  return {
    restrict: 'E',
    replace: true,
        
    // local scope
    scope: true,
    
    controller: function($scope) {
        let rowChangeHtml = function(htm) {
            const lt = "<";
            const gt = ">";
            const bl = " ";
            const nl = "\n";
            const spa = "<span>";
            const spe = "</span>";
            let ret = htm.replaceAll(lt, '&lt;');
            ret = ret.replaceAll(gt, '&gt;');
            
            // change all ' to "
            const tag0 = /[']/g;
            ret = ret.replace(tag0, o => '"');
            
            // attributes are red
            const tag2 = /[\s][\w-]+=/g;
            //let test = ret.match(tag2);
            ret = ret.replace(tag2, o => "<span style='color:red;'>" + o + spe);

            // attribute values are green
            const tag3 = /"[\w:,;\-# ]+"*/g;
            ret = ret.replace(tag3, o => "<span style='color:green;'>" + o + spe);

            // Tags are blue
            const tag1 = /&lt;[\w-]+|&gt;|&lt;[/][\w-]+&gt;/g;
            ret = spa + ret + spe;
            ret = ret.replace(tag1, o => spe + "<span style='color:blue;'>" + o + spe + spa);
            
            return ret;
        };
        
        let rowChangeJs = function(code) {
            const spe = "</span>";
            let ret = code;
            
            const jsReservedWords = ["abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "instanceof", "int", "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"];
            //const jsObjectsPropertiesMethods = ["Array", "Date", "eval", "function", "hasOwnProperty", "Infinity", "isFinite", "isNaN", "isPrototypeOf", "length", "Math", "NaN", "name", "Number", "Object", "prototype", "String", "toString", "undefined", "valueOf"];
            const jsObjectsPropertiesMethods = ["Array", "Date", "eval", "hasOwnProperty", "Infinity", "isFinite", "isNaN", "isPrototypeOf", "length", "Math", "NaN", "name", "Number", "Object", "prototype", "String", "toString", "undefined", "valueOf"];
            const jsOtherReservedWords = ["alert", "all", "anchor", "anchors", "area", "assign", "blur", "button", "checkbox", "clearInterval", "clearTimeout", "clientInformation", "close", "closed", "confirm", "constructor", "crypto", "decodeURI", "decodeURIComponent", "defaultStatus", "document", "element", "elements", "embed", "embeds", "encodeURI", "encodeURIComponent", "escape", "event", "fileUpload", "focus", "form", "forms", "frame", "innerHeight", "innerWidth", "layer", "layers", "link", "location", "mimeTypes", "navigate", "navigator", "frames", "frameRate", "hidden", "history", "image", "images", "offscreenBuffering", "open", "opener", "option", "outerHeight", "outerWidth", "packages", "pageXOffset", "pageYOffset", "parent", "parseFloat", "parseInt", "password", "pkcs11", "plugin", "prompt", "propertyIsEnum", "radio", "reset", "screenX", "screenY", "scroll", "secure", "select", "self", "setInterval", "setTimeout", "status", "submit", "taint", "text", "textarea", "top", "unescape", "untaint", "window"];
            const jsAngularReservedWords = ["$scope", "$rootScope", "$route", "$routeChangeSuccess", "$provide", "$watch", "$watchCollection", "$apply", "$digest", "$evalAsync", "controller:", "template:", "templateUrl:", "link:", "scope:", "factory", "directive", "filter", "restrict:", "replace:", "scope:", "transclude:", "$emit", "$on"];
            const jsCommentStart = /\/\*|\/\*\*|\* |\*\//g;
            const jsCommentInner = /\/\//g;
            const jsCommentEnd = /\*\/*/g;
            
            // values in "" or '' are green
            const tag2 = /["'][\w \-,.:;#\+üöäß\/]+["']*/g;
            ret = ret.replace(tag2, o => "<span style='color:green;'>" + o + spe);
            
            // commands are grey
            let tag1 = code.match(jsCommentStart);
            if(tag1) {
                ret = ret.replace(ret, o => "<span style='color: lightgrey;'>" + o + spe);
            } else {
                tag1 = ret.split(jsCommentInner);
                ret = tag1[0];
                if(tag1.length>1) {
                    ret = tag1[0] + "<span style='color: lightgrey;'> //" + tag1[1] + spe;
                }
            }
            
            // reserved words are blue
            if (!ret.startsWith("<span style")) {
                tag1 = ret.split(jsCommentInner);
                if(tag1.length===1) {
                    for(let i=0; i<jsReservedWords.length; i++) {
                        ret = ret.replaceAll(jsReservedWords[i], "<span style='color: blue;'>" + jsReservedWords[i] + spe);
                    }
                }
            }
            
            // reserved objects, properties and methods are red
            if (!ret.startsWith("<span style")) {
                tag1 = ret.split(jsCommentInner);
                if(tag1.length===1) {
                    for(let i=0; i<jsObjectsPropertiesMethods.length; i++) {
                        ret = ret.replaceAll(jsObjectsPropertiesMethods[i], "<span style='color: red;'>" + jsObjectsPropertiesMethods[i] + spe);
                    }
                }
            }
            
            // AngularJs reserved words are maroon
            if (!ret.startsWith("<span style")) {
                tag1 = ret.split(jsCommentInner);
                if(tag1.length===1) {
                    for(let i=0; i<jsAngularReservedWords.length; i++) {
                        ret = ret.replaceAll(jsAngularReservedWords[i], "<span style='color: maroon;'>" + jsAngularReservedWords[i] + spe);
                    }
                }
            }

            // regular expressions are violet
            const tag3 = /[\/][\w\^\[\]\\\+\*]+\/[g]{0,1};/g;
            if (!ret.startsWith("<span style")) {
                tag1 = ret.split(jsCommentInner);
                if(tag1.length===1) {
                    ret = ret.replace(tag3, o => "<span style='color:violet;'>" + o + spe);
                }
            }
            return ret; 
        };
        
        let rowChangeJson = function(code) {
            const spe = "</span>";
            let ret = code;
            
            // values in "" are green
            const tag1 = /"[\w \-,.:;#\+üöäß\/]+"*/g;
            ret = ret.replace(tag1, o => "<span style='color:green;'>" + o + spe);
            
            // Limiter and delimiter are strong
            const tag2 = /[{\[\]}]+/g;
            ret = ret.replace(tag2, o => "<span style='font-weight: bold;'>" + o + spe);
            return ret; 
        };

        let deliFlag = false;
        let bracketFlag = false;

        let innerRowChangeCss = function(code) {
            const spe = "</span>";
            let ret = code;
            
            return ret; 
        };

        let rowChangeCss = function(code) {
            const spe = "</span>";
            let ret = code;
            
            // Rows with delimiter from /* to */are lightgrey
            const start = /[\s]{0,1}[/][\*]/g;
            const end = /[\*][/]/g;
            let matchStart = code.match(start);
            let matchEnd = code.match(end);
                        
            if(matchStart && matchEnd) {
                deliFlag = false;
                ret = "<span style='color: lightgrey;'>" + code + spe;
                return ret; 
            }
            if(matchStart && !matchEnd) {
                deliFlag = true;
                ret = "<span style='color: lightgrey;'>" + code + spe;
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
            matchStart = code.match(bracketStart);
            matchEnd = code.match(bracketEnd);
            const matchBetween = /(?<={)(.*?)(?=})/;
            
            if(matchStart && matchEnd) {
                let tmp = code.match(matchBetween);
                ret = "{" + rowChangeCss(tmp)+ "}";
                return ret;
            }
            if(matchStart && !matchEnd) {
                let row2 = code.split("{");
                if(row2[0]) {
                   ret = "<span style='color: blue;'>" + row2[0] + "{" + spe;
                }
                bracketFlag = true;
                if(row2[1]) {
                   ret = ret + "{" + rowChangeCss(row2[1]);
                }
                return ret;
            }
            if(!matchStart && matchEnd) {
                let row2 = code.split("}");
                if(row2[0]) {
                   if(row2[0].trim() !== "") {
                       ret = rowChangeCss(row2[0]) + "}";
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

            // All texts outher {} are blue
            if(code.trim()!=="") {
                ret = "<span style='color: blue;'>" + code + spe;
            }
            return ret; 
        };        
        
        // replace < > for all tags        
        $scope.myChange = function(code, codeType) {
            
            // select rows
            let rows = code.split("\n");
            let ret = "";
            for(let i=0; i<rows.length; i++) {
                // distance from left
                let pttrn = /^\s*/;
                let d = rows[i].match(pttrn)[0].length * 6;
                    
                switch(codeType) {
                    case "html":
                        ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChangeHtml(rows[i]) + "</div>";
                        break;
                    case "js":
                        ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChangeJs(rows[i]) + "</div>";
                        break;
                    case "json":
                        ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChangeJson(rows[i]) + "</div>";
                        break;
                    case "css":
                        ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChangeCss(rows[i]) + "</div>";
                        break;
                    default:
                        ret = ret + "<div style='padding-left: " + d + "px;'>" + rowChangeHtml(rows[i]) + "</div>";
                }                
            }
            return ret; 
        };
        
        $scope.copyToClipboard = function() {
             navigator.clipboard.writeText($scope.iHtm);
        };        
    },

    link: function (scope, ele, attrs) {
        let iHtml = ele[0].innerHTML;
        scope.iHtm = iHtml;
        let codeType = attrs.codeType;
        iHtml = scope.myChange(iHtml, codeType);
        let bt = '<div class="eaContent">\n<div class="eaSwitch" style="cursor: pointer; width: fit-content; position: fixed; right: 2px; color: lightgray" ng-click="copyToClipboard()">#</div>';
        ele[0].innerHTML = bt + "\n" + iHtml + "\n</div>";
        $compile(ele.contents())(scope);
    }       
  };
};