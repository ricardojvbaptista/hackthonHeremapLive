document.addEventListener('DOMContentLoaded', init, false);
async function init() {

  //let position = await getLocation();
  //console.log(position);

/*   const KEY = 'c1LJuR0Bl2y02PefaQ2d8PvPnBKEN8KdhAOFYR_Bgmw';
  var platform = new H.service.Platform({
      'apikey': KEY
  });
 */
 
 function showGeoJSONDataPolygon (map, pathfile) {
    // Create GeoJSON reader which will download the specified file.
    // Shape of the file was obtained by using HERE Geocoder API.
    // It is possible to customize look and feel of the objects.
      // manchester_administrativedivisions_here.geojson
    var reader = new H.data.geojson.Reader(pathfile, {
      // This function is called each time parser detects a new map object
      style: function (mapObject) {
        // Parsed geo objects could be styled using setStyle method
        if (mapObject instanceof H.map.Polygon) {
          mapObject.setStyle({
            fillColor: 'rgba(255, 0, 0, 0.5)',
            strokeColor: 'rgba(0, 0, 255, 0.2)',
            lineWidth: 3
          });
        }
      }
    });
    
    // Start parsing the file
    reader.parse();
    // Add layer which shows GeoJSON data on the map
    
    map.addLayer(reader.getLayer());
 }

 function showGeoJSONDataPoint (map, pathfile) {
    // Create GeoJSON reader which will download the specified file.
    // Shape of the file was obtained by using HERE Geocoder API.
    // It is possible to customize look and feel of the objects.
    // manchester_administrativedivisions_here.geojson
    var reader = new H.data.geojson.Reader(pathfile, {
      // This function is called each time parser detects a new map object
      style: function (mapObject) {
        // Parsed geo objects could be styled using setStyle method
        if (mapObject instanceof H.map.Marker) {
          mapObject.setIcon({
            
          });


        }
      }
  });
 
    // Start parsing the file
  reader.parse();
    // Add layer which shows GeoJSON data on the map
    
    map.addLayer(reader.getLayer());
  }

/**
 * Boilerplate map initialization code starts below:
 */
// Step 1: initialize communication with the platform
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

// Step 2: initialize a map
var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
  zoom: 10,
  center: {lat: 53.483959, lng: -2.244644},
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());


// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

showGeoJSONDataPolygon(map, '../data/manchester_administrativedivisions_here.geojson'); 


var icon = new H.map.Icon('seriousgames.png');

let resp = await fetch('../data/manchesterpinpoints_final.geojson');
let data = await resp.json();
data.features.forEach(f => {
    var icon = new H.map.Icon(f.properties.Icon);
    console.log(f.properties.Icon);
    map.addObject(new H.map.Marker({lat:f.geometry.coordinates[1], lng:f.geometry.coordinates[0]}
      ,{ icon: new H.map.Icon(f.properties.Icon)}
      ));
      //{ icon: new H.map.Icon(f.properties.Icon)}));
});



//showGeoJSONDataPoint(map, '../data/manchesterpinpoints_final.geojson'); 

}