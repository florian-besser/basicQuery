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

function displayArrow(id, direction) {
    var field = $('#' + id);
    if (direction == 'Up') {
        field.append('<span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>');
    } else {
        field.append('<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>');
    }
    
}

function cleanArrows() {
    $('.glyphicon').remove();
}

function getData(pageNumber, sorting) {
    var chunksize = 100, 
        offset = (pageNumber-1) * chunksize, 
        url = "movie/?limit=" + chunksize + "&offset=" + offset + "&sorting=" + sorting,
        line;        
    
    console.log('Querying ' + url);
    $.getJSON( url, function( json ) {
        $('#movieList').empty();
        for (i = 0; i < chunksize; i++) { 
            json[i].offset = offset+i+1;
            var template = $('#movieTpl').html();
            var html = Mustache.to_html(template, json[i]);
            $('#movieList').append(html);
        }
     });
}

function init(){
    var currentSortingId = "index", currentSortingAsc = "Up", pageNumber = 1;
    getData(pageNumber, currentSortingId + currentSortingAsc);
    displayPages(pageNumber);
    displayArrow(currentSortingId, currentSortingAsc);
    
    $( "#pages" ).click(function(event) {
        var target = $( event.target );
        console.log('Clicked on page ' + target.text());
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