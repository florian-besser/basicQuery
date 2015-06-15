/*$(function(){
    $.getJSON( "movie/%22The%20Good%20Wife%22%20(2009)", function( json ) {
      console.log( "JSON Data: " + json[0].MovieID );
     });
})();*/

function cleanArrows() {
    $('.glyphicon').remove();
}

function displayArrow(id, direction) {
    var field = $('#' + id);
    if (direction == 'Up') {
        field.append('<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>');
    } else {
        field.append('<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>');
    }
    
}

function getData(pageNumber, sorting) {
    var chunksize = 100, offset = (pageNumber-1) * chunksize, line;
    $.getJSON( "movie/?limit=" + chunksize + "&offset=" + offset + "&sorting=" + sorting, function( json ) {
        $('#movieList').empty();
        for (i = 0; i < chunksize; i++) { 
            line = $(document.createElement( "tr" ));
            line.append( "<td>#" + (offset+i+1) + "</td>" );
            line.append( "<td>" + json[i].MovieID + "</td>" );
            if (json[i].Rating) {
                line.append( "<td>" + json[i].Rating.Rating + "</td>");
            } else {
                line.append( "<td></td>");
            }
            
            $('#movieList').append(line);
        }
     });
}

function displayPages(pageNumber)  {
    var totalPages = 26, min = pageNumber - totalPages / 2, max = pageNumber + totalPages / 2;
    
    if (min <= 0) {
        max -= min;
        max++;
        min = 1;
    }
    
    $('#pages').empty();
    for (i = min; i < max; i++) {
        if (i == pageNumber) {
            $('#pages').append('<li class="active"><a href="#">' + i + '</a></li>');
        } else {
            $('#pages').append('<li><a href="#">' + i + '</a></li>');
        }
    }
}

$(function(){
    var currentSortingId = "index", currentSortingAsc = "Up", pageNumber = 1;
    getData(pageNumber, currentSortingId + currentSortingAsc);
    displayPages(pageNumber);
    displayArrow(currentSortingId, currentSortingAsc);
    
    $( "#pages" ).click(function(event) {
        var target = $( event.target );
        pageNumber = parseInt(target.text())
        displayPages(pageNumber);
        getData(pageNumber, currentSortingId + currentSortingAsc);
    });
    
    $( "#index,#rating" ).click(function(event) {
        if (event.target.id == '') {
            return;
        }
        
        if (currentSortingId != event.target.id)  {
            currentSortingId = event.target.id;
            currentSortingAsc = "Up";
        } else {
            if (currentSortingAsc == "Up") {
                currentSortingAsc = "Down";
            } else {
                currentSortingAsc = "Up";
            }
        }

        getData(pageNumber, currentSortingId + currentSortingAsc);
        cleanArrows();
        displayArrow(currentSortingId, currentSortingAsc);
    });
})();