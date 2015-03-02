/**
 * A plugin to add a tag field to any form
 * It can take just a single tag or multiple tags
 * 
 * tagLimit (int):
 * tagClass (string):
 * inputFieldId (string):
*/



(function($){
    'use strict';
    $.fn.handleTag = function(options){
        
      var opts = $.extend({
          tagLimit: 2,
          tagClass: 'tag',
          inputFieldId: 'tagInput'
      });
        
        
        $(this).replaceWith("<div id='testDiv''>"+
            "<div id='insertHere'>" +
        "</div>" +
            "<input type='text' class='myInput' id='myInputId' />" +
        "</div>");
//        this.css("background-color", "#333");
        $("#myInputId").blur(applyTag)
        $("body").on('click', '.tagDeleteButton', function(){
            $(this).closest(".tag").remove();
        });

        $("#applyStringButton").click(function(){
            var finalString = calculateString(".tag");
            
            $('input[name=myTex]').val("stuff");
//            return finalString;
//            alert("Collect all tags to a single string, and display it here:");
        });
    }
    
    function calculateString(str){
        var myString = "";
        
        var total = str.length;
        $(str).each(function(index, value){
            
            myString += $(value)
                .clone()    //clone the element
                .children() //select all the children
                .remove()   //remove all the children
                .end()      //again go back to selected element
                .text()
                .trim();
            
            if(index < total - 1){
               myString += ", ";
            }
        });
        return myString;
    }
    
    function applyTag(){
        var value = $("#myInputId").val();
        $("#myInputId").val("");
        $("#insertHere").append("<div class='tag' >" + value + " <button class='tagDeleteButton'> x </button></div>")
    }
    return this;
}(jQuery));