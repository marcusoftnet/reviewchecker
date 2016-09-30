const reviewFetcher = require('../lib/reviewFetcher.js');
const should = require("should");
const co = require("co");

describe("Some tests I've done for selectors and urls", function () {

	it("Kanban In Action at Amazon", function (done) {
		co(function *() {
			let oneReview = {
				url: 'https://www.amazon.com/Kanban-Action-Marcus-Hammarberg/dp/1617291056/',
				selector: '.arp-rating-out-of-text',
				prefix: 'Kanban in Action',
				suffix: ''
			};

			let result = yield reviewFetcher.getReviewData(oneReview);
			result.should.not.be.empty;

			console.log(result);

		}).then(done, done);
	});

	it("npm course at PluralSight", function (done) {
		co(function *() {
			let oneReview = {
				url: "https://app.pluralsight.com/library/courses/npm-build-tool-introduction/table-of-contents",
				selector: ".rating__raters-count",
				prefix: "Introduction to npm as a Build Tool:",
				suffix: "ratings"
			};

			let result = yield reviewFetcher.getReviewData(oneReview);
			result.should.not.be.empty;

			console.log(result);

		}).then(done, done);
	});

});