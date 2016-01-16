/*!
 * test/aflow.js
 */

define(function (require) {


/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var assert = require('proclaim');
var sinon = require('sinon');
var aflow = require('aflow');


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('aflow.js', function () {

  it('Should expose methods.', function () {
    assert.ok(aflow.parallel);
    assert.ok(aflow.series);
    assert.ok(aflow.eachSeries);
    assert.ok(aflow.eachParallel);
  });

});


});