'use strict';

/**
 * param string
 * returns string in proper format ex: '/Users/daviskoh/dev/npm_packages/notey/test/mock_data/single-file.js:'
 */

function header(string) {
    return string + ':';
}

/**
 * param string, lineNumber
 * returns string in proper format ex: '  * [Line 8] [TODO] update client-side Session model to overwrite toJSON'
 */

function line(string, lineNumber) {
    var index = string.indexOf('TODO') + 5;

    return '  * [Line ' + lineNumber + '] [TODO] ' + string.substring(index).trim();
}

module.exports = {
    header: header,
    line: line
};
