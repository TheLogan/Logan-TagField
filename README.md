# Logan-TagManager
A plugin to add a tag field to any form


A basic plugin can be used as such
JS
```javascript
$(function() {
  $('#placeTagManHere').handleTag({
    'formId': 'myForm',
    'tagLimit': 3,
    source: ['Java', 'Javascript']
  });
});
```

HTML
```html
<form id="myForm">
  <input type="hidden" id = "placeTagManHere" value="hidden">
  <input type="submit" value="submit" id="formButton">
</form>
```


It includes a number of settable options
```javascript
source: [], // The source of the autocomplete feature used like ['java', 'javascript', 'asp.net']
tagLimit: 2, // The maximum amount of tags
tagClass: 'tag', //The class applied to tags, useful for styling
inputFieldId: 'tagInput', //The ID of the input field, useful for styling etc. The field is removed upon submission so as not to be included in the form.
formId: '', //Used to catch form submission. If the tagfield is used in a form, this NEEDS to be set.
parentDivId: //The div containing the inputfield and the tags, will be removed upon submission, but useful for styling.
warnWrongTagName: true //should the user be warned if using the wrong html tag type (hides warnings)
```



And last but not least, these are my references
It probably will not work with older versions of jquery-ui, without slight modifications. My version btw is jquery ui 1.11.3
```javascript
<link rel="stylesheet" href="styles/myTagStyle.css"/>
<link rel="stylesheet" href="styles/jquery-ui.css"/>
<script type="text/javascript" src="jquery/jquery-2.1.3.js"></script>
<script type="text/javascript" src="jquery/jquery-ui.js"></script>
<script type="text/javascript" src="jquery/MyTags.js"></script>
```
