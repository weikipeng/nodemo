var express = require("express")
var path = require('path')
var mongoose = require('mongoose')
var Movie = require('./models/movie')
var bodyParser = require('body-parser')
var _ = require('underscore')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost:27017/imooc')

app.set("views", "./views/pages")
app.set("view engine", "jade")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('imooc started on port ' + port)

// index page
app.get("/", function(req, res) {
  console.log("app get index page");
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }

    res.render('index', {
      title: 'imooc 首页',
      movies: movies
    })
  })
})

// detail page
app.get("/movie/:id", function(req, res) {
  var id = req.params.id

  Movie.findById(id, function(err, movie) {
    res.render('detail', {
      title: 'imooc ' + movie.title,
      movie: movie
    })
  })
})

// admin page
app.get("/admin/movie", function(req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})

// admin update movie
app.get('/admin/update/:id', function(req, res) {
  var id = req.params.id;

  console.log("admin update movie page id:" + id);

  if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err);
      }
      res.render('admin', {
        title: 'imooc 后台更新页',
        movie: movie
      })
    })
  }
})

// admin post movie
app.post('/admin/movie/new', function(req, res) {
  // console.log(req.body);
  console.log(req.body.movie);

  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie
  if (id !== 'undefined') {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err);
      }

      _movie = _.extend(movie, movieObj)
      _movie.save(function(error, movie) {
        if (err) {
          console.log(err);
        }
        res.redirect('/movie/' + movie._id)
      })
    })
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err);
      }

      res.redirect('/movie/' + movie._id)
    })
  }
})

// list page
app.get("/admin/list", function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }

    res.render('list', {
      title: 'imooc 列表页',
      movies: movies
    })
  })
})

// list delete movie
app.delete('/admin/list', function(req, res) {
  var id = req.query.id

  if (id) {
    Movie.remove({
      _id: id
    }, function(err, movie) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          success: 1
        })
      }
    })
  }
})



// // var express = require('express')
// // var app = express()
// //
// // // respond with "hello world" when a GET request is made to the homepage
// // app.get('/', function (req, res) {
// //   res.send('hello world')
// // })
// var express = require('express')
// var app = express()
//
// // app.get('/', function (req, res) {
// //   res.send('Hello World!,Hello Node JS')
// // })
//
// // app.listen(3000, function () {
// //   console.log('Example app listening on port 3000!')
// // })
//
// //---
//
// var counter = 0;
//
// // view engine setup
// app.set('views', './views');
// app.set('view engine', 'jade');
// app.engine('jade', require('jade').__express);
//
// app.get('/', function(req, res) {
//   counter++;
//   app.locals.counter = counter.toString();
//   res.render('index', {ip: req.ip});
// });
//
// app.listen(3000);
//
// app.locals.title = "Welcome to Visitor";
// app.locals.counter = "0";
