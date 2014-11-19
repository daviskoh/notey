'use strict';

var noteTypes = require('../resources/note-types.json'),
    chalk = require('chalk');

/**
 * @function
 * @name objectValues
 * Takes an object o and returns an array of its values
 * @param {Object} object with key / values
 * @returns {Array} array of values
 */

function objectValues(object) {
    return Object.keys(object).map(function(key) {
        return object[key].note;
    });
}

/**
 * @function
 * @name regex
 * Takes an array of strings and converts into regex
 * @param {Array} of strings
 * @returns {RegExp} made up of strings
 */

function regex(strings) {
    return RegExp(strings.join(':|') + ':');
}

/**
 * @function
 * @name path
 * Formats a path string
 * @param {string} path string
 * @returns {string}: string with no recuring forward slashes
 */

function path(string) {
    return string.replace(/([^:]\/)\/+/g, "$1");
}

/**
 * @function
 * @name header
 * Formats a header string
 * @param {string} path
 * @returns {string} path properly formatted ex: '/Users/daviskoh/dev/npm_packages/notey/test/mock_data/single-file.js:'
 */

function header(string) {
    // format url to only have 1 forward slash per path section
    // TODO: find alternate to avoid using following regex logic
    return chalk.bold(path(string)) + ':';
}

/**
 * @function
 * @name line
 * Formats a line containing a note
 * @param {string} line containing note
 * @param {number} line number
 * @returns {string} formatted string
 */

/**
 * param string String, lineNumber Number
 * returns String: properly formatted ex: '  * [Line   8] [TODO] update client-side Session model to overwrite toJSON'
 */

// Note: formatter.line is not concerned w/ whether line actually contains a note
// TODO: dynamically replace trailing comments from specified list in JSON
// incorporate objectValues func & commend-endings.json file
var commentEndings = /(-->|\*\/)$/;

function line(string, lineNumber) {
    var todo = regex(objectValues(noteTypes)).exec(string),
        index = todo.index + todo[0].length,
        lineNumber = ('   ' + lineNumber).toString().substr(-3),
        noteType = todo[0].substring(0, todo[0].length - 1),
        color = noteTypes[noteType.toLowerCase()].color;

    // TODO: simplify whitespace removal
    return '  * [Line ' + chalk.green(lineNumber) + '] [' + chalk[color](noteType) + '] ' + string.substring(index).trim().replace(commentEndings, '').trim();
}

/**
 * @function
 * @name notes
 * Formats a group of notes by removing unsightly whitespace
 * @param {string} notes block
 * @returns {string} formatted notes block containing no more than 2 line breaks
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
