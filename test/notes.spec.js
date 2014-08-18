'use strict';

var notes = require('../lib/notes'),
    should = require('should'),
    sinon = require('sinon');

describe('notes', function() {
    var mockCWD = process.cwd() + '/test/mock_data';

    beforeEach(function() {
        // begin spying on console.log
    });

    it('exists', function(done) {
        notes.should.be.ok;
        done();
    });

    it('is a function', function(done) {
        notes.should.be.type('function');
        done();
    });

    xit('outputs all TODOs of a file', function(done) {
        var expectedOutput = 'single-file.js:\n  [ Line 12 ] TODO: get rid of return statement\n  [ Line 20 ] TODO: optimize for loop';

        // expect console.log to have been called w/ above

        done();
    });
});
