const reviewFetcher = require('../lib/reviewFetcher.js');
const should = require("should");


describe("Getting reviews", function () {
	it("has a util to get all review data", function(done) {
		should.exists(reviewFetcher.getAllData);
		done();
	});

	it("gets one url", function (done) {
		done();
	})
});