/**
* Usage
* 
* <div id='content-block'>
*   <div class='block'>One</div>  
*   <div class='block'>Two</div>     
* </div>
*                         
* $(document).ready(function(){
*   $("#content-block").fluid()
* });
*
*/

(function($){
    $.fn.fluid = function(options) {
        var obj = $(this);
        var defaults = {
                columnWidth: 193,
                columnMargin: 16,
                columnPadding: 14,
                top: false,
                left: 0,
                adjValue: 16
        };
        var options = $.extend(defaults, options);

        obj.css("position","relative");

        obj.children().css("float","left");
        obj.children().css("position","absolute");
        obj.children().css("padding",options.columnPadding);
        obj.children().css("width",options.columnWidth);

        initColumnLayout();

        $(window).bind("resize", function(){
                initColumnLayout();
        });

        function initColumnLayout(){
            var wWidth = obj.width();

            var columnCount = Math.floor((wWidth -
options.left)/(options.columnWidth+options.adjValue+options.columnMargin*2)) - 1;
            columnSumHeight = new Array();
            if(options.top == false) {
                containerTop = 0;
            } else {
                containerTop = options.top;
            }

            for(i=0;i<=columnCount;i++) {
                    $(".col"+i).removeClass("col"+i);
                    columnSumHeight[i] = containerTop;
            }
            colCount = 0;
            obj.children().each(function (ind) {
                    $(this).addClass("col"+colCount);
                    for(i=0;i<=columnCount;i++) {
                        if($(this).hasClass("col"+i)) {
                            if(columnSumHeight[i] == 0) {
                                $(this).css("top",0);
                            } else {
                                $(this).css("top",options.columnMargin+columnSumHeight[i]);
                            }

                            if(i==0) {
                                $(this).css("left",0);
                            } else {
                                $(this).css("left",(options.columnWidth+options.columnPadding+options.columnMargin)*i+options.columnMargin*i+options.left);
                            }

                            columnSumHeight[i] =
$(this).innerHeight()+options.columnMargin+columnSumHeight[i];
                        }
                    }
                    if(colCount == columnCount) {
                            colCount = 0;
                    } else {
                            colCount++;
                    }
            });

            totalSum = 0;
            for(i=0;i<columnSumHeight.length;i++) {
                if(columnSumHeight[i]>totalSum) {
                    totalSum = columnSumHeight[i];
                }
            }

            obj.height(totalSum);
        };
    };
})(jQuery);

