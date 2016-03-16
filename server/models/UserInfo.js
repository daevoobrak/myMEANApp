// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var UserInfo = new Schema({
  name: { type: String,  unique: true, sparse: true },
  email: { type: String,  unique: true, sparse: true },
  age : {type: Number , default: 18},

});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);