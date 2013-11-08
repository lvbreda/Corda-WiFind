var mongo = require('mongoskin'),
	fs = require('fs'),
	db = mongo.db("localhost:27017/cordahack", {w:1});

var error = function(res,err){
	console.log(err);
	res.json(err);
}
/**
	Model : 

	{
		ssid,
		url, //image
		name
	}

**/

// db.locations.insert({
// "ssid" : "first_floor",
// "url": "/images/links_verdiep0.png",
// "name": "First floor"
// })

var insertLocation = function(location, next){
	if (typeof next === 'undefined') { next = function(){}; }

	db.collection("locations").find({ssid:location.ssid}).toArray(function(error,result){
		//check duplicates
		if (result.length == 0){
			db.collection("locations").insert(location, next);
		}
	});
	
}

exports.loadLocationsFromConfig = function(req,res){
	console.log("loadLocationsFromConfig");

	var config = JSON.parse(fs.readFileSync('api/ssid_config.json'));
	for (var i in config.locations){
		var location = config.locations[i];
		insertLocation(location);
	}
}

exports.createLocation = function(req,res){
	insertLocation(req.body, function(err,result){
		res.json({
			"success" : true
		})
	})
}
exports.getLocations = function(req,res){
	db.collection("locations").find({
		
	},{}).toArray(function(err,result){
		if(err) error(res,err);
		res.json(result);
	})	
}

