

$(function(){
    
	$('.fancybox').fancybox();
	
	var mySwiper1 = new Swiper ('.pro_pic .swiper-container', {
		loop: true,
		autoplay:4000,
		paginationClickable: true,
		nextButton: '.pro_pic .swiper-button-next',
		prevButton: '.pro_pic .swiper-button-prev'
	});

	$('.pro_tab ul li').click(function(){   
       $('.pro_tab ul li').removeClass('active');
       $(this).addClass('active');
       $('.pro_text .pro-scroll').hide();
       $('.pro_text .pro-scroll:eq(' + $('.pro_tab ul li').index(this) + ')').show();
    });
    
});
