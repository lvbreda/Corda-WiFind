'use strict';

angular.module('cordarrApp')
  .service('People',["Socket","$http", function People(Socket,$http) {
    var self = this;
    var people = [];
    self.init = function(){
    	$http.get("/api/people").success(function(res){
    		_.each(res,function(person){
    			people.push(person);
    		})
    	})
    	Socket.on("location_update",function(data){
    		for(var i in people){
    			if(people[i].username === data.username){
    				people[i].location = data.location;
    				break;
    			}
    		}
    	})
    }

    return self;
  }]);
