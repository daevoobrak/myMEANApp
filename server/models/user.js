// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: { type: String,  unique: true, sparse: true },
  password: { type: String,  unique: true, sparse: true },
  userinfo: {
    name:{
      first:{type:String},
      last:{type:String}
    },
    age:{type:Number},
    qualifications:{
      highSchool:{type:String},
      intermediate:{type:String},
      ug:{type:String},
      pg:{type:String},
      others:{type:String}
    },
    image:{
      profile:{data: Buffer, contentType: String},
      coverPhoto:{data: Buffer, contentType: String}
    }
  }
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);