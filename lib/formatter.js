'use strict';

/**
 * param string, lineNumber
 * returns string in proper format ex: '  * [Line 8] [TODO] update client-side Session model to overwrite toJSON'
 */

function formatter(string, lineNumber) {
    var index = string.indexOf('TODO') + 5;

    return '  * [Line ' + lineNumber + '] [TODO] ' + string.substring(index).trim();
}

module.exports = formatter;
