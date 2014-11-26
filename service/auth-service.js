var _userRepo, _tokenRepo;

var service = {};

service.initialize = function(config){
//    console.log("AuthService initialize");
    _userRepo = config.userRepo;
    _tokenRepo = config.tokenRepo;
};

service.upsertAfterSuccess = function(login, callback){
    console.log("update after success");
    _tokenRepo.findOne({login : login}, function(err, result){
        if(result != null){
            //TODO incrase max age cookie
            console.log("found token", result);
            callback(result);
        } else {
            var token = generateToken(login);
            _tokenRepo.update({login : login}, token, {upsert : true}, function(err, result, test) {
//                console.log("callback update", err, result, test);
                callback(token);
            });


        }
    })
};

function generateToken(login){
    var token = {login: login, maxAge: 99999999, token : login};
    console.log("generate token", token)
    return token;
}

module.exports = service;