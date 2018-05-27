/* global describe, it */
const scraper = require('../lib/scraper.js')
const should = require('should')

describe('Scraping of URL', () => {
  it('has a scrapeUrl method', async () => should.exists(scraper.scrapeUrl))

  it('parses values from id', async () => {
    const html = `
    <html>
      <body>
        <div id='myId'>my value</div>
      </body>
    </html>`

    const result = scraper.scrapeUrl(html, '#myId')
    result.should.equal('my value')
  })

  it('parses values from a class', async () => {
    const html = `
    <html>
      <body>
        <div class='myClass'>my value</div>
      </body>
    </html>`

    const result = scraper.scrapeUrl(html, '.myClass')
    result.should.equal('my value')
  })

  it('tries value if text is empty', async () => {
    const html = `
    <html>
      <body>
        <input id='myId' value='4.6' />
      </body>
    </html>`

    const result = scraper.scrapeUrl(html, '#myId')
    result.should.equal('4.6')
  })

  it('finds an input by name', async () => {
    const html = `
    <html>
      <body>
        <input name='myName' value='4.6' />
      </body>
    </html>`

    const result = scraper.scrapeUrl(html, 'input[name="myName"]')
    result.should.equal('4.6')
  })

  // it('gets the value of an attribute', async () => {
  //   const html = `
  //   <html>
  //     <body>
  //       <div any-attribute='myName' />
  //     </body>
  //   </html>`

  //   const result = scraper.scrapeUrl(html, 'div[any-attribute]')
  //   result.should.equal('myName')
  // })

  // it('gets the value of an attribute when more than one element the first is picked', async () => {
  //   const html = `
  //   <html>
  //     <body>
  //       <div any-attribute='myName' />
  //       <div any-attribute='myName2' />
  //     </body>
  //   </html>`

  //   let result = scraper.scrapeUrl(html, 'div[any-attribute]')
  //   result.should.equal('myName')
  // })
})
