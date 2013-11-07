'use strict';

angular.module('cordarrApp')
  .service('People',["Socket","$http","$rootScope", function People(Socket,$http,$rootScope) {
    var self = this;
    self.people = [];
    self.init = function(){
    	$http.get("/api/people").success(function(res){
    		_.each(res,function(person){
    			self.people.push(person);
    		})
    	})
    	Socket.on("location_update",function(data){
    		for(var i in self.people){
    			if(self.people[i].username === data.username){
    				self.people[i].ssid = data.ssid;
    				break;
    			}
    		}
    		$rootScope.$emit("changeloc");
    	})
    	Socket.on("person_joined",function(data){
    		self.people.push(data);
    		$rootScope.$emit("changeloc");
    	})
    }
    self.getPeople = function(){
    	return self.people;
    }
    return self;
  }]);
