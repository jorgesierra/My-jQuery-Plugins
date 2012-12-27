/**
 * http://www.somacon.com/cgi/colorchart.pl
 * filters: {'operator':'>','value':'50%'}, {'operator':'=','value':'50'}
 */
(function($){
$.fn.visualizeTable = function(options) {

    var table = $(this);
    var defaults = {
        colors: ['#FFF9BF','#FFF37F','#FFE700','#FFC83F','#FFA500','#FF7F00','#FF6019','#FF3919','#FF1919','#CD0000'],
        filters: [],
        type: 'circle'
    };
    var options = $.extend(defaults, options);
    var cellsValues = [];
    
    cells = jQuery(table).find('td');
    loadCellsValues(cells);
    visualizeValues(cells);

    function visualizeValues(cells) {
        $(".visualized-cell").remove();
        jQuery.each(cells,function(i,v) {
            val = parseInt($(v).text());
            
            jQuery(v).removeClass('to-center');
            jQuery(v).removeClass('to-right');
            
            switch(options.type) {
                case 'circle':
                    jQuery(v).addClass('to-center');
                    break;
                case 'bar':
                    jQuery(v).addClass('to-right');
                    break;
            }
            
            if(!isNaN(val)) {
                percentage = calcPercentage(val);
                if(checkFilters(val, percentage)==true) {
                    cellWidth = jQuery(v).width();
                    cellHeight = jQuery(v).height();
                    nbspWidth = 10;
                    
                    switch(options.type) {
                        case 'circle':
                            vLeft = (cellWidth/2)-(percentage/2)*2-nbspWidth;
                            vTop = -percentage;
                            html = '<div style="position:relative"><span class="visualized-cell" style="background-color:'+options.colors[percentage-1]+';padding:'+percentage+'px; left:'+vLeft+'px; top:'+vTop+'px;opacity:0.7; float:left; display:inline-block; border-radius:999px; width:20px; position: absolute; z-index: 100;">&nbsp;</span><span class="visual-value" style="position: relative; z-index:102">'+val+'</span></div>';
                            break;
                        case 'bar':
                            percentageWidth = parseInt(Math.ceil(((percentage*10*cellWidth)/100)));
                            html = '<div style="position:relative"><span class="visualized-cell" style="background-color:'+options.colors[percentage-1]+'; opacity:0.7; float:left; display:inline-block; width:'+percentageWidth+'px; position: absolute; z-index: 100;">&nbsp;</span><span class="visual-value" style="position: relative; z-index:102; margin-right:3px">'+val+'</span></div>';
                            break;
                    }
                    
                    jQuery(v).html(html);
                }
            }
        });
    }
    
    function checkFilters(value, percentageValue) {
        pass = true;
        if(options.filters.length > 0) {
            //console.log(options.filters);
            jQuery.each(options.filters,function(i,v){
                //console.log(v);
                check = "value";
                if(v.value.indexOf('%')!=-1) {
                    check = "percentage";
                }

                switch(v.operator) {
                    case '>':
                        if(check == 'value') {
                            if(value <= v.value) {
                                pass = false;
                                return;
                            }
                        }
                        
                        if(check == 'percentage') {
                            if(percentageValue <= parseInt(v.value)/10) {
                                pass = false;
                                return;
                            }
                        }
                        break;
                    case '<':
                        if(check == 'value') {
                            if(value >= v.value) {
                                pass = false;
                                return;
                            }
                        }
                        
                        if(check == 'percentage') {
                            if(percentageValue >= parseInt(v.value)/10) {
                                pass = false;
                                return;
                            }
                        }
                        break;
                    case '>=':
                        if(check == 'value') {
                            if(value < v.value) {
                                pass = false;
                                return;
                            }
                        }
                        
                        if(check == 'percentage') {
                            if(percentageValue < parseInt(v.value)/10) {
                                pass = false;
                                return;
                            }
                        }
                        break;
                    case '<=':
                        if(check == 'value') {
                            if(value > v.value) {
                                pass = false;
                                return;
                            }
                        }
                        
                        if(check == 'percentage') {
                            if(percentageValue > parseInt(v.value)/10) {
                                pass = false;
                                return;
                            }
                        }
                        break;
                    case '=':
                        if(check == 'value') {
                            if(value != v.value) {
                                pass = false;
                                return;
                            }
                        }
                        
                        if(check == 'percentage') {
                            if(percentageValue != parseInt(v.value)/10) {
                                pass = false;
                                return;
                            }
                        }
                        break;
                }
            });
        }
        
        return pass;
    }
    
    function loadCellsValues(cells) {
        jQuery.each(cells,function(i,v) {
            val = parseInt(jQuery(v).text());
            if(!isNaN(val)) {
                cellsValues.push(val);
            }
        });
    }
    
    function getMaxValue( array ){
        return Math.max.apply( Math, array );
    };

    function getMinValue( array ){
       return Math.min.apply( Math, array );
    };
    
    function calcPercentage(val) {
        maxVal = getMaxValue(cellsValues);
        percentage = parseInt(Math.ceil(((val*100)/maxVal)/10));
        return percentage;
    }

    function htmlDecode(value) {
        if (value) {
            return $('<div />').html(value).text();
        } else {
            return '';
        }
    }

};
})(jQuery); 