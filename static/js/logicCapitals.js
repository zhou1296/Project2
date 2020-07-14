var queryUrl = "https://api.covid19api.com/summary";
var countriesJson = "static/json/countries.json";

// This spits out the ten countries with the most confirmed cases
// ~~~~~~~~~~~~~~~~~ 
d3.json(queryUrl, function(data) {
  //console.log(data);
  country_list=data.Countries;
  //console.log(country_list);
  //var filter_country=country_list.filter(d=>d.TotalConfirmed).sort().reverse().slice(0,10);
  country_list.sort((a, b) => parseFloat(b.TotalConfirmed) - parseFloat(a.TotalConfirmed));

  
  // console.log(country_list);
  filter_country=country_list.slice(0,10);

  

  d3.json(countriesJson, function(capitals) {
    console.log(capitals);
    // console.log(filter_country);
    filter_country.forEach((f)=>{
        console.log(f);
        var countryCode = f.CountryCode;
        // console.log(countryCode);
        
        
        // Attempting to grab the lat and lng from the countries JSON
        // ~~~~~~~~~~~
        capitals.forEach((f)=>{
            // console.log();
             var latLng = f.latlng;
             console.log(f.country_code);
    
        });

    });





});

});

