
$(function(){
	
	$("#vicScroll").mCustomScrollbar({
		axis: "x",
		theme: "dark",
		advanced: {
			autoExpandHorizontalScroll: true
		}
	});
	
	$('.goBot').click(function() {
		$('body,html').animate({
			scrollTop: $('.showPro').offset().top
		},
		500);
	});

})

