// main url for the current data sourcing
const API_url = "https://api.covid19api.com"

// Can be cited globally; keep here
let sum_data = d3.select("div#sumdata");
let buttons = d3.selectAll("button");
let selected = d3.select("#selDataset");
let chart = d3.select("div#map");

// Animation Function
function Animate(data) {		
	if (chart._groups[0][0].style.cssText != "") {
		// If we have a filled in style attr, then we can animate it out!
		anime({
			targets: '#map',
			rotate: '16turn',
			scale: 0,
			duration: 4500,
			easing: 'easeInOutSine'
		});

		// Animate the new chart into existence (after the delay)
		setTimeout(function() {DrawImage(data)}, 5000);
	} else {
		DrawImage(data);
	}
}

// Draws a new graph based on the selected graph dropwdown option
function DrawImage(data) {
	// Clear the first map
	$("#map").replaceWith('<div id="map"></div>');
	$(".test2").empty();

	// Determine which one to draw
	switch(selected.node().value) {
		case "Compare with New Zealand" : {
			DrawJoshData(data);
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

	// Animate it into existence
	anime({
		targets: '#map',
		rotate: '16turn',
		scale: 0,
		duration: 4500,
		direction: 'reverse',
		easing: 'easeInOutSine'
	});

	chart = d3.select("div#map");
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
			Animate(d);

			// Now listen for the chart type to change
			selected.on("change", function() {
				Animate(d);
			});
		});
	});
}

Init();