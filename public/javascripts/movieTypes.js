function readData(root) {
    var names = [];
    
    for(var i=0;i<root.length;i++){
        names.push( {name: root[i].MovieID, value: root[i].Rating ? root[i].Rating.Rating : '1'} );
    }
        
    data = {children: names};
    originalData = {children: $.extend(true, [], names)};
}

function stringToColour(str) {

    // str to hash
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));

    // int/hash to hex
    for (var i = 0, colour = "#"; i < 3; colour += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));

    return colour;
}

function redrawCircles() {    
    svg.selectAll(".node").remove();

    var node = svg.selectAll(".node")
              .data(bubble.nodes(data)
              .filter(function(d) { return d.name; }));

    var nodeEntries = node.enter().append("g")
        .attr("class", "node")
        .attr("onmouseover", function(d) { return "increaseSize('" + d.name.replace("'", "\\'") + "')";})
        .attr("onmouseout", function(d) { return "normalizeSize('" + d.name.replace("'", "\\'") + "')";})
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("title", function(d) { return d.name + ": " + d.value; });

    nodeEntries.append("circle")
          .attr("r", function(d) { return Math.pow(d.value, 3) * 4 / 100; })
          .style("fill", function(d) { return stringToColour(d.name); });

    nodeEntries.append("text")
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .text(function(d) { return d.name.substring(0, d.r / 5); });
}

function increaseSize(name) {
    for(var i=0;i<data.children.length;i++){
        if (originalData.children[i].name == name) {
            data.children[i].value = Number(originalData.children[i].value) + 4;
        }
    }
    redrawCircles();
}

function normalizeSize(name) {
    for(var i=0;i<data.children.length;i++){
        if (originalData.children[i].name == name) {
            data.children[i].value = originalData.children[i].value;
        }
    }
    redrawCircles();
}

function getData(genre) {
    $.getJSON( 'movieType/' + genre, function( json ) {
        readData(json);
        
        redrawCircles();
    });
}

function init () {
    
    var diameter = 1140;

    bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    svg = d3.select("#data").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");
    
    data = {}, originalData = {};
    
    getData('Action');

    d3.select(self.frameElement).style("height", diameter + "px");

    $( "#pages" ).click(function(event) {
        var target = $( event.target );
        console.log('Clicked on page ' + target.text());
        
        $( "li.active" ).removeClass( "active" );
        $( "li:contains('" + target.text() + "')" ).addClass( "active" );

        getData(target.text());
    });
}

$(init);

$( document ).ajaxStart ( function() {
    console.log("Started loading...");
    $('#myModal').modal('show');
});
$( document ).ajaxStop (function() {
    console.log("Finished loading...");
    $('#myModal').modal('hide');
});