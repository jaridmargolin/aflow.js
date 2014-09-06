/*!
 * test/aflow.js
 * 
 * Copyright (c) 2014
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
    assert.ok(aflow.series);
  });

});


});