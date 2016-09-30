'use strict';
const co = require('co');
const coreq = require('co-request');
const each = require('co-each');
const scraper = require('./scraper.js');
const htmlFetcher = require('./htmlFetcher.js');

function getAllReviews(reviewUrls) {
	return co(function *() {
		let results = yield each(reviewUrls, getReviewData);
    console.log(results);
    return results;
	});
};

function getReviewData(reviewUrl) {
  let url = reviewUrl.url;

  return co(function*() {

    let html = yield htmlFetcher.getHTML(url);
    let result = scraper.scrapeUrl(html, reviewUrl.selector);
    return formatResult(reviewUrl, result);

  }).catch(function(err) {
    return `Could not get ${url} - '${err.message}'`;
  });
};

function formatResult(reviewUrl, result) {
  return `${reviewUrl.prefix} ${result} ${reviewUrl.suffix}`;
};

module.exports.getAllReviews = getAllReviews;
module.exports.getReviewData = getReviewData;

