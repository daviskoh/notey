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

        it('should remove any duplicate forward slashes', function() {
            var expected = 'directory/ello-dude/homie/bro.js:';

            formatter.header('directory//ello-dude/homie///bro.js').should.be.exactly(expected);
            formatter.header('directory//ello-dude/homie///bro.js').should.be.exactly(expected);
            formatter.header('directory//ello-dude////homie/bro.js').should.be.exactly(expected);
        });
    });

    describe('formatter.line', function() {
        var givenString, expectedString;

        it('is a function', function() {
            formatter.line.should.be.type('function');
        });

        it('formats a string properly given a line number', function() {
            givenString = 'TODO: update client-side Session model to overwrite toJSON',
            expectedString = '  * [Line   8] [TODO] update client-side Session model to overwrite toJSON';

            formatter.line(givenString, 8).should.be.exactly(expectedString);
        });

        it('ignores code prefacing code', function() {
            givenString = '[1, 2, 3].forEach(function(number) { // TODO: declare new var & replace hard-coded',
            expectedString = '  * [Line  11] [TODO] declare new var & replace hard-coded';

            formatter.line(givenString, 11).should.be.exactly(expectedString);
        });

        
        it('ignores trailing comment marker in HTML', function() {
            givenString = '<!-- TODO: do things -->',
            expectedString = '  * [Line  21] [TODO] do things';

            formatter.line(givenString, 21).should.be.exactly(expectedString);
        });

        it('ignores trailing comment marker in c-style languages', function() {
            givenString = '/* TODO: do things */',
            expectedString = '  * [Line  21] [TODO] do things';

            formatter.line(givenString, 21).should.be.exactly(expectedString);
        });

        xit('allows for punctuation', function() {
            
        });
    });
});
