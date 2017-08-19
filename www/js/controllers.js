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

    $scope.addNew = function(){
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
            var end = new google.maps.LatLng('13.0102357', '80.21565099999998');
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




$scope.loadNearByPlaces = function(){
 
      var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService($scope.map);
   $cordovaGeolocation.getCurrentPosition(posOptions).then(function(pos){
               var lat  = pos.coords.latitude;
               var long = pos.coords.longitude;
               var loc =  new google.maps.LatLng(lat, long);
               var pyrmont = $scope.getYourPosition();
                      if(pyrmont!==null){
                         service.nearbySearch({
                        location: pyrmont,
                        radius: 500,
                        type: ['store']
                      }, callback);
                    }
              });


       

       function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open($scope.map, this);
        });
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
                    zoom: 16,
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
             
            var myLatlng = new google.maps.LatLng(lat, long);          
            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
             
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);     

            $ionicLoading.hide();    
            $scope.map = map; 
              var marker = new google.maps.Marker({
                position:myLatlng,
                map: $scope.map,
                title:'new location'
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
 