/*!
 * test/each-parallel.js
 */

define(function (require) {


/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var assert = require('proclaim');
var sinon = require('sinon');
var eachParallel = require('each-parallel');


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('each-parallel.js', function () {

  it('Should call onComplete if array is empty.', function (done) {
    eachParallel([], function () {
      callback(null);
    }, function () {
      done();
    });
  });

  it('Should call onComplete with results in order.', function (done) {
    eachParallel(['1', '2'], function (val, callback) {
      return val === '1'
        ? setTimeout(function () { callback(null, val); }, 0)
        : callback(null, val);
    }, function (err, results) {
      assert.deepEqual(results, ['1', '2']);
      done();
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