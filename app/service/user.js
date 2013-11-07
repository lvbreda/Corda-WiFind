'use strict';

angular.module('cordarrApp')
  .service('User', function User($http,$q) {
    var self = this;
    self.user = {};
    self.check = function(){
    	var deferred = $q.defer();
    	$http.get("/api/current").success(function(res){
    		if(!res.error){
    			angular.copy(res,self.user);
    			deferred.resolve(true);
    		}else{
    			deferred.reject(false);
    		}
    	});
    	return deferred.promise;
    }
    self.getUser = function(){
    	return self.user;
    }

    return self;
  });
