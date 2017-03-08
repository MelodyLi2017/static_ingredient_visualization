function create_graph(data, ing_index, focus_group, axis, scale, groupings_index){
	var graph_number = '#graph' + groupings_index;
	var svg = d3.select(graph_number);
	var svg_height = 55+ ing_index.length * 50;
	svg.attr("height", svg_height);
	var svg_width = 22 + cuisine_types.length*(10 + scale(90));
 	d3.select(graph_number).attr("width", svg_width);
 	var svg2 = d3.select("#barplot"+groupings_index);
 	console.log(svg2);
	data.forEach(function(d, i){
		var obj = {};
		ing_index.forEach(function(ingredient){
				obj[ingredient] = (d.ingredientsByPercentage[ingredient] !== undefined ? d.ingredientsByPercentage[ingredient] : 0);
		});
		var sortedObj = sortObjectValuesByDescendingOrder(obj);
		//console.log(d.cuisineType);
		//console.log(sortedObj[Object.keys(sortedObj)[0]]);
		//creates axises and background grey rectangle for each cuisine type, axises are currently left aligned
		//axises need to be updated to start in the center if we're still doing that
		var x_coord = 22 + (i*(10 + scale(90)));
		svg2.append("g").attr("transform", "translate(" + x_coord + ", 42)").call(axis);
		svg2.append("text")
		.attr("x", x_coord + (scale(90) +3)/2)
		.attr("y", 15)
		.attr("text-anchor", "middle")
		.text(cuisine_types[i]);
		svg2.append("rect")
		.attr("x", x_coord)
		.attr("y", 47)
		.attr("width", scale(90) +3)
		.attr("height", ing_index.length * 50)
		.attr("class", "background");
		var counts = Object.values(sortedObj);
		//console.log(counts);
		var j = 0;
		for (var ingredient in sortedObj) {
			var width = scale(sortedObj[ingredient])
			svg2.append("rect")
			.attr("x", x_coord)
			.attr("y", 49+(j*50))
			.attr("width", width)
			.attr("height", 45)
			.attr("id", ingredient+groupings_index+i+"rect")
			d3.select("#icons"+groupings_index).append("svg:image")
			.attr("xlink:href", "images/"+ingredient+".svg")
			.attr("height", 35)
			.attr("id", ingredient + groupings_index+ i)
			.style("opacity", .35);
			x_trans = x_coord + width + 7;
			var transformation = "translate("+ x_trans + ', '+ (53+(j*50)) +')';
			d3.select("#"+ingredient+groupings_index+i).attr("transform", transformation)
			j++;
			if (focus_group[ingredient] == ingredient){
				d3.select("#"+ingredient+groupings_index+i+"rect").attr("class", ingredient);
				d3.select("#"+ingredient+groupings_index+i).style("opacity", 1);
			}
		}
	});
}
