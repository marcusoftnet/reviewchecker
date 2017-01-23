'use strict';
const co = require('co');
const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const reviewFetcher = require('./lib/reviewFetcher.js');

api.get('/', function () {
	return co(function *() {
		let results = yield reviewFetcher.getAllReviews();
		return results;
	});
});

api.post('/', function (request) {
	  return co(function *() {
			let results = yield reviewFetcher.getReviewData(request.reviewKey);
			return results;
  });
});

module.exports = api;