const co = require('co')
const coreq = require('co-request')

module.exports.getHTML = (url) => {
  return co(function * () {
    const result = yield coreq(url)
    return result.body
  })
}
