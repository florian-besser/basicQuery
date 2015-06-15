/*$(function(){
    $.getJSON( "movie/%22The%20Good%20Wife%22%20(2009)", function( json ) {
      console.log( "JSON Data: " + json[0].MovieID );
     });
})();*/

function getData(pageNumber)  {
    var chunksize = 100, offset = (pageNumber-1) * chunksize;
    $.getJSON( "movie/?limit=" + chunksize + "&offset=" + offset, function( json ) {
        $('#movieList').empty();
        for (i = 0; i < chunksize; i++) { 
            $('#movieList').append( "<tr><td>#" + (offset+i+1) + "</td><td>" + json[i].MovieID + "</td></tr>" );
            dataGotten = true;
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
    getData(1);
    displayPages(1);
    
    $( ".pagination" ).click(function(event) {
        var target = $( event.target ), pageNumber = parseInt(target.text());
        displayPages(pageNumber);
        getData(pageNumber);
    });
})();