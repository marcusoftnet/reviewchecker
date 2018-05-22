/* global describe, it */
const scraper = require('../lib/scraper.js')
const should = require('should')

describe('Scraping of URL', () => {
  it('has a scrapeUrl method', (done) => {
    should.exists(scraper.scrapeUrl)
    done()
  })

  it('parses values from id', (done) => {
    const html = `<html>
    <body>
      <div id='myId'>my value</div>
    </body>
  </html>`

    let result = scraper.scrapeUrl(html, '#myId')
    result.should.equal('my value')
    done()
  })

  it('parses values from a class', (done) => {
    const html = `<html>
    <body>
      <div class='myClass'>my value</div>
    </body>
  </html>`

    let result = scraper.scrapeUrl(html, '.myClass')
    result.should.equal('my value')
    done()
  })

  it('tries value if text is empty', (done) => {
    const html = `<html>
    <body>
      <input id='myId' value='4.6' />
    </body>
  </html>`

    let result = scraper.scrapeUrl(html, '#myId')
    result.should.equal('4.6')
    done()
  })

  it('finds an input by name', (done) => {
    const html = `<html>
    <body>
      <input name='myName' value='4.6' />
    </body>
  </html>`

    let result = scraper.scrapeUrl(html, 'input[name="myName"]')
    result.should.equal('4.6')
    done()
  })

  it('gets the value of an attribute', (done) => {
    const html = `<html>
    <body>
      <div any-attribute='myName' />
    </body>
  </html>`

    let result = scraper.scrapeUrl(html, 'div[any-attribute]')
    result.should.equal('myName')
    done()
  })

  it('gets the value of an attribute when more than one element the first is picked', (done) => {
    const html = `<html>
    <body>
      <div any-attribute='myName' />
      <div any-attribute='myName2' />
    </body>
  </html>`

    let result = scraper.scrapeUrl(html, 'div[any-attribute]')
    result.should.equal('myName')
    done()
  })
})
