'use strict';

angular.module('cordarrApp')
  .service('Locations', function Locations($http,$q) {
  	var self = this;
  	self.cached = false;
  	self.locations  = [];
  	self.images = [];
  	self.getLocations = function(){
  		
  		if(!self.cached){
  			$http.get("/api/locations").success(function(result){
  				angular.copy(result,self.locations);
  			})
  		}
  		self.preload();
  		return self.locations;
  	}
  	self.preload = function(locations){
  		for(var i in locations){
  			self.images[i]  = new Image();
  			self.images[i].src = locations[i].url;
  		}
  	}
  	return self;
 });
