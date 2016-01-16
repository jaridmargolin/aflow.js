/*!
 * test/_umd.js
 */

define([
  'proclaim',
  'sinon',
  'aflow/aflow'
], function (assert, sinon, aflow) {


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