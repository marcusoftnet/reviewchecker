const co = require('co');
const coreq = require('co-request');
const each = require('co-each');
const scraper = require('./scraper.js');

function getAllData(reviewUrls) {
	return co(function *() {
		let results = yield each(reviewUrls, getReviewData);
	});
};

function getReviewData(reviewUrl) {
    return co(function*() {
      var url = reviewUrl.url;
      var selector = reviewUrl.selector;
    })
    .catch(function(err) {
      return `Could not get ${url} - '${err.message}'`;
    });
};
