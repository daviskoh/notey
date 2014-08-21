'use strict';

var keyWords = require('../resources/key-words.json');

/**
 * returns RegExp: made up of all arguments of type String
 */

function regex() {
    return RegExp(Array.prototype.slice.call(arguments).join('|'));
}

/**
 * param string String
 * returns String: with no recuring forward slashes
 */

function path(string) {
    return string.replace(/([^:]\/)\/+/g, "$1");
}

/**
 * param string String
 * returns String: properly formatted ex: '/Users/daviskoh/dev/npm_packages/notey/test/mock_data/single-file.js:'
 */

function header(string) {
    // format url to only have 1 forward slash per path section
    // TOOD: find alternate to avoid using following regex logic
    return path(string) + ':';
}

/**
 * param string String, lineNumber Number
 * returns String: properly formatted ex: '  * [Line   8] [TODO] update client-side Session model to overwrite toJSON'
 */

// Note: formatter.line is not concerned w/ whether line actually contains a note
// TODO: dynamically replace trailing comments from specified list in JSON
var commentEndings = /(-->|\*\/)$/;

function line(string, lineNumber) {
    // NEED:
        // keyword length
        // keyword start index
    var index = string.indexOf('TODO:') + 5,
        lineNumber = ('   ' + lineNumber).toString().substr(-3);

    // TODO: simplify whitespace removal
    return '  * [Line ' + lineNumber + '] [TODO] ' + string.substring(index).trim().replace(commentEndings, '').trim();
}

/**
 * param string String
 * returns String: with no more than 2 line breaks
 */

function notes(string) {
    // TODO: cleanup messy regex replace logic
    return string.replace(/\n{2,}/g, '\n\n').replace(/^\s+|\s+$/g, '');
}

module.exports = {
    regex: regex,
    path: path,
    header: header,
    line: line,
    notes: notes
};
