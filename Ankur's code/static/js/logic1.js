//----------------------------------------------------------------------------
// variables for API endpoints
//----------------------------------------------------------------------------
let covidURL = "https://api.covid19api.com/summary";

//----------------------------------------------------------------------------
// Calls function to render map
//----------------------------------------------------------------------------
renderMap(covidURL);

//----------------------------------------------------------------------------
// Function to render map
//----------------------------------------------------------------------------
function renderMap(covidURL) {

  // Performs GET request for the Covid URL
  d3.json(covidURL, function(data) {
    console.log(covidURL)
    // Stores response into covidData
    let covidData = data;

      // Passes data into createFeatures function
      createFeatures(covidData);
    });
}
//   // Function to create features
     function createFeatures(covidData) {

     } 

    let outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
    {accessToken: API_KEY
    });
console.log(outdoors);

    let satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
    {accessToken: API_KEY
    });

    let darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
    {accessToken: API_KEY
    });
    // Define a baseMaps object to hold base layers
    let baseMaps = {
      "Outdoors": outdoors,
      "Satellite": satellite,
      "Dark Map": darkmap,
    };

    // Create map, default settings: outdoors and faultLines layers display on load
    let map = L.map("map", {
      center: [39.8283, -98.5785],
      zoom: 3,
      layers: [outdoors],
      scrollWheelZoom: false
    });

        // Add the layer control to the map
        L.control.layers(baseMaps, {
          
        }).addTo(map);