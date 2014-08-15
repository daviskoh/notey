'use strict';

(function() {
    var notes = require('./notes'),
        args = process.argv;

    // remove 1st 2 arguments of process.args: node & notey path
    args.pop();
    args.pop();

    if (!args.length) {
        args.push(process.cwd())
    }

    args.forEach(function(dirOrFile) {
        // output TODOs to console
        notes(dirOrFile);
    });
}).call(this);
