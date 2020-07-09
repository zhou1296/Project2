// main url for the current data sourcing
const API_url = "https://api.covid19api.com"

// Can be cited globally
let sum_data;

function RefreshData() {
	d3.json(API_url + "/", function(data) {
		const api_nav = data;
		// console.log(Object.keys(api_nav));
		// Key items to use:
		// -summaryRoute (summary)

		// Reset summmary data here (appears to only exist within here)
		d3.json(API_url + api_nav.summaryRoute.Path,function(d) {
			sum_data = d;
			console.log(sum_data);
		});
	});	
}

sum_data = RefreshData();
