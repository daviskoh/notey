'use strict';

/**
 * param string String
 * returns String: properly formatted ex: '/Users/daviskoh/dev/npm_packages/notey/test/mock_data/single-file.js:'
 */

function header(string) {
    return string + ':';
}

/**
 * param string String, lineNumber Number
 * returns String: properly formatted ex: '  * [Line 8] [TODO] update client-side Session model to overwrite toJSON'
 */

function line(string, lineNumber) {
    var index = string.indexOf('TODO') + 5;

    return '  * [Line ' + lineNumber + '] [TODO] ' + string.substring(index).trim();
}

module.exports = {
    header: header,
    line: line
};
