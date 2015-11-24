/*
 * SERVER.JS
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 1337;

var express = require('express');
var app = express();


var server = require('http').createServer(app);
server = server.listen(port);


var path = require('path'); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes');

// connect to database
var dbName = 'seed-mean-html';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/' + dbName);    

// configure bodyparser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// serve public folder as static assets on the root route
var publicPath = path.join(__dirname, 'public');
app.use("/", express.static(publicPath));

// alias the views folder
var viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);

// set 'html' as the engine, using ejs's renderFile function
var ejs = require('ejs');
app.engine('html', ejs.renderFile); 
app.set('view engine', 'html');

// routes for index and template views
app.get('/', function(request, response){
  response.render('index');
});
app.get('/templates/:name', function(request, response){
  var name = request.params.name;
  response.render('templates/' + name);
});

// post routes

app.use('/api/posts', require('./routes.js').postRouter);

// REDIRECT ALL OTHER PATHS TO INDEX (HTML5 history)
app.get('*',  function(request, response){
  response.render('index');
});
// EXPORT SERVER
module.exports = server;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + port);
