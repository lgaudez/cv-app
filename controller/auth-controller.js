var repo = require('../repo/user_repo');
//var cookieParser = require('cookie-parser');
var authService = require('../service/auth-service');



module.exports = function(app){
    app.post('/rest/auth', function(req, response) {
        var credential = req.body;

        repo.findOne({login : credential.login}, function(err, result){

            if(result){
                // si on a un resultat

                if(credential.password == result.password){
                    var token = authService.upsertAfterSuccess(credential.login);
                    response.cookie('cv-token', token);
                    response.json(true);
                }
                else{
                    response.cookie('cv-token', null );
                    response.status(401);
                    response.json(false);
                }
            }

        })

    });
};