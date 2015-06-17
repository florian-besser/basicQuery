var webdriver = require('selenium-webdriver');

describe("moviePage", function() {

    var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    //driver.manage().timeouts().implicitlyWait(10000000);
    
    function waitForAjaxStop(driver) {
        driver.wait(function() {
          return driver.findElement(webdriver.By.id('myModal')).isDisplayed().then(function(isDisplayed) {
            return !isDisplayed;
          });
        }, 10000);
    }

	it('should be on correct page', function (done) {
		driver.get('http://localhost:3000/');
        waitForAjaxStop(driver);

        driver.getTitle().then(function(title) {
			expect(title).toBe('MOVIES');
		});
        driver.findElement(webdriver.By.css('#movieList tr:nth-child(2) td:nth-child(1)')).getText().then(function (text) {
			expect(text).toBe('#2');
        });
        driver.findElement(webdriver.By.css('#movieList tr:nth-child(2) td:nth-child(2)')).getText().then(function (text) {
			expect(text).toBe('"#1 Single" (2006)');
        });
        driver.findElement(webdriver.By.css('#movieList tr:nth-child(2) td:nth-child(3)')).getText().then(function (text) {
			expect(text).toBe('6.1');
        });
        driver.getTitle().then(function(title) {
            done();
        });
	});
    
	it('should be ablte to sort', function (done) {
		driver.get('http://localhost:3000/');
        waitForAjaxStop(driver);
		driver.findElement(webdriver.By.id('rating')).click();
        waitForAjaxStop(driver);
		driver.findElement(webdriver.By.id('rating')).click();
        waitForAjaxStop(driver);

        driver.findElement(webdriver.By.css('#movieList tr:nth-child(2) td:nth-child(1)')).getText().then(function (text) {
			expect(text).toBe('#2');
        });
        driver.findElement(webdriver.By.css('#movieList tr:nth-child(2) td:nth-child(2)')).getText().then(function (text) {
			expect(text).toBe('"Aaahh!!! Real Monsters" (1994) {Spy vs. Monster/Misery Date (#4.10)}');
        });
        driver.findElement(webdriver.By.css('#movieList tr:nth-child(2) td:nth-child(3)')).getText().then(function (text) {
			expect(text).toBe('9.9');
        });
        driver.getTitle().then(function(title) {
            done();
        });
	}, 15000);
    
    afterAll(function() {
        driver.quit();
    });

});