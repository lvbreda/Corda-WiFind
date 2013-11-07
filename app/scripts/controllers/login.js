'use strict';

angular.module('cordarrApp')
  .controller('LoginCtrl', function ($scope,User,$location) {
  	$scope.user = User.getUser();
    $scope.loginFacebook = function(){
    	 window.location.href = "/auth/facebook";
    }
    $scope.$watch("user",function(newvalue){
    	console.log($scope.user);
    	if($scope.user.username){
    		$location.path("/map");
    	}
    },true)

    User.check().then(function(res){
    	if(res){
    		$scope.user = User.getUser();
    		//$location.path("/map");
    	}
    },function(res){

    });
  });
