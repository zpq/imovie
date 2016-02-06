var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var user = require('./router/user');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect("mongodb://localhost/imooc");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected');
});


app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', user);
app.locals.moment = require('moment');
app.listen(port);

console.log('website started on port ' + port);

app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if(err) {
            console.log(error);
        } else {
            res.render('index', {
                title : 'imovie index',
                movies : movies
            });
        }
    });
});

app.get('/movie/:id', function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(error, movie) {
        if(error) {
            res.redirect('/');
        } else {
            res.render('detail', {
                title: 'imovie detail',
                movie: movie
            });
        }
    });
});

app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title : 'imovie admin add',
        movie : {
            title : '',
            doctor : '',
            country : '',
            language : '',
            poster : '',
            flash : '',
            year : '',
            summary : ''
        }
    });
});

app.get('/admin/update/:id', function(req, res) {
    var id = req.params.id;
    if(id) {
        Movie.findById(id, function (err, movie) {
            if(err) {
                console.log(err);
            } else {
                res.render('admin', {
                    title : 'imovie edit',
                    movie : movie
                });
            }
        });
    } else {
        res.redirect('/admin/movie/list');
    }
});

app.post('/admin/movie/save', function(req, res) {
    var id = req.body._id;
    var movieObj = req.body;
    var _movie;
    if(id !== 'undefined') { // update
        Movie.findById(id, function(err, movie) {
            if(err) {
                console.log(err);
            } else {
                _movie = _.extend(movie, movieObj);
                _movie.save(function(err, movie) {
                    if(err) {
                        console.log(err);
                    } else {
                        res.redirect('/movie/' + movie._id);
                    }
                });
            }
        });
    } else { // insert
        _movie = new Movie({
            title : movieObj.title,
            doctor : movieObj.doctor,
            country : movieObj.country,
            language : movieObj.language,
            poster : movieObj.poster,
            flash : movieObj.flash,
            year : movieObj.year,
            summary : movieObj.summary
        });
        _movie.save(function(err, movie) {
            if (err) {
                console.log('a' + err);
            } else {
                res.redirect('/movie/' + movie._id);
            }
        });
    }
});

app.get('/admin/movie/list', function(req, res) {
    Movie.fetch(function(error, movies) {
        if(error) {
            console.log(error);
        }
        res.render('list', {
            title : 'imovie index',
            movies : movies
        });
    });
});

app.delete('/admin/movie/list', function(req, res) {
    var id = req.query.id;
    if(id) {
        Movie.remove({_id : id}, function (err) {
            if(err) {
                console.log(err);
            } else {
                res.json({
                   success : 1
                });
            }
        });
    }
});



