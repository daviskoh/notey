'use strict';

var notes = require('../lib/notes'),
    formatter = require('../lib/formatter'),
    should = require('should'),
    sinon = require('sinon');

describe('notes', function() {
    var mockCWD = process.cwd() + '/test/mock_data/';

    beforeEach(function() {
        // begin spying on console.log
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    it('exists', function(done) {
        notes.should.be.ok;
        done();
    });

    it('is a function', function(done) {
        notes.should.be.type('function');
        done();
    });

    describe('a single file', function() {
        var fileName = 'single-file.js',
            header = formatter.header(mockCWD + fileName),
            todo1 = formatter.line('    // TODO: get rid of return statement', 12),
            todo2 = formatter.line('    // TODO: optimize for loop', 20);

        beforeEach(function() {
            notes(mockCWD + fileName);
        });

        it('outputs header', function(done) {
            console.log.calledWith(header).should.be.true;
            done();
        });

        // TODO: make specs more dynamic
        it('outputs 1st TODO', function(done) {
            console.log.calledWith(todo1).should.be.true;
            done();
        });

        it('outputs 2nd TODO', function(done) {
            console.log.calledWith(todo2).should.be.true;
            done();
        });
    });
});
