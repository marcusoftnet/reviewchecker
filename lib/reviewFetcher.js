const util = require('util')
const scraper = require('./scraper.js')
const htmlFetcher = require('./htmlFetcher.js')
const reviews = require('../data/reviewUrlData.json').reviews

const getReviewKeys = () => { return reviews.map(r => r.key) }

const getReviewData = async (reviewKey) => {
  const review = reviews.find(r => r.key === reviewKey)
  try {
    const html = await htmlFetcher.getHTML(review.url)
    const results = []

    review.selectors.forEach((selector) => {
      const scrapeResult = scraper.scrapeUrl(html, selector.selector)
      results.push(formatResult(selector, scrapeResult))
    }, this)

    return createResponseObject(review, results)
  } catch (err) {
    console.log(err)
    return `Failed to get ${review.url} - '${err.message}'`
  }
}

const formatResult = (review, scrapeResult) => {
  if (scrapeResult.startsWith('Scrape failed')) { return scrapeResult }
  return util.format(review.formatString, scrapeResult)
}

const createResponseObject = (review, results) => {
  return {
    key: review.key,
    header: review.header,
    results: results,
    link: review.url
  }
}

module.exports = {
  getReviewKeys,
  getReviewData
}
