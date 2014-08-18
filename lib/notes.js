'use strict';

var fs = require('fs'),
    formatter = require('./formatter');

/**
 * file
 * returns array of TODOs w/ line location & file name
 */

function retrieveTodos(file) {
    // TODO: allow for OPTIMIZE and FIXME & pull in acceptable values from another mod
    var todo = 'TODO:';

    return fs.readFileSync(file, 'utf8').split('\n').map(function(line, index) {
        // if line includes TODO, format it
        if (line.indexOf(todo) > -1) {
            return formatter.line(line, index + 1);
        }
    }).filter(function(line) {
        return line;
    });
}

/**
 * param dir or file
 * console.logs file header & all TODOs
 */

function outputNotes(dirOrFile) {
    if (fs.lstatSync(dirOrFile).isFile()) {
        return formatter.header(dirOrFile) + '\n' + retrieveTodos(dirOrFile).join('\n');
    } else if (fs.lstatSync(dirOrFile).isDirectory()) {
        var string = '';

        fs.readdirSync(dirOrFile).forEach(function(subDirOrFile) {
            string += outputNotes(dirOrFile + subDirOrFile);
        });

        return string;
    }
}

module.exports = {
    retrieveTodos: retrieveTodos,
    outputNotes: outputNotes
};
