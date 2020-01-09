var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    sex: String,
    age: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema)