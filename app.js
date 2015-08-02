var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

// Nodemailer es un módulo externo de node que nos permite mandar correos.
var nodemailer = require('nodemailer');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);





//------------------------------
//-- HTML OUTPUT NO MINIMIZADO.
//------------------------------

app.locals.pretty = true;


 
//------------------------------
//-- ROUTES
//------------------------------
 

app.get('/', routes.index);
app.get('/users', users.list);
  
/*
app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
}); 
*/

app.get('/nosotros', function(req, res){
  res.render('nosotros', {           
    menu : 'nosotros',
    title: 'Nosotros',
    pageDescription : 'Somos expertos en diseño web'
  });
});

//------------------------------
//-- SERVICIOS ROUTES
//------------------------------

app.get('/servicios', function(req, res) {
    var title, viewName, scriptName, description;  // View parameters

    title       = 'Servicios';    // default title
    viewName    = 'services';     // 'services' is the default view template
    scriptName  = 'tab_personal'; // default script name
    description = 'Expertos en Diseño web, diseño gráfico y marketing / SEO'; // default description

    res.render(
        viewName, {
            menu : 'servicios',
            title: title, // Title of the section
            description: description,
            scriptName: scriptName
        }
    );
});

// :routeURL - Código explicado en http://expressjs.com/4x/api.html#res.send

app.get('/servicios/:routeURL', function(req, res) {
    var title, viewName, scriptName, description;  // View parameters
    var routeURL; 

    routeURL = (req.params.routeURL).toUpperCase(); // Get the service routeURL

    // Default values for View parameters

    title       = 'Servicios';    // default title
    viewName    = 'services';     // 'services' is the default view template
    scriptName  = 'tab_personal'; // default script name
    description = 'Expertos en Diseño web, diseño gráfico y marketing / SEO'; // default description

    // Particular cases for specific routes
   
    if (routeURL == 'EMPRESAS') {
        // /services/empresas
        scriptName = 'tab_companies';
    }
    else if (routeURL == 'PARTICULARES') {
        // /services/particulares
        scriptName = 'tab_personal';
    }
    else if (routeURL == 'MARKETING') {
        // /services/particulares
        scriptName = 'tab_marketing';
    }

    res.render(
        viewName, {
            menu : 'servicios',
            title: title, // Title of the section
            description: description,
            scriptName: scriptName
        }
    );
});

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

    // Particular cases for the URL
    // Particulares

    if (contactType == "gold") {
        headerImage = 'goldContact.png';
    }
    else if (contactType == "silver") {
        headerImage = 'silverContact.png';
    }
    else if (contactType == "premium") {
        headerImage = 'premiumContact.png';
    } // Empresas
    else if (contactType == "executive") {
        headerImage = 'goldContact.png';
    }
    else if (contactType == "business") {
        headerImage = 'silverContact.png';
    }
    else if (contactType == "first-class") {
        headerImage = 'premiumContact.png';
    } // Marketing
    else if (contactType == "analitica") {
        headerImage = 'analiticaContact.png';
    }
    else if (contactType == "seo") {
        headerImage = 'seoContact.png';
    }
    else if (contactType == "marketing") {
        headerImage = 'marketingContact.png';
    }
    
    res.render('contact', {
        menu : 'servicios',
        title: title, // Title of the section
        description: description,
        headerImage: headerImage,
        contact: contact,
        displayForm: true   // THe view uses this variable to show the contact "form" or "not"
    })
});
  
//------------------------------
//-- CASOS DE ÉXITO
//------------------------------

app.get('/casos_exito', function(req, res){
    var title = 'Casos de éxito';
    var description = 'Expertos en páginas web, diseño gráfico, SEO y marketing digital'

    res.render('casos_exito', {
        menu : 'casos_exito',
        title: title, // Title of the section
        description: description
    })
});

//------------------------------
//-- CONTACT ROUTES
//------------------------------

// http://blog.ragingflame.co.za/2012/6/28/simple-form-handling-with-express-and-nodemailer

app.get('/contacta', function(req,res) {
    var title = 'Contacta';
    var description = 'Expertos en páginas web, diseño gráfico, SEO y marketing digital'
    var contact = true; // The view use this to show contact or presupuesto

    res.render('contact', {        
        menu : 'contacta',
        title: title, // Title of the section
        description: description,
        contact: contact,
        displayForm: true   // THe view uses this variable to show the contact "form" or "not"
    });
});

app.post('/contacta', function (req, res) {
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
            form: form          // We pass the form object we created before
        }); 
    }); 

    // Devolver JSON para cuando se haga un formulario ajax.
    // res.json(userDataObject); 

});



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
