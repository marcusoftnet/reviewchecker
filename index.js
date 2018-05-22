const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()
const reviewFetcher = require('./lib/reviewFetcher.js')

api.get('/', () => { return reviewFetcher.getReviewKeys() })

api.get('/{key}', async (request) => {
  return reviewFetcher.getReviewData(request.pathParams.key)
})

module.exports = api
