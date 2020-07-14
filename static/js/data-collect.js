// main url for the current data sourcing
const API_url = "https://api.covid19api.com"

// Can be cited globally; keep here
let sum_data = d3.select("div#sumdata");
let buttons = d3.selectAll("button");
let selected = d3.select("#selDataset");


// Refreshes the data upon clicking of the refresh button
function RefreshData() {
	// Clear Old Data
	d3.selectAll("div.country").remove();

	// Replace with New Data
	Init();
}

// Draws a new graph based on the selected graph dropwdown option
function DrawImage(data) {
	// console.log(data);
	console.log()
}

function Init() {
	d3.json(API_url + "/", function(data) {
		// This will allow us to access each path as needed
		const api_nav = data;

		// Reset summmary data here (appears to only exist within here)
		d3.json(API_url + api_nav.summaryRoute.Path, function(d) {			
			//Format the Data first
			d.Countries.forEach(function(detail) {
				detail.NewConfirmed = +detail.NewConfirmed;
				detail.NewDeaths = +detail.NewDeaths;
				detail.NewRecovered = +detail.NewRecovered;
				detail.TotalConfirmed = +detail.TotalConfirmed;
				detail.TotalDeaths = +detail.TotalDeaths;
				detail.TotalRecovered = +detail.TotalRecovered;
			});

			// Your Function Goes Here; make sure to use sum_data in your function!
			DrawImage(d);
		});
	});
}

Init();