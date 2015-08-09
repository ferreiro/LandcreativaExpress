// Stuck my element


$(window).scroll(function(){
	var boxes = $('.services-content-box');
	var currentBox, currentFixedPannel;
	var e = $(this); // window
	// console.log(window.scrollY);

	// Get the current box that is being shown
	for (i = 0; i < boxes.length; i++) {
		element = $('.services-content-box:eq('+ i +')');
		if (element.hasClass('services-content-box-showbox')) {
			currentBox = element;
		}
	}

	// Saber si el currentbox ha tocado la cabecera de la web.

	var elementOffsetTop = currentBox.offset().top;
	var header = 80;
	var pannel = currentBox.find('.services-buypannel');
	pannel.removeClass('endpin');

	if ($(window).scrollTop() >= elementOffsetTop - header) {
		// The current box has reached screen top
		var insideTotalScroll = (currentBox.height() + currentBox.offset().top + pannel.height()) - $(window).scrollTop() - $(window).height();

		pannel.fadeIn(100);
		pannel.addClass('stuck');

		if (insideTotalScroll > 0) {
			// Fijar el panel
			pannel.addClass('stuck');
		}
		else {
			// Poner el panel como absolute
			pannel.removeClass('stuck');
			pannel.addClass('endpin');
		}
	} 

});





// //----------------------------
// //-- SERVICIOS
// //----------------------------
// // Esto tiene que estar al final del todo...

// var elementPosition = $('.productBox-button').offset();

// $(window).scroll(function(){
// 	total = elementPosition.top - $(window).scrollTop();
	
// 	// console.log('Button top ' + elementPosition.top);
// 	// console.log('Scroll top ' + $(window).scrollTop());
// 	// console.log(total);

//     if(total <= 0){
//     	// Display element

//     	$('.services-buypannel').fadeIn({
//     		duration: 0,
//     		easing: 'easeInOutCirc'
//     	});
//     	console.log("entra"); 

//     } else {
//     	$('.services-buypannel').hide(0);
//     	console.log("sal"); 
//     }    
//     $('.services-buypannel').show(0);
// });


//----------------------------
//-- PRODUCTS TAB
//----------------------------


var tabSelectedOption = -1; // -1 when initialize. Not change this!
var tabElements = $('.services-tab-item');
var tabContent  = $('.services-content-box');

var changeTab = function changeTab(newOption) {
	if ((newOption == -1) || (newOption == tabSelectedOption)) {
		return;
	}
	else {
		tabElements.attr('class', 'services-tab-item'); // remove all classes except the base one...
		tabContent.removeClass('services-content-box-showbox');
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
	
	var item = $('.services-tab-item:eq('+number+')');
	item.addClass('services-tab-item-selected'); 	// Add selected to menu
 }

function displayContent(number) {
	if ((number < 0 || number > 2) || (name == tabSelectedOption))
		return; // imposible.
	
	var content = $('.services-content-box:eq('+number+')');	// Seletcs the content
	content.fadeIn("slow");					// Show content
	content.addClass('services-content-box-showbox');
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

	item = $('.services-tab-item:eq('+number+')');

	switch (number) {
		case 0:
			newClassName = 'services-tab-item-companies';
		break; 
		case 1:
			newClassName = 'services-tab-item-personal';
		break; 
		case 2:
			newClassName = 'services-tab-item-marketing';
		break; 
	}
 	
 	item.addClass(newClassName); 	// Add selected to menu
 
}
