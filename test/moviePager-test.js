describe("moviePager", function() {
    var path = 'movie/?limit=100&offset=0&sorting=indexUp',
        result = [
            {
                "MovieID": '"!Next?" (1994)',
                "Rating": {
                    "RatingDist": "4.....2.4.",
                    "Rating": "5.4",
                    "RatingVotes": "5"
                }
            },
            {
                "MovieID": '"#1 Single" (2006)',
                "Rating": {
                    "RatingDist": "2000000102",
                    "Rating": "6.1",
                    "RatingVotes": "60"
                }
            }
        ],
        pathRatingSorted = 'movie/?limit=100&offset=0&sorting=ratingDown',
        resultRatingSorted = [
            {
                "MovieID": '"Aaahh!!! Real Monsters" (1994) {Monsters Don\'t Dance/Gone Shopping (#1.6)}',
                "Rating": {
                    "RatingDist": "0.0..00008",
                    "Rating": "9.9",
                    "RatingVotes": "146"
                }
            },
            {
                "MovieID": '"Aaahh!!! Real Monsters" (1994) {Spy vs. Monster/Misery Date (#4.10)}',
                "Rating": {
                    "RatingDist": "0..0...008",
                    "Rating": "9.9",
                    "RatingVotes": "123"
                }
            }
        ],
        pathPage18 = 'movie/?limit=100&offset=1700&sorting=indexUp',
        resultPage18 = [
            {
                "MovieID": '".hack//SIGN" (2002) {Role Play (#1.1)}',
                "Rating": {
                    "RatingDist": "0...115..1",
                    "Rating": "6.7",
                    "RatingVotes": "19"
                }
            },
            {
                "MovieID": '".hack//SIGN" (2002) {Tempest (#1.20)}',
                "Rating": {
                    "RatingDist": "1....141.1",
                    "Rating": "6.6",
                    "RatingVotes": "7"
                }
            }
        ];
    
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = "base/views";
        jasmine.getFixtures().load('movielist.ejs');
 
        jasmine.Ajax.install();
    });
    
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });
    
    it("should start without Arrow", function() {       
        expect($('.glyphicon')).not.toExist();
    });
    
    it("displayArrow should set a glyph correctly (up)", function() {
        displayArrow("name", "Up");

        expect($('.glyphicon')).toExist();
        expect($('.glyphicon').parent().id).toBe($('#name').id);
        expect($('.glyphicon')).toHaveClass('glyphicon-chevron-up');
    });

    it("displayArrow should set a glyph correctly (down)", function() {
        displayArrow("index", "Down");

        expect($('.glyphicon')).toExist();
        expect($('.glyphicon').parent().id).toBe($('#index').id);
        expect($('.glyphicon')).toHaveClass('glyphicon-chevron-down');
    });

    it("cleanArrow should remove Arrow", function() {
        displayArrow("name", "Up");
        cleanArrows();
        expect($('.glyphicon')).not.toExist();
    });

    it("should display correct pagination", function() {
        displayPages(1);
        
        expect($("#pages").children().length).toBe(26);
        expect($("#pages").children()[0]).toHaveText('1');
        expect($("#pages").children()[0]).toHaveClass('active');
        expect($("#pages").children()[25]).toHaveText('26');
    });
    
    it("should load the correct data", function() {
        jasmine.Ajax.stubRequest(path).andReturn({
            status: 200,
            statusText: 'HTTP/1.1 200 OK',
            contentType: 'text/xml;charset=UTF-8',
            responseText: JSON.stringify(result)
        });
        
        getData(1, 'indexUp');
        
        expect($('#movieList').children().length).toBe(2);
        var secondRowFields = $('#movieList').find('tr').eq(1).find('td');
        expect(secondRowFields.eq(0)).toHaveText('#2');
        expect(secondRowFields.eq(1)).toHaveText('"#1 Single" (2006)');
        expect(secondRowFields.eq(2)).toHaveText('6.1');
    });
    
    it("should have working pagination", function() {
        jasmine.Ajax.stubRequest(pathPage18).andReturn({
            status: 200,
            statusText: 'HTTP/1.1 200 OK',
            contentType: 'text/xml;charset=UTF-8',
            responseText: JSON.stringify(resultPage18)
        });
        
        init();
        $('#pages').children().eq(17).click();
        
        expect($('#movieList').children().length).toBe(2);
        var secondRowFields = $('#movieList').find('tr').eq(1).find('td');
        expect(secondRowFields.eq(0)).toHaveText('#1702');
        expect(secondRowFields.eq(1)).toHaveText('".hack//SIGN" (2002) {Tempest (#1.20)}');
        expect(secondRowFields.eq(2)).toHaveText('6.6');
    });
    
    it("should have working sorting", function() {
        jasmine.Ajax.stubRequest(pathRatingSorted).andReturn({
            status: 200,
            statusText: 'HTTP/1.1 200 OK',
            contentType: 'text/xml;charset=UTF-8',
            responseText: JSON.stringify(resultRatingSorted)
        });
        
        init();
        $('#rating').click();   //Sort rating up
        $('#rating').click();   //Sort rating down
        
        expect($('#movieList').children().length).toBe(2);
        var secondRowFields = $('#movieList').find('tr').eq(1).find('td');
        expect(secondRowFields.eq(0)).toHaveText('#2');
        expect(secondRowFields.eq(1)).toHaveText('"Aaahh!!! Real Monsters" (1994) {Spy vs. Monster/Misery Date (#4.10)}');
        expect(secondRowFields.eq(2)).toHaveText('9.9');
    });
    
 });
