// Responsive layout dimensions
var mobile = 600;
var tablet = 999;
var desktop = 1000;
 
//----------------------------
//-- MENU
//----------------------------

var menuButton = $('#mobileMenu');
var menuButtonSelectedClass =  'desktopMenu-mobilebutton-selected';
var menuNavigation = $('.mobileMenu-navigation');
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

var aboutImages = $('.about-image');
 
//----------------------------
//-- PRODUCTS TAB
//----------------------------

var tabSelectedOption = -1; // -1 when initialize. Not change this!
var tabElements = $('.products-tab-item');
var tabContent  = $('.products-content-box');

var changeTab = function changeTab(newOption) {
	if ((newOption == -1) || (newOption == tabSelectedOption)) {
		return;
	}
	else {
		tabElements.attr('class', 'products-tab-item'); // remove all classes except the base one...
		tabContent.hide(0);			// Hide the tab content
		selectsMenu(newOption);		// Add selected class
		displayContent(newOption);	// Add selected class
		// Implementación concreta para este proyecto.
		changeTabsColor(newOption);

	}
}

function selectsMenu(number) { 
	if ((number < 0 || number > 2) || (name == tabSelectedOption))
		return; // imposible.
	
	var item = $('.products-tab-item:eq('+number+')');
	item.addClass('products-tab-item-selected'); 	// Add selected to menu
 }

function displayContent(number) {
	if ((number < 0 || number > 2) || (name == tabSelectedOption))
		return; // imposible.
	
	var content = $('.products-content-box:eq('+number+')');	// Seletcs the content
	content.fadeIn("slow");					// Show content
}

// Implementación concreta para este proyecto.

function changeTabsColor(number) {
	var total = tabElements.size() - 1, item, newClassName;

	if ((number < 0 || number > total)) {
		return;
	} 


    $('.productBox-image').addClass("productBox-image-noscale").delay(550).queue(function(){
    	$(this).removeClass("productBox-image-noscale").dequeue();
	});

	item = $('.products-tab-item:eq('+number+')');

	switch (number) {
		case 0:
			newClassName = 'products-tab-item-companies';
		break; 
		case 1:
			newClassName = 'products-tab-item-personal';
		break; 
		case 2:
			newClassName = 'products-tab-item-marketing';
		break; 
	}
 	
 	item.addClass(newClassName); 	// Add selected to menu
 
}

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
// Products
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


