const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const reviewFetcher = require('./lib/reviewFetcher.js');

const reviewUrls = require('./data/reviewUrlData.json').reviewUrls;


api.get('/', function () {
	return reviewFetcher.getReviews(reviewUrls);
});

module.exports = api;