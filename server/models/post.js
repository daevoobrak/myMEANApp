var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
  username : { type: String},
  timeStamp : { type: Date ,default: new Date()},
  post : { type: String }
});

module.exports = mongoose.model('posts', Post);