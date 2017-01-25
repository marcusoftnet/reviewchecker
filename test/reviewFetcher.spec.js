'use strict';
const reviewFetcher = require('../lib/reviewFetcher.js');
const should = require("should");
const co = require("co");

describe("Getting reviews", function () {

	beforeEach(function (done) {
		this.timeout(5000);
		done();
	});

	it("has a util to get review keys", function(done) {
		should.exists(reviewFetcher.getReviewKeys);
		done();
	});

	it("has a util to get one review data", function(done) {
		should.exists(reviewFetcher.getReviewData);
		done();
	});

	it("get review keys", function (done) {
			let result = reviewFetcher.getReviewKeys();
			result.length.should.be.above(2);
			done();
	});

	describe("get review from one url", function (done) {
		let review = {};

		before(function (done){
			co(function *() {
				review = yield reviewFetcher.getReviewData("KanbanGoodRead");
			}).then(done, done);
		});

		it("should get the result at all", () => review.should.not.be.empty );
		it("review has a key", () => review.key.should.not.be.empty );
		it("review has a heading", () => review.header.should.not.be.empty );
		it("review has a body", () => review.body.should.not.be.empty );
		it("review has a link", () => review.link.should.not.be.empty );
		
		it("review body for KanbanGoodReads has some nice text", () => {
			review.body.should.startWith("");
		});
	});
});