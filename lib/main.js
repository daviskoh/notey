'use strict';

(function() {
    var notes = require('./notes'),
        args = process.argv;

    // remove 1st 2 arguments of process.args: node & notey path
    args.shift();
    args.shift();

    if (!args.length) {
        args.push(process.cwd())
    }

    args.forEach(function(dirOrFile) {
        // output TODOs to console
        console.log(notes.allNotes(dirOrFile));
    });
}).call(this);
