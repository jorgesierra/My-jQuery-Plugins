/**
 * Usage
 * 
 *       $(document).ready(function(){
 *          //$("#name") => html input element
 *          //$("#normalized-name") => html element (non-input type)
 *          $("#name").urlNameCleaner({displayElement:$("#normalized-name")})
 *       });
 *
 */

(function($){  
	$.fn.urlNameCleaner = function(options) {
            var obj = $(this);
            var defaults = {  
                displayElement: $("#cleaned-url-name"),
                allowedChars: " \.@_-"
            };
            var options = $.extend(defaults, options);
		
            string = cleaner(obj.val());
            options.displayElement.html(string);
	
            obj.live('keyup', function(e) {
                    string = cleaner($(this).val());
                    options.displayElement.html(string);
            });
		
            function cleaner(string) {
                //.toLowerCase()
                string = jQuery.trim(string);

                string = string.replace(/á/gi,'a');
                string = string.replace(/é/gi,'e');
                string = string.replace(/í/gi,'i');
                string = string.replace(/ó/gi,'o');
                string = string.replace(/í/gi,'u');
                string = string.replace(/ñ/gi,'n');

                var myRegExp = new RegExp("[^A-Za-z0-9"+options.allowedChars+"]","gi"); 
                string = string.replace(myRegExp,""); 

                string = string.replace(/\ /gi,'-');
                string = string.replace(/@/gi,'-');
                string = string.replace(/--/gi,'-');
                //string = string.replace(/\//gi,'-');

                return string;
            }  
	};
})(jQuery); 