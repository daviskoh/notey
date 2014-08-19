'use strict';

var formatter = require('../lib/formatter'),
    should = require('should');

describe('formatter', function() {
    it('exists', function() {
        formatter.should.be.ok;
    });

    it('is an object', function() {
        formatter.should.be.type('object');
    });

    describe('formatter.header', function() {
        var header = 'my-file.js';

        it('is a function', function() {
            formatter.header.should.be.type('function');
        });

        it('should format a header', function() {
            formatter.header(header).should.be.exactly(header + ':');
        });
    });

    describe('formatter.line', function() {
        var givenString, expectedString;

        it('is a function', function() {
            formatter.line.should.be.type('function');
        });

        it('formats a string properly given a line number', function() {
            givenString = 'TODO: update client-side Session model to overwrite toJSON',
            expectedString = '  * [Line 8] [TODO] update client-side Session model to overwrite toJSON';

            formatter.line(givenString, 8).should.be.exactly(expectedString);
        });

        it('ignores code prefacing code', function() {
            givenString = '[1, 2, 3].forEach(function(number) { // TODO: declare new var & replace hard-coded',
            expectedString = '  * [Line 11] [TODO] declare new var & replace hard-coded';

            formatter.line(givenString, 11).should.be.exactly(expectedString);
        });
    });
});
