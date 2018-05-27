const coreq = require('co-request')

module.exports.getHTML = async (url) => {
  const result = await coreq(url)
  return result.body
}
