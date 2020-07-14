// main url for the current data sourcing
const API_url = "https://api.covid19api.com"

// Can be cited globally?
let sum_data = d3.select("div#sumdata");
let buttons = d3.selectAll("button");
let selected = d3.select("#selDataset");

function RefreshData() {
	// Clear Old Data
	d3.selectAll("div.country").remove();

	// Replace with New Data
	Init();
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

			// Now create the country tags
			sum_data.selectAll("div.country").data(d.Countries)
				.enter()
				.append("div")
				.attr("class", "country")
				.attr("id", country => `${country.Slug}`)
				.attr("CountryCode", country => `${country.CountryCode}`)
				.attr("title", country => `${country.Country}`)
				.attr("NewConfirmed", country => country.NewConfirmed)
				.attr("NewDeaths", country => country.NewDeaths)
				.attr("NewRecovered", country => country.NewRecovered)
				.attr("TotalConfirmed", country => country.TotalConfirmed)
				.attr("TotalDeaths", country => country.TotalDeaths)
				.attr("TotalRecovered", country => country.TotalRecovered);

			// Refresh the appropriate Visualization
			// Your Function Goes Here; make sure to use sum_data in your function!

			// console.log(d3.select("div.country#germany").attr("countrycode"))
		});
	});
}

Init();