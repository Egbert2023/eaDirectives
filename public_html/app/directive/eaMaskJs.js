'use strict';

var eaMaskJs = function () {
  return {
    restrict: 'A',
    // global scope, so will use the same $scope as the parent directive
    scope: false,
    
    controller: function($scope) {
        $scope.rowChange = function(code) {
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
    }
  };
};