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

module.exports = api;