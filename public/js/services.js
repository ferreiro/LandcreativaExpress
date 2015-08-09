
//----------------------------
//-- SERVICIOS
//----------------------------
// Esto tiene que estar al final del todo...

var elementPosition = $('.productBox-button').offset();

$(window).scroll(function(){
	total = elementPosition.top - $(window).scrollTop();
	
	// console.log('Button top ' + elementPosition.top);
	// console.log('Scroll top ' + $(window).scrollTop());
	// console.log(total);

    if(total <= 0){
    	// Display element

    	$('.services-fixedbuypannel').fadeIn({
    		duration: 300,
    		easing: 'easeInOutCirc'
    	});
    	console.log("entra"); 

    } else {
    	$('.services-fixedbuypannel').hide(300);
    	console.log("sal"); 
    }    
});


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
