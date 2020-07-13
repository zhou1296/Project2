
var queryUrl = "https://api.covid19api.com/summary";

d3.json(queryUrl, function(data) {
  //console.log(data);
  country_list=data.Countries;
  //console.log(country_list);
  //var filter_country=country_list.filter(d=>d.TotalConfirmed).sort().reverse().slice(0,10);
  country_list.sort((a, b) => parseFloat(b.TotalConfirmed) - parseFloat(a.TotalConfirmed));

  
  console.log(country_list);
  filter_country=country_list.slice(0,10);

  var tbody=d3.select("tbody");

  filter_country.forEach((f)=>{
        //console.log(f);
        var row =tbody.append("tr");
        Object.entries(f).forEach(([key, value]) => {
        //console.log(key);
        mycols=["Country", "NewConfirmed","TotalConfirmed","NewDeaths","TotalDeaths","NewRecovered","TotalRecovered","Date"];
        if(mycols.includes(key)){
            var cell = row.append("td");
            cell.text(value);
        }

  })});




   
tableData=country_list;
var button =d3.select("#filter-btn");
var form =d3.select("#form");
button.on("click", runEnter);
form.on("submit",runEnter);
function runEnter() {
    d3.event.preventDefault();
    var tbody=d3.select("tbody");
    tbody.html(" ");
    var inputElement_country = d3.select('#country');
    var inputValue_country = inputElement_country.property("value");
    console.log(inputValue_country);

    
    if(inputValue_country !=" ") {   
        var filter_data= tableData.filter(d=>{return d.Country==inputValue_country});
    }
    console.log(filter_data);

    filter_data.forEach((f)=>{
        //console.log(f);
        var row=tbody.append("tr");
        Object.entries(f).forEach(([key, value])=>{
            var cell=row.append("td");
            cell.text(value);
        })
    });



};
});



