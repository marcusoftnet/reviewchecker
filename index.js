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

api.get('/{key}', function (request) {
	return co(function *() {
		let key = request.pathParams.key;
		let results = yield reviewFetcher.getReviewData(key);
		return results;
  });
});

module.exports = api;