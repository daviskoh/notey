'use strict';

var formatter = require('../lib/formatter'),
    should = require('should');

describe('formatter', function() {
    it('exists', function (done) {
        formatter.should.be.ok;
        done();
    });

    it('is a function', function (done) {
        formatter.should.be.type('function');
        done();
    });
});
