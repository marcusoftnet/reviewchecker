'use strict';
const cheerio = require('cheerio');

module.exports.scrapeUrl = function (html, selector) {
	let $ = cheerio.load(html);
	let data = '';

	$(selector)
		.first()
		.filter(function(i){
			data = $(this).text() ? $(this).text() : $(this).attr('value');

			if(data.trim() === '' && $(this)[0].attribs){
				let attribute = getAttributeFromAttributeSelector(selector);
				data = $(this)[0].attribs[attribute];
			}
	});

	let retur = data.trim();
	return retur.length > 0 ? retur : `Scrape failed for ${selector}`;
};

function getAttributeFromAttributeSelector(selector){
	return selector.split('[')[1].split(']')[0];
}