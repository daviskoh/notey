'use strict';

(function() {
    var notes = require('./notes'),
        args = process.argv;

    // use user specified args or cwd
    (args.slice(2).length ? args.slice(2) : [process.cwd()]).forEach(function(dirOrFile) {
        // output TODOs to console
        console.log(notes.allNotes(dirOrFile));
    });
}).call(this);
