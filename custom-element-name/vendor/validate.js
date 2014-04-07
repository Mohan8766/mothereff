'use strict';
var ncname = require('ncname');

var reservedNames = [
	'annotation-xml',
	'color-profile',
	'font-face',
	'font-face-src',
	'font-face-uri',
	'font-face-format',
	'font-face-name',
	'missing-glyph'
];

function hasError(name) {
	if (!name) {
		return 'Missing element name.';
	}

	if (name.indexOf('-') === -1) {
		return 'Custom element names must contain a hyphen. Example: unicorn-cake';
	}

	if (/^\d/i.test(name)) {
		return 'Custom element names must not start with a digit.';
	}

	if (/^-/i.test(name)) {
		return 'Custom element names must not start with a hyphen.';
	}

	// http://www.w3.org/TR/custom-elements/#concepts
	if (!ncname.test(name)) {
		return 'Invalid element name.';
	}

	if (reservedNames.indexOf(name) !== -1) {
		return 'The supplied element name is reserved and can\'t be used.\nSee: http://www.w3.org/TR/custom-elements/#concepts';
	}
};

function hasWarning(name) {
	if (/^polymer-/.test(name)) {
		return 'Custom element names should not start with `polymer-`.\nSee: http://webcomponents.github.io/articles/how-should-i-name-my-element';
	}

	if (/^x-/.test(name)) {
		return 'Custom element names should not start with `x-`.\nSee: http://webcomponents.github.io/articles/how-should-i-name-my-element/';
	}

	if (/^ng-/.test(name)) {
		return 'Custom element names should not start with `ng-`.\nSee: http://docs.angularjs.org/guide/directive#creating-directives';
	}

	if (/-$/.test(name)) {
		return 'Custom element names should not end with an hyphen.';
	}

	if (/[^\x20-\x7E]+/.test(name)) {
		return 'Custom element names should not contain non-ASCII characters.';
	}

	if (/--/.test(name)) {
		return 'Custom element names should not contain consecutive hyphens.';
	}

	if (/[^a-z0-9]{2}/.test(name)) {
		return 'Custom element names should not contain consecutive non-alpha characters.';
	}
}

module.exports = function (name) {
	var errMsg = hasError(name);

	return {
		isValid: !errMsg,
		message: errMsg || hasWarning(name)
	};
};