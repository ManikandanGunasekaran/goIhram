angular.module('app.controllers', [])
  
.controller('loginCtrl', ['$scope', '$stateParams','$state', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$ionicHistory) {

	console.log('I am from LoginController');
	$scope.userEmail;
	$scope.userPassword;
	$scope.doLogin = function(){
		console.log('from doLogin page');
		  $ionicHistory.nextViewOptions({
		    disableBack: true
		  });
		$state.go('homePage');
	}


}])
   
.controller('homePageCtrl', ['$scope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state) {

  $scope.loadMap = function(){
    $state.go('map');
  }
}])
 
.controller('mapCtrl', ['$scope','$cordovaGeolocation','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters  your page via $stateParams.parameterName
function ($scope, $cordovaGeolocation, $ionicLoading) {
   
 ionic.Platform.ready(function(){
        // Code goes here
        
      $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };

    $scope.addNew = function(frndLatLang){
      if(!$scope.map){return ;}
      $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
          navigator.geolocation.getCurrentPosition(function(pos) {
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap($scope.map);
            var lat  = pos.coords.latitude;
            var long = pos.coords.longitude;

            var start = new google.maps.LatLng(lat, long);;
            var end = frndLatLang;
            var request = {
              origin: start,
              destination: end,
              travelMode: 'DRIVING'
            };
             $ionicLoading.hide();
            directionsService.route(request, function(result, status) {
              if (status == 'OK') {
                directionsDisplay.setDirections(result);
              }
               directionsDisplay.setDirections(result);
            });
          });

        }

$scope.cities = [
    {
        name : 'Friend 1',
        desc : 'T',
        lat : 12.238983,
        long : 80.888509
    },
    {
        name : 'Friend 2',
        desc : 'Te',
        lat : 13.238168,
        long :79.238168
    },
    {
        name : 'Friend 3',
        desc : 'Tes',
        lat :14.242452,
        long : 79.889882 
    },
    {
        name : 'Friend 4',
        desc : 'zesc',
        lat : 12.247234,
        long : 80.893567 
    },
    {
        name : 'Friend 5',
        desc : 'Test',
        lat : 12.241874,
        long : 79.883568 
    }
];



$scope.loadNearByPlaces = function(){
       $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (info){
            var latLang = new google.maps.LatLng(info.lat, info.long);
            var marker = new google.maps.Marker({
                position: latLang,
                map: $scope.map,
                title: info.name
            });
            marker.setMap($scope.map);
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
                var frndLatLang = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                $scope.addNew(frndLatLang);
            });
            $scope.markers.push(marker);
            $scope.map.setCenter(latLang);
            
        }  
        for (i = 0; i < $scope.cities.length; i++){
            createMarker($scope.cities[i]);
        }

}


$scope.getYourPosition = function(){

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(pos){
       var lat  = pos.coords.latitude;
                var long = pos.coords.longitude;
                var loc =  new google.maps.LatLng(lat, long);
                return loc;
    },function(error){
      return null;
    });
}


 $scope.centerOnMe = function() {
            if(!$scope.map) {
              return;
            }

             $cordovaGeolocation.getCurrentPosition(posOptions).then(function(pos){
               var lat  = pos.coords.latitude;
                var long = pos.coords.longitude;
                var loc =  new google.maps.LatLng(lat, long);
               
                if(loc !== null){
                    var mapOptions = {
                    center: loc,
                    zoom: 4,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };    
                   $scope.map.setCenter(loc);
                 var marker = new google.maps.Marker({
                        position:loc,
                        map: $scope.map,
                        title:'new location'
                   });
                 marker.setMap( $scope.map);
            }        
    });


           
      };
 


        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            console.log(lat);
            console.log(long);
            var myLatlng = new google.maps.LatLng(lat, long);          
            var mapOptions = {
                center: myLatlng,
                zoom: 4,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
             
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);     

            $ionicLoading.hide();    
            $scope.map = map; 
              var marker = new google.maps.Marker({
                position:myLatlng,
                map: $scope.map,
                title:'My Location'
           });
           marker.setMap( $scope.map);
           
            /**
          load few more places in map
         */
         
        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    });                     

}])
 
