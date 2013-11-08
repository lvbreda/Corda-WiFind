var express = require("express");
var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;
var app = express(),
	server = require('http').createServer(app)
	  , io = require('socket.io').listen(server);

var people = require("./api/people.js");
var locations = require("./api/locations.js");

people.init(io);



 
app.use(express.logger());

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/app');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/app'));
  app.use( express.cookieParser() );
  app.use(express.session({secret:'something'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' }));

passport.use(new FacebookStrategy({
    clientID: "356876184455716",
    clientSecret: "98dea24b3034bf74763798ca75feb885",
    callbackURL: "http://local.com:5000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log(profile);
    done(null,{
    	username : profile.name.givenName +  " "  +  profile.name.familyName,
    	picture : "https://graph.facebook.com/"+ profile.username +"/picture" 
    });
  }
));
passport.serializeUser(function(user, done) {
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser(function(user, done) {
        done(null, JSON.parse(user));
    });
app.get("/api/current",function(req,res){
	if(req.user){
		res.json(req.user);
	}else{
		res.json({
			error : "No user"
		})
	}
	
})
app.get("/api/people",people.getPeople);
app.post("/api/userlocation",people.giveLocation);
app.post("/api/locations",locations.createLocation);
app.get("/api/locations",locations.getLocations);

app.get('/', function(request, response) {
  response.render('index.html')
});

locations.loadLocationsFromConfig();

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});
