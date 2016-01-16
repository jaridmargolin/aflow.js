/*!
 * test/each-parallel.js
 */

define([
  'proclaim',
  'sinon',
  'each-parallel'
], function (assert, sinon, eachParallel) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('each-parallel.js', function () {

  it('Should call onComplete with results.', function () {
    eachParallel(['1', '2'], function (val, callback) {
      callback(null, val);
    }, function (err, results) {
      assert.deepEqual(results, ['1', '2']);
    });
  });

  it('Should call onComplete with error.', function () {
    eachParallel(['1', '2'], function (val, callback) {
      return callback(val === '2' ? 'fail' : null, val);
    }, function (err, results) {
      assert.equal(err, 'fail');
    });
  });

});


});