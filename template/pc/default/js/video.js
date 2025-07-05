function viewport(){
    var e = window , a = 'inner';
    if ( !( 'innerWidth' in window ) ) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}


jQuery(function ($) {

    var w = viewport().width;    var h = viewport().height;

    $(".fancyVideo").each(function(){
        if($(this).attr("href")=="" || $(this).attr("href")==" " || $(this).attr("href")=="#"){
            $(this).removeClass("fancyVideo").addClass("fancybox").attr("title","Video will be uploaded soon").attr("href","/images/logo.png");
        }    });
    
    if ($(".fancybox").length) {
        $('.fancybox').fancybox();
    }
    var videoW = w < 600 ? w * 0.8 : w * 0.7;
    var videoH = h < 550 ? h * 0.85 : h * 0.75;
    
    if ($(".fancyVideo").length) {
        $(".fancyVideo").fancybox({
            'width': videoW,
            'height': videoH,
            'autoScale': true,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe'
        });
    }
    
    
});

