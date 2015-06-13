/*!
 * test/_amd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'aflow/aflow'
], function (assert, sinon, aflow) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('amd - aflow.js', function () {

  it('Should expose methods.', function () {
    assert.ok(aflow.parallel);
    assert.ok(aflow.series);
    assert.ok(aflow.eachSeries);
  });

});


});