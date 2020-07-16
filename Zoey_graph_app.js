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
    console.log("filter_country");
    console.log(filter_country);
  
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
    var country_name=[];
    var TotalConfirmed_list=[];
    var NewConfirmed_list=[];
  
      filter_country.forEach((f)=>{
        country_name.push(f.Country);
        TotalConfirmed_list.push(f.TotalConfirmed);
        NewConfirmed_list.push(f.NewConfirmed);
      });
        
      console.log(country_name);
      console.log(TotalConfirmed_list);
      console.log(NewConfirmed_list);
  
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
  }
  var dataArray1=TotalConfirmed_list;
  var dataCategories=country_name;
  var dataArray2=NewConfirmed_list;
  function makeResponsive1() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("div.test1").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

    // svg params
  var svgHeight = window.innerHeight;
  var svgWidth = window.innerWidth;

    // margins
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 10
  };

    // chart area minus margins
  var chartHeight = svgHeight - margin.top - margin.bottom;
  var chartWidth = svgWidth - margin.left - margin.right;

    // create svg container
  var svg = d3.select("div.test1").append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // shift everything over by the margins
  var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // scale y to chart height
  var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataArray1)])
        .range([chartHeight, 0]);

    // scale x to chart width
  var xScale = d3.scaleBand()
        .domain(dataCategories)
        .range([0, chartWidth])
        .padding(0.1);

    // create axes
  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
  chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // set y to the y axis
  chartGroup.append("g")
        .call(yAxis);


  chartGroup.selectAll("rect")
        .data(dataArray1)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(dataCategories[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d))
        .attr("fill", "green")
        // event listener for onclick event
        .on("click", function(d, i) {
          alert(`Hey! You clicked bar ${dataCategories[i]}!`);
        })
        // event listener for mouseover
        .on("mouseover", function() {
          d3.select(this)
                .attr("fill", "red");
        })
        // event listener for mouseout
        .on("mouseout", function() {
          d3.select(this)
                .attr("fill", "green");
        });
}

makeResponsive1();
//*************************************************** */

function makeResponsive2() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("div.test2").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

    // svg params
  var svgHeight = window.innerHeight;
  var svgWidth = window.innerWidth;

    // margins
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

    // chart area minus margins
  var chartHeight = svgHeight - margin.top - margin.bottom;
  var chartWidth = svgWidth - margin.left - margin.right;

    // create svg container
  var svg = d3.select("div.test2").append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // shift everything over by the margins
  var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // scale y to chart height
  var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataArray2)])
        .range([chartHeight, 0]);

    // scale x to chart width
  var xScale = d3.scaleBand()
        .domain(dataCategories)
        .range([0, chartWidth])
        .padding(0.1);

    // create axes
  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
  chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // set y to the y axis
  chartGroup.append("g")
        .call(yAxis);


  chartGroup.selectAll("rect")
        .data(dataArray2)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(dataCategories[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d))
        .attr("fill", "green")
        // event listener for onclick event
        .on("click", function(d, i) {
          alert(`Hey! You clicked bar ${dataCategories[i]}!`);
        })
        // event listener for mouseover
        .on("mouseover", function() {
          d3.select(this)
                .attr("fill", "red");
        })
        // event listener for mouseout
        .on("mouseout", function() {
          d3.select(this)
                .attr("fill", "green");
        });
}

makeResponsive2();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive1);
});