var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

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

// Routes

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
    title: 'Nosotros',
    pageDescription : 'Somos expertos en diseño web'
  });
});

app.get('/servicios', function(req, res) {
    var title, viewName, scriptName, description;  // View parameters

    title       = 'Servicios';    // default title
    viewName    = 'services';     // 'services' is the default view template
    scriptName  = 'tab_personal'; // default script name
    description = 'Expertos en Diseño web, diseño gráfico y marketing / SEO'; // default description

    res.render(
        viewName, {
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

    routeURL = req.params.routeURL; // Get the service routeURL

    // Default values for View parameters

    title       = 'Servicios';    // default title
    viewName    = 'services';     // 'services' is the default view template
    scriptName  = 'tab_personal'; // default script name
    description = 'Expertos en Diseño web, diseño gráfico y marketing / SEO'; // default description

    // Particular cases for specific routes
   
    if (routeURL == 'empresas') {
        // /services/empresas
        scriptName = 'tab_companies';
    }
    else if (routeURL == 'particulares') {
        // /services/particulares
        scriptName = 'tab_personal';
    }
    else if (routeURL == 'marketing') {
        // /services/particulares
        scriptName = 'tab_marketing';
    }

    res.render(
        viewName, {
            title: title, // Title of the section
            description: description,
            scriptName: scriptName
        }
    );
});

app.get('/casos_exito', function(req, res){
  res.render('casos_exito', {
    title: 'Casos de éxito'
  });
});

app.get('/contacta', function(req, res){
  res.render('contacta', {
    title: 'Contacta'
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


module.exports = app;
