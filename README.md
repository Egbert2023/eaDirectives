# eaDirectives
The application contains some directives for AngularJs that can be used for your own applications

Directives for AngularJs
1. eaMaskCode
2. eaAccordeon
3. eaLoadParams - 
4. eaNivi - 
5. eaImgBox - 
6. eaCookies - 
7. eaPathLink - 

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
## eaAccordeon
The accordion functionality consists of two directives. One shell and any sections. The shell <ea-acc-coat ...> set the title in a 'h1' tag. The sections <ea-acc-key ...> set subtitles in a 'h2' tag and set a limit to display text in the collapsed state.
You can call this directive as follows:
```html
<ea-acc-coat data-acc-title="Example of accordeon">
 <ea-acc-key data-title="Sub title 1 of accordeon" data-txt-len="20">
 --- Html code for the first section ---
 </ea-acc-key>
 <ea-acc-key data-title="Sub title 2 of accordeon" data-txt-len="10">
 --- Html code for the second section ---
 </ea-acc-key>
 <ea-acc-key data-title="Sub title n-th of accordeon" data-txt-len="10">
  <div class="row">
   <div class="col-lg-4 col-md-6 col-sm-12">First col</div>
   <div class="col-lg-4 col-md-6 col-sm-12">Second col</div>
   <div class="col-lg-4 col-md-6 col-sm-12">Third col</div>
  </div>
 </ea-acc-key>
</ea-acc-coat>
```
