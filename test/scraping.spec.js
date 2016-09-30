'use strict';
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

	it("tries value if text is empty", function (done) {
		const html = `<html>
			<body>
				<input id='myId' value='4.6' />
			</body>
		</html>`;

		let result = scraper.scrapeUrl(html, '#myId');
		result.should.equal('4.6');
		done();
	});

	it("finds an input by name", function (done) {
		const html = `<html>
			<body>
				<input name='myName' value='4.6' />
			</body>
		</html>`;

		let result = scraper.scrapeUrl(html, 'input[name="myName"]');
		result.should.equal('4.6');
		done();
	});
});