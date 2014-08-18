'use strict';

var notes = require('../lib/notes'),
    formatter = require('../lib/formatter'),
    should = require('should'),
    sinon = require('sinon'),
    fs = require('fs');

describe('notes', function() {
    var mockCWD = process.cwd() + '/test/mock_data/';

    function checkOutputTodos(todos) {
        var expectedOutput = todos.join('\n');

        return function(done) {
            console.log.calledWith(expectedOutput).should.be.true;

            done();
        };
    }

    it('exists', function(done) {
        notes.should.be.ok;
        done();
    });

    it('is a object', function(done) {
        notes.should.be.type('object');
        done();
    });

    describe('notes.retrieveTodos', function() {
        var fileName = 'single-file.js',
            header = formatter.header(mockCWD + fileName),
            todo1 = formatter.line('    // TODO: get rid of return statement', 12),
            todo2 = formatter.line('    // TODO: optimize for loop', 20);

        it('should be a function', function(done) {
            notes.retrieveTodos.should.be.type('function');

            done();
        });

        it('should take a file and return an array of its TODOs', function(done) {
            var expectedTodos = [todo1, todo2];

            notes.retrieveTodos(mockCWD + fileName).should.eql(expectedTodos);

            done();
        });
    });

    describe('notes.outputNotes', function() {
        var fileName, directoryName, expectedFormat;

        it('should handle a single file', function(done) {
            fileName = 'single-file.js';

            expectedFormat = [
                formatter.header(mockCWD + fileName),
                formatter.line('// TODO: get rid of return statement', 12),
                formatter.line('// TODO: optimize for loop', 20)
            ].join('\n');

            notes.outputNotes(mockCWD + fileName).should.be.eql(expectedFormat);

            done();
        });

        it('should handle a single directory with a single file', function(done) {
            fileName = 'dat-factory-service.js',
            directoryName = 'one-directory-one-file/';

            expectedFormat = [
                formatter.header(mockCWD + directoryName + fileName),
                formatter.line('// TODO: have factory do something', 13),
                formatter.line('// TODO: change call to use https', 17),
                formatter.line('// TODO: use isolate scope', 31),
                formatter.line('// TODO: write some logic', 34)
            ].join('\n');

            notes.outputNotes(mockCWD + directoryName).should.be.eql(expectedFormat);

            done();
        });
    });
});
