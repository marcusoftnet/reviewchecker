const reviewFetcher = require('../lib/reviewFetcher.js');
const should = require("should");
const co = require("co");

describe("Some tests I've done for selectors and urls", function () {

	var testReviewData = { url : "", selector: "", prefix: "", suffix: "" };

	function testOneReview(reviewData, done) {
		co(function *() {
			let result = yield reviewFetcher.getReviewData(reviewData);
			result.should.not.be.empty;
			console.log(result);
		}).then(done, done);
	};

	it("Kanban In Action at Amazon", function (done) {
			testReviewData.url =
				'https://www.amazon.com/Kanban-Action-Marcus-Hammarberg/dp/1617291056/';
			testReviewData.selector = '.arp-rating-out-of-text';

			testOneReview(testReviewData, done);
	});

	it("Kanban In Action on GoodReads", function (done) {
		testReviewData.url = "https://www.goodreads.com/book/show/17789383-kanban-in-action";
		testReviewData.selector = ".average";

		testOneReview(testReviewData, done);
	});

	it("npm course at PluralSight", function (done) {
		testReviewData.url = "http://app.pluralsight.com/author/marcus-hammarberg";
		testReviewData.selector = "body > div.ng-scope > div:nth-child(2) > section.push-down > div > div > div:nth-child(2) > div > div.columns.large-12 > div:nth-child(2) > div.large-2.columns > span > input[type='hidden']";

		testOneReview(testReviewData, done);
	});

	it("SpecFlow.Assists.Dynamic on NuGet", function (done) {
		testReviewData.url = "https://www.nuget.org/packages/SpecFlow.Assist.Dynamic/";
		testReviewData.selector = "#stats > p.stat-number";
		testOneReview(testReviewData, done);
	});

});