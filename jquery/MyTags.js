/*
 * A plugin to add a tag field to any form
 * It can take just a single tag or multiple tags
 * 
 * source (array of strings): The autocomplete array.
 * tagLimit (int): The maximum amount of tags (there's no infinite option, just set it really high if need be)
 * tagClass (string): The class applied to tags, useful for styling
 * uniqueInputFieldId (string): The ID of the input field, useful for styling etc. The field is removed upon submission so as not to be included in the form.
 * formId: (string): Used to catch form submission. This does need to be set.
 * parentDivId (string): The div containing the inputfield and the tags, will be removed upon submission, but useful for styling.
 * warnWrongTagName should the user be warned if using the wrong html tag type?
 */


(function ($) {
    'use strict';
    
    $.fn.handleTag = function (options) {
        var opts = $.extend({
            source: [], // just like ['java', 'javascript', 'asp.net']
            tagLimit: 2,
            uniqueIdentifier: '', //hidden field to apply value to before submitting form
            formId: '',
            parentDivId: 'tagManParent',
            warnWrongTagName: true
        }, options);
        var $hiddenInput = $(this);
        
        if(opts.formId == ''){
            console.log("LogansTagMan requires to be set with a formID, without one this isn't going to work");
        }
        
        if(opts.warnWrongTagName == true && $(this).prop("tagName") != "INPUT"){
            console.log("LogansTagMan was not set to an <input> type, as was expected. If this was intended the warning can be disabled");
        }
        
        if(opts.uniqueIdentifier == ''){
            console.log("You must set a unique uniqueIdentifier for every new TagField");
        }
        var internalOpts = new Object();
        internalOpts.uniqueInputFieldId = "inputField" + opts.uniqueIdentifier;
        internalOpts.insertTagsId = 'insertTagDiv' + opts.uniqueIdentifier;
        internalOpts.tagClass = 'tagDiv' + opts.uniqueIdentifier;
        internalOpts.tagDelClass = 'tagDelBtn' + opts.uniqueIdentifier;
        internalOpts.tagLimit = opts.tagLimit;
        
        
        //onFormSubmit
        $("#" + opts.formId).submit(function(){
            var finalString = calculateString($("." + internalOpts.tagClass), opts);
            alert(finalString);
            $($hiddenInput).val(finalString);
            $("#" + opts.parentDivId).remove();
        });
        
        //Creates the actual field for the submit form, which is then destroyed before submission
        $hiddenInput.before("<div id='" + opts.parentDivId + "' style='display: flex' >" +
            "<div id='" + internalOpts.insertTagsId + "' style='display:flex'>" +
            "</div>" +
            "<input type='text' class='myInput' id='" + internalOpts.uniqueInputFieldId + "' />" +
            "</div>");
        
        //Autocomplete stuff
        var termTemplate = "<span class='ui-autocomplete-term'>%s</span>";
        $('#' + internalOpts.uniqueInputFieldId).autocomplete({
            source: opts.source,
            open: function (e, ui) {
                var acData = $(this).data('ui-autocomplete');
                var styledTerm = termTemplate.replace('%s', acData.term);
                
                acData
                    .menu
                    .element
                    .find('li')
                    .each(function() {
                        var me = $(this);
                        var keywords = acData.term.split(' ').join('|');
                        me.html(me.text().replace(new RegExp("(" + keywords + ")", "gi"), styledTerm));
                    });
            },
            select: function(event, ui){
                applyTag(internalOpts, ui.item.value);
                $("#" + internalOpts.uniqueInputFieldId).val("");
                event.preventDefault();
            }
        });
        
        
        $("#" + internalOpts.uniqueInputFieldId).blur(function(){
            applyTag(internalOpts);
        });
        
        //Destroy tags
        $("body").on('click', '.' + internalOpts.tagDelClass, function () {
            $(this).closest("." + internalOpts.tagClass).remove();
            $("#" + internalOpts.uniqueInputFieldId).css("display", "initial");
        });
    };
    
    function calculateString(str, opts) {
        var myString = "";
        var total = str.length;
        $(str).each(function (index, value) {
            if(index < opts.tagLimit){
                myString += $(value)
                    .clone()    //clone the element
                    .children() //select all the children
                    .remove()   //remove all the children
                    .end()      //again go back to selected element
                    .text()
                    .trim();
                if (index < total - 1) {
                    myString += ", ";
                }
            }
        });
        return myString;
    }

    function applyTag(opts, fieldValue) {
        if(fieldValue == '' || fieldValue == undefined){
            fieldValue = $("#" + opts.uniqueInputFieldId).val();
        }
        var inputField = $("#" + opts.uniqueInputFieldId);
        
        fieldValue = fieldValue.trim();
        if(fieldValue != ''){
            $("#" + opts.insertTagsId).append("<div class='" + opts.tagClass + " tag'>" + fieldValue + " <button class='" + opts.tagDelClass + " tagDeleteButton'> x </button></div>");
        }
        $("#" + opts.uniqueInputFieldId).val("");
        if($("." + opts.tagClass).length >= opts.tagLimit)
            $("#" + opts.uniqueInputFieldId).css("display", "none");
    }
    return this;
}(jQuery));





























