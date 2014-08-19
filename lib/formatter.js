'use strict';

/**
 * param string String
 * returns String: properly formatted ex: '/Users/daviskoh/dev/npm_packages/notey/test/mock_data/single-file.js:'
 */

function header(string) {
    // format url to only have 1 forward slash per path section
    // TOOD: find alternate to avoid using following regex logic
    return string.replace(/([^:]\/)\/+/g, "$1") + ':';
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
