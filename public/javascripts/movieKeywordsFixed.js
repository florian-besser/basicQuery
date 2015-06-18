function init() {

    var w = 1140,
        h = 800;

    nodes = [{}],
        nodesDrawn = 0,
        color = d3.scale.category10()
        minRadius = 1;

    var force = d3.layout.force()
        .gravity(0.05)
        .charge(function(d, i) { if (i == 0) { return -2000; } else { return 0; } })    //Root repels others
        .nodes(nodes)
        .size([w, h]);

    var root = nodes[0];
    root.radius = 0;
    root.fixed = true;

    force.start();

    var svg = d3.select("#data").append("svg:svg")
        .attr("width", w)
        .attr("height", h);

    force.on("tick", function(e) {
        reDraw(svg, force);
    });

    svg.on("mousemove", function() {
      var p1 = d3.mouse(this);
      root.px = p1[0];
      root.py = p1[1];
      force.resume();
    });
    
    getData();
    
}

function getData(pageNumber) {
    var url = "keywordFixed";        
    
    $.getJSON( url, function( json ) {
        for (var j = 0; j < json.length; j++) {
            nodes.push({name: json[j]._id, radius: json[j].number});
        }
     });
}

function reDraw(svg, force) {
    if (getRawNodes().length != nodesDrawn) {
        addNewNodes(svg);
    }

    updateNodes(svg, force);
}

function getRawNodes() {
    var filteredNodes = nodes.slice(1);
    return filteredNodes;
}

function getNodes(svg) {
    var filteredNodes = getRawNodes();
    return svg.selectAll(".node")
        .data(filteredNodes, function(d) { return d.name; });
}

function addNewNodes(svg) {
    console.log('Redrawing ' + nodes.length + ' nodes')
    
    var nodesToRender = getNodes(svg);
    nodesDrawn = nodesToRender.length;

    nodesToRender.exit().remove();
    
    var newCircles = nodesToRender.enter().append("g")
        .attr("class", "node");
    
    newCircles.append("svg:circle")
        .attr("r", function(d) { return d.radius; })
        .style("fill", function(d, i) { return color(i % 3); });
    
    newCircles.append("text")
          .style("text-anchor", "middle")
          .text(function(d) { return d.name; });
}

function updateNodes(svg, force) {
    var nodesToRender = getNodes(svg),
        points = getRawNodes();
    
    points.unshift(nodes[0]);
    
    var q = d3.geom.quadtree(points);

    for (var i = 0; i < points.length; i++) {
        q.visit(collide(points[i]));
    }
    
    nodesToRender.selectAll("circle")
        .attr("cx", function(d) { return isNaN(d.x) ? 0 : d.x; })
        .attr("cy", function(d) { return isNaN(d.y) ? 0 : d.y; })
        .attr("r", function(d) { return d.radius / 400; });
    
    nodesToRender.selectAll("text")
        .attr("transform", function (d) {
                var x = isNaN(d.x) ? 0: d.x,
                    y = isNaN(d.y) ? 0: d.y;
                return "translate(" + x + "," + y + ")";
        })
        .text(function (d) {
            return d.name.substring(0, d.radius / 1000);
        });
    
    force.start();
}

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius / 400 + quad.point.radius / 400;
      if (l < r) {
        l = (l - r) / l * .5;
        x *= l;
        y *= l;
        node.x -= x;
        node.y -= y;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return false;   //Visit all children
  };
}

$(init);