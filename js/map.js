function initMap() {
  var pos_center = {
    lat: 59.9187791,
    lng: 10.7491923
  };

  var iconPath = "/wp-content/themes/Divichild/img/";
  var icons = {
    wschool: {
      icon: iconPath + 'wlogo400x400.jpg',
    },
    kschool: {
      icon: iconPath + 'klogo960x960.png'
    }
  };


  var POI = [{
      position: new google.maps.LatLng(59.9162093, 10.7599091),
      type: 'wschool',
      name: 'Fjerdingen',
      icon: icons.wschool.icon
    },
    {
      position: new google.maps.LatLng(59.9233303, 10.7521104),
      type: 'wschool',
      name: 'Vulkan',
      icon: icons.wschool.icon
    },
    {
      position: new google.maps.LatLng(59.9112117, 10.7426654),
      type: 'kschool',
      name: 'Kristiania',
      icon: icons.kschool.icon
    },
    {
      position: new google.maps.LatLng(59.9221521, 10.7519091),
      type: 'food',
      name: 'Mathallen',
      icon: icons.wschool.icon
    }
  ]

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    disableDefaultUI: true,
    zoomControl: true,
    center: pos_center,
      styles: [
            {
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "landscape",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.attraction",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi.attraction",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.attraction",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.business",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi.business",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.government",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi.government",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.medical",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi.medical",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.place_of_worship",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi.place_of_worship",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.school",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi.school",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.sports_complex",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi.sports_complex",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.local",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#0088f6"
            },
            {
                "visibility": "on"
            }
        ]
    }

          ]
  }); // end maps


  directionsInit(map); //run the 'initMap' function of directions.js. After initalizing the map as it is used in directions.js


  //Geolocation
  if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              posMark = new google.maps.Marker({
                position: new google.maps.LatLng(pos.lat, pos.lng),
                map: map,
                icon: {
                  url: POI[0].icon,
                  scaledSize: new google.maps.Size(50, 50)
                }
              })

              map.setCenter(pos);
            }, function() {
              handleLocationError(true, map.getCenter());
              console.log("error");
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter());
          }


        function handleLocationError(browserHasGeolocation, pos) {

        }

  //End geolocation

var popupTxt;
var popupDiv;


  //Overlay Testing -----------------------------------
  function CustomMarker(latlng, map, args) {
    this.latlng = latlng;
    this.args = args;
    this.setMap(map);
  }

  CustomMarker.prototype = new google.maps.OverlayView();

  CustomMarker.prototype.draw = function() {

    var self = this;
    var div = this.div;


    if (!div) {

      div = this.div = document.createElement('div');
      popupDiv = div;
      popupTxt = document.createElement('p');
      popupTxt.id = 'popupTxt';
      div.appendChild(popupTxt);
      div.className = 'poi-marker-popup';
      popupDiv.style.visibility='hidden';


      if (typeof(self.args.marker_id) !== 'undefined') {
        div.dataset.marker_id = self.args.marker_id;
      }

      var panes = this.getPanes();
      panes.overlayImage.appendChild(div);
    }

    /*  var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
      div.style.left = point.x - 40 + 'px';
      div.style.top = point.y - 120 + 'px';
    }
    */
  }; // End overlay

  CustomMarker.prototype.remove = function() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  };

  CustomMarker.prototype.getPosition = function() {
    return this.latlng;
  };


  var overlay = new CustomMarker(
    POI["0"].position,
    map, {}
  );


  function makeContent(campName) {
    var contentString =
      '<div id="siteNotice">' +
      '<h3 id="firstHeading" class="firstHeading">' + campName + '</h3>' +
      '</div>';
    return contentString;
  };

  for(var i = 0; i < POI.length; i++){
   let point = new google.maps.Marker({
     position: POI[i].position,
     map: map,
     icon: {
       url: POI[i].icon,
       scaledSize: new google.maps.Size(50, 50)
     }
   });
   let pointName = POI[i].name;
   point.addListener('mouseover', function() {
     pixelPoint = fromLatLngToPoint(point.getPosition(), map);
     popupDiv.style.left = pixelPoint.x - 400 + 'px';
     popupDiv.style.top = pixelPoint.y - 400 + 'px';


     mOverPoi(point, pointName);
   });
   point.addListener('mouseout', function() {
     mOutPoi();
   });
   /*
   google.maps.event.addListener(point, 'mouseover',
     function(event){
       pixePoint = fromLatLngToPoint(event.latLng, map);
       popupDiv.style.left = pixePoint.x + 'px';
       popupDiv.style.top = pixePoint.y + 'px';
       console.log(pixePoint.y);
   });
   */
 }

//convert from latlng to pixel position as a Point object with .x and .y property
 function fromLatLngToPoint(latLng, map) {
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = Math.pow(2, map.getZoom());
	var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
	return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}



  function mOverPoi(marker, campName) {
    popupTxt.innerHTML = campName;
    popupDiv.style.visibility='visible';

  };

  function mOutPoi() {

    popupDiv.style.visibility='hidden';

  };




}