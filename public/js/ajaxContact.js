 
    // process the form
    $('form.contactForm').submit(function(event) {
    	var formData, validEmail, emptyField;
    	var name, email, phone, subject, message;

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();

    	formName = 	$('input[name="name"]');
        formEmail = $('input[name="email"]');
        formPhone = $('input[name="phone"]');
        formSubject = $('select[name="subject"]');
        formMessage = $('textarea[name="message"]');

        // Getting data from contact form
        // I use javascript to allow you to use this code without JQUERY included
        // Another simpler method would be  $('input[name=email]').val()

        formData = {
        	'name'    : formName.val(),
        	'email'   : formEmail.val(),
        	'phone'   : formPhone.val(),
        	'subject' : formSubject.val(),
        	'message' : formMessage.val()
        }

    	formName.removeClass('contact-form-field-element-wrongfield');
		formEmail.removeClass('contact-form-field-element-wrongfield');
		formMessage.removeClass('contact-form-field-element-wrongfield');
		formPhone.removeClass('contact-form-field-element-wrongfield');

        validName 	 = isValidField(formData.name, 3);	// Name text and minimun of characters
        validMail    = validateEmail(formData.email);
        validPhone   = isValidField(formData.phone, 5); // Spanish phones has minimun 9 characters XXX-XXX-XXX
        validMessage = isValidField(formData.message, 5);

        if (validName && validMessage && validPhone && validMail) {

            $('html, body').stop().animate({
                'scrollTop': ($('#form').offset().top - 100)
            }, 900, 'swing', function () {
                window.location.hash = target;
            });

        	$('.contact-form-content').fadeOut(200);
        	$('.contact-form-loading').delay(200).fadeIn(300);
        	$('.contact-form-sent').hide(0);

	        // We pass a POST petition to /contacta
	        // with the data "formData"
        	$.ajax({
        	    type        : 'POST', 		// define the type of HTTP verb we want to use (POST for our form)
        	    url         : '/contacta/JSON', // the url where we want to POST
        	    data        : formData, 	// our data object
        	    dataType    : 'json', 		// what type of data do we expect back from the server
        	    encode      : true
        	})
        	.done(function(returnedData) {		
                // Petición ajax realizada con éxito
                 
                $('.userName-messageSent').html(formName.val());  // Sustituir el nombre default por el del usuario
                $('.userEmail-messageSent').html(formEmail.val()); // Sustituir el mail default por el del usuario
 
                if (!returnedData.validCaptcha) {
                    alert('Tu captcha no es valido');
                    $('.contact-form-content').fadeIn(200);
                }
        		else if(returnedData.error) {
        			// no Se ha podido enviar el correo
        			$('.messageError').fadeIn(0); 
        		}
        		else {
        			// Se ha podido enviar el correo
        			window.clearFormData();
        			$('.messageSuccess').fadeIn(0); 
        		}
        	})
        	.fail(function(returnedData) {
                var mName, mEmail;
        		// Petición ajax realizada con fallo 
        		// La url donde hemos hecho el post no exite o no ha devuelto el tipo de formato que esperabamos.
        	   
                mName = formName;
                nEmail = formEmail;

                $('.userName-messageSent').html(mName);
                $('.userEmail-messageSent').html(mEmail);
        
                $('.messageError').fadeIn(0);  
            })
        	.always(function(returnedData) {
        		$('.contact-form-loading').hide(0);
        	});
        }
        else {
            // Some of the fields weren't completed correctly.
            
            $('html, body').stop().animate({
                'scrollTop': $('#form').offset().top
            }, 900, 'swing', function () {
                window.location.hash = target;
            });

	        if(!validName) {
	        	formName.addClass('contact-form-field-element-wrongfield');
	        }
	        if(!validMail) {
	        	formEmail.addClass('contact-form-field-element-wrongfield');
	        } 
	        if(!validMessage) {
	        	formMessage.addClass('contact-form-field-element-wrongfield');
	        }
	        if(!validPhone) {
	        	formPhone.addClass('contact-form-field-element-wrongfield');
	        }
        }

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });
	
	// Email validation function
	// Using regular expression to check if an email is valid or not
	// Source code: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript?page=1&tab=votes#tab-top

	function validateEmail(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	}

	// We check if a field is empty or not.
	function isValidField(text, minimunCharacters) {
		if(minimunCharacters <= 0) {
			minimunCharacters = 1;
		}
		return (text.length >= minimunCharacters);
	} 
