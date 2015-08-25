var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

//------------------------------
//- Modulos instalados por mi --
//------------------------------

var contentData = require('./public/content/content.json');
var nodemailer = require('nodemailer'); // Nodemailer es un módulo externo de node que nos permite mandar correos.

var app = express();

// Modulos para el recaptcha
var recaptcha = require('express-recaptcha');
recaptcha.init(
  '6LfPzgsTAAAAAD36oBqLs3izEHxJHOxAsn5gEN9n', 
  '6LfPzgsTAAAAAFtpU2j2VWtw0RagisNWBQ6wfxWC'
);

// Middleware to remove header of express
app.use(function (req, res, next) {
      res.removeHeader("X-Powered-By");
      next();
});

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
// app.use(app.router);

// routes ======================================================================
require('./routes/index.js')(app, contentData, nodemailer, recaptcha); // load our routes and pass in our app and fully configured passport

// Adding captcha middleware.
// Generates a captcha image everytime we load a page.

/*
app.use(captcha({ 
      url: '/images/captcha.jpg', 
      color:'#0064cd', 
      background: 'rgb(20,30,200)'
})); // captcha params
*/

//------------------------------
//-- HTML OUTPUT NO MINIMIZADO.
//------------------------------

app.locals.pretty = true;

//------------------------------
//-- ERRORS
//------------------------------
   
// Agregados de jorge. 

// Handle 404
app.use(function(req, res, err) {
  res.status(404); 

  res.render('error', { 
      menu : 'error',
      error: err,
      content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
  });
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

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500);

  res.render('error', { 
      menu : 'error',
      error: err,
      content: contentData.spanish // Passing a "JSON" to views with the data of the website. 
  });
});



module.exports = app;
