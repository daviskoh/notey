'use strict';

var fs = require('fs'),
    formatter = require('./formatter');


/**
 * param dir or file
 * returns array of TODOs w/ line location & file name
 */

function notes(dirOrFile) {
    // TODO: allow for OPTIMIZE and FIXME
    var todo = 'TODO:';

    // output file header
    console.log(formatter.header(dirOrFile));
    fs.readFileSync(dirOrFile, 'utf8').split('\n').forEach(function(line, index) {
        // if line includes TODO, output it using console.log
        if (line.indexOf(todo) > -1) {
            console.log(formatter.line(line, index + 1));
        }
    });
}

module.exports = notes;
