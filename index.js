'use strict';
const co = require('co');
const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const reviewFetcher = require('./lib/reviewFetcher.js');
const reviewUrls = require('./data/reviewUrlData.json').reviewUrls;

api.get('/', function () {
	return co(function *() {
		let results = yield reviewFetcher.getAllReviews(reviewUrls);
		return results;
	});
});

api.post('/', function (request) {
	var reviewData = {
		url : request.body.url,
  	selector : request.body.selector,
  	suffix : '',
  	prefix : ''
	};

  return co(function *() {
  	let results = yield reviewFetcher.getReviewData(reviewData);
  	return results;
  });
});

module.exports = api;