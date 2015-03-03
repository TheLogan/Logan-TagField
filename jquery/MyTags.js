/**
 * A plugin to add a tag field to any form
 * It can take just a single tag or multiple tags
 * 
 * tagLimit (int):
 * tagClass (string):
 * inputFieldId (string):
*/


(function ($) {
    'use strict';
    
    $.fn.handleTag = function (options) {
        var opts = $.extend({
            tagLimit: 2,
            tagClass: 'tag',
            inputFieldId: 'tagInput', //hidden field to apply value to before submitting form
            formId: 'submitForm',
            parentDivId: 'tagManParent'
        }, options);
        var $hiddenInput = $(this);
        
        //onFormSubmit
        $("#" + opts.formId).submit(function(){
            var finalString = calculateString($(".tag"));
            $($hiddenInput).val(finalString);
            $("#" + opts.parentDivId).remove();
        });
        
        //Creates the actual field for the submit form, which is then destroyed before submission
        $hiddenInput.before("<div id='" + opts.parentDivId + "' style='display: flex' >" +
            "<div id='insertHere' style='display:flex'>" +
            "</div>" +
            "<input type='text' class='myInput' id='" + opts.inputFieldId + "' />" +
            "</div>");
        
        //Autocomplete stuff
        var termTemplate = "<span class='ui-autocomplete-term'>%s</span>";
        $('#' + opts.inputFieldId).autocomplete({
            source: ['java', 'javascript', 'asp.net'],
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
            close: function(event, ui){
                $("#" + opts.inputFieldId).blur();
            }
        });
        
        
        $("#" + opts.inputFieldId).blur(function(){
            applyTag(opts);
        });
        
//        $("body").on('click', '.tagDeleteButton', destroyTag($(this), opts));
        
        //Destroy tags
        $("body").on('click', '.tagDeleteButton', function () {
            $(this).closest("." + opts.tagClass ).remove();
            $("#" + opts.inputFieldId).css("display", "initial");
        });
    };
    
    function calculateString(str) {
        var myString = "";
        var total = str.length;
        $(str).each(function (index, value) {
            
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
        });
        return myString;
    }
    
    function destroyTag(tag, opts){
//        alert("Destruction");
        tag.closest("." + opts.tagClass ).remove();
    }
    
    function applyTag(opts) {
        var value = $("#" + opts.inputFieldId).val();
        var inputField = $("#" + opts.inputFieldId);
        if(inputField.val() != ""){
            $("#" + opts.inputFieldId).val("");
            $("#insertHere").append("<div class='" + opts.tagClass + "'>" + value + " <button class='tagDeleteButton'> x </button></div>");
        }
        if($("." + opts.tagClass).length >= opts.tagLimit)
            $("#" + opts.inputFieldId).css("display", "none");
    }
    return this;
}(jQuery));





























