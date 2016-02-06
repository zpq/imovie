/**
 * Created by zpq on 1/30/16.
 */

var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');

var User = mongoose.model('User', UserSchema);

module.exports = User;