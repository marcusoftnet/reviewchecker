const cheerio = require('cheerio')

const scrapeUrl = (html, selector) => {
  const $ = cheerio.load(html)
  const element = $(selector).first()

  if (element === undefined) return `Scrape failed for selector ${selector}`

  let data = element.text() ? element.text() : element.attr('value')
  data = getValueFromElementAttribute(data, element, selector)

  return data !== undefined ? data.trim() : `Scrape failed for element ${selector}`
}

const elementHasAttributesDefined = (element) => {
  return (element.length > 1 && element[0].attribs !== undefined)
}

const getValueFromElementAttribute = (data, element, selector) => {
  if (data === undefined && elementHasAttributesDefined(element)) {
    const attribute = getAttributeFromAttributeSelector(selector)
    return element[0].attribs[attribute]
  }
  return data
}

const getAttributeFromAttributeSelector = (selector) => {
  return selector.split('[')[1].split(']')[0]
}

module.exports = {
  scrapeUrl
}
