var countriesJson = "static/json/countries.json";

// This spits out the ten countries with the most confirmed cases
// ~~~~~~~~~~~~~~~~~ 
function JoshCharts(data) {
  var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


  country_list=data.Countries;
  //var filter_country=country_list.filter(d=>d.TotalConfirmed).sort().reverse().slice(0,10);
  country_list.sort((a, b) => parseFloat(b.TotalConfirmed) - parseFloat(a.TotalConfirmed));

  
  filter_country=country_list.slice(0,10);

  

  d3.json(countriesJson, function(capitals) {
    
    listOfCaptials =[];
    function Capital(name, location, newNumCases, totalNumCases) {
      this.name = name;
      
      //this.lat = lat;
      //this.long = long;

      this.location = location;
      this.newNumCases = newNumCases;
      this.totalNumCases = totalNumCases;
    };


    filter_country.forEach((f)=>{
        var countryCode = f.CountryCode;
        var confirmedNew = f.NewConfirmed; 
        var confirmedTotal = f.TotalConfirmed;
       
        
        // Attempting to grab the lat and lng from the countries JSON
        // ~~~~~~~~~~~
        capitals.forEach((h)=>{
            
            if(h.country_code == countryCode){
              
              
              //var newCountry = new Capital(h.country_code,h.latlng[0],h.latlng[1],confirmedNew,confirmedTotal);
              var newCountry = new Capital(h.country_code,h.latlng,confirmedNew,confirmedTotal);
              
              
              listOfCaptials.push(newCountry);
              
            }
            
        });
    
    });
    

    for (var i = 0; i < listOfCaptials.length; i++) {
    L.circle(listOfCaptials[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "red",
      // Adjust radius
      radius: listOfCaptials[i].totalNumCases
    }).bindPopup("<h1>" + listOfCaptials[i].name + "</h1> <hr> <h3>Cases: " + listOfCaptials[i].totalNumCases + "</h3>").addTo(myMap);
  }

  });
}