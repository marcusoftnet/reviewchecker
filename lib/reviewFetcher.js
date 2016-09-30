const co = require('co');
const coreq = require('co-request');
const each = require('co-each');
const scraper = require('./scraper.js');
const htmlFetcher = require('../lib/htmlFetcher.js');

module.exports.getAllData = function (reviewUrls) {
	return co(function *() {
		let results = yield each(reviewUrls, getReviewData);
    return results;
	});
};

function getReviewData(reviewUrl) {
  return co(function*() {

    let html = yield htmlFetcher.getHTML(reviewUrl.url);
    let result = scraper.scrapeUrl(html, reviewUrl.selector);

    return formatResult(reviewUrl, result);
  })
  .catch(function(err) {
    return `Could not get ${url} - '${err.message}'`;
  });
};

function format(reviewUrl, result) {
  return `${reviewUrl.prefix} ${result} {reviewUrl.suffix}`;
};
