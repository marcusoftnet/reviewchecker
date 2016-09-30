const co = require('co');
const coreq = require('co-request');

module.exports.getHTML = function(url) {
	return co(function *() {
		// console.log(`Getting ${url}`);

		const result = yield coreq(url);
		return result.body;
	});
};