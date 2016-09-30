'use strict';
const htmlFetcher = require('../lib/htmlFetcher.js');
const should = require("should");
const co = require('co');

describe("Fetching an URL", function() {
    it("has a util to get the html for an url", function(done) {
        should.exists(htmlFetcher.getHTML);
        done();
    });

    it("returns the html body for an url", function(done) {
      co(function*() {
        let result = yield htmlFetcher.getHTML('http://www.google.com');
        result.should.not.be.empty;
        result.length.should.be.above(100);
      }).then(done, done);
    });
});
