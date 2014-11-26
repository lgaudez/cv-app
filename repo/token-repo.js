var db = require('../config/db');

var repo = db.collection('token');

module.export = repo;