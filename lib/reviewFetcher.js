'use strict';
const co = require('co');
const util = require('util');
const coreq = require('co-request');
const scraper = require('./scraper.js');
const htmlFetcher = require('./htmlFetcher.js');
const reviews = require('../data/reviewUrlData.json').reviews;

function getReviewKeys(){ return reviews.map(r => r.key);};

function getReviewData(reviewKey) {
  let review = reviews.find(r => r.key === reviewKey);

  return co(function*() {
    let html = yield htmlFetcher.getHTML(review.url);
    let results = [];

    review.selectors.forEach(function(selector) {
      let scrapeResult = scraper.scrapeUrl(html, selector.selector);
      results.push(formatResult(selector, scrapeResult));
    }, this);

    return createResponseObject(review, results);

  }).catch(function(err) {
    return `Failed to get ${review.url} - '${err.message}'`;
  });
};

function formatResult(review, scrapeResult){
  if(scrapeResult === "Scrape failed")
    return scrapeResult;
  return util.format(review.formatString, scrapeResult);
}

function createResponseObject(review, results){
  return {
      key : review.key,
      header : review.header,
      results : results,
      link: review.url
  };
};

module.exports.getReviewKeys = getReviewKeys;
module.exports.getReviewData = getReviewData;