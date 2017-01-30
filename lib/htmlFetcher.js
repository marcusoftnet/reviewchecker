'use strict';
const co = require('co');
const coreq = require('co-request');

module.exports.getHTML = function(url) {
	return co(function *() {
		const result = yield coreq(url);
		let body = result.body;
		return body;
	});
};