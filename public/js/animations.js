// Responsive layout dimensions
var mobile = 600;
var tablet = 999;
var desktop = 1000;
 
 
//----------------------------
//-- MENU
//----------------------------

var menuButton = $('#mobileMenuButton');
var menuButtonSelectedClass =  'selected';
var menuNavigation = $('#mobileMenu ul');
var body = $('body');
var bodyOverflowClass = $('body-overflow');

menuButton.click(function() {
	var e = $(this);
	if (menuButton.hasClass(menuButtonSelectedClass)) {
		$("body").attr("class","");
		e.removeClass(menuButtonSelectedClass);
		menuNavigation.hide(0);
	}
	else {
		$("body").attr("class","body-overflow");
		e.addClass(menuButtonSelectedClass);
		menuNavigation.fadeIn(0);
	}
});

// Hide menu when resize the window.
$(window).resize(function(){
	if ($(document).width() >= desktop) {
		menuButton.removeClass(menuButtonSelectedClass);
		menuNavigation.hide(0);
	}
});


//----------------------------
//-- HOME SLIDER
//----------------------------
 
$('.slider-slides').DDSlider({

	prevSlide: '.slider-navigation-left',
	nextSlide: '.slider-navigation-right',
	selector: '.slider-selector'

});


//----------------------------
//-- ABOUT US
//----------------------------
  
$('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash,
    $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
        window.location.hash = target;
    });
    return false;
});
 

 
//------------------------------------
// services
//------------------------------------

// Set the products height as the bigger one. 









/********* FIJA MENU DE INFORMACIÃƒâ€œN ************/
   
	/*
	$('body').keyup(function (e){
	  if (e.keyCode == 38) {
			$(".cab").css({"top":"0"});
	   }
	   else
	   {
	   		$(".cab").css({"top":"-60px"});
	   }
	})
	*/
 /*
	if($(window).width() >= 980) {

		$(function () {
		var msie6 = $.browser == 'msie' && $.browser.version < 7;

		if (!msie6) {

		  var top_menu = $('.menu_desktop').offset().top - parseFloat($('.menu_desktop').css('margin-top').replace(/auto/, -220));
		  var top_services = $('#services').offset().top - parseFloat($('#services').css('margin-top').replace(/auto/, -220));
		  var top_portfolio = $('#portfolio').offset().top - parseFloat($('#portfolio').css('margin-top').replace(/auto/, -220));
		  var top_contacto = $('#contact').offset().top - parseFloat($('#contact').css('margin-top').replace(/auto/, -220));
 
		  $(window).scroll(function (event) {
			// what the y position of the scroll is
			var elemento_arriba = $(this).scrollTop();
  
			if(elemento_arriba >= top_menu)
			{
				$(".menu_desktop").addClass("menu_desktop_fixed"); 
				// $(".menu_desktop .logo").show("0");
				// $(".menu_desktop .logo").css({"left":"0"}); 
			}
			else
			{
				$(".menu_desktop").removeClass("menu_desktop_fixed"); 
				//$(".menu_desktop .logo").hide("0");
				//$(".menu_desktop .logo").css({"left":"-200px"}); 
			}
 
			if(elemento_arriba >= top_contacto -80)
			{
				$(".menu_desktop .links ul li a").removeClass("selected");
				$(".menu_desktop .links ul li:nth-child(3) a").addClass("selected");
			} 
			else if(elemento_arriba >= top_portfolio -80)
			{
				$(".menu_desktop .links ul li a").removeClass("selected");
				$(".menu_desktop .links ul li:nth-child(2) a").addClass("selected");
			}
			else if(elemento_arriba >= top_services -80)
			{
				$(".menu_desktop .links ul li a").removeClass("selected");
				$(".menu_desktop .links ul li:nth-child(1) a").addClass("selected");
			}
			else
			{
				$(".menu_desktop .links ul li a").removeClass("selected");
			}

 
 
		  });

		}  
		}); 

	}
	else
	{
		$(".mobile_button").click(function() {
			$("#menu_mobile").show(0);
			$(".mobile_header .nav ul li a").click(function() {
				$("#menu_mobile").hide(0);
			});
		});
	}
 */


