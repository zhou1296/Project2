// main url for the current data sourcing
const API_url = "https://api.covid19api.com"

// Can be cited globally; keep here
let sum_data = d3.select("div#sumdata");
let buttons = d3.selectAll("button");
let selected = d3.select("#selDataset");
let chart = d3.select("div#map");

let curr_map = selected.node().value;

// Draws a new graph based on the selected graph dropwdown option
function DrawImage(data) {
	// Determine the selected chart
	curr_map = selected.node().value;

	// Clear the first map
	$("#map").empty();
	$(".test2").empty();

	// Determine which one to draw
	switch(curr_map) {
		case "Compare with New Zealand" : {
			JoshCharts(data);
			break;
		}
		case "Data Table" : {
			ZoeyCharts(data);
			break;
		}
		default : {
		// case "Map Ranking" : {
			AnkurChart(data);
		}
	}
}

function Init() {
	// Either called initially by this JS file, or by clicking the 'Refresh'
	// button in index.html
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

			// Initial Drawing
			DrawImage(d);

			// Now listen for the chart type to change
			selected.on("change", function() {
				DrawImage(d);
			});
		});
	});
}

Init();