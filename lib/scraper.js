const cheerio = require('cheerio')

const scrapeUrl = (html, selector) => {
  const $ = cheerio.load(html)
  const element = $(selector).first()
  let data = element.text() ? element.text() : element.attr('value')

  if (data.trim() === '' && element[0].attribs) {
    const attribute = getAttributeFromAttributeSelector(selector)
    data = element[0].attribs[attribute]
  }

  return data.trim().length > 0 ? data.trim() : 'Scrape failed'
}

const getAttributeFromAttributeSelector = (selector) => {
  return selector.split('[')[1].split(']')[0]
}

module.exports = {
  scrapeUrl
}
