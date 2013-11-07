var mongo = require('mongoskin'),
	db = mongo.db("localhost:27017/cordahack", {w:1});

var error = function(res,err){
	console.log(err);
	res.json(err);
}
/**
	Model : 

	{
		ssid,
		url,
		name
	}

**/

exports.createLocation = function(req,res){
	db.collection("locations").insert(req.body,function(err,result){
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

