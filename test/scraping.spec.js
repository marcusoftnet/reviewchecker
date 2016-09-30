const scraper = require('../lib/scraper.js');
const should = require("should");


describe("Scraping of URL", function () {
	it("has a scrapeUrl method", function (done) {
		should.exists(scraper.scrapeUrl);
		done();
	});

	it("parses values from id", function (done) {
		const html = `<html>
			<body>
				<div id='myId'>my value</div>
			</body>
		</html>`;

		let result = scraper.scrapeUrl(html, '#myId');
		result.should.equal('my value');
		done();
	});

	it("parses values from a class", function (done) {
		const html = `<html>
			<body>
				<div class='myClass'>my value</div>
			</body>
		</html>`;

		let result = scraper.scrapeUrl(html, '.myClass');
		result.should.equal('my value');
		done();
	});
});