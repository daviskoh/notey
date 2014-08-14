'use strict';

var notes = require('../lib/notes'),
    should = require('should');

describe('notes', function() {
    it('exists', function (done) {
        notes.should.be.ok;
        done();
    });

    it('is a function', function (done) {
        notes.should.be.type('function');
        done();
    });
});
