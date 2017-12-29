const mongoose = require('mongoose');
const config = require('../config/mongo-config.js');
 
const db = mongoose.connect('mongodb://' + config.HOST + ':' + config.PORT + '/' + config.ROOM_NAME);

module.exports = db;