 // Define the dimensions of the map
 const width = 800;
 const height = 600;

 // Create an SVG element to hold the map
 const svg = d3.select("#map")
   .attr("width", width)
   .attr("height", height);

 // Create a projection for the map
 const projection = d3.geoMercator()
   .center([20, 0])
   .scale(400)
   .rotate([0, 0]);

 // Create a path generator for the map
 const path = d3.geoPath(projection);

 // Load the data for the map and country names
 d3.json("africa.geo.json").then(function(africa) {
   // Draw the map
   svg.selectAll("path")
     .data(africa.features)
     .enter()
     .append("path")
     .attr("d", path)
     .attr("class", "country")
     .on("mouseover", function(event, d) {
       d3.select(this).style("fill", "#DDFFBB");
     })
     .on("mouseout", function(event, d) {
       d3.select(this).style("fill", null);
     })
     .on("click", function(event, d) {
       // Highlight the selected country
       d3.selectAll(".country").style("stroke-width", null);
       d3.select(this).style("stroke", "black").style("stroke-width", "2px");

       // Get the country name
       const countryName = d.properties.name.toUpperCase();

       const flag = d.properties.flag;

       d3.select("#flag").append(flag);
       

       // Display the country name
       d3.select("#country-name").text(countryName);

       // Show the tooltip
       const tooltip = d3.select(".tooltip");
       tooltip.transition()
         .duration(200)
         .style("opacity", 0.9);
       tooltip.html(countryName)
         .style("left", (event.pageX) + "px")
         .style("top", (event.pageY - 28) + "px");
     });

   // Create a tooltip element
   const tooltip = d3.select("body")
     .append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);

   // Add the mouseover and mouseout events to the map paths
   svg.selectAll("path")
     .data(africa.features)
     .enter()
     .append("path")
     .attr("d", path)
     .on("mouseover", function(event, d) {
       d3.select(this).style("fill", "#DDFFBB");
       // Show the tooltip
       tooltip.transition()
         .duration(200)
         .style("opacity", 0.9);
       tooltip.html(d.properties.name)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
     })
     .on("mouseout", function(event, d) {
       d3.select(this).style("fill", null);
       // Hide the tooltip
       tooltip.transition()
         .duration(500)
         .style("opacity", 0);
     });

 });