'use strict';

var formatter = require('../lib/formatter'),
    noteTypes = require('../resources/note-types.json'),
    chalk = require('chalk'),
    should = require('should');

describe('formatter', function() {
    it('exists', function() {
        formatter.should.be.ok;
    });

    it('is an object', function() {
        formatter.should.be.type('object');
    });

    describe('formatter.notes', function() {
        it('prevents more than 2 line breaks', function() {
            formatter.notes('hello\n\n\ndude').should.be.exactly('hello\n\ndude');
        });

        it('removes all prefacing & trailing whitespace', function() {
            formatter.notes('\nhello\n').should.be.exactly('hello');
            formatter.notes('\nhel\n\n\nlo\n').should.be.exactly('hel\n\nlo');
        });
    });

    describe('formatter.path', function() {
        it('removes duplicate trailing forward slashes', function() {
            formatter.path('/aaaa//').should.be.exactly('/aaaa/');
        });

        it('removes forward slashes occurring at various places', function() {
            formatter.path('/aa///aa//').should.be.exactly('/aa/aa/');
        });

        it('should remove any duplicate forward slashes from file path', function() {
            var expected = 'directory/ello-dude/homie/bro.js';

            formatter.path('directory//ello-dude/homie///bro.js').should.be.exactly(expected);
            formatter.path('directory//ello-dude/homie///bro.js').should.be.exactly(expected);
            formatter.path('directory//ello-dude////homie/bro.js').should.be.exactly(expected);
        });
    });

    describe('formatter.regex', function() {
        // needed as regular equality check is not possible w/ regex
        function regexValidate(x, y) {
            return (x instanceof RegExp) && (y instanceof RegExp) &&
                (x.source === y.source) && (x.global === y.global) &&
                (x.ignoreCase === y.ignoreCase) && (x.multiline === y.multiline);
        }

        it('combines an array of strings into a regex or statement', function() {
            regexValidate(formatter.regex(['hello', 'dude']), RegExp('hello:|dude:')).should.be.true;
        });

        it('takes an infinite number of arguments', function() {
            var testStrings = ['dude'],
                expectedRegExp = RegExp(testStrings.join(':|') + ':');
            for (var i = 0; i < 10; i++) {
                testStrings.push(i.toString());
                regexValidate(formatter.regex(testStrings), expectedRegExp);
            }
        });
    });

    describe('formatter.header', function() {
        var header = 'my-file.js';

        it('is a function', function() {
            formatter.header.should.be.type('function');
        });

        it('should add a trailing colon', function() {
            formatter.header(header).should.be.exactly(chalk.bold(header) + ':');
        });
    });

    describe('formatter.line', function() {
        var givenString, expectedString;

        function toThreeDigits(number) {
            return ('   ' + number).toString().substr(-3)
        }

        it('is a function', function() {
            formatter.line.should.be.type('function');
        });

        Object.keys(noteTypes).forEach(function(noteType) {
            var noteObject = noteTypes[noteType];

            it('formats a ' + noteObject.note +' properly given a line number', function() {
                givenString = noteObject.note + ': update client-side Session model to overwrite toJSON',
                expectedString = '  * [Line ' + chalk.green(toThreeDigits(8)) + '] [' + chalk[noteObject.color](noteObject.note) +'] update client-side Session model to overwrite toJSON';

                formatter.line(givenString, 8).should.be.exactly(expectedString);
            });

            it('ignores code prefacing a ' + noteObject.note, function() {
                givenString = '[1, 2, 3].forEach(function(number) { // ' + noteObject.note + ': declare new var & replace hard-coded',
                expectedString = '  * [Line ' + chalk.green(toThreeDigits(11)) + '] [' + chalk[noteObject.color](noteObject.note) + '] declare new var & replace hard-coded';

                formatter.line(givenString, 11).should.be.exactly(expectedString);
            });

            it('ignores trailing comment marker in HTML ' + noteObject.note, function() {
                givenString = '<!-- ' + noteObject.note +': do things -->',
                expectedString = '  * [Line ' + chalk.green(toThreeDigits(21)) + '] [' + chalk[noteObject.color](noteObject.note) + '] do things';

                formatter.line(givenString, 21).should.be.exactly(expectedString);
                // ignores trailing whitespace
                formatter.line(givenString + ' ', 21).should.be.exactly(expectedString);
            });

            it('ignores trailing comment marker in c-style language ' + noteObject.note + 's', function() {
                givenString = '/* ' + noteObject.note + ': do things */',
                expectedString = '  * [Line ' + chalk.green(toThreeDigits(21)) + '] [' + chalk[noteObject.color](noteObject.note) + '] do things';

                formatter.line(givenString, 21).should.be.exactly(expectedString);
                // ignores trailing whitespace
                formatter.line(givenString + ' ', 21).should.be.exactly(expectedString);
            });

            it('allows for punctuation in a ' + noteObject.note, function() {
                givenString = '<!-- ' + noteObject.note + ': hey there! -->',
                expectedString = '  * [Line ' + chalk.green(toThreeDigits(21)) + '] [' + chalk[noteObject.color](noteObject.note) + '] hey there!';

                formatter.line(givenString, 21).should.be.exactly(expectedString);
            });
        });
    });
});
