/**
 * Created by zpq on 1/30/16.
 */

var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;