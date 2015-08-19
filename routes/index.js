module.exports = function(app, contentData, nodemailer) {

	var english = contentData.english;
	var spanish = contentData.spanish;
	
	app.get('/sitemap.xml', function(req, res) {
		var sitemap = generate_xml_sitemap();	
		res.header('Content-Type', 'text/xml');
	    	res.send(sitemap);
	});
	
	function generate_xml_sitemap() {
		// the root of your website - the protocol and the domain name with a trailing slash
		var root_path = 'http://www.landcreativa.com/';
		
		// this is the source of the URLs on your site, in this case we use a simple array, actually it could come from the database
		var urls = ['', 'nosotros', 'servicios', 'servicios/empresas', 'servicios/particulares', 'servicios/otros',
				'contacta', 'trabajos',
			        'quiero/economy', 'quiero/business', 'quiero/first-class', 
			        'quiero/gold', 'quiero/siver', 'quiero/premium', 
			        'quiero/seo', 'quiero/paypal', 'quiero/responsive',
			        'quiero/newsletter', 'quiero/tarjetas_visita', 'quiero/diseno_banners'];
			        
		// XML sitemap generation starts here
		
		var priority = 1; // Maximum priority by default
		var freq = 'monthly';
		var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
		for (var i in urls) {
			var url = urls[i];
			
			if (url.indexOf('quiero') >= 0) {
				priority = 0.3; // less priority for less important sections
				freq = 'monthly';
			}
			else if (url.indexOf('servicios/') >= 0) {
				priority = 0.9; // medium priority for the services.
				freq = 'monthly';
			}
			else {
				priority = 1;
				freq = 'weekly';
			}
			
			xml += '<url>';
			xml += '<loc>'+ root_path + url + '</loc>';
			xml += '<changefreq>'+ freq +'</changefreq>';
			xml += '<priority>'+ priority +'</priority>';
			xml += '</url>';
			i++;
		}
		xml += '</urlset>';
		return xml;
	}
	
	app.get('/', function(req, res) {
	    res.render('index', { 
	        menu : 'index',
	        content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
	    });
	});

	app.get( english.baseURL , function(req, res) {
	    res.render('index', { 
	        menu : 'index',
	        content: contentData.english // Passing a "JSON" to views with the data of the website. 
	    });
	});

	//------------------------------
	//-- ABOUT
	//------------------------------

	app.get('/nosotros', function(req, res) { 
	    res.render('about', { 
	        menu : 'nosotros',
	        content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
	    }); 
	});

	app.get( english.baseURL+ '/about', function(req, res) {
	    res.render('about', {
	        menu: 'about',
	        content:contentData.english
	    });
	});

	//------------------------------
	//-- SERVICIOS ROUTES
	//------------------------------

	app.get('/servicios', function(req, res) {
	    var serviceType = 'particulares'; // View parameter
	    res.render('services', {
	            menu : 'servicios',
	            serviceType: serviceType,
	            serviceIndex: true, // Only for the services index
	            content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
	        }
	    );
	});

	app.get( english.baseURL+'/services' , function(req, res) {
	    var serviceType = 'particulares'; // View parameter
	    res.render('services', {
	            menu : 'services',
	            serviceType: serviceType,
	            content: contentData.english // Passing a "JSON" to views with the data of the website. 
	        }
	    );
	}); 

	// :type - Código explicado en http://expressjs.com/4x/api.html#res.send

	app.get('/servicios/:type', function(req, res) {
	    var serviceType, validType;
	    
	    serviceType = (req.params.type).toLowerCase();
	    validType = doesServiceExist( serviceType );

	    if (validType) {
	        // If element found, render the service template
	        res.render('services', {
	                menu : 'servicios',
	                serviceType: serviceType,
	                content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
	            }
	        );
	    }
	    else {
	        // Else: the route is not "Empresas", particulares or marketing
	        // Redirect to servicios main page.
	        res.redirect('/servicios');
	    }
	});


	// :type - Código explicado en http://expressjs.com/4x/api.html#res.send

	app.get( english.baseURL+'/services/:type' , function(req, res) {
	    var title, viewName, scriptName, description;  // View parameters
	    var serviceType, services, found, i;
	    
	    serviceType = (req.params.type).toLowerCase();

	    i = 0;
	    found = false; 
	    services = ['business', 'personal', 'others', 'marketing', 'SEO', 'SEM']; 
	    scriptName  = 'tab_personal'; // default script names;

	    while(i < services.length && (!found)) {
	        if(serviceType == services[i]) {
	            found = true;
	            scriptName = getScriptName( serviceType );
	        } 
	        i++;
	    }
	 
	    if (found) {
	        // If element found, render the service template
	        res.render('services', {
	                menu : 'services', 
	                scriptName: scriptName,
	                content: contentData.english // Passing a "JSON" to views with the data of the website. 
	            }
	        );
	    }
	    else {
	        // Else: the route is not "Empresas", particulares or marketing
	        // Redirect to servicios main page.

	        res.redirect( english.baseURL+'/services');
	    }
	});

	function getScriptName( serviceType ) {
	    var scriptName = 'tab_personal'; // Setting default script name
	   
	    if (serviceType == 'empresas' || serviceType == 'business') {
	        // /services/empresas
	        scriptName = 'tab_companies';
	    }
	    else if (serviceType == 'particulares' || serviceType == 'personal') {
	        // /services/particulares
	        scriptName = 'tab_personal';
	    }
	    else if (serviceType == 'otros' ||serviceType == 'marketing' || serviceType == 'seo' || serviceType == 'sem') {
	        // /services/particulares
	        scriptName = 'tab_marketing';
	    }
	    return scriptName;
	}


	//------------------------------
	//-- QUIERO ROUTES
	//------------------------------

	app.get('/quiero/:contactType', function(req, res){
	    var title, description, contactType;
	    var headerImage, contact; // View parameters

	    contactType = (req.params.contactType).toLowerCase();   // Take the URL parameter in this variable

	    // Default content for the page
	    title = '¡Quiero el pack ' + contactType + '!';
	    description = 'Expertos en páginas web, diseño gráfico, SEO y marketing digital'
	    headerImage = ''; 
	    contact = false;    // The view use this to show contact or presupuesto 
 
	    // if (contactType == "gold") {
	    //     headerImage = 'goldContact.png';
	    // }
	    // else if (contactType == "silver") {
	    //     headerImage = 'silverContact.png';
	    // }
	    // else if (contactType == "premium") {
	    //     headerImage = 'premiumContact.png';
	    // } // Empresas
	    // else if (contactType == "economy") {
	    //     headerImage = 'economyContact.png';
	    // }
	    // else if (contactType == "business") {
	    //     headerImage = 'businessContact.png';
	    // }
	    // else if (contactType == "first-class") {
	    //     headerImage = 'first-classContact.png';
	    // } // Marketing
	    // else if (contactType == "analitica") {
	    //     headerImage = 'analiticaContact.png';
	    // }
	    // else if (contactType == "seo") {
	    //     headerImage = 'seoContact.png';
	    // }
	    // else if (contactType == "marketing") {
	    //     headerImage = 'marketingContact.png';
	    // } 
	    
	    res.render('contact', { 
	        menu : 'servicios',
	        //headerImage: headerImage,
	        title: title, // Title of the section
	        quiero: true,   // THe view uses this variable to show the contact "form" or "not"
	        options: false, // Show the options for the select box
	        content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
	    })
	});

	//------------------------------
	//-- CASOS DE ÉXITO
	//------------------------------

	app.get('/trabajos', function(req, res){
	    res.render('portfolio', {
	        menu : 'trabajos',
	        content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
	    })
	});

	app.get( english.baseURL+'/portfolio' , function(req, res){
	    res.render('portfolio', {
	        menu : 'portfolio',
	        content: contentData.english // Passing a "JSON" to views with the data of the website. 
	    })
	});

	//------------------------------
	//-- Promociones
	//------------------------------

	app.get('/promociones/:type', function(req, res) {
		var promoName = req.params.type;

		res.render('contact', {
			menu: 'promo',
			title: 'Promo ' + promoName,
			displayBanners : false,
			promoHeader: '/images/wordpress.jpg',
	        options: false, // Show the options for the select box
	        content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
		});
	});

	//------------------------------
	//-- CONTACT ROUTES
	//------------------------------

	// http://blog.ragingflame.co.za/2012/6/28/simple-form-handling-with-express-and-nodemailer

	app.get('/contacta', function(req,res) {
	    var contact = true; // The view use this to show contact or presupuesto

	    res.render('contact', {        
	        menu : 'contacta',
	        contact: contact,
	        displayBanners: true,   // THe view uses this variable to show the contact "form" or "not"
	        options: true, // Show the options by default for the select box
	        content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
	    });
	});

	app.get( english.baseURL+'/contact', function(req,res) {
	    var contact = true; // The view use this to show contact or presupuesto

	    res.render('contact', {        
	        menu : 'contact',
	        contact: contact,
	        displayBanners: true,   // THe view uses this variable to show the contact "form" or "not"
	        content: contentData.english // Passing a "JSON" to views with the data of the website. 
	    });
	});

	// This function is done for returning a JSON with the data and success.
	// Due our contact form will have ass

	app.post('/contacta/JSON', function (req, res) {
	    var form; // keep the form data in one variable
	    var transporter, mailMSG; // mail variables. 

	    // Creating a form object and saving the &_POST data.
	    // req.body also is an object with the same data  var form = req.body.
	    // We use form object to pass the form data to the view and make "JSON" responses.

	    form = {
	        name: req.body.name,
	        email: req.body.email,
	        phone: req.body.phone,
	        subject: req.body.subject,
	        message: req.body.message // User message
	    } 

	    // Create reusable transporter object using SMTP transport
	    transporter = nodemailer.createTransport({
	        service: 'Gmail',
	        auth: {
	            user: 'landcreativaContactForm@gmail.com',
	            pass: 'landcreativad5Gk6VLpfvmLeGc24HYg'
	        }
	    }); 

	    // Preparing email message
	    mailMSG =  '<html><body style="background: #F8F8F8; margin:0; padding:1em 2em;">';
	    mailMSG += '<h3>Mensaje</h3>';
	    mailMSG += '<p style="font-size:16px;">' + form.name +'</p>';
	    mailMSG += '<h3>Información extra de contacto</h3>';
	    mailMSG += '<p style="font-size:16px;">';
	    mailMSG += 'Nombre: '   + form.name +'<br /> ';
	    mailMSG += 'Teléfono: ' + form.phone + '<br />';
	    mailMSG += 'Email: '    + form.email;
	    mailMSG += '</p>'; 
	    mailMSG += '</body></html>';

	    // Setup e-mail data with unicode symbols
	    var mailOptions = {
	        from: 'Jorge <landcreativa@gmail.com>', // sender address
	        to: 'landcreativa@gmail.com, jgferreiro.me@gmail.com', // list of receivers
	        replyTo: form.email,
	        subject: 'Mensaje de ' + form.name + ' - ' + form.subject, // Subject line
	        html: mailMSG // html body
	    };

	    // Send mail with defined transport object

	    transporter.sendMail(mailOptions, function(error, info) {
	        var err = false;
	 
	        // Email sent correctly
	        if (error) {
	            err = true; // Yes. There's an error with the form.
	        }
	         
	        // Devolver JSON para cuando se haga un formulario ajax.
	        res.json({ 
	            error: err,           // There wasn't any error
	            messageData: form          // We pass the form object we created before
	        });  

	    }); 
	});  

	// Si no queremos usar JSON y devolvemos una vista
	/*
	app.post('/contacta/procesar', function (req, res) {
	    var form; // keep the form data in one variable
	    var transporter, mailMSG; // mail variables. 

	    // Creating a form object and saving the &_POST data.
	    // req.body also is an object with the same data  var form = req.body.
	    // We use form object to pass the form data to the view and make "JSON" responses.

	    form = {
	        name: req.body.name,
	        email: req.body.email,
	        phone: req.body.phone,
	        subject: req.body.subject,
	        message: req.body.message // User message
	    } 

	    // Preparing email message

	    mailMSG =  '<html><body style="background: #F8F8F8; margin:0; padding:1em 2em;">';
	    mailMSG += '<h3>Mensaje</h3>';
	    mailMSG += '<p style="font-size:16px;">' + form.name +'</p>';
	    mailMSG += '<h3>Información extra de contacto</h3>';
	    mailMSG += '<p style="font-size:16px;">';
	    mailMSG += 'Nombre: '   + form.name +'<br /> ';
	    mailMSG += 'Teléfono: ' + form.phone + '<br />';
	    mailMSG += 'Email: '    + form.email;
	    mailMSG += '</p>'; 
	    mailMSG += '</body></html>';

	    // Create reusable transporter object using SMTP transport

	    transporter = nodemailer.createTransport({
	        service: 'Gmail',
	        auth: {
	            user: 'landcreativaContactForm@gmail.com',
	            pass: 'landcreativad5Gk6VLpfvmLeGc24HYg'
	        }
	    }); 

	    // Setup e-mail data with unicode symbols

	    var mailOptions = {
	        from: 'Jorge <landcreativa@gmail.com>', // sender address
	        to: 'landcreativa@gmail.com, jgferreiro.me@gmail.com', // list of receivers
	        replyTo: form.email,
	        subject: 'Mensaje de ' + form.name + ' - ' + form.subject, // Subject line
	        html: mailMSG // html body
	    };

	    // Send mail with defined transport object

	    transporter.sendMail(mailOptions, function(error, info) {
	        var viewTitle = 'Formulario enviado con éxito';
	        var err = false;
	 
	        // Email sent correctly
	        if (error) {
	            err = true; // Yes. There's an error with the form.
	            title = 'Formulario no enviado, tiene errores'; // Title of the page.
	        }
	        
	        res.render('contact', {
	            menu : 'contacta',
	            title: viewTitle,   // Title of the page.
	            err: err,           // There wasn't any error
	            displayForm: false, // THe view uses this variable to show the contact "form" or "not"
	            form: form,          // We pass the form object we created before
	            content: contentData.spanish
	        }); 

	    }); 
	 
	}); 
	*/


}

  
function doesServiceExist( name ) {
    var found = false, i = 0;
    var services = ['empresas', 'particulares', 'otros', 'marketing', 'SEO', 'SEM',
                    'business', 'personal', 'others', 'marketing' ];  // valid names

    while((i < services.length) && (!found)) {
        if (name == services[i]) {
            found = true;
        }
        i++;
    }

    return found;
}


/* GET home page. */
exports.index = function(req, res){

	console.log("---------- Puta");
	console.log("Content data " + global.contentData);
	console.log("---------- Puta");

	res.render('index', {         
        menu : '/index', 
		content: contentData.spanish
	})
};

