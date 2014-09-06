/*!
 * test/_umd.js
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

describe('umd - aflow.js', function () {

  it('Should expose methods.', function () {
    assert.ok(aflow.series);
  });

});


});