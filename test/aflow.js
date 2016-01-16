/*!
 * test/aflow.js
 */

define([
  'proclaim',
  'sinon',
  'aflow'
], function (assert, sinon, aflow) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('aflow.js', function () {

  it('Should expose methods.', function () {
    assert.ok(aflow.parallel);
    assert.ok(aflow.series);
    assert.ok(aflow.eachSeries);
  });

});


});