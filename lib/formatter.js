'use strict';

var keyWords = require('../resources/key-words.json');

function objectValues(object) {
    return Object.keys(object).map(function(key) {
        return object[key];
    });
}

/**
 * returns RegExp: made up of all arguments of type String
 */

function regex(strings) {
    return RegExp(strings.join(':|') + ':');
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
    // TODO: find alternate to avoid using following regex logic
    return path(string) + ':';
}

/**
 * param string String, lineNumber Number
 * returns String: properly formatted ex: '  * [Line   8] [TODO] update client-side Session model to overwrite toJSON'
 */

// Note: formatter.line is not concerned w/ whether line actually contains a note
// TODO: dynamically replace trailing comments from specified list in JSON
// incorporate objectValues func & commend-endings.json file
var commentEndings = /(-->|\*\/)$/;

function line(string, lineNumber) {
    var todo = regex(objectValues(keyWords)).exec(string),
        index = todo.index + todo[0].length,
        lineNumber = ('   ' + lineNumber).toString().substr(-3),
        noteType = todo[0].substring(0, todo[0].length - 1);

    // TODO: simplify whitespace removal
    return '  * [Line ' + lineNumber + '] [' + noteType + '] ' + string.substring(index).trim().replace(commentEndings, '').trim();
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
