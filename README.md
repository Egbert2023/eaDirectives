# eaDirectives
The application contains some directives for AngularJs that can be used for your own applications

Directives for AngularJs
1. eaLoadParams - 
2. eaNivi - 
3. eaImgBox - 
4. eaCookies - 
5. eaAccordeon - 
6. eaPathLink - 
## eaMaskCode
The directive is an aid to displaying code as developers expect it to. You can put the e.g. Html code 'any-html-code' into the tag:
``html
 <ea-mask-code ea-mask-html>
    any-html-code
 </ea-mask-code>
'''
The attribut "ea-mask-[type]" in the tag can use different values.
- html - for Html code
- js - for JavaScript code
- json - for JSON file
- css - for CSS file

The attribute ea-mask-[type] is an additional directive that adds exactly one function 'rowChange(row)' to the current scope of directive 'eaMaskCode'. This function implements the necessary adjustments for the selected code type.

If you need other code conversions than the existing ones, this can be done by additional your own directives.
Look at the examples and create your own directive (e.g. emmaMaskPhp). In order to integrate this directive, the corresponding file must be integrated in the index.html
```html
<script src="app/directive/emmaMaskPhp.js" type="text/javascript"></script>
```
and the directive must be declared in the app.js file.
```javascript
eaDir.directive('emmaMaskPhp', [emmaMaskPhp]).$inject = ['$scope'];
```
Now you can add your directive as a new attribute in the tag
```html
<ea-mask-code emma-mask-php="emma-mask-php">
...php code ...
<\ea-mask-code>
```
