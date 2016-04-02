/*!
 * test/parallel.js
 */

define(function (require) {


/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var assert = require('proclaim');
var sinon = require('sinon');
var parallel = require('parallel');


/* -----------------------------------------------------------------------------
 * reusable
 * ---------------------------------------------------------------------------*/

var fn1 = function (done) {
  return setTimeout(function () {
    done(null, '1', '2');
  }, 0);
};

var fn2 = function (done) {
  return done(null, '3', '4');
};

var fn3 = function (done) {
  return done('fail');
};


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('parallel.js', function () {

  it('Should call onComplete if array is empty.', function (done) {
    parallel([], function () {
      done();
    });
  });

  it('Should call onComplete with results in order.', function (done) {
    parallel([fn1, fn2], function (err, results) {
      assert.deepEqual(results, [
        ['1', '2'],
        ['3', '4']
      ]);
      done();
    });
  });

  it('Should call onComplete with error.', function () {
    parallel([fn1, fn3], function (err, results) {
      assert.equal(err, 'fail');
    });
  });

});


});