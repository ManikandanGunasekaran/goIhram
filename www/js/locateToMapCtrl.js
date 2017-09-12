app.controller('mapCtrl', ['$scope', '$cordovaGeolocation', '$ionicLoading', 'mapService',
 // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters  your page via $stateParams.parameterName
    function($scope, $cordovaGeolocation, $ionicLoading, mapService) {



        ionic.Platform.ready(function() {
            // Code goes here

            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
            });

            var posOptions = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            };

            $scope.addNew = function(frndLatLang) {
                if (!$scope.map) {
                    return;
                }
                $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
                });
                navigator.geolocation.getCurrentPosition(function(pos) {
                    var directionsService = new google.maps.DirectionsService();
                    $scope.directionsDisplay = new google.maps.DirectionsRenderer();

                    $scope.directionsDisplay.setMap($scope.map);

                    var lat = pos.coords.latitude;
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
                            $scope.directionsDisplay.setDirections(result);
                        }
                        $scope.directionsDisplay.setDirections(result);
                    });
                });

            }

            



            $scope.loadNearByPlaces = function() {
                $scope.infoWindow = new google.maps.InfoWindow();
                $scope.service = new google.maps.places.PlacesService($scope.map);

                // The idle event is a debounced event, so we can query & listen without
                // throwing too many requests at the server.
                $scope.map.addListener('idle', function() {
                    var request = {
                        location: $scope.myLatlng,
                        radius: 50,
                        type: ['hotel']
                    };
                    $scope.service.radarSearch(request, $scope.processResults);

                });

                $scope.processResults = function(results, status) {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        console.error(status);
                        return;
                    }
                    for (var i = 0, result; result = results[i]; i++) {
                        $scope.addMarker(result);
                    }
                    // $scope.map.setCenter($scope.myLatlng);
                };

                $scope.addMarker = function(place) {
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: place.geometry.location
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        // $scope.service.getDetails(place, function(result, status) {
                        //     if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        //         console.error(status);
                        //         return;
                        //     }
                        // infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                        // infoWindow.open($scope.map, marker);
                        var frndLatLang = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                        // $scope.directionsDisplay.setMap(null);
                        if ($scope.directionsDisplay != null) {
                            $scope.directionsDisplay.setMap(null);
                            $scope.directionsDisplay = null;
                        }
                        $scope.addNew(frndLatLang);
                        // });
                    });
                }
                // $scope.markers = [];
                // var infoWindow = new google.maps.InfoWindow();
                // var createMarker = function(info) {
                //     var latLang = new google.maps.LatLng(info.lat, info.long);
                //     var marker = new google.maps.Marker({
                //         position: latLang,
                //         map: $scope.map,
                //         title: info.name
                //     });
                //     marker.setMap($scope.map);
                //     marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
                //     google.maps.event.addListener(marker, 'click', function() {
                //         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                //         infoWindow.open($scope.map, marker);
                //         var frndLatLang = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                //         // $scope.directionsDisplay.setMap(null);
                //         if ($scope.directionsDisplay != null) {
                //             $scope.directionsDisplay.setMap(null);
                //             $scope.directionsDisplay = null;
                //         }
                //         $scope.addNew(frndLatLang);
                //     });
                //     $scope.markers.push(marker);
                //     $scope.map.setCenter(latLang);

                // }
                // for (i = 0; i < $scope.cities.length; i++) {
                //     createMarker($scope.cities[i]);
                // }

            }


            $scope.getYourPosition = function() {

                $cordovaGeolocation.getCurrentPosition(posOptions).then(function(pos) {
                    var lat = pos.coords.latitude;
                    var long = pos.coords.longitude;
                    var loc = new google.maps.LatLng(lat, long);
                    return loc;
                }, function(error) {
                    return null;
                });
            }


            $scope.centerOnMe = function() {
                if (!$scope.map) {
                    return;
                }

                $cordovaGeolocation.getCurrentPosition(posOptions).then(function(pos) {
                    var lat = pos.coords.latitude;
                    var long = pos.coords.longitude;
                    var loc = new google.maps.LatLng(lat, long);

                    if (loc !== null) {
                        var mapOptions = {
                            center: loc,
                            zoom: 4,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        $scope.map.setCenter(loc);
                        var marker = new google.maps.Marker({
                            position: loc,
                            map: $scope.map,
                            title: 'new location'
                        });
                        marker.setMap($scope.map);
                    }
                });



            };



            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                console.log(lat);
                console.log(long);
                $scope.myLatlng = new google.maps.LatLng(lat, long);
                var mapOptions = {
                    center: $scope.myLatlng,
                    zoom: 4,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                $ionicLoading.hide();
                $scope.map = map;
                var marker = new google.maps.Marker({
                    position: $scope.myLatlng,
                    map: $scope.map,
                    title: 'My Location'
                });
                marker.setMap($scope.map);

                /**
          load few more places in map
         */

            }, function(err) {
                $ionicLoading.hide();
                console.log(err);
            });
        });

    }
])
