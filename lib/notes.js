'use strict';

var fs = require('fs'),
    formatter = require('./formatter');


/**
 * param dir or file
 * returns array of TODOs w/ line location & file name
 */

// TODO: allow for OPTIMIZE and FIXME & pull in acceptable values from another mod
var todo = 'TODO:';

function outPutTODOs(file) {
    fs.readFileSync(file, 'utf8').split('\n').forEach(function(line, index) {
        // if line includes TODO, output it using console.log
        if (line.indexOf(todo) > -1) {
            console.log(formatter.line(line, index + 1));
        }
    });
}

function notes(dirOrFile) {
    if (fs.lstatSync(dirOrFile).isFile()) {
        // output file header
        console.log(formatter.header(dirOrFile));

        // output TODOs
        outPutTODOs(dirOrFile);
    } else if (fs.lstatSync(dirOrFile).isDirectory()) {
        fs.readdirSync(dirOrFile).forEach(function(subDirOrFile) {
            notes(subDirOrFile);
        });
    }
}

module.exports = notes;
