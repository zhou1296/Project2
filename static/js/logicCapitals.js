// This spits out the ten countries with the most confirmed cases
// ~~~~~~~~~~~~~~~~~ 
function DrawJoshData(countryData) {

//console.log(countryData);
var data=countryData.Countries;

function DrawTable(data) {
  var areatodraw = d3.select('#map')
  .append("div").attr("class", "row margin-top-50");

  // The filter button
  var panel = areatodraw
    .append("div").attr("class", "col-md-2")
    .append('aside').attr("class", "filters")
    .append("div").attr("class", "panel panel-default");

  panel.append("div").attr("class", "panel-heading").text(`Filter Search`);

  var panelbody = panel.append("div").attr("class", "panel-body").append("form");
  
  var li = panelbody.append("div").attr("class", "form-group")
    .append("ul").attr("class", "list-group").attr("id", "filters")
    .append("li").attr("class", "filter list-group-item");

  li.append("label").attr("for", "date").text(`Enter A Country`);
  li.append("input").attr("class", "form-control").attr("id", "map2")
    .attr("type", "text")
    .attr("placeholder", "Malta");

  panelbody.append("button").attr("id", "filter-btn").attr("type", "button")
    .attr("class", "btn btn-default")
    .text("Filter Table");

  // The table
  var table = areatodraw.append("div").attr("class", "col-md-10")
    .append("div").attr("id", "table-area").attr("class", "")
    .append("table").attr("id", "ufo-table").attr("class", "table table-striped");

  var tablehead = table.append("thead").append("tr");

  tablehead.append("th").attr("class", "table-head").text(`Country`);
  tablehead.append("th").attr("class", "table-head").text(`New Confirmed`);
  tablehead.append("th").attr("class", "table-head").text(`Total Confirmed`);
  tablehead.append("th").attr("class", "table-head").text(`New Deaths`);
  tablehead.append("th").attr("class", "table-head").text(`Total Deaths`);
  tablehead.append("th").attr("class", "table-head").text(`% Confirmed vs NZ`);
  tablehead.append("th").attr("class", "table-head").text(`# of Deaths compared to NZ`);

  table.append("tbody");
}

DrawTable();
// Stripping out unnecessary columns
// https://stackoverflow.com/questions/54907549/keep-only-selected-keys-in-every-object-from-array
var keys_to_keep = ['Country', 'NewConfirmed', 'TotalConfirmed', 'NewDeaths', 'TotalDeaths',];

var redux = array => array.map(o => keys_to_keep.reduce((acc, curr) => {
  acc[curr] = o[curr];
  return acc;
}, {}));

data = redux(data);

// New Zealand Comparsion logic
var outputNZ = {};

// extracting NZ info from the Array of Objects
data.forEach((entries)=>{
  if(entries.Country == "New Zealand"){
    outputNZ = entries;
    // return entries;
  }
});
var confNZ = outputNZ.TotalConfirmed;
var deathNZ  = outputNZ.TotalDeaths;

// Creating new columns for the Objects to display
data.forEach((entries)=>{

  entries.confirmedVsNZ = ((entries.TotalConfirmed/confNZ)*100).toFixed(2);
  entries.deathsVsNZ = ((entries.TotalDeaths-deathNZ));;
});

var tbody = d3.select("tbody");

data.forEach((sightings) => {
    let row = tbody.append("tr");
    Object.entries(sightings).forEach(([key, value]) => {
      var cell = row.append("th");
      cell.text(value);
    });
  });

// Cull list based on date
let button = d3.select("#filter-btn");
let form = d3.select("#form");

button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    let inputElement = d3.select("#map2");
    let inputValue = inputElement.property("value");
  
    // Get the value property of the input element
    // var inputValue = inputElement.property("value");
  

    // Deleting init table
    let cleaningHouse = d3.select("tbody");
    cleaningHouse.html("");

    let filteredDateSightings = data.filter(searchCountries => searchCountries.Country === inputValue);


    filteredDateSightings.forEach((dateSight) => {
      let row = tbody.append("tr");
      Object.entries(dateSight).forEach(([key, value]) => {
        var cell = row.append("th");
        cell.text(value);
      });
    });

}
};