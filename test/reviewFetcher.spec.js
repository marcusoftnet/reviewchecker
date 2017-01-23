'use strict';
const reviewFetcher = require('../lib/reviewFetcher.js');
const should = require("should");
const co = require("co");

describe("Getting reviews", function () {

	beforeEach(function (done) {
		this.timeout(5000);
		done();
	});

	it("has a util to get all review data", function(done) {
		should.exists(reviewFetcher.getAllReviews);
		done();
	});

	it("has a util to get one review data", function(done) {
		should.exists(reviewFetcher.getReviewData);
		done();
	});

	it("get review from one url", function (done) {
		co(function *() {
			let result = yield reviewFetcher.getReviewData("KanbanGoodRead");
			result.should.not.be.empty;
			result.length.should.be.above(2);

		}).then(done, done);
	});

	it("get reviews from two urls", function (done) {
		co(function *() {
			let result = yield reviewFetcher.getAllReviews();
			result.length.should.equal(4);
		}).then(done, done);
	});
});