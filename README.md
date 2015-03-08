# Logan-TagManager
A plugin to add a tag field to any form


A basic plugin can be used as such
JS
```javascript
$(function() {
  $('#placeTagManHere').handleTag({
    'formId': 'myForm', //The id of the form, used for capturing the submit button. In order to parse the tags as a  string to the hidden field.
                'uniqueIdentifier': 'derptys', //Enables the clear seperation of different TagFields on the same page.
                'tagLimit': 1, //Limit the amount of tags
                source: ['Java', 'Javascript'], //the sources for the autocomplete list
                presetValues: "Monky say, monkey do" //preset values. Since the limit is set to 1, only 'Monky say' will actually be used.
  });
});
```

HTML
```html
<form id="myForm">
  <input type="hidden" id = "placeTagManHere" value="hidden"> //this will be the position of the tagfield
  <input type="submit" value="submit" id="formButton">
</form>
```


It includes a number of settable options
```javascript
source: [], // The source of the autocomplete feature used like ['java', 'javascript', 'asp.net']
tagLimit: 2, // The maximum amount of tags
uniqueIdentifier: 'uniqueId', //Used to seperate different fields on the same page.
formId: '', //Used to catch form submission. If the tagfield is used in a form, this NEEDS to be set.
parentDivId: //The id for the div containing the inputfield and the tags, will be removed upon submission, but useful for styling.
warnWrongTagName: true, //should the user be warned if using the wrong html tag type (hides warnings)
presetValues: [], //If the value isn't '', this will be used to populate the tagfield on instantiation.
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
I'm rather new to writing jQuery plugins, and jQuery in general, so I know how confusing it can be when stuff like that isn't mentioned.
