'use strict';

var fs = require('fs'),
    formatter = require('./formatter'),
    noteTypes = require('../resources/note-types');

/**
 * @function
 * @name containsNote
 * Checks whether a line of text contains a note from allowed note types json file
 * @param {string} line of text
 * @returns {boolean} does string contain a valid note?
 */

function containsNote(line) {
    return Object.keys(noteTypes).some(function(key) {
        return new RegExp(noteTypes[key].note + ':').test(line);
    });
}

/**
 * @function
 * @name retrieveNotes
 * Reads a file and filters / formats it into an array of note strings
 * @param {string} file path
 * @returns {Array} of formatted notes
 */

function retrieveNotes(file) {
    return fs.readFileSync(file, 'utf8').split('\n').map(function(line, index) {
        if (containsNote(line)) {
            return formatter.line(line, index + 1);
        }
    }).filter(function(line) {
        return line;
    });
}

/**
 * @function
 * @name allNotes
 * Recursively searches through directory or file for notes and formatting them if found
 * @param {string} directory or file
 * @returns {string} formatted notes
 */

function allNotes(dirOrFile) {
    var ls = fs.lstatSync(dirOrFile);

    if (ls.isFile() && containsNote(fs.readFileSync(formatter.path(dirOrFile)))) {

        // file header & formatted TODOs
        return formatter.header(dirOrFile) + '\n' + retrieveNotes(dirOrFile).join('\n');
    
    } else if (ls.isDirectory()) {
    
        // iterate through all dirs & call allNotes on each
        return formatter.notes(fs.readdirSync(dirOrFile).map(function(subDirOrFile) {
            return allNotes(dirOrFile + '/' + subDirOrFile);
        }).join('\n\n'));
    }
}

module.exports = {
    containsNote: containsNote,
    retrieveNotes: retrieveNotes,
    allNotes: allNotes
};
