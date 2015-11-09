var app =angular.module('starter.controllers', [])
app.controller('WeatherCtrl', function($scope,$ionicPlatform, $cordovaGeolocation,WeatherFactory){
	$ionicPlatform.ready(function() {
		$scope.weathers = [];
	var posOptions = {timeout: 10000, enableHighAccuracy: true};
	  $cordovaGeolocation
	    .getCurrentPosition(posOptions)
	    .then(function (position) {
			$scope.weathers =WeatherFactory.list(position.coords);
			
	    }, function(err) {
			console.log('Error' + angular.toJson(err)); 
	    });
	});
});

app.controller('DetailCtrl', function($scope,$stateParams,WeatherFactory){
	$scope.weather =WeatherFactory.getWeather($stateParams.timestamp);
	
});

app.factory('WeatherFactory', function($http){
	var weatherArray = [];
	
	function retrieveWeather(position){
		$http.get('http://api.openweathermap.org/data/2.5/forecast?lat='+coordinate.latitude+'&lon='+coordinate.longitude+'&appid=8131be7e3e6b2014b3af931e011bd730')
		.success(function(response){
			angular.forEach(response.list, function(result){
				weatherArray.push(result);
			});
		});
		
	}
	
	
	return {
		
		getWeather: function(timestamp){
			for (var i = 0; i < weatherArray.length; i++){
				if (weatherArray[i].dt == timestamp) {
				return weatherArray[i]
				}
			}
			return undefined;
		},
		
		list: function (position){
			coordinate = position;
			retrieveWeather(position);
			return weatherArray;
		}
	
		
	}
});