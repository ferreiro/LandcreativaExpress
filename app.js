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


app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/nosotros', function(req, res){
  res.render('nosotros', {
    title: 'Nosotros',
    pageDescription : 'Somos expertos en diseño web'
  });
});

app.get('/servicios', function(req, res){
  res.render('services_personal', {
    title: 'Servicios',
    pageDescription : 'Somos expertos en diseño web'
  });
});

app.get('/servicios/empresas', function(req, res){
  res.render('services_companies', {
    title: 'Servicios',
    pageDescription : 'Somos expertos en diseño web'
  });
});

app.get('/servicios/particulares', function(req, res){
  res.render('services_personal', {
    title: 'Servicios',
    pageDescription : 'Somos expertos en diseño de páginas web personales'
  });
});

app.get('/servicios/marketing', function(req, res){
  res.render('services_marketing', {
    title: 'Servicios',
    pageDescription : 'Somos expertos en marketing digital y SEO'
  });
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
