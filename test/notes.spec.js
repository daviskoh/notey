'use strict';

var notes = require('../lib/notes'),
    formatter = require('../lib/formatter'),
    should = require('should'),
    sinon = require('sinon'),
    fs = require('fs');

describe('notes', function() {
    var mockCWD = process.cwd() + '/test/mock_data/';

    it('exists', function() {
        notes.should.be.ok;
    });

    it('is an object', function() {
        notes.should.be.type('object');
    });

    describe('notes.containsNote', function() {
        it('is a function', function() {
            notes.containsNote.should.be.type('function');
        });

        it('checks a string for any key words specified in the key-words.json file', function() {
            notes.containsNote('function doThangs() { // TODO: ello').should.be.true;
            notes.containsNote('function doThangs() { // TOD: ello').should.be.false;
        });

        it('is case sensitive', function() {
            notes.containsNote('function doThangs() { // todo: ello').should.be.false;
            notes.containsNote('function doThangs() { // Todo: ello').should.be.false;
        });
    });

    describe('notes.retrieveTodos', function() {
        var fileName = 'single-file.js',
            header = formatter.header(mockCWD + fileName),
            todo1 = formatter.line('    // TODO: get rid of return statement', 12),
            todo2 = formatter.line('    // TODO: optimize for loop', 20);

        it('is a function', function() {
            notes.retrieveTodos.should.be.type('function');
        });

        it('should take a file and return an array of its TODOs', function() {
            var expectedTodos = [todo1, todo2];

            notes.retrieveTodos(mockCWD + fileName).should.eql(expectedTodos);
        });
    });

    describe('notes.allNotes', function() {
        var fileName, directoryName, expectedFormat;

        it('is a function', function() {
            notes.allNotes.should.be.type('function');
        });

        it('should handle a single file', function() {
            fileName = 'single-file.js';

            expectedFormat = [
                formatter.header(mockCWD + fileName),
                formatter.line('// TODO: get rid of return statement', 12),
                formatter.line('// TODO: optimize for loop', 20)
            ].join('\n');

            notes.allNotes(mockCWD + fileName).should.be.eql(expectedFormat);
        });

        it('should handle a single directory with a single file', function() {
            fileName = 'dat-factory-service.js',
            directoryName = 'one-directory-one-file/';

            expectedFormat = [
                formatter.header(mockCWD + directoryName + fileName),
                formatter.line('// TODO: have factory do something', 13),
                formatter.line('// TODO: change call to use https', 17),
                formatter.line('// TODO: use isolate scope', 31),
                formatter.line('// TODO: write some logic', 34)
            ].join('\n');

            notes.allNotes(mockCWD + directoryName).should.be.eql(expectedFormat);
        });

        it('should handle a single directory with multiple files', function() {
            var file1Name = 'app.js',
                file2Name = 'main-controller.js',
                file3Name = 'main-controller.spec.js';
            
            directoryName = 'one-directory-multi-files/';

            var file1Notes = [
                formatter.header(mockCWD + directoryName + file1Name),
                formatter.line('// TODO: need more mods dude', 4),
                formatter.line('* TODO: add more headers and stuff', 13),
                formatter.line('// TODO: add some useless resolves', 28),
                formatter.line('// TODO: fallback to something dumb', 39),
            ].join('\n');

            var file2Notes = [
                formatter.header(mockCWD + directoryName + file2Name),
                formatter.line('TODO: make var more descriptive', 14)
            ].join('\n');

            var file3Notes = [
                formatter.header(mockCWD + directoryName + file3Name),
                formatter.line('// TODO: add more things', 5),
                formatter.line('TODO: add more specs', 33)
            ].join('\n');

            expectedFormat = [
                file1Notes,
                file2Notes,
                file3Notes
            ].join('\n\n');

            notes.allNotes(mockCWD + directoryName).should.be.eql(expectedFormat);
        });
    });
});
