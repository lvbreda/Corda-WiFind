'use strict';

angular.module('cordarrApp')
  .controller('MapCtrl', function ($scope,geolocation,User,Locations,People,$rootScope) {
    	$scope.user = User.getUser();
    	User.check();
    	$scope.people = People.getPeople();
    	People.init();
    	$scope.selectedUser;
    	$scope.search = "";
    	$scope.locations = Locations.getLocations();


    	$scope.setSelectedUser = function(user){
    		$scope.selectedUser = user;
    	}

    	$scope.getImage = function(user){
    		if($scope.selectedUser && $scope.selectedUser.loc){
    			return $scope.selectedUser.loc.url;
    		}else{
    			return "/images/cordacampus_placeholder.png"
    		}
    	}

    	$scope.updateUserLocs = function(){
    		if($scope.people.length > 1 && $scope.locations.length >1){
    			for(var i in $scope.people){
    				var person = $scope.people[i];
    				var ok = false;
    				for(var a in $scope.locations){
    					var location = $scope.locations[a];
    					if(person.beacon){
    						if(location.ssid == person.beacon){
    							$scope.people[i].loc = location;
    							ok = true;
    						}
    					}else{
    						if(location.ssid === person.ssid){
	    						$scope.people[i].loc = location;
	    						ok = true;
	    					}
    					}
    				}
    				if(!ok){
    					$scope.people[i].loc = undefined;
    				}
    			}
    		}
    	}
    	$rootScope.$on("changeloc",function(){
    		$scope.updateUserLocs();
    	})
    	$scope.$watch("user",$scope.updateUserLocs,true);
    	$scope.$watch("locations",$scope.updateUserLocs,true);
  });
