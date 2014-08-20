'use strict';

var fs = require('fs'),
    formatter = require('./formatter'),
    keyWords = require('../resources/key-words');

/**
 * param line String
 * returns Boolean: string contains keyWord from specified external JSON
 */

function containsNote(line) {
    return Object.keys(keyWords).some(function(key) {
        return new RegExp(keyWords[key] + ':').test(line);
    });
}

/**
 * param file String
 * returns Array of TODOs w/ line location & file name
 */

function retrieveTodos(file) {
    return fs.readFileSync(file, 'utf8').split('\n').map(function(line, index) {
        // if line includes TODO, format it
        // check through keys in key-word object & make sure it is included in line (validate using regex)

        if (containsNote(line + '\:')) {
            return formatter.line(line, index + 1);
        }
    }).filter(function(line) {
        return line;
    });
}

/**
 * param dirOrFile String
 * returns String of Files' header & TODOs in order
 */

function allNotes(dirOrFile) {
    if (fs.lstatSync(dirOrFile).isFile() && containsNote(fs.readFileSync(formatter.path(dirOrFile)))) {
        // file header & formatted TODOs
        return formatter.header(dirOrFile) + '\n' + retrieveTodos(dirOrFile).join('\n');
    } else if (fs.lstatSync(dirOrFile).isDirectory()) {
        // iterate through all dirs & call allNotes on each
        return formatter.notes(fs.readdirSync(dirOrFile).map(function(subDirOrFile) {
            return allNotes(dirOrFile + '/' + subDirOrFile);
        }).join('\n\n'));
    }
}

module.exports = {
    containsNote: containsNote,
    retrieveTodos: retrieveTodos,
    allNotes: allNotes
};
