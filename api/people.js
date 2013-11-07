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
	var username = req.body.username;
	var picture = req.body.picture;

	db.collection("people").findOne({username: username},function(err,person){
		if(person){

			db.collection("people").update({
				username : username
			},{
				$set : {
					ssid : req.body.ssid,
					beacon : req.body.beacon
				}
			},function(err,result){

				
				console.log("Aangekomen");
				db.collection("locations").findOne({$or : [{ssid : req.body.ssid},{beacon : req.body.beacon}]},function(err,location){
					
					if(location){
						io.sockets.emit('location_update', {
							username : username,
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
			db.collection("people").insert({
				username : username,
				picture : picture,
				ssid : req.body.ssid,
				beacon : req.body.beacon
			},function(err,result){
				
				db.collection("locations").findOne({$or : [{ssid : req.body.ssid},{beacon : req.body.beacon}]},function(err,location){
					if(location){
						io.sockets.emit('person_joined', {
							username : username,
							picture : picture,
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