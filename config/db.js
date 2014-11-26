var mongo = require('mongoskin');

var db = mongo.db("mongodb://localhost:27017/cv");//, {native_parser:true}

module.export = db;