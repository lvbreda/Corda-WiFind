var express = require("express");
var passport = require('passport'),
	facebookStrategy = require('passport-facebook');
var app = express();
var io = require('socket.io').listen(app);


 
app.use(express.logger());

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/app');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/app'));
  app.use(express.session({secret:'something'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


app.get('/', function(request, response) {
  response.render('index.html')
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
