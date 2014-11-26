var db = require('../config/db');

var repo = db.collection('user');

module.exports = repo;