var st = sessionStorage;
var keepValueFields = document.getElementsByClassName('keepInputValue'); // Every element with the tag "keep value field" will be save/load.
var saveTime = 1000;	// Time in miliseconds for saving user text input on session storage
var sessionStorageName = 'contactForm_';
	

	loadUserText(); // Calling the function the first time we open the page
	setInterval(saveUserText, saveTime); // Saving user inputs text each "saveTime" miliseconds


	// Load values to the inputs field.
	// We load all the values when the user access this page for the firts time.

	function loadUserText() {
		var stkey, total = keepValueFields.length;

		for (i = 0; i < total; i++) {
			stkey 	= sessionStorageName + i; 			// Setting the key name. Change this for a different name 
			keepValueFields[i].value = st.getItem(stkey);	// getting the value from session storage and setting the input text with dat value
		}
	}

	// Save user Text function.
	// Keeps every second the valus of the text introduces by the user.

	function saveUserText() {
		var stkey, stValue, total = keepValueFields.length;
	 	
	 	// Traversing all the session storage elements and 
	 	// keeping the current value for our inputs files.

		for (i = 0; i < total; i++) {
			stkey 	= sessionStorageName + i; 		// Setting the key name. Change this for a different name 
			stValue = keepValueFields[i].value;	// The value is getting for the element input value.
			st.setItem(stkey, stValue);			// Setting key and value to Session storage.
		}
	}

