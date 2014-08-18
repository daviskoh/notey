'use strict';

var formatter = require('../lib/formatter'),
    should = require('should');

describe('formatter', function() {
    it('exists', function(done) {
        formatter.should.be.ok;
        done();
    });

    it('is a object', function(done) {
        formatter.should.be.type('object');
        done();
    });
    
    describe('formatter.header', function() {
        var header = 'my-file.js';

        it('is a function', function(done) {
            formatter.header.should.be.type('function');
            done();
        });

        it('should format a header', function(done) {
            formatter.header(header).should.be.exactly(header + ':');
            done();
        });
    });

    describe('formatter.line', function() {
        var givenString, expectedString;

        it('is a function', function(done) {
            formatter.line.should.be.type('function');
            done();
        });

        it('formats a string properly given a line number', function(done) {
            givenString = 'TODO: update client-side Session model to overwrite toJSON',
            expectedString = '  * [Line 8] [TODO] update client-side Session model to overwrite toJSON';

            formatter.line(givenString, 8).should.be.exactly(expectedString);

            done();
        });

        it('ignores code prefacing code', function(done) {
            givenString = '[1, 2, 3].forEach(function(number) { // TODO: declare new var & replace hard-coded',
            expectedString = '  * [Line 11] [TODO] declare new var & replace hard-coded';

            formatter.line(givenString, 11).should.be.exactly(expectedString);

            done();
        });
    });
});
