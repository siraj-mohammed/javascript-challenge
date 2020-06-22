// from data.js
var tableData = data;

var errorMsg = d3.select(".error");

// Function to re/draw table with supplied data
function buildTable(displayData){
	// Select the table body
	var tbody = d3.select("tbody");
	// Clear the table before re/populating data
	tbody.html("");
	// Print number of records in console
	console.log(`No. of rows: ${displayData.length}`);
	// Hide error message
	errorMsg.style("visibility","hidden");
	
	displayData.forEach((ufoData) => {
	  var row = tbody.append("tr");
	  Object.entries(ufoData).forEach(([key, value]) => {
		var cell = row.append("td");
		cell.text(value);
	  });
	});
}

// Select the 'Filter Table' button and attach a listener
var filterBtn = d3.select("#filter-btn");
filterBtn.on("click", function(){
	searchCriteria = d3.select("#criteria");
	searchTerm = d3.select("#searchTerm");
	
	// Capture the search criteria
	criteria = searchCriteria.node().value;
	
	// Capture the search term entered
	term = searchTerm.property("value").replace(/^\s+|\s+$|\s+(?=\s)/g, "").toLowerCase();
	
	console.log(`Displaying results for ${criteria} = ${term}`);
	
	var filteredData = [];
	
	if (term != ""){
		switch(criteria){
			case "date":
				filteredData = tableData.filter(data => data.datetime === term);
				break;
			case "city":
				filteredData = tableData.filter(data => data.city === term);
				break;
			case "state":
				filteredData = tableData.filter(data => data.state === term);
				break;			
			case "country":
				filteredData = tableData.filter(data => data.country === term);
				break;
			case "shape":
				filteredData = tableData.filter(data => data.shape === term);
				break;
		}
		if (filteredData.length > 0) {
			buildTable(filteredData);
		}
		else {
			errorMsg.style("visibility","visible");
		}
	}
	
	// Reset search filters
	document.getElementById("criteria").selectedIndex = "0";
	searchTerm.node().value = "";
});

// Select the 'Reset' button and attach a listener
var resetBtn = d3.select("#reset-btn");
resetBtn.on("click", function(){
	buildTable(tableData);
});

// When page loads, build table with unfiltered data set
d3.select("body").on("load", buildTable(tableData));
