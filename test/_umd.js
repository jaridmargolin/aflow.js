/*!
 * test/_umd.js
 */

define(function (require) {


/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var assert = require('proclaim');
var sinon = require('sinon');
var aflow = require('aflow/aflow');


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('umd - aflow.js', function () {

  it('Should expose methods.', function () {
    assert.ok(aflow.parallel);
    assert.ok(aflow.series);
    assert.ok(aflow.eachSeries);
  });

});


});