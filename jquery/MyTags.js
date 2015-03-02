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
//            hiddenInput: 'placeTagManHere',
            tagLimit: 2,
            tagClass: 'tag',
            inputFieldId: 'tagInput', //hidden field to apply value to before submitting form
            formId: 'submitForm'
        }, options);
        
        var $hiddenInput = $(this);
        
        //onFormSubmit
        $("#" + opts.formId).submit(function(){
            var finalString = calculateString($(".tag"));
            $('input[id=' + opts.inputFieldId + ']').val(finalString);
        });
        
        $hiddenInput.before("<div id='testDiv''>" +
            "<div id='insertHere'>" +
            "</div>" +
            "<input type='text' class='myInput' id='myInputId' />" +
            "</div>");
        
//        $hiddenInput.before("<p>stuff</p>");
        
        $("#" + opts.inputFieldId).blur(function(){
            applyTag(opts);
        });
        $("body").on('click', '.tagDeleteButton', function () {
            $(this).closest("." + opts.tagClass ).remove();
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
    
    function applyTag(opts) {
        var value = $("#myInputId").val();
        $("#" +inputFieldId).val("");
        $("#insertHere").append("<div class='" + opts.tagClass + "' >" + value + " <button class='tagDeleteButton'> x </button></div>");
    }
    return this;
}(jQuery));