const cheerio = require('cheerio');

module.exports.scrapeUrl = function (html, selector) {
	let $ = cheerio.load(html);
	let data = {};

	$(selector).filter(function(){ data = $(this).text().trim(); });

  return data;
};