 
	var ls = localStorage;
	var keepValueFields = $('.keepInputValue'); // Every element with the tag "keep value field" will be save/load.
	var form = document.getElementsByClassName('contactForm'); // Every element with the tag "keep value field" will be save/load.
	var saveTime = 400;	// Time in miliseconds for saving user text input on session storage
	var sessionStorageName = 'contactForm_';
	var stopTracking = false;
		
	loadUserText(); // Calling the function the first time we open the page
	form.onsubmit = function() { 
		clearFormData; 
	};

	keepValueFields.focusin(function() {
		stopTracking = false;
		setInterval(saveUserText, saveTime); // Saving user inputs text each "saveTime" miliseconds
	});
	keepValueFields.focusout(function() {
		stopTracking = true;
	});
	/*keepValueFields.mouseleave(function() {
		stopTracking = true;
	});
	*/

	// Clear data when the user send a form
	// This variable is going to be global.
	
	window.clearFormData = function clearFormData() {
		var stkey, stValue, total = keepValueFields.length; 
		 
		stopTracking = true;

		// Traversing all the session storage elements and 
		// clearing the current value for our inputs files.

		for (i = 0; i < total; i++) {
			stkey 	= sessionStorageName + i; 		// Setting the key name. Change this for a different name 
			ls.setItem(stkey, '');					// Clearing session storage for that name
		}
	}

	// Load values to the inputs field.
	// We load all the values when the user access this page for the firts time.

	function loadUserText() {
		var stkey, total = keepValueFields.length;

	 	// Traversing all the session storage elements and 
	 	// setting the session storage value to our inputs files.

		for (i = 0; i < total; i++) {
			stkey 	= sessionStorageName + i; 			// Setting the key name. Change this for a different name 
			if(ls.getItem(stkey) != undefined) 
				keepValueFields[i].value = ls.getItem(''+ stkey + '');	// getting the value from session storage and setting the input text with dat value
		}
	}

	// Save user Text function.
	// Keeps every second the valus of the text introduces by the user.

	function saveUserText() {
		var stkey, stValue, total = keepValueFields.length;
	 	
	 	if (!stopTracking) {
 		 	// Traversing all the session storage elements and 
 		 	// keeping the current value for our inputs files.
 			for (i = 0; i < total; i++) {
 				stkey 	= sessionStorageName + i; 		// Setting the key name. Change this for a different name 
 				stValue = keepValueFields[i].value;	// The value is getting for the element input value.
 				if(stValue != undefined) 
					ls.setItem(stkey, stValue);			// Setting key and value to Session storage.
 			}
	 	} 
	}
 