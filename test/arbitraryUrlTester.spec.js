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
				url: "http://app.pluralsight.com/author/marcus-hammarberg",
				selector: "input[name='score']",
				prefix: "Introduction to npm as a Build Tool:",
				suffix: "points"
			};

			let result = yield reviewFetcher.getReviewData(oneReview);
			result.should.not.be.empty;

			console.log(result);

		}).then(done, done);
	});

});