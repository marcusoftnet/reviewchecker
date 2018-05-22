/* global describe, it, before, beforeEach */

const reviewFetcher = require('../lib/reviewFetcher.js')
const should = require('should')
const co = require('co')

describe('Getting reviews', () => {

  it('has a util to get review keys', (done) => {
    should.exists(reviewFetcher.getReviewKeys)
    done()
  })

  it('has a util to get one review data', (done) => {
    should.exists(reviewFetcher.getReviewData)
    done()
  })

  it('get review keys', (done) => {
    const result = reviewFetcher.getReviewKeys()
    result.length.should.be.above(2)
    done()
  })

  describe('get review from a key', function (done) {
    this.timeout(20000)
    let review = {}

    before(function (done) {
      co(function * () {
        review = yield reviewFetcher.getReviewData('KanbanGoodRead')
      }).then(done, done)
    })

    it('should get the result at all', () => review.should.not.be.empty)
    it('review has a key', () => review.key.should.not.be.empty)
    it('review has a heading', () => review.header.should.not.be.empty)
    it('review has a link', () => review.link.should.not.be.empty)
    it('review has a results array', () => {
      review.results.should.not.be.empty()
    })
    it('review results array has at least one result', () => {
      review.results.length.should.be.above(0)
    })
    it('review results array for KanbanGoodReads has some nice text in the first element', () => {
      review.results[0].should.endWith(' out of 5')
    })
    it('review results array for KanbanGoodReads contains two elements', () => {
      review.results.length.should.be.above(1)
    })
  })

  describe('to test a key', function (done) {
    this.timeout(20000)

    it('gets the data for the key', function (done) {
      co(function * () {
        let review = yield reviewFetcher.getReviewData('KanbanAmazon')
        console.log(review)
        review.should.not.be(null)
      }).then(done, done)
    })
  })
})
