var mongo = require('mongoskin'),
	db = mongo.db("localhost:27017/cordahack", {w:1}),
	io = undefined;

var error = function(res,err){
	console.log(err);
	res.json(err);
}
exports.init = function(io){

}
exports.getPeople = function(req,res){
	db.collection("people").find({
	},{}).toArray(function (err, result) {
                if (err) error(res,err); return;
                res.json(result);
    });
}
exports.giveLocation = function(req,res){
	var username = "lander";
	db.collection("people").update({
		username : "lander"
	},{
		$set : {
			location : [req.body.lon,req.body.lat]
		}
	},function(err,result){
		if (err) error(res,err); return;
		res.json({
			"result" : "Aigth"		
		});
	})
	io.sockets.emit('location_update', {
		username : username,
		location  :{
			lon : req.body.lon,
			lat : req.body.lat
		}
	});
}