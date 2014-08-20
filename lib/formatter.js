'use strict';

/**
 * param string String
 * returns String: with no recuring forward slashes
 */

function removeRecuringSlashes(string) {
    return string.replace(/([^:]\/)\/+/g, "$1");
}

/**
 * param string String
 * returns String: properly formatted ex: '/Users/daviskoh/dev/npm_packages/notey/test/mock_data/single-file.js:'
 */

function header(string) {
    // format url to only have 1 forward slash per path section
    // TOOD: find alternate to avoid using following regex logic
    return removeRecuringSlashes(string) + ':';
}

/**
 * param string String, lineNumber Number
 * returns String: properly formatted ex: '  * [Line   8] [TODO] update client-side Session model to overwrite toJSON'
 */

// TODO: dynamically replace trailing comments from specified list in JSON
var commentEndings = /(-->|\*\/)$/;

function line(string, lineNumber) {
    var index = string.indexOf('TODO') + 5,
        lineNumber = ('   ' + lineNumber).toString().substr(-3);

    // TODO: simplify whitespace removal
    return '  * [Line ' + lineNumber + '] [TODO] ' + string.substring(index).trim().replace(commentEndings, '').trim();
}

module.exports = {
    removeRecuringSlashes: removeRecuringSlashes,
    header: header,
    line: line
};
