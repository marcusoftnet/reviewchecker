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
			let oneReview = {
				url : 'http://www.github.com',
				selector: '.jumbotron-title',
				prefix: 'A',
				suffix: 'B'
			};

			let result = yield reviewFetcher.getReviewData(oneReview);
			result.should.not.be.empty;
			result.length.should.be.above(15);

		}).then(done, done);
	});

	it("get reviews from two urls", function (done) {
		co(function *() {
			let oneReview = [
				{
					url : 'http://www.github.com',
					selector: '.jumbotron-title',
					prefix: 'A',
					suffix: 'B'
				},
				{
					url : 'http://www.github.com',
					selector: '.jumbotron-title',
					prefix: 'A',
					suffix: 'B'
				}
			];

			let result = yield reviewFetcher.getAllReviews(oneReview);
			result.length.should.equal(2);
			result[0].length.should.be.above(15);
			result[1].length.should.be.above(15);
		}).then(done, done);
	});
});