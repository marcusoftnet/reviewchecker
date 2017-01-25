'use strict';
const co = require('co');
const coreq = require('co-request');
const each = require('co-each');
const scraper = require('./scraper.js');
const htmlFetcher = require('./htmlFetcher.js');
const reviews = require('../data/reviewUrlData.json').reviews;

function getReviewKeys() {
    return reviews.map(r => r.key);
};

function getReviewData(reviewKey) {
  let review = reviews.find(r => r.key === reviewKey); 

  return co(function*() {
    let html = yield htmlFetcher.getHTML(review.url);
    return scraper.scrapeUrl(html, review.selector);

  }).catch(function(err) {
    return `Failed to get ${review.url} - '${err.message}'`;
  });
};

module.exports.getReviewKeys = getReviewKeys;
module.exports.getReviewData = getReviewData;

