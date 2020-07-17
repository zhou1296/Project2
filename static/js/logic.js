var countriesJson = "static/json/countries.json";

function AnkurChart(data) {

  var myMap = L.map("map", {
    center: [46.2276, 2.2137],
    zoom: 3.5
  });

  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
  }).addTo(myMap);

  

  country_list=data.Countries;

  country_list.sort((a, b) => parseFloat(b.TotalConfirmed) - parseFloat(a.TotalConfirmed));
  

  d3.json(countriesJson, function(capitals) {
    
    listOfCaptials =[];
    function Capital(name, location, newNumCases, totalNumCases) {
      this.name = name;

      this.location = location;
      this.newNumCases = newNumCases;
      this.totalNumCases = totalNumCases;
    };


 
    country_list.forEach((f)=>{
        var country = f.Country
        var countryCode = f.CountryCode;
        var confirmedNew = f.NewConfirmed; 
        var confirmedTotal = f.TotalConfirmed;
       
        
        // Attempting to grab the lat and lng from the countries JSON
        // ~~~~~~~~~~~
        capitals.forEach((h)=>{
            
            if(h.name == country){
              //var newCountry = new Capital(h.country_code,h.latlng[0],h.latlng[1],confirmedNew,confirmedTotal);
              var newCountry = new Capital(h.name,h.latlng,confirmedNew,confirmedTotal);
              
              
              listOfCaptials.push(newCountry);              
            }
            
        });
    
    });
    



// An array which will be used to store created cityMarkers
var cityMarkers = [];

for (var i = 0; i < listOfCaptials.length; i++) {
  L.circle(listOfCaptials[i].location, {
    fillOpacity: 1,
    color: "white",
    fillColor: "red",
    // Adjust radius
    radius: listOfCaptials[i].totalNumCases*0.35
  }).bindPopup("<h1>" + listOfCaptials[i].name + "</h1> <hr> <h3>Cases: " + listOfCaptials[i].totalNumCases + "</h3>").addTo(myMap);
}

// Add all the cityMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var cityLayer = L.layerGroup(cityMarkers);

// Define variables for our tile layers
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

let satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
{
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark,
  Satellite: satellite
};

// Overlays that may be toggled on or off
var overlayMaps = {
  City_Layer: cityLayer
};

// Create map object and set default layers
// var myMap = L.map("map", {
//   center: [46.2276, 2.2137],
//   zoom: 6,
//   layers: [light, cityLayer]
// });

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});

}