// Set up ------------------------------------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Configuration --------------------------------------------------------------
//var routes = require('./routes/index');

// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
var app = express();
//connect database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/cv", {native_parser:true});

//app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);

// Imports -------------------------------------------------------

var authService = require('./service/auth-service');

// Auth ----------------------------------------------------------

var _userRepo = db.collection('user');
var _tokenRepo = db.collection('token');

//Service declaration

authService.initialize({userRepo : _userRepo, tokenRepo: _tokenRepo});

// Controller

var router = express.Router();
// With this part uncommented route are not reached
////catch 404 and forward to error handler
//router.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

router.use(function(req, res, next) {
    // do logging
//    console.log('Something is happening.');
    next();
});

// error handlers

// production error handler
// no stacktraces leaked to user
router.use(function(err, req, res, next) {
    console.log("err 500", err)
    res.status(err.status || 500);
    res.json("err");
    next();
});

router.use(function(err, req, res, next){
    console.log("couche secu",req.cookie);
    //TODO token .findOne By id
    next();
});

router.route('/rest/translations').get(function(req, response){
    console.log(req.cookie);
});

router.route('/rest/auth').post(function(req, response) {
    console.log('/rest/auth', req.body);
    var credential = req.body;

    _userRepo.findOne({login: credential.login}, function (err, result) {
        console.log("found user", err ,result);

        if(err) {
            console.log("no token for him")
            res.status(400);
        }

        if (result) {
            console.log("we have a result", result)
            // si on a un résultat

            if (credential.password == result.password) {
                // password match
                authService.upsertAfterSuccess(credential.login, function(token){
                    console.log("add cookie", token);
                    response.cookie('cv-token', token._id, {maxAge: 900000});
                    response.json(true);
                });
            }
            else {
                // password don't match
                response.cookie('cv-token', null);
                response.status(401);
                response.json(false);
            }
        }

    })
});

app.use('/', router);

module.exports = app;
