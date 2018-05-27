/* global describe, it */
const htmlFetcher = require('../lib/htmlFetcher.js')
const should = require('should')

describe('Fetching an URL', () => {
  it('has a util to get the html for an url', async () => should.exists(htmlFetcher.getHTML))

  it('returns the html body for an url', async () => {
    const result = await htmlFetcher.getHTML('http://www.google.com')
    result.should.not.be.empty()
    result.length.should.be.above(100)
  })
})
