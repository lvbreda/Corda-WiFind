var mongo = require('mongoskin'),
	db = mongo.db("localhost:27017/cordahack", {w:1});

var error = function(res,err){
	console.log(err);
	res.json(err);
}

exports.getLocations = function(req,res){
	db.collection("locations").find({

	},{}).toArray(function(err,result){
		res.json(result);
	})	
}

