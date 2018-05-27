/* global describe, it, before */

const reviewFetcher = require('../lib/reviewFetcher.js')
const should = require('should')

describe('Getting reviews', () => {
  it('has a util to get review keys', async () => should.exists(reviewFetcher.getReviewKeys))
  it('has a util to get one review data', async () => should.exists(reviewFetcher.getReviewData))
  it('get review keys', async () => {
    const result = reviewFetcher.getReviewKeys()
    result.length.should.be.above(2)
  })

  describe('get review from a key', async () => {
    let review = {}
    before(async () => { review = await reviewFetcher.getReviewData('KanbanGoodRead') })
    it('should get the result at all', () => review.should.not.be.empty)
    it('review has a key', () => review.key.should.not.be.empty)
    it('review has a heading', () => review.header.should.not.be.empty)
    it('review has a link', () => review.link.should.not.be.empty)
    it('review has a results array', () => review.results.should.not.be.empty())
    it('review results array has at least one result', () => review.results.length.should.be.above(0))
    it('review results array for KanbanGoodReads has some nice text in the first element', () => review.results[0].should.endWith(' out of 5'))
    it('review results array for KanbanGoodReads contains two elements', () => review.results.length.should.be.above(1))
  })
})
