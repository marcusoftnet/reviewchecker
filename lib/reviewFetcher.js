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
    let scrapeResult =  scraper.scrapeUrl(html, review.selector);
    
    return formatResponse(review, scrapeResult);

  }).catch(function(err) {
    return `Failed to get ${review.url} - '${err.message}'`;
  });
};

function formatResponse(review, scrapeResult){
  let body = util.format(review.formatString, scrapeResult);
  return {
      key : review.key,
      header : review.header,
      body : body,
      link: review.url
  };
};

module.exports.getReviewKeys = getReviewKeys;
module.exports.getReviewData = getReviewData;