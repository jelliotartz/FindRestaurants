$(window).load(function() {
  loadScript();
});

// calling the initialize callback
function loadScript() {
  console.log("map loading ...");
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://maps.google.com/maps/api/js?key=AIzaSyD0vLLVcuHehTqPMNlV035V_8xo6EyfQOY' +
    '&libraries=drawing' +
    '&callback=initialize';
  document.body.appendChild(script);
}


/**
 * Binds right click event to given marker and invokes a callback function that will remove the marker from map.
 * @param {!google.maps.Marker} marker A google.maps.Marker instance that the handler will binded.
 */
function bindMarkerEvents(marker) {
    google.maps.event.addListener(marker, "rightclick", function (point) {
        var markerId = getMarkerUniqueId(point.latLng.lat(), point.latLng.lng()); // get marker id by using clicked point's coordinate
        var marker = markers[markerId]; // find marker
        removeMarker(marker, markerId); // remove it
    });
};

/**
 * Removes given marker from map.
 * @param {!google.maps.Marker} marker A google.maps.Marker instance that will be removed.
 * @param {!string} markerId Id of marker.
 */
function removeMarker(marker, markerId) {
    marker.setMap(null); // set markers setMap to null to remove it from map
    delete markers[markerId]; // delete marker instance from markers object
};

var markers = {};

/**
 * Concatenates given lat and lng with an underscore and returns it.
 * This id will be used as a key of marker to cache the marker in markers object.
 * @param {!number} lat Latitude.
 * @param {!number} lng Longitude.
 * @return {string} Concatenated marker id.
 */
function getMarkerUniqueId(lat, lng) {
    return lat + '_' + lng;
}

/**
 * Creates an instance of google.maps.LatLng by given lat and lng values and returns it.
 * This function can be useful for getting new coordinates quickly.
 * @param {!number} lat Latitude.
 * @param {!number} lng Longitude.
 * @return {google.maps.LatLng} An instance of google.maps.LatLng object
 */
function getLatLng(lat, lng) {
    return new google.maps.LatLng(lat, lng);
};




var map;


function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(41.8, -87.64999999999998),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.NORMAL,
    panControl: true,
    scaleControl: false,
    streetViewControl: true,
    overviewMapControl: true
  };

  // initializing map
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  /**
   * Binds click event to given map and invokes a callback that appends a new marker to clicked location.
   */
  var addMarker = google.maps.event.addListener(map, 'click', function(e) {
      var lat = e.latLng.lat(); // lat of clicked point
      var lng = e.latLng.lng(); // lng of clicked point
      console.log("latitude: ", lat)
      console.log("longitude: ", lng)
      var markerId = getMarkerUniqueId(lat, lng); // an that will be used to cache this marker in markers object.
      var marker = new google.maps.Marker({
          position: getLatLng(lat, lng),
          map: map,
          id: 'marker_' + markerId
      });
      markers[markerId] = marker; // cache marker in markers object
      bindMarkerEvents(marker); // bind right click event to marker
  });
}



