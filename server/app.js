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

app.use(express.static(path.join(__dirname, '../public')));

//app.use('/', routes);

// Imports -------------------------------------------------------

var authService = require('./service/auth-service');

// REPO

var _userRepo = db.collection('user');
var _tokenRepo = db.collection('token');
var _translationRepo = db.collection('translation');

//Service declaration
// Auth ----------------------------------------------------------

authService.initialize({userRepo : _userRepo, tokenRepo: _tokenRepo});

// init Translation Service
fs = require('fs');

function readI18nFile(path, locale){
    console.log(locale);
    fs.readFile(path, function (err,data) {
        if (err) {
            return console.log(err);
        }
        var object = JSON.parse(data);
//        console.log(object)
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
//                console.log(object[key]);
                var objectTransformed = {locale : locale, key: key, value: object[key]};
                //insert in database

                _translationRepo.update({key : key, locale: locale}, objectTransformed, {upsert : true}, function(err, result) {

//                    console.log("callback update locale *//");
                });

            }
        }
    });
}

var locales = ['fr-fr', 'en-gb'];

function updateI18nCollection(){
    for(var i = 0; i <locales.length; i++){
        readI18nFile('server\\i18n\\i18n_'+locales[i] + '.json', locales[i]);
    }
}

updateI18nCollection();



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
    console.log("err 500", err);
    res.status(err.status || 500);
    res.json("err");
    next();
});

router.use(function(err, req, res, next){
    console.log("couche secu",req.cookie);
    //TODO token .findOne By id
    next();
});

// Translations

router.route('/rest/translations').get(function(req, response){
    var localeAsked = req.param("lang");
    var i18nResponse = {};

    _translationRepo.find({locale: localeAsked}).toArray(function(err, result) {

        if(result!= null && result.length > 0){
            for(var i = 0; i< result.length; i++){
                var translation = result[i];
                var objectName = translation.key;
                i18nResponse[objectName] = translation.value;
            }
        }
        else{
            response.status(400);
        }

        response.json(i18nResponse);
    });

}).post(function(req, response){
    var translation = req.body;
    _translationRepo.update({key : translation.key, locale: translation.locale}, translation, {upsert : true}, function(err, result) {
        //TODO update in file ou regenérer le fichier à partir de la db
        response.json();
    });
});

router.route('/rest/auth').post(function(req, response) {
    console.log('/rest/auth', req.body);
    var credential = req.body;

    _userRepo.findOne({login: credential.login}, function (err, result) {
        console.log("found user", err ,result);

        if(err || result == null) {
            response.status(400);
            response.json("error");
        }

        if (result) {
            // si on a un résultat

            if (credential.password == result.password) {
                // password match
                authService.upsertAfterSuccess(credential.login, function(token){
                    console.log("add cookie", token.id);
                    response.cookie('cv-token', token._id, {maxAge: 9000000});
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
