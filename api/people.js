var mongo = require('mongoskin'),
	db = mongo.db("localhost:27017/cordahack", {w:1}),
	io = undefined;

var error = function(res,err){
	console.log(err);
	res.json(err);
}
exports.init = function(hop){
	io  = hop;
}
exports.getPeople = function(req,res){
	db.collection("people").find({
	},{}).toArray(function (err, result) {
                
                res.json(result);
    });
}
exports.giveLocation = function(req,res){
	console.log("giveLocation", req.body);

	var username = req.body.username;
	var picture = req.body.picture;

	console.log(username, picture);

	db.collection("people").findOne({username: req.body.username},function(err,person){
		if(person){

			db.collection("people").update({
				username : req.body.username
			},{
				$set : {
					ssid : req.body.ssid,
					beacon : req.body.beacon
				}
			},function(err,result){
				console.log("Aangekomen");
				db.collection("locations").findOne({$or : [{ssid : req.body.ssid},{beacon : req.body.beacon}]},function(err,location){
					
					console.log("location", location);

					if(location){
						io.sockets.emit('location_update', {
							username : req.body.username,
							ssid : req.body.ssid,
							beacon : req.body.beacon
						});
					}
				})

				res.json({
					"result" : "Aigth"		
				});
			})
			
		}else{

			console.log('no user found', req.body, req.body.username, req.body.picture);
			db.collection("people").insert({
				username : req.body.username,
				picture : req.body.picture,
				ssid : req.body.ssid,
				beacon : req.body.beacon
			},function(err,result){
				
				db.collection("locations").findOne({$or : [{ssid : req.body.ssid},{beacon : req.body.beacon}]},function(err,location){
					if(location){
						io.sockets.emit('person_joined', {
							username : req.body.username,
							picture : req.body.picture,
							ssid : req.body.ssid,
							beack : req.body.beacon
						});
					}
				})
				res.json({
					"result" : "Aigth"		
				});
			})
			
		}
	})
}